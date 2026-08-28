'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

import {
  Flame,
  Zap,
  Target,
  Clock,
  Trophy,
  TrendingUp,
  Briefcase,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';



export default function MetricsBentoGrid() {
  const [progress, setProgress] = useState({
    current_goal: '',
    streak: 0,
    xp: 0,
    roadmap_progress: 0,
    stage: '',
    topics_done: 0,
    total_topics: 0,
    completion_days: 0,
    today_hours: 0,
    daily_target: 3,
    weekly_done: 0,
    weekly_target: 5,
    achievements: 0,
    job_readiness: 0,
  });
  const [weeklyGoalTopics, setWeeklyGoalTopics] = useState<
  { id: string; label: string; done: boolean }[]
>([]);

  useEffect(() => {
  async function loadData() {
    try {
      // Get the latest AI-generated roadmap from localStorage
      const storedGoal = localStorage.getItem('goal');
      const storedRoadmap = localStorage.getItem('roadmap');
      
if (storedRoadmap) {
  try {
    const roadmap = JSON.parse(storedRoadmap);

    console.log('AI Roadmap:', roadmap);

    if (Array.isArray(roadmap)) {
      const topics = roadmap.slice(0, 5).map((topic: string, index: number) => ({
        id: `roadmap-${index}`,
        label: topic,
        done: index < 2,
      }));

      setWeeklyGoalTopics(topics);
    }
  } catch (error) {
    console.error('Failed to parse roadmap:', error);
  }
}

      console.log('Latest stored goal:', storedGoal);
      console.log('Latest stored roadmap:', storedRoadmap);

      // First show the latest generated goal immediately
      if (storedGoal) {
        setProgress((prev) => ({
          ...prev,
          current_goal: storedGoal,
        }));
      }

      // Get logged-in user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        console.log('No logged in user');
        return;
      }

      // Get saved progress from Supabase
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Supabase error:', error);
        return;
      }

      if (data) {
        setProgress((prev) => ({
          ...prev,
          ...data,

          // IMPORTANT:
          // Always prefer the latest generated goal
          current_goal: storedGoal || data.current_goal || '',
        }));
      }
    } catch (error) {
      console.error('Dashboard loading error:', error);
    }
  }

  loadData();
}, []);
  const today_hours = progress.today_hours;
  const dailyTarget = 3;
  const hoursPercent = Math.min((today_hours / dailyTarget) * 100, 100);
  return (
    <div
      className="grid
     grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4"
    >
      {/* Hero Card: Current Goal — spans 2 cols */}
      <div className="sm:col-span-2 lg:col-span-2 glass-card p-6 relative overflow-hidden group hover:border-primary/40 transition-all duration-300">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 20% 50%, rgba(124,58,237,0.12) 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-1">
                Current Goal
              </p>
              <h2 className="text-3xl font-bold text-white mt-2">
                {progress.current_goal || 'No Goal Selected'}
              </h2>
            </div>
            <span
              className="px-3 py-1 rounded-full text-xs font-bold text-white flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
              }}
            >
              Active
            </span>
          </div>

          {/* Roadmap progress */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-muted-foreground">Overall Roadmap Progress</span>
              <span className="text-sm font-bold font-mono text-neon-violet tabular-nums">
                {progress.roadmap_progress}%
              </span>
            </div>
            <div className="progress-track h-2.5 w-full">
              <div
                className="xp-bar-fill h-full rounded-full transition-all duration-700"
                style={{
                  width: `${progress.roadmap_progress}%`,
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-lg font-bold font-mono text-neon-cyan tabular-nums">
                {progress.stage}
              </div>
              <div className="text-xs text-muted-foreground">Advanced</div>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <div className="text-lg font-bold font-mono text-foreground tabular-nums">
                {progress.topics_done}/{progress.total_topics}
              </div>
              <div className="text-xs text-muted-foreground">Topics Done</div>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <div className="text-lg font-bold font-mono text-neon-green tabular-nums">
                ~{progress.completion_days}d
              </div>
              <div className="text-xs text-muted-foreground">To Completion</div>
            </div>
          </div>
        </div>
      </div>
      {/* Streak Card */}
      <div className="glass-card p-6 flex flex-col justify-between group hover:border-amber-500/30 transition-all duration-300 relative overflow-hidden">
        <div
          className="absolute bottom-0 right-0 w-24 h-24 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(251,191,36,0.08) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-1">
              Daily Streak
            </p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl font-extrabold font-mono text-neon-amber tabular-nums">
                {progress.streak}
              </span>
              <span className="text-lg text-muted-foreground">days</span>
            </div>
          </div>
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(251,191,36,0.15)' }}
          >
            <Flame className="text-neon-amber" size={24} />
          </div>
        </div>
        <div>
          <div className="flex gap-1 mb-2">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S']?.map((day, i) => (
              <div key={`streak-day-${i}`} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={`w-full h-1.5 rounded-full ${i < 6 ? 'bg-neon-amber' : 'bg-border'}`}
                />
                <span className="text-xs text-muted-foreground">{day}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="text-neon-amber font-semibold">Best: 62 days</span> — keep pushing!
          </p>
        </div>
      </div>
      {/* XP / Level Card */}
      <div className="glass-card p-6 flex flex-col justify-between group hover:border-primary/40 transition-all duration-300 relative overflow-hidden">
        <div
          className="absolute bottom-0 right-0 w-24 h-24 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-1">
              XP Points
            </p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl font-extrabold font-mono text-neon-violet tabular-nums">
                {progress.xp}
              </span>
            </div>
          </div>
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(124,58,237,0.15)' }}
          >
            <Zap className="text-neon-violet" size={24} />
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1.5">
            <span className="text-xs font-semibold text-foreground">Level 12</span>
            <span className="text-xs text-muted-foreground font-mono">4,820 / 5,000 XP</span>
          </div>
          <div className="progress-track h-2">
            <div className="xp-bar-fill h-full rounded-full" style={{ width: '96.4%' }} />
          </div>
          <p className="text-xs text-muted-foreground mt-1.5">
            <span className="text-neon-violet font-semibold">180 XP</span> to Level 13 — so close!
          </p>
        </div>
      </div>
      {/* Today's Study Hours — warning state (behind target) */}
      <div className="glass-card p-6 flex flex-col justify-between relative overflow-hidden border-amber-500/20 hover:border-amber-500/40 transition-all duration-300">
        <div className="absolute top-3 right-3">
          <AlertTriangle size={14} className="text-neon-amber" />
        </div>
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs font-semibold tracking-widest ...">{"Today's Hours"}</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl font-extrabold font-mono text-neon-amber tabular-nums">
                1.5
              </span>
              <span className="text-lg text-muted-foreground">/ 3h</span>
            </div>
          </div>
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(251,191,36,0.12)' }}
          >
            <Clock className="text-neon-amber" size={24} />
          </div>
        </div>
        <div>
          <div className="progress-track h-2 mb-2">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${hoursPercent}%`,
                background: 'linear-gradient(90deg, #FBBF24, #F59E0B)',
              }}
            />
          </div>
          <p className="text-xs text-neon-amber">1.5h remaining to hit daily goal</p>
        </div>
      </div>
      {/* Weekly Goal */}
      <div className="glass-card p-6 flex flex-col justify-between hover:border-primary/40 transition-all duration-300">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-1">
              Weekly Goal
            </p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl font-extrabold font-mono text-neon-cyan tabular-nums">
  {weeklyGoalTopics.filter((topic) => topic.done).length}
</span>

<span className="text-lg text-muted-foreground">
  / {weeklyGoalTopics.length || 5} topics
</span>            </div>
          </div>
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(6,182,212,0.12)' }}
          >
            <Target className="text-neon-cyan" size={24} />
          </div>
        </div>
        <div className="space-y-1.5">
          {weeklyGoalTopics?.map((t) => (
            <div key={t?.id} className="flex items-center gap-2">
              <CheckCircle2 size={13} className={t?.done ? 'text-neon-green' : 'text-border'} />
              <span
                className={`text-xs ${t?.done ? 'text-foreground line-through opacity-60' : 'text-muted-foreground'}`}
              >
                {t?.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Achievements Count */}
      <div className="glass-card p-6 flex flex-col justify-between hover:border-amber-500/30 transition-all duration-300">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-1">
              Achievements
            </p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl font-extrabold font-mono text-neon-amber tabular-nums">
                24
              </span>
              <span className="text-lg text-muted-foreground">badges</span>
            </div>
          </div>
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(251,191,36,0.12)' }}
          >
            <Trophy className="text-neon-amber" size={24} />
          </div>
        </div>
        <div className="flex gap-1.5">
          {['🔥', '⚡', '🎯', '🏆', '💎']?.map((emoji, i) => (
            <div
              key={`badge-emoji-${i}`}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
              style={{
                background: 'rgba(251,191,36,0.1)',
                border: '1px solid rgba(251,191,36,0.2)',
              }}
            >
              {emoji}
            </div>
          ))}
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-muted-foreground"
            style={{
              background: 'rgba(42,42,69,0.5)',
              border: '1px solid var(--border)',
            }}
          >
            +19
          </div>
        </div>
      </div>
      {/* Job Readiness */}
      <div className="glass-card p-6 flex flex-col justify-between hover:border-neon-green/30 transition-all duration-300 relative overflow-hidden">
        <div
          className="absolute bottom-0 right-0 w-24 h-24 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(52,211,153,0.08) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-1">
              Job Readiness
            </p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl font-extrabold font-mono text-neon-green tabular-nums">
                {progress.job_readiness}%
              </span>
            </div>
          </div>
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(52,211,153,0.12)' }}
          >
            <Briefcase className="text-neon-green" size={24} />
          </div>
        </div>
        <div>
          <div className="progress-track h-2 mb-2">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: '89%',
                background: 'linear-gradient(90deg, #34D399, #059669)',
              }}
            />
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp size={12} className="text-neon-green" />
            <p className="text-xs text-neon-green font-medium">+4% this week</p>
          </div>
        </div>
      </div>
    </div>
  );
}
