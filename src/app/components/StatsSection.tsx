'use client';

import React, { useEffect, useRef, useState } from 'react';

const stats = [
  {
    id: 'stat-roadmaps',
    value: 52847,
    label: 'Roadmaps Generated',
    suffix: '+',
    color: 'text-neon-violet',
  },
  {
    id: 'stat-careers',
    value: 240,
    label: 'Career Paths',
    suffix: '+',
    color: 'text-neon-cyan',
  },
  {
    id: 'stat-placement',
    value: 94,
    label: 'Job Placement Rate',
    suffix: '%',
    color: 'text-neon-green',
  },
  {
    id: 'stat-mentors',
    value: 24,
    label: 'Hours AI Mentor Support',
    suffix: '/7',
    color: 'text-neon-amber',
  },
];

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

function StatCard({ stat, active }: { stat: (typeof stats)[0]; active: boolean }) {
  const count = useCountUp(stat.value, 1800, active);
  return (
    <div className="glass-card glass-card-hover p-8 text-center flex flex-col items-center gap-3">
      <div className={`text-5xl font-extrabold font-mono tabular-nums ${stat.color}`}>
        {count.toLocaleString()}
        {stat.suffix}
      </div>
      <div className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
        {stat.label}
      </div>
    </div>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 px-6 lg:px-8 xl:px-10">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <StatCard key={stat.id} stat={stat} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
