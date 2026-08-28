import React from 'react';
import { Trophy, Lock } from 'lucide-react';

const achievements = [
  {
    id: 'ach-first-fire',
    emoji: '🔥',
    name: '7-Day Streak',
    description: 'Studied 7 days in a row',
    rarity: 'common',
    earned: true,
    earnedDate: 'Jun 14, 2026',
  },
  {
    id: 'ach-month-warrior',
    emoji: '⚡',
    name: '30-Day Warrior',
    description: 'Maintained a 30-day streak',
    rarity: 'rare',
    earned: true,
    earnedDate: 'Jul 08, 2026',
  },
  {
    id: 'ach-first-stage',
    emoji: '🎯',
    name: 'Stage Complete',
    description: 'Completed the Intermediate stage',
    rarity: 'epic',
    earned: true,
    earnedDate: 'Jun 28, 2026',
  },
  {
    id: 'ach-centurion',
    emoji: '💎',
    name: 'Century Club',
    description: 'Earn 1000 XP in a single day',
    rarity: 'legendary',
    earned: true,
    earnedDate: 'Jul 15, 2026',
  },
  {
    id: 'ach-speed-learner',
    emoji: '🚀',
    name: 'Speed Learner',
    description: 'Complete 10 topics in one week',
    rarity: 'rare',
    earned: false,
    earnedDate: null,
  },
  {
    id: 'ach-night-owl',
    emoji: '🦉',
    name: 'Night Owl',
    description: 'Study after 10 PM for 5 consecutive days',
    rarity: 'common',
    earned: false,
    earnedDate: null,
  },
];

const rarityStyle: Record<string, string> = {
  legendary: 'badge-legendary',
  epic: 'badge-epic',
  rare: 'badge-rare',
  common: 'badge-common',
};

const rarityLabel: Record<string, string> = {
  legendary: 'Legendary',
  epic: 'Epic',
  rare: 'Rare',
  common: 'Common',
};

export default function AchievementsBadges() {
  const earned = achievements.filter((a) => a.earned).length;

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-foreground mb-0.5">Achievements</h3>
          <p className="text-xs text-muted-foreground">
            {earned}/{achievements.length} unlocked
          </p>
        </div>
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
          style={{ background: 'rgba(251,191,36,0.12)' }}
        >
          <Trophy size={14} className="text-neon-amber" />
          <span className="text-xs font-bold text-neon-amber">{earned} badges</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {achievements.map((ach) => (
          <div
            key={ach.id}
            className={`p-4 rounded-xl border flex flex-col items-center text-center gap-2 transition-all duration-200 ${
              ach.earned
                ? 'border-border hover:border-primary/40 glass-card-hover'
                : 'border-border opacity-40'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl relative ${
                ach.earned ? rarityStyle[ach.rarity] : ''
              }`}
              style={!ach.earned ? { background: 'rgba(42,42,69,0.5)' } : undefined}
            >
              {ach.earned ? ach.emoji : <Lock size={18} className="text-muted-foreground" />}
            </div>
            <div>
              <p className="text-xs font-bold text-foreground mb-0.5">{ach.name}</p>
              <p className="text-xs text-muted-foreground leading-tight">{ach.description}</p>
            </div>
            <div>
              {ach.earned ? (
                <span className="text-xs font-mono text-muted-foreground">{ach.earnedDate}</span>
              ) : (
                <span className="text-xs text-muted-foreground italic">Locked</span>
              )}
            </div>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                ach.rarity === 'legendary'
                  ? 'text-neon-amber bg-amber-500/10'
                  : ach.rarity === 'epic'
                    ? 'text-neon-violet bg-primary/10'
                    : ach.rarity === 'rare'
                      ? 'text-neon-cyan bg-accent/10'
                      : 'text-neon-green bg-green-500/10'
              }`}
            >
              {rarityLabel[ach.rarity]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
