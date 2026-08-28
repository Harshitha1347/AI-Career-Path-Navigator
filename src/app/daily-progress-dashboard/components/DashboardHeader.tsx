'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Sparkles, Bell, Calendar } from 'lucide-react';

interface Profile {
  name: string;
}

interface Progress {
  streak: number;
}

export default function DashboardHeader() {
  const [userName, setUserName] = useState('User');
  const [streak, setStreak] = useState(0);
  const [todayTopics, setTodayTopics] = useState(0);

  useEffect(() => {
    async function loadDashboard() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      // Load profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('name')
        .eq('id', user.id)
        .single();

      if (profile) {
        setUserName(profile.name);
      }

      // Load progress
      const { data: progress } = await supabase
        .from('user_progress')
        .select('streak')
        .eq('user_id', user.id)
        .single();

      if (progress) {
        setStreak(progress.streak);
      }

      // Temporary value
      setTodayTopics(4);
    }

    loadDashboard();
  }, []);

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Sparkles size={16} className="text-neon-violet" />

          <span className="text-sm font-medium text-neon-violet">{today}</span>
        </div>

        <h1 className="text-2xl font-extrabold mb-1">Good morning, {userName} 👋</h1>

        <p className="text-sm text-muted-foreground">
          You have
          <span className="text-neon-cyan font-semibold"> {todayTopics} topics</span> scheduled
          today.
          <br />
          Current streak:
          <span className="text-orange-400 font-semibold"> {streak} days 🔥</span>
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative w-9 h-9 rounded-xl glass-card flex items-center justify-center border border-border">
          <Bell size={16} />

          <span
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs text-white flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg,#7C3AED,#06B6D4)',
            }}
          >
            0
          </span>
        </button>

        <button className="flex items-center gap-2 px-4 py-2 rounded-xl glass-card border border-border">
          <Calendar size={15} />
          View Schedule
        </button>
      </div>
    </div>
  );
}
