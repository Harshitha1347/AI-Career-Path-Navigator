'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  AlertCircle,
  Sparkles,
  Map,
  Brain,
  RefreshCw,
  ExternalLink,
  Play,
  BookMarked,
  Code2,
  ChevronRight,
  X,
} from 'lucide-react';

import { supabase } from '@/lib/supabase';

interface CareerProfile {
  current_situation: string | null;
  education_level: string | null;
  education_field: string | null;
  education_year: string | null;
  education_details: string | null;

  current_skills: string[] | null;

  experience_level: string | null;
  experience_details: string | null;

  interests: string[] | null;

  strengths: string | null;
  weaknesses: string | null;

  career_goal: string | null;
  target_role: string | null;

  // Supports both Supabase number and text values
  study_hours: string | number | null;

  learning_style: string | null;
  target_timeline: string | null;
  preferred_work_mode: string | null;
  location: string | null;
}

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  type: 'Learn' | 'Practice' | 'Build' | 'Career';
  skill?: string;
  completed?: boolean;
}

interface FreeResource {
  title: string;
  provider: string;
  url: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
}

interface YouTubeResource {
  id: string;
  title: string;
  description: string;
  channelTitle: string;
  thumbnail: string;
  url: string;
  type: 'video' | 'channel' | 'playlist';
}

/* =========================================================
   TARGET ROLE → REQUIRED SKILLS
========================================================= */

const targetRequirements: Record<string, string[]> = {
  'AI Engineer': [
    'Python',
    'SQL',
    'Statistics',
    'Machine Learning',
    'Deep Learning',
    'Generative AI',
    'Git/GitHub',
    'Docker',
    'Cloud Computing',
  ],

  'Machine Learning Engineer': [
    'Python',
    'SQL',
    'Statistics',
    'Machine Learning',
    'Deep Learning',
    'Git/GitHub',
    'Docker',
    'Cloud Computing',
  ],

  'Data Scientist': [
    'Python',
    'SQL',
    'Statistics',
    'Machine Learning',
    'Excel',
    'Git/GitHub',
    'Data Visualization',
  ],

  'Data Analyst': [
    'SQL',
    'Python',
    'Statistics',
    'Excel',
    'Data Visualization',
  ],

  'Full Stack Developer': [
    'HTML/CSS',
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
    'SQL',
    'Git/GitHub',
  ],

  'Frontend Developer': [
    'HTML/CSS',
    'JavaScript',
    'TypeScript',
    'React',
    'Git/GitHub',
  ],

  'Backend Developer': [
    'JavaScript',
    'TypeScript',
    'Node.js',
    'SQL',
    'APIs',
    'Git/GitHub',
  ],

  'Cloud Engineer': [
    'Linux',
    'Python',
    'Git/GitHub',
    'Cloud Computing',
    'Docker',
  ],

  'Cybersecurity Engineer': [
    'Networking',
    'Linux',
    'Python',
    'Cybersecurity',
    'Cloud Computing',
  ],

  'UI/UX Designer': [
    'UI/UX Design',
    'User Research',
    'Figma',
    'Prototyping',
  ],

  'Product Manager': [
    'Product Management',
    'User Research',
    'Business',
    'SQL',
  ],
};

/* =========================================================
   FREE RESOURCE DATABASE
========================================================= */

