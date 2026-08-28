import React from 'react';
import AppLayout from '@/components/AppLayout';
import DashboardHeader from './components/DashboardHeader';
import MetricsBentoGrid from './components/MetricsBentoGrid';
import TodayTaskList from './components/TodayTaskList';
import SkillRadarChart from './components/SkillRadarChart';
import StudyHeatmap from './components/StudyHeatmap';
import AchievementsBadges from './components/AchievementsBadges';
import ActivityFeed from './components/ActivityFeed';
import AIMentorFab from './components/AIMentorFab';

export default function DailyProgressDashboard() {
  return (
    <AppLayout>
      <div className="min-h-screen gradient-mesh-bg">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16 py-8">
          <DashboardHeader />

          {/* Bento Grid KPIs */}
          <MetricsBentoGrid />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {/* Left Column -Today's Tasks */}
            <div className="lg:col-span-2 xl:col-span-2 space-y-6">
              <TodayTaskList />
              <AchievementsBadges />
            </div>

            {/* Right Column - Charts */}
            <div className="lg:col-span-1 xl:col-span-2 space-y-6">
              <SkillRadarChart />
              <ActivityFeed />
            </div>
          </div>

          {/* Heatmap full width */}
          <div className="mt-6">
            <StudyHeatmap />
          </div>
        </div>
      </div>
      <AIMentorFab />
    </AppLayout>
  );
}
