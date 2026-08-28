'use client';

import React, { useState } from 'react';

// Generate 52 weeks of mock study data
const generateHeatmapData = () => {
  const weeks: {
    id: string;
    days: {
      id: string;
      date: string;
      hours: number;
      level: 0 | 1 | 2 | 3 | 4;
    }[];
  }[] = [];
  const today = new Date('2026-07-21');
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 364);

  // Seed pattern for realistic-looking data
  const streakPattern = [
    0, 0, 1, 2, 3, 2, 1, 0, 2, 3, 4, 3, 2, 3, 4, 2, 1, 0, 3, 4, 4, 3, 2, 1, 2, 3, 4, 3, 4, 4, 3, 4,
    4, 3, 2, 3, 4, 3, 4, 4, 4, 3, 4, 4, 3, 4, 4, 4, 4, 3, 4, 4,
  ];

  for (let w = 0; w < 52; w++) {
    const week: {
      id: string;
      days: {
        id: string;
        date: string;
        hours: number;
        level: 0 | 1 | 2 | 3 | 4;
      }[];
    } = { id: `week-${w}`, days: [] };
    for (let d = 0; d < 7; d++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + w * 7 + d);
      if (date > today) {
        week.days.push({
          id: `day-${w}-${d}`,
          date: date.toISOString().slice(0, 10),
          hours: 0,
          level: 0,
        });
        continue;
      }
      const baseLevel = streakPattern[w] as 0 | 1 | 2 | 3 | 4;
      const variation = d % 3 === 0 ? -1 : d % 2 === 0 ? 1 : 0;
      const level = Math.max(0, Math.min(4, baseLevel + variation)) as 0 | 1 | 2 | 3 | 4;
      const hours = level === 0 ? 0 : level === 1 ? 1 : level === 2 ? 2 : level === 3 ? 3 : 4;
      week.days.push({
        id: `day-${w}-${d}`,
        date: date.toISOString().slice(0, 10),
        hours,
        level,
      });
    }
    weeks.push(week);
  }
  return weeks;
};

const heatmapData = generateHeatmapData();

const levelColors: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: 'streak-cell-empty',
  1: 'streak-cell-partial',
  2: 'streak-cell-partial',
  3: 'streak-cell-active',
  4: 'streak-cell-active',
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const days = ['Mon', 'Wed', 'Fri'];

export default function StudyHeatmap() {
  const [hovered, setHovered] = useState<{
    date: string;
    hours: number;
  } | null>(null);

  const totalDays = heatmapData.flatMap((w) => w.days).filter((d) => d.hours > 0).length;
  const totalHours = heatmapData.flatMap((w) => w.days).reduce((s, d) => s + d.hours, 0);

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-foreground mb-0.5">
            Study Activity — Past 52 Weeks
          </h3>
          <p className="text-xs text-muted-foreground">
            <span className="text-neon-violet font-semibold">{totalDays} days</span> studied ·
            <span className="text-neon-cyan font-semibold ml-1">{totalHours}h</span> total
            {hovered && (
              <span className="ml-3 text-foreground">
                {hovered.date}: {hovered.hours}h studied
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span>Less</span>
          {([0, 1, 2, 3, 4] as const).map((level) => (
            <div
              key={`legend-${level}`}
              className={`w-3.5 h-3.5 rounded-sm ${levelColors[level]}`}
            />
          ))}
          <span>More</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {/* Day labels */}
          <div className="flex flex-col gap-1 mr-1 justify-around">
            {days.map((d) => (
              <span
                key={`daylabel-${d}`}
                className="text-xs text-muted-foreground h-3 flex items-center"
              >
                {d}
              </span>
            ))}
          </div>

          {/* Weeks */}
          {heatmapData.map((week) => (
            <div key={week.id} className="flex flex-col gap-1">
              {week.days.map((day) => (
                <div
                  key={day.id}
                  className={`w-3.5 h-3.5 rounded-sm cursor-pointer transition-all duration-150 hover:ring-1 hover:ring-primary/60 ${levelColors[day.level]}`}
                  onMouseEnter={() =>
                    day.hours > 0 && setHovered({ date: day.date, hours: day.hours })
                  }
                  onMouseLeave={() => setHovered(null)}
                  title={`${day.date}: ${day.hours}h`}
                  aria-label={`${day.date}: ${day.hours} hours studied`}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Month labels */}
        <div className="flex gap-1 mt-1 ml-6 min-w-max">
          {months.map((m, i) => (
            <div
              key={`monthlabel-${m}`}
              className="text-xs text-muted-foreground"
              style={{ width: `${(i < 7 ? 4 : 5) * 16}px` }}
            >
              {m}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