const freeResources: Record<string, FreeResource[]> = {
  Python: [
    {
      title: 'Python Official Tutorial',
      provider: 'Python.org',
      url: 'https://docs.python.org/3/tutorial/',
      description:
        'Official Python tutorial covering syntax, functions, modules and programming fundamentals.',
      level: 'Beginner',
    },
    {
      title: 'Scientific Computing with Python',
      provider: 'freeCodeCamp',
      url: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/',
      description:
        'Free Python learning path with practical exercises and projects.',
      level: 'All Levels',
    },
  ],

  SQL: [
    {
      title: 'SQL Tutorial',
      provider: 'W3Schools',
      url: 'https://www.w3schools.com/sql/',
      description:
        'Interactive SQL tutorials covering queries, filtering, joins and databases.',
      level: 'Beginner',
    },
    {
      title: 'SQLBolt',
      provider: 'SQLBolt',
      url: 'https://sqlbolt.com/',
      description:
        'Interactive SQL lessons and exercises.',
      level: 'Beginner',
    },
  ],

  Statistics: [
    {
      title: 'Statistics and Probability',
      provider: 'Khan Academy',
      url: 'https://www.khanacademy.org/math/statistics-probability',
      description:
        'Free statistics and probability lessons with practice exercises.',
      level: 'All Levels',
    },
  ],

  'Machine Learning': [
    {
      title: 'Machine Learning Crash Course',
      provider: 'Google',
      url: 'https://developers.google.com/machine-learning/crash-course',
      description:
        'Practical introduction to machine learning concepts, models and evaluation.',
      level: 'Intermediate',
    },
    {
      title: 'Intro to Machine Learning',
      provider: 'Kaggle',
      url: 'https://www.kaggle.com/learn/intro-to-machine-learning',
      description:
        'Short practical lessons with exercises and examples.',
      level: 'Beginner',
    },
  ],

  'Deep Learning': [
    {
      title: 'MIT OpenCourseWare',
      provider: 'MIT OpenCourseWare',
      url: 'https://ocw.mit.edu/',
      description:
        'University-level learning materials covering deep learning and related topics.',
      level: 'Advanced',
    },
    {
      title: 'Kaggle Learn',
      provider: 'Kaggle',
      url: 'https://www.kaggle.com/learn',
      description:
        'Free practical courses and exercises for machine learning and deep learning.',
      level: 'All Levels',
    },
  ],

  'Generative AI': [
    {
      title: 'Generative AI Learning',
      provider: 'Google Cloud',
      url: 'https://www.cloudskillsboost.google/',
      description:
        'Learning resources for generative AI and modern AI development.',
      level: 'Intermediate',
    },
    {
      title: 'Generative AI Training',
      provider: 'Microsoft Learn',
      url: 'https://learn.microsoft.com/training/',
      description:
        'Free learning paths covering generative AI and AI development.',
      level: 'Intermediate',
    },
  ],

  'Git/GitHub': [
    {
      title: 'Git Documentation',
      provider: 'Git',
      url: 'https://git-scm.com/doc',
      description:
        'Official Git documentation and reference material.',
      level: 'All Levels',
    },
    {
      title: 'GitHub Skills',
      provider: 'GitHub',
      url: 'https://skills.github.com/',
      description:
        'Hands-on GitHub learning exercises.',
      level: 'Beginner',
    },
  ],

  Docker: [
    {
      title: 'Docker Get Started',
      provider: 'Docker',
      url: 'https://docs.docker.com/get-started/',
      description:
        'Official Docker beginner guide covering containers and images.',
      level: 'Beginner',
    },
  ],

  'Cloud Computing': [
    {
      title: 'AWS Training',
      provider: 'AWS',
      url: 'https://skillbuilder.aws/',
      description:
        'Cloud learning resources from AWS.',
      level: 'All Levels',
    },
    {
      title: 'Google Cloud Training',
      provider: 'Google Cloud',
      url: 'https://www.cloudskillsboost.google/',
      description:
        'Cloud computing learning paths and hands-on labs.',
      level: 'All Levels',
    },
  ],

  JavaScript: [
    {
      title: 'JavaScript Guide',
      provider: 'MDN',
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
      description:
        'Comprehensive JavaScript documentation and tutorials.',
      level: 'All Levels',
    },
  ],

  TypeScript: [
    {
      title: 'TypeScript Handbook',
      provider: 'TypeScript',
      url: 'https://www.typescriptlang.org/docs/handbook/intro.html',
      description:
        'Official TypeScript handbook.',
      level: 'Intermediate',
    },
  ],

  React: [
    {
      title: 'React Learn',
      provider: 'React',
      url: 'https://react.dev/learn',
      description:
        'Official React learning documentation.',
      level: 'All Levels',
    },
  ],

  'HTML/CSS': [
    {
      title: 'Learn Web Development',
      provider: 'MDN',
      url: 'https://developer.mozilla.org/en-US/docs/Learn',
      description:
        'Free HTML, CSS and web development learning material.',
      level: 'Beginner',
    },
  ],

  'Data Visualization': [
    {
      title: 'Khan Academy',
      provider: 'Khan Academy',
      url: 'https://www.khanacademy.org/',
      description:
        'Free mathematics and data-related learning resources.',
      level: 'All Levels',
    },
  ],

  Excel: [
    {
      title: 'Excel Training',
      provider: 'Microsoft',
      url: 'https://support.microsoft.com/excel',
      description:
        'Official Excel learning and support resources.',
      level: 'All Levels',
    },
  ],

  Linux: [
    {
      title: 'Linux Journey',
      provider: 'Linux Journey',
      url: 'https://linuxjourney.com/',
      description:
        'Free Linux learning material from fundamentals to advanced concepts.',
      level: 'Beginner',
    },
  ],

  Networking: [
    {
      title: 'Networking Academy',
      provider: 'Cisco',
      url: 'https://www.netacad.com/',
      description:
        'Networking learning resources and foundational material.',
      level: 'Beginner',
    },
  ],

  Cybersecurity: [
    {
      title: 'Cybersecurity Training',
      provider: 'Microsoft Learn',
      url: 'https://learn.microsoft.com/training/',
      description:
        'Free cybersecurity learning paths.',
      level: 'All Levels',
    },
  ],

  Figma: [
    {
      title: 'Figma Help and Learning',
      provider: 'Figma',
      url: 'https://help.figma.com/',
      description:
        'Official Figma learning and help resources.',
      level: 'Beginner',
    },
  ],
};

