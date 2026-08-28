'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { Flame, Zap, Target, TrendingUp } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';

const floatingStats = [
  {
    id: 'fstat-streak',
    icon: Flame,
    value: '47 days',
    label: 'Current Streak',
    color: 'text-neon-amber',
    bg: 'rgba(251,191,36,0.15)',
  },
  {
    id: 'fstat-xp',
    icon: Zap,
    value: '4,820 XP',
    label: 'Experience Points',
    color: 'text-neon-violet',
    bg: 'rgba(124,58,237,0.15)',
  },
  {
    id: 'fstat-goal',
    icon: Target,
    value: '73%',
    label: 'Roadmap Complete',
    color: 'text-neon-cyan',
    bg: 'rgba(6,182,212,0.15)',
  },
  {
    id: 'fstat-ready',
    icon: TrendingUp,
    value: '89%',
    label: 'Job Readiness',
    color: 'text-neon-green',
    bg: 'rgba(52,211,153,0.15)',
  },
];

const roadmapNodes = [
  { id: 'node-python', label: 'Python', x: 20, y: 15, status: 'completed' },
  { id: 'node-ml', label: 'ML Basics', x: 55, y: 10, status: 'completed' },
  { id: 'node-numpy', label: 'NumPy', x: 20, y: 38, status: 'completed' },
  { id: 'node-pandas', label: 'Pandas', x: 55, y: 35, status: 'active' },
  { id: 'node-sklearn', label: 'Sklearn', x: 80, y: 22, status: 'active' },
  { id: 'node-dl', label: 'Deep Learning', x: 35, y: 60, status: 'locked' },
  { id: 'node-pytorch', label: 'PyTorch', x: 70, y: 58, status: 'locked' },
  { id: 'node-nlp', label: 'NLP', x: 20, y: 80, status: 'locked' },
  { id: 'node-cv', label: 'Computer Vision', x: 60, y: 80, status: 'locked' },
];

export default function AuthBrandPanel() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div
      className="hidden lg:flex lg:w-[520px] xl:w-[600px] flex-col relative overflow-hidden border-r border-border"
      style={{
        background: 'linear-gradient(160deg, rgba(18,18,31,0.98) 0%, rgba(10,10,15,0.98) 100%)',
      }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 30% 30%, rgba(124,58,237,0.12) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-80 h-80"
          style={{
            background: 'radial-gradient(ellipse, rgba(6,182,212,0.08) 0%, transparent 70%)',
          }}
        />
      </div>
      <div className="relative z-10 flex flex-col h-full p-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 mb-12">
          <AppLogo size={36} />
          <span className="font-bold text-xl tracking-tight text-foreground">
            AI<span className="text-gradient-violet">PathFinder</span>
          </span>
        </Link>

        {/* Headline */}
        <div className="mb-8">
          <h2 className="text-3xl xl:text-4xl font-extrabold text-foreground leading-tight mb-3">
            Your career roadmap,
            <br />
            <span className="text-gradient-violet">built by AI.</span>
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
            Join 50,000+ learners who used AI PathFinder to land jobs at Google, Amazon, Razorpay,
            Canva, and more.
          </p>
        </div>

        {/* Roadmap preview */}
        <div className="glass-card p-5 mb-6 flex-1 max-h-56 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              AI Engineer Roadmap Preview
            </span>
            <span className="text-xs font-mono text-neon-violet">73% complete</span>
          </div>
          {/* Mini node graph */}
          <div className="relative h-36">
            <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
              {/* Connections */}
              <line
                x1="20%"
                y1="22%"
                x2="55%"
                y2="17%"
                stroke="rgba(124,58,237,0.3)"
                strokeWidth="1"
                strokeDasharray="3 2"
              />
              <line
                x1="20%"
                y1="22%"
                x2="20%"
                y2="45%"
                stroke="rgba(124,58,237,0.3)"
                strokeWidth="1"
                strokeDasharray="3 2"
              />
              <line
                x1="55%"
                y1="17%"
                x2="80%"
                y2="29%"
                stroke="rgba(6,182,212,0.3)"
                strokeWidth="1"
                strokeDasharray="3 2"
              />
              <line
                x1="55%"
                y1="42%"
                x2="35%"
                y2="67%"
                stroke="rgba(42,42,69,0.6)"
                strokeWidth="1"
                strokeDasharray="3 2"
              />
              <line
                x1="80%"
                y1="29%"
                x2="70%"
                y2="65%"
                stroke="rgba(42,42,69,0.6)"
                strokeWidth="1"
                strokeDasharray="3 2"
              />
            </svg>
            {roadmapNodes?.map((node) => (
              <div
                key={node?.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  node?.status === 'completed'
                    ? 'node-completed text-white'
                    : node?.status === 'active'
                      ? 'node-available text-neon-violet'
                      : 'node-locked text-muted-foreground'
                }`}
                style={{ left: `${node?.x}%`, top: `${node?.y}%` }}
              >
                {node?.label}
              </div>
            ))}
          </div>
        </div>

        {/* Floating stats */}
        <div className="grid grid-cols-2 gap-3">
          {floatingStats?.map((stat) => {
            const Icon = stat?.icon;
            return (
              <div key={stat?.id} className="glass-card p-4 flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: stat?.bg }}
                >
                  <Icon className={stat?.color} size={18} />
                </div>
                <div>
                  <div className={`text-base font-bold font-mono tabular-nums ${stat?.color}`}>
                    {stat?.value}
                  </div>
                  <div className="text-xs text-muted-foreground">{stat?.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
