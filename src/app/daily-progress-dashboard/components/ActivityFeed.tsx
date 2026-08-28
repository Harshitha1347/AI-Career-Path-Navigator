import React from 'react';
import { CheckCircle2, Zap, Trophy, BookOpen, Target, TrendingUp } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';

type ActivityType =
  'topic_complete' | 'xp_earned' | 'badge_earned' | 'resource_added' | 'milestone' | 'streak';

interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  detail: string;
  time: string;
  xp?: number;
}

const activities: Activity[] = [
  {
    id: 'act-001',
    type: 'topic_complete',
    title: 'Completed: Transformer Architecture',
    detail: 'Advanced Stage · 45 min study session',
    time: '2h ago',
    xp: 120,
  },
  {
    id: 'act-002',
    type: 'xp_earned',
    title: 'Daily Login Bonus',
    detail: 'Logged in for 47 consecutive days',
    time: '8h ago',
    xp: 50,
  },
  {
    id: 'act-003',
    type: 'badge_earned',
    title: 'Badge Unlocked: Night Owl 🦉',
    detail: 'Studied after 10 PM for 5 consecutive days',
    time: 'Yesterday',
  },
  {
    id: 'act-004',
    type: 'topic_complete',
    title: 'Completed: PyTorch Lightning Framework',
    detail: 'Advanced Stage · 1.5h coding session',
    time: 'Yesterday',
    xp: 180,
  },
  {
    id: 'act-005',
    type: 'milestone',
    title: 'Milestone: 40+ Day Streak Achieved',
    detail: "You're in the top 5% of learners on AI Engineer track",
    time: '2 days ago',
  },
  {
    id: 'act-006',
    type: 'resource_added',
    title: "New Resource: Andrej Karpathy's NLP Course",
    detail: 'Added to your Advanced stage — 12h content',
    time: '3 days ago',
  },
  {
    id: 'act-007',
    type: 'streak',
    title: 'Weekly Goal Achieved',
    detail: 'Completed 5 topics this week — +200 bonus XP',
    time: '5 days ago',
    xp: 200,
  },
];

const activityConfig: Record<ActivityType, { icon: React.ElementType; color: string; bg: string }> =
  {
    topic_complete: {
      icon: CheckCircle2,
      color: 'text-neon-green',
      bg: 'rgba(52,211,153,0.15)',
    },
    xp_earned: {
      icon: Zap,
      color: 'text-neon-violet',
      bg: 'rgba(124,58,237,0.15)',
    },
    badge_earned: {
      icon: Trophy,
      color: 'text-neon-amber',
      bg: 'rgba(251,191,36,0.15)',
    },
    resource_added: {
      icon: BookOpen,
      color: 'text-neon-cyan',
      bg: 'rgba(6,182,212,0.15)',
    },
    milestone: {
      icon: Target,
      color: 'text-neon-pink',
      bg: 'rgba(244,114,182,0.15)',
    },
    streak: {
      icon: TrendingUp,
      color: 'text-neon-green',
      bg: 'rgba(52,211,153,0.15)',
    },
  };

export default function ActivityFeed() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-bold text-foreground">Recent Activity</h3>
        <button className="text-xs text-neon-violet hover:underline">View all</button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, idx) => {
          const config = activityConfig[activity.type];
          const Icon = config.icon;
          return (
            <div key={activity.id} className="flex items-start gap-3 group">
              {/* Icon */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: config.bg }}
              >
                <Icon size={15} className={config.color} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-foreground leading-tight">
                    {activity.title}
                  </p>
                  {activity.xp && (
                    <span className="text-xs font-mono text-neon-violet flex-shrink-0">
                      +{activity.xp} XP
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{activity.detail}</p>
              </div>

              {/* Time */}
              <span className="text-xs text-muted-foreground flex-shrink-0 mt-0.5">
                {activity.time}
              </span>

              {/* Connector line */}
              {idx < activities.length - 1 && (
                <div
                  className="absolute left-[2.25rem] mt-8 w-px h-4 bg-border"
                  aria-hidden="true"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
