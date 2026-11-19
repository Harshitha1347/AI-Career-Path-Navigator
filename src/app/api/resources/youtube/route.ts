import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface YouTubeSearchItem {
  id?: {
    kind?: string;
    videoId?: string;
    channelId?: string;
    playlistId?: string;
  };

  snippet?: {
    title?: string;
    description?: string;
    channelTitle?: string;
    thumbnails?: {
      medium?: {
        url?: string;
      };
      high?: {
        url?: string;
      };
    };
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const skill = searchParams.get('skill')?.trim() || '';
    const level = searchParams.get('level')?.trim() || 'Beginner';
    const role = searchParams.get('role')?.trim() || 'Career';

    if (!skill) {
      return NextResponse.json(
        {
          error: 'Skill is required.',
        },
        {
          status: 400,
        }
      );
    }

    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            'YOUTUBE_API_KEY is missing from the server environment.',
        },
        {
          status: 500,
        }
      );
    }

    const query = `${skill} ${level} tutorial ${role}`;

    const url = new URL(
      'https://www.googleapis.com/youtube/v3/search'
    );

    url.searchParams.set('part', 'snippet');
    url.searchParams.set('q', query);
    url.searchParams.set('key', apiKey);
    url.searchParams.set('maxResults', '12');
    url.searchParams.set('relevanceLanguage', 'en');
    url.searchParams.set('regionCode', 'IN');
    url.searchParams.set('safeSearch', 'moderate');

    const response = await fetch(url.toString(), {
      next: {
        revalidate: 3600,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('YouTube API error:', data);

      return NextResponse.json(
        {
          error:
            data?.error?.message ||
            'YouTube API request failed.',
        },
        {
          status: response.status,
        }
      );
    }

    const resources = (
      (data.items || []) as YouTubeSearchItem[]
    )
      .map((item) => {
        const kind = item.id?.kind || '';

        let type:
          | 'video'
          | 'channel'
          | 'playlist';

        let resourceUrl = '';

        if (kind.includes('video')) {
          type = 'video';

          if (!item.id?.videoId) {
            return null;
          }

          resourceUrl = `https://www.youtube.com/watch?v=${item.id.videoId}`;
        } else if (kind.includes('channel')) {
          type = 'channel';

          if (!item.id?.channelId) {
            return null;
          }

          resourceUrl = `https://www.youtube.com/channel/${item.id.channelId}`;
        } else if (kind.includes('playlist')) {
          type = 'playlist';

          if (!item.id?.playlistId) {
            return null;
          }

          resourceUrl = `https://www.youtube.com/playlist?list=${item.id.playlistId}`;
        } else {
          return null;
        }

        return {
          id:
            item.id?.videoId ||
            item.id?.channelId ||
            item.id?.playlistId ||
            Math.random().toString(),

          title:
            item.snippet?.title ||
            'YouTube Resource',

          description:
            item.snippet?.description ||
            '',

          channelTitle:
            item.snippet?.channelTitle ||
            'YouTube',

          thumbnail:
            item.snippet?.thumbnails?.high?.url ||
            item.snippet?.thumbnails?.medium?.url ||
            '',

          url: resourceUrl,

          type,
        };
      })
      .filter(Boolean);

    return NextResponse.json({
      query,
      skill,
      level,
      role,
      resources,
    });
  } catch (error) {
    console.error('YouTube route error:', error);

    return NextResponse.json(
      {
        error: 'Unexpected server error while loading YouTube resources.',
      },
      {
        status: 500,
      }
    );
  }
}