/* =========================================================
   HELPERS
========================================================= */

function normalizeSkill(value: string) {
  return value
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

function skillMatches(
  userSkill: string,
  requiredSkill: string
) {
  const a = normalizeSkill(userSkill);
  const b = normalizeSkill(requiredSkill);

  return (
    a === b ||
    a.includes(b) ||
    b.includes(a)
  );
}

function getSkillLevel(
  profile: CareerProfile
): 'Beginner' | 'Intermediate' | 'Advanced' {
  const skillCount =
    profile.current_skills?.length ?? 0;

  const experience = (
    profile.experience_level || ''
  ).toLowerCase();

  if (
    experience.includes('advanced') ||
    experience.includes('professional') ||
    experience.includes('experienced') ||
    skillCount >= 8
  ) {
    return 'Advanced';
  }

  if (
    experience.includes('intermediate') ||
    experience.includes('intern') ||
    skillCount >= 4
  ) {
    return 'Intermediate';
  }

  return 'Beginner';
}

/*
 * IMPORTANT FIX:
 * Supabase may return study_hours as:
 *
 * 2
 *
 * OR:
 *
 * "2 hours/day"
 *
 * This function handles both.
 */
function getStudyHoursNumber(
  studyHours: string | number | null | undefined
): number {
  if (
    studyHours === null ||
    studyHours === undefined ||
    studyHours === ''
  ) {
    return 1;
  }

  if (typeof studyHours === 'number') {
    if (studyHours <= 0) return 1;

    return Math.min(
      Math.max(Math.round(studyHours), 1),
      12
    );
  }

  const match = String(studyHours).match(/\d+(?:\.\d+)?/);

  if (!match) return 1;

  const value = Number(match[0]);

  if (!Number.isFinite(value) || value <= 0) {
    return 1;
  }

  return Math.min(
    Math.max(Math.round(value), 1),
    12
  );
}

function getResourceLevelDescription(
  level: 'Beginner' | 'Intermediate' | 'Advanced'
) {
  if (level === 'Beginner') {
    return 'Starting from fundamentals. Resources focus on concepts, syntax and guided practice.';
  }

  if (level === 'Intermediate') {
    return 'Building job-ready skills. Resources focus on practical implementation and projects.';
  }

  return 'Moving toward professional depth. Resources focus on advanced concepts, architecture and real-world implementation.';
}

/* =========================================================
   DASHBOARD
========================================================= */

export default function DailyProgressDashboard() {
  const router = useRouter();

  const [profile, setProfile] =
    useState<CareerProfile | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [selectedSkill, setSelectedSkill] =
    useState<string | null>(null);

  const [youtubeResources, setYoutubeResources] =
    useState<YouTubeResource[]>([]);

  const [resourceLoading, setResourceLoading] =
    useState(false);

  const [youtubeError, setYoutubeError] =
    useState<string | null>(null);

  const [completedSkills, setCompletedSkills] =
    useState<string[]>([]);

  /* =========================================================
     LOAD PROFILE
  ========================================================= */

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        router.push('/sign-up-login-screen');
        return;
      }

      const { data, error } = await supabase
        .from('career_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error(
          'Career profile error:',
          error
        );
        return;
      }

      if (!data) {
        router.push('/career-interview');
        return;
      }

      setProfile(data as CareerProfile);
    } catch (error) {
      console.error(
        'Dashboard error:',
        error
      );
    } finally {
      setLoading(false);
    }
  }

  /* =========================================================
     TARGET ROLE
  ========================================================= */

  const targetRole = useMemo(() => {
    if (!profile) {
      return 'Your Career Goal';
    }

    return (
      profile.target_role ||
      profile.career_goal ||
      'Your Career Goal'
    );
  }, [profile]);

  /* =========================================================
     CURRENT SKILLS
  ========================================================= */

  const currentSkills = useMemo(() => {
    if (!profile?.current_skills) {
      return [];
    }

    return profile.current_skills;
  }, [profile]);

  /* =========================================================
     REQUIRED SKILLS
  ========================================================= */

  const requirements = useMemo(() => {
    if (!profile) {
      return [];
    }

    const roleKey = Object.keys(
      targetRequirements
    ).find(
      (role) =>
        normalizeSkill(role) ===
        normalizeSkill(targetRole)
    );

    if (roleKey) {
      return targetRequirements[roleKey];
    }

    return [
      'Problem Solving',
      'Communication',
      'Projects',
      'Git/GitHub',
    ];
  }, [profile, targetRole]);

  /* =========================================================
     USER LEVEL
  ========================================================= */

  const skillLevel = useMemo(() => {
    if (!profile) {
      return 'Beginner';
    }

    return getSkillLevel(profile);
  }, [profile]);

  /* =========================================================
     SKILL GAPS
  ========================================================= */

  const skillGaps = useMemo(() => {
    return requirements.filter(
      (requiredSkill) => {
        const alreadyHave =
          currentSkills.some(
            (userSkill) =>
              skillMatches(
                userSkill,
                requiredSkill
              )
          );

        return !alreadyHave;
      }
    );
  }, [requirements, currentSkills]);

  /* =========================================================
     READINESS
  ========================================================= */

  const readiness = useMemo(() => {
    if (!profile) {
      return 0;
    }

    const totalSkills =
      requirements.length;

    const matchedSkills =
      requirements.filter(
        (requiredSkill) =>
          currentSkills.some(
            (userSkill) =>
              skillMatches(
                userSkill,
                requiredSkill
              )
          )
      ).length;

    let score = 20;

    if (totalSkills > 0) {
      score += Math.round(
        (matchedSkills / totalSkills) *
          55
      );
    }

    if (profile.education_level) {
      score += 5;
    }

    if (profile.experience_level) {
      score += 5;
    }

    if (profile.interests?.length) {
      score += 5;
    }

    if (profile.strengths) {
      score += 5;
    }

    if (
      profile.career_goal ||
      profile.target_role
    ) {
      score += 5;
    }

    return Math.min(score, 100);
  }, [
    profile,
    requirements,
    currentSkills,
  ]);

  /* =========================================================
     STUDY HOURS
  ========================================================= */

  const studyHours = useMemo(() => {
    return getStudyHoursNumber(
      profile?.study_hours
    );
  }, [profile]);

  /* =========================================================
     DYNAMIC ROADMAP
  ========================================================= */

  const roadmap = useMemo<RoadmapItem[]>(() => {
    if (!profile) {
      return [];
    }

    const items: RoadmapItem[] = [];

    skillGaps.forEach(
      (skill, index) => {
        items.push({
          id: `learn-${index}-${skill}`,
          title: `Learn ${skill}`,
          description:
            skillLevel === 'Beginner'
              ? `Build your ${skill} fundamentals through beginner-friendly lessons.`
              : skillLevel ===
                  'Intermediate'
                ? `Develop practical ${skill} skills through hands-on learning.`
                : `Strengthen advanced ${skill} knowledge with professional-level resources.`,
          type: 'Learn',
          skill,
          completed:
            completedSkills.includes(
              skill
            ),
        });

        if (
          index <
          Math.min(
            skillGaps.length,
            4
          )
        ) {
          items.push({
            id: `practice-${index}-${skill}`,
            title: `Practice ${skill}`,
            description:
              `Solve exercises and small tasks to turn ${skill} knowledge into practical ability.`,
            type: 'Practice',
            skill,
          });
        }
      }
    );

    items.push({
      id: 'project',
      title: `Build a ${targetRole} Project`,
      description:
        'Create a real-world project that demonstrates your skills and can be added to your portfolio.',
      type: 'Build',
    });

    items.push({
      id: 'github',
      title: 'Create GitHub Proof',
      description:
        'Document your project, add a strong README and publish your work on GitHub.',
      type: 'Career',
    });

    items.push({
      id: 'resume',
      title: 'Optimize Your Resume',
      description:
        'Align your resume with the target role, skills and projects you are developing.',
      type: 'Career',
    });

    items.push({
      id: 'interview',
      title: 'Practice Interviews',
      description:
        `Prepare technical and behavioral questions for ${targetRole}.`,
      type: 'Career',
    });

    items.push({
      id: 'job-ready',
      title: 'Become Job Ready',
      description:
        'Apply your skills to internships, entry-level roles and relevant opportunities.',
      type: 'Career',
    });

    return items;
  }, [
    profile,
    skillGaps,
    skillLevel,
    targetRole,
    completedSkills,
  ]);

  /* =========================================================
     SELECTED FREE RESOURCES
  ========================================================= */

  const selectedFreeResources =
    useMemo(() => {
      if (!selectedSkill) {
        return [];
      }

      return (
        freeResources[
          selectedSkill
        ] || []
      );
    }, [selectedSkill]);

  /* =========================================================
     YOUTUBE
  ========================================================= */

  async function loadYouTubeResources(
    skill: string
  ) {
    try {
      setSelectedSkill(skill);
      setResourceLoading(true);
      setYoutubeError(null);
      setYoutubeResources([]);

      const response = await fetch(
        `/api/resources/youtube?skill=${encodeURIComponent(
          skill
        )}&level=${encodeURIComponent(
          skillLevel
        )}&role=${encodeURIComponent(
          targetRole
        )}`
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            'Unable to load YouTube resources.'
        );
      }

      setYoutubeResources(
        data.resources || []
      );
    } catch (error) {
      console.error(
        'YouTube resource error:',
        error
      );

      setYoutubeError(
        error instanceof Error
          ? error.message
          : 'Unable to load YouTube resources.'
      );
    } finally {
      setResourceLoading(false);
    }
  }

  /* =========================================================
     COMPLETE SKILL
  ========================================================= */

  function toggleSkillComplete(
    skill: string
  ) {
    setCompletedSkills(
      (previous) => {
        if (
          previous.includes(skill)
        ) {
          return previous.filter(
            (item) => item !== skill
          );
        }

        return [
          ...previous,
          skill,
        ];
      }
    );
  }

  /* =========================================================
     ICON
  ========================================================= */

  function getTypeIcon(
    type: RoadmapItem['type']
  ) {
    if (type === 'Learn') {
      return (
        <BookMarked className="h-5 w-5" />
      );
    }

    if (type === 'Practice') {
      return (
        <Code2 className="h-5 w-5" />
      );
    }

    if (type === 'Build') {
      return (
        <Code2 className="h-5 w-5" />
      );
    }

    return (
      <Sparkles className="h-5 w-5" />
    );
  }

  /* =========================================================
     LOADING SCREEN
  ========================================================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />

          <p className="text-slate-300">
            Building your personalized
            career dashboard...
          </p>
        </div>
      </main>
    );
  }

  /* =========================================================
     NO PROFILE
  ========================================================= */

  if (!profile) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <AlertCircle className="h-10 w-10 mx-auto mb-4" />

          <h1 className="text-2xl font-bold mb-2">
            Career profile not found
          </h1>

          <p className="text-slate-400 mb-6">
            Complete your career assessment
            to generate your personalized
            roadmap.
          </p>

          <button
            onClick={() =>
              router.push(
                '/career-interview'
              )
            }
            className="px-5 py-3 rounded-xl bg-white text-slate-900 font-semibold"
          >
            Complete Assessment
          </button>
        </div>
      </main>
    );
  }

  /* =========================================================
     MAIN DASHBOARD
  ========================================================= */

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* HEADER */}
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">

          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6" />

              <h1 className="text-xl font-bold">
                AI Career Path Navigator
              </h1>
            </div>

            <p className="text-sm text-slate-400 mt-1">
              Your roadmap is dynamically
              generated from your career
              profile.
            </p>
          </div>

          <button
            onClick={() =>
              router.push(
                '/career-interview'
              )
            }
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 transition"
          >
            <RefreshCw className="h-4 w-4" />

            Update Profile
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* HERO */}
        <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-slate-900 p-8 mb-8">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            <div>
              <p className="text-sm uppercase tracking-wider text-indigo-300 font-semibold mb-3">
                Personalized Career Plan
              </p>

              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Your path to becoming a{' '}
                <span className="text-indigo-300">
                  {targetRole}
                </span>
              </h2>

              <p className="text-slate-300 max-w-3xl">
                Based on your education,
                current skills, experience,
                interests, learning style and
                career goal, the system has
                generated a personalized
                learning and career roadmap.
              </p>
            </div>

            <div className="min-w-[180px] rounded-2xl bg-white/5 border border-white/10 p-5">

              <p className="text-sm text-slate-400">
                Job Readiness
              </p>

              <div className="text-4xl font-bold mt-1">
                {readiness}%
              </div>

              <div className="h-2 bg-white/10 rounded-full mt-4 overflow-hidden">

                <div
                  className="h-full bg-indigo-400 rounded-full transition-all"
                  style={{
                    width: `${readiness}%`,
                  }}
                />

              </div>
            </div>

          </div>
        </section>

        {/* METRICS */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-slate-400">
                Target Role
              </p>

              <Brain className="h-5 w-5 text-indigo-300" />
            </div>

            <p className="font-semibold">
              {targetRole}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-slate-400">
                Current Level
              </p>

              <Map className="h-5 w-5 text-indigo-300" />
            </div>

            <p className="font-semibold">
              {skillLevel}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-slate-400">
                Skills to Develop
              </p>

              <Code2 className="h-5 w-5 text-indigo-300" />
            </div>

            <p className="font-semibold">
              {skillGaps.length}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-slate-400">
                Study Plan
              </p>

              <BookMarked className="h-5 w-5 text-indigo-300" />
            </div>

            <p className="font-semibold">
              {studyHours}{' '}
              {studyHours === 1
                ? 'hour'
                : 'hours'}
              /day
            </p>
          </div>

        </section>

        {/* PROFILE */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/[0.03] p-6">

            <h3 className="text-xl font-bold mb-5">
              Your Learning Profile
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <p className="text-sm text-slate-500">
                  Education
                </p>

                <p className="mt-1">
                  {profile.education_level ||
                    'Not specified'}

                  {profile.education_field
                    ? ` • ${profile.education_field}`
                    : ''}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Experience
                </p>

                <p className="mt-1">
                  {profile.experience_level ||
                    'Not specified'}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Learning Style
                </p>

                <p className="mt-1">
                  {profile.learning_style ||
                    'Not specified'}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Timeline
                </p>

                <p className="mt-1">
                  {profile.target_timeline ||
                    'Not specified'}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Work Preference
                </p>

                <p className="mt-1">
                  {profile.preferred_work_mode ||
                    'Not specified'}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Location
                </p>

                <p className="mt-1">
                  {profile.location ||
                    'Not specified'}
                </p>
              </div>

            </div>
          </div>

          {/* CURRENT SKILLS */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

            <h3 className="text-xl font-bold mb-5">
              Your Current Skills
            </h3>

            <div className="flex flex-wrap gap-2">

              {currentSkills.length > 0 ? (
                currentSkills.map(
                  (skill) => (
                    <span
                      key={skill}
                      className="px-3 py-2 rounded-xl bg-indigo-500/10 border border-indigo-400/20 text-indigo-200 text-sm"
                    >
                      {skill}
                    </span>
                  )
                )
              ) : (
                <p className="text-slate-400">
                  No current skills added
                  yet.
                </p>
              )}

            </div>
          </div>

        </section>

        {/* PRIORITY SKILLS */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 mb-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">

            <div>
              <h3 className="text-xl font-bold">
                Priority Skills
              </h3>

              <p className="text-sm text-slate-400 mt-1">
                Click a skill to see free
                resources and personalized
                YouTube learning material.
              </p>
            </div>

            <div className="px-3 py-2 rounded-xl bg-white/5 text-sm text-slate-300">
              Recommended level:{' '}
              <strong>
                {skillLevel}
              </strong>
            </div>

          </div>

          {skillGaps.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">

              {skillGaps.map(
                (skill, index) => {
                  const completed =
                    completedSkills.includes(
                      skill
                    );

                  return (
                    <button
                      key={skill}
                      onClick={() =>
                        loadYouTubeResources(
                          skill
                        )
                      }
                      className={`text-left p-4 rounded-xl border transition ${
                        completed
                          ? 'border-green-400/30 bg-green-400/10'
                          : selectedSkill ===
                              skill
                            ? 'border-indigo-400/50 bg-indigo-400/10'
                            : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="flex items-center justify-between">

                        <span className="text-xs text-slate-500">
                          Priority{' '}
                          {index + 1}
                        </span>

                        <ChevronRight className="h-4 w-4 text-slate-500" />

                      </div>

                      <p className="font-semibold mt-2">
                        {skill}
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        {completed
                          ? 'Skill marked complete'
                          : `Explore ${skill} resources`}
                      </p>

                    </button>
                  );
                }
              )}

            </div>
          ) : (
            <div className="p-5 rounded-xl bg-green-400/10 border border-green-400/20">

              <p className="font-semibold text-green-300">
                Excellent progress!
              </p>

              <p className="text-sm text-slate-300 mt-1">
                You currently match the
                core skills identified for
                your target role. Continue
                with projects, portfolio and
                interview preparation.
              </p>

            </div>
          )}

        </section>

        {/* ROADMAP */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 mb-8">

          <div className="flex items-center gap-3 mb-2">

            <Map className="h-6 w-6" />

            <h3 className="text-xl font-bold">
              Your Dynamic Career Roadmap
            </h3>

          </div>

          <p className="text-sm text-slate-400 mb-8">
            This roadmap changes
            automatically according to your
            target role, current skills and
            learning level.
          </p>

          <div className="overflow-x-auto pb-5">

            <div className="flex items-stretch min-w-max">

              {roadmap.map(
                (item, index) => {
                  const isSkill =
                    item.type === 'Learn' ||
                    item.type ===
                      'Practice';

                  const completed =
                    item.skill &&
                    completedSkills.includes(
                      item.skill
                    );

                  return (
                    <div
                      key={item.id}
                      className="flex items-center"
                    >

                      <button
                        onClick={() => {
                          if (item.skill) {
                            loadYouTubeResources(
                              item.skill
                            );
                          }
                        }}
                        disabled={!isSkill}
                        className={`w-64 text-left rounded-2xl border p-5 transition ${
                          completed
                            ? 'border-green-400/30 bg-green-400/10'
                            : isSkill
                              ? 'border-indigo-400/30 bg-indigo-400/10 hover:border-indigo-300/60'
                              : 'border-white/10 bg-white/[0.03]'
                        } ${
                          !isSkill
                            ? 'cursor-default'
                            : 'cursor-pointer'
                        }`}
                      >

                        <div className="flex items-center justify-between mb-4">

                          <div
                            className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                              completed
                                ? 'bg-green-400/20 text-green-300'
                                : 'bg-white/10'
                            }`}
                          >
                            {getTypeIcon(
                              item.type
                            )}
                          </div>

                          <span className="text-xs text-slate-500">
                            Step{' '}
                            {index + 1}
                          </span>

                        </div>

                        <p className="text-xs uppercase tracking-wider text-indigo-300 font-semibold">
                          {item.type}
                        </p>

                        <h4 className="font-bold mt-2">
                          {item.title}
                        </h4>

                        <p className="text-sm text-slate-400 mt-2 leading-6">
                          {item.description}
                        </p>

                        {isSkill && (
                          <div className="mt-4 flex items-center gap-1 text-sm text-indigo-300">
                            View Resources

                            <ChevronRight className="h-4 w-4" />
                          </div>
                        )}

                      </button>

                      {index <
                        roadmap.length -
                          1 && (
                        <div className="w-12 h-px bg-white/10 mx-2" />
                      )}

                    </div>
                  );
                }
              )}

            </div>

          </div>
        </section>

        {/* RESOURCE PANEL */}
        {selectedSkill && (
          <section className="rounded-2xl border border-indigo-400/20 bg-indigo-400/[0.04] p-6 mb-8">

            <div className="flex items-start justify-between gap-4 mb-6">

              <div>

                <div className="flex items-center gap-2">

                  <BookMarked className="h-5 w-5 text-indigo-300" />

                  <p className="text-sm uppercase tracking-wider text-indigo-300 font-semibold">
                    Learning Resources
                  </p>

                </div>

                <h3 className="text-2xl font-bold mt-2">
                  {selectedSkill}
                </h3>

                <p className="text-slate-400 text-sm mt-2 max-w-3xl">
                  {getResourceLevelDescription(
                    skillLevel
                  )}
                </p>

              </div>

              <button
                onClick={() =>
                  setSelectedSkill(
                    null
                  )
                }
                className="p-2 rounded-lg hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>

            </div>

            {/* FREE RESOURCES */}
            <div className="mb-8">

              <div className="flex items-center gap-2 mb-4">

                <BookMarked className="h-5 w-5" />

                <h4 className="text-lg font-bold">
                  Free Learning Resources
                </h4>

              </div>

              {selectedFreeResources.length >
              0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {selectedFreeResources.map(
                    (resource) => (
                      <a
                        key={
                          resource.title
                        }
                        href={
                          resource.url
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl border border-white/10 bg-white/[0.03] p-5 hover:bg-white/[0.06] transition"
                      >

                        <div className="flex items-start justify-between gap-3">

                          <div>

                            <p className="text-xs text-indigo-300 font-semibold">
                              {
                                resource.provider
                              }
                            </p>

                            <h5 className="font-bold mt-1">
                              {
                                resource.title
                              }
                            </h5>

                          </div>

                          <ExternalLink className="h-4 w-4 text-slate-500" />

                        </div>

                        <p className="text-sm text-slate-400 mt-3 leading-6">
                          {
                            resource.description
                          }
                        </p>

                        <span className="inline-block mt-4 px-2 py-1 rounded-md bg-green-400/10 text-green-300 text-xs">
                          {
                            resource.level
                          }
                        </span>

                      </a>
                    )
                  )}

                </div>
              ) : (
                <div className="rounded-xl border border-white/10 p-5">

                  <p className="text-slate-400">
                    Curated resources for
                    this skill will be
                    added soon.
                  </p>

                </div>
              )}

            </div>

            {/* YOUTUBE */}
            <div>

              <div className="flex items-center gap-2 mb-4">

                <Play className="h-5 w-5" />

                <div>

                  <h4 className="text-lg font-bold">
                    YouTube Learning
                  </h4>

                  <p className="text-sm text-slate-400">
                    {selectedSkill} •{' '}
                    {skillLevel} •{' '}
                    {targetRole}
                  </p>

                </div>

              </div>

              {resourceLoading ? (
                <div className="rounded-xl border border-white/10 p-8 text-center">

                  <RefreshCw className="h-7 w-7 animate-spin mx-auto mb-3" />

                  <p className="text-slate-300">
                    Finding suitable
                    YouTube learning
                    resources...
                  </p>

                </div>
              ) : youtubeError ? (
                <div className="rounded-xl border border-red-400/20 bg-red-400/5 p-5">

                  <div className="flex gap-3">

                    <AlertCircle className="h-5 w-5 text-red-300 mt-0.5" />

                    <div>

                      <p className="font-semibold text-red-300">
                        YouTube resources
                        could not be
                        loaded
                      </p>

                      <p className="text-sm text-slate-400 mt-1">
                        {youtubeError}
                      </p>

                    </div>

                  </div>

                </div>
              ) : youtubeResources.length >
                0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                  {youtubeResources.map(
                    (resource) => (
                      <a
                        key={
                          resource.id
                        }
                        href={
                          resource.url
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl overflow-hidden border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition"
                      >

                        {resource.thumbnail && (
                          <img
                            src={
                              resource.thumbnail
                            }
                            alt={
                              resource.title
                            }
                            className="w-full aspect-video object-cover"
                          />
                        )}

                        <div className="p-4">

                          <div className="flex items-center justify-between gap-2">

                            <span className="text-xs uppercase text-indigo-300 font-semibold">
                              {
                                resource.type
                              }
                            </span>

                            <ExternalLink className="h-4 w-4 text-slate-500" />

                          </div>

                          <h5 className="font-semibold mt-2 line-clamp-2">
                            {
                              resource.title
                            }
                          </h5>

                          <p className="text-sm text-slate-400 mt-2">
                            {
                              resource.channelTitle
                            }
                          </p>

                        </div>

                      </a>
                    )
                  )}

                </div>
              ) : (
                <div className="rounded-xl border border-white/10 p-6">

                  <p className="text-slate-400">
                    Select a skill to load
                    YouTube resources.
                  </p>

                </div>
              )}

            </div>

            {/* COMPLETE BUTTON */}
            <div className="mt-6 pt-6 border-t border-white/10">

              <button
                onClick={() =>
                  toggleSkillComplete(
                    selectedSkill
                  )
                }
                className={`px-5 py-3 rounded-xl font-semibold transition ${
                  completedSkills.includes(
                    selectedSkill
                  )
                    ? 'bg-green-400/10 text-green-300 border border-green-400/20'
                    : 'bg-white text-slate-950 hover:bg-slate-200'
                }`}
              >
                {completedSkills.includes(
                  selectedSkill
                )
                  ? '✓ Skill Completed'
                  : 'Mark Skill Complete'}
              </button>

            </div>

          </section>
        )}

        {/* NEXT ACTION */}
        <section className="rounded-2xl border border-indigo-400/20 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-6">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>

              <p className="text-sm uppercase tracking-wider text-indigo-300 font-semibold">
                Recommended Next Action
              </p>

              <h3 className="text-2xl font-bold mt-2">

                {skillGaps.length >
                0
                  ? `Start learning ${skillGaps[0]}`
                  : `Build your first ${targetRole} project`}

              </h3>

              <p className="text-slate-400 mt-2">

                {skillGaps.length >
                0
                  ? `Spend approximately ${studyHours} ${
                      studyHours === 1
                        ? 'hour'
                        : 'hours'
                    } today developing this priority skill.`
                  : 'Use your current skills to create a strong portfolio project.'}

              </p>

            </div>

            <button
              onClick={() => {
                if (
                  skillGaps.length >
                  0
                ) {
                  loadYouTubeResources(
                    skillGaps[0]
                  );
                }
              }}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-950 font-semibold hover:bg-slate-200 transition"
            >
              Start Learning

              <ChevronRight className="h-5 w-5" />
            </button>

          </div>

        </section>

      </div>
    </main>
  );
}