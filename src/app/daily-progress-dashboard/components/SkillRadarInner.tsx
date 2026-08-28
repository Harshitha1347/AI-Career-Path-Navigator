'use client';

import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const skillData = [
  { skill: 'Python', current: 88, target: 95 },
  { skill: 'ML Theory', current: 72, target: 90 },
  { skill: 'Deep Learning', current: 65, target: 85 },
  { skill: 'NLP', current: 58, target: 80 },
  { skill: 'MLOps', current: 42, target: 75 },
  { skill: 'Math/Stats', current: 70, target: 85 },
  { skill: 'System Design', current: 55, target: 80 },
  { skill: 'Data Eng.', current: 63, target: 78 },
];

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: { skill: string } }>;
}) => {
  if (!active || !payload?.length) return null;
  const skill = payload[0].payload.skill;
  const current = payload[0].value;
  const target = payload[1]?.value;
  return (
    <div className="glass-card border border-border px-3 py-2 text-xs shadow-lg">
      <p className="font-bold text-foreground mb-1">{skill}</p>
      <p className="text-neon-violet">
        Current: <span className="font-mono">{current}%</span>
      </p>
      {target && (
        <p className="text-muted-foreground">
          Target: <span className="font-mono">{target}%</span>
        </p>
      )}
    </div>
  );
};

export default function SkillRadarInner() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-foreground mb-0.5">Skill Radar</h3>
          <p className="text-xs text-muted-foreground">
            Current proficiency vs target for AI Engineer role
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm" style={{ background: 'rgba(124,58,237,0.6)' }} />
            <span className="text-muted-foreground">Current</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm" style={{ background: 'rgba(6,182,212,0.4)' }} />
            <span className="text-muted-foreground">Target</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <RadarChart data={skillData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
          <PolarGrid stroke="var(--border)" strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="skill"
            tick={{
              fill: 'var(--muted-foreground)',
              fontSize: 11,
              fontFamily: 'var(--font-sans)',
            }}
          />
          <Radar
            name="Target"
            dataKey="target"
            stroke="var(--accent)"
            fill="var(--accent)"
            fillOpacity={0.1}
            strokeWidth={1}
            strokeDasharray="4 2"
          />
          <Radar
            name="Current"
            dataKey="current"
            stroke="var(--primary)"
            fill="var(--primary)"
            fillOpacity={0.25}
            strokeWidth={2}
          />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>

      {/* Weak area callout */}
      <div
        className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg border border-amber-500/20"
        style={{ background: 'rgba(251,191,36,0.05)' }}
      >
        <span className="text-xs text-neon-amber">⚠</span>
        <p className="text-xs text-muted-foreground">
          <span className="text-neon-amber font-semibold">MLOps (42%)</span> is your weakest skill —
          3 topics scheduled this week to close the gap.
        </p>
      </div>
    </div>
  );
}
