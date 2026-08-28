'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import {
  LayoutDashboard,
  Target,
  Map,
  BookOpen,
  Brain,
  Briefcase,
  FileText,
  BarChart3,
  Trophy,
  Settings,
  ChevronLeft,
  ChevronRight,
  Flame,
  Zap,
  Bell,
  LogOut,
} from 'lucide-react';
import Icon from '@/components/ui/AppIcon';

const navGroups = [
  {
    label: 'OVERVIEW',
    items: [
      {
        id: 'nav-dashboard',
        href: '/daily-progress-dashboard',
        icon: LayoutDashboard,
        label: 'Dashboard',
        badge: null,
      },
      {
        id: 'nav-goal',
        href: '/daily-progress-dashboard',
        icon: Target,
        label: 'My Goal',
        badge: null,
      },
    ],
  },
  {
    label: 'LEARNING',
    items: [
      {
        id: 'nav-roadmap',
        href: '/daily-progress-dashboard',
        icon: Map,
        label: 'Roadmap',
        badge: null,
      },
      {
        id: 'nav-resources',
        href: '/daily-progress-dashboard',
        icon: BookOpen,
        label: 'Resources',
        badge: '12',
      },
      {
        id: 'nav-projects',
        href: '/daily-progress-dashboard',
        icon: Brain,
        label: 'Projects',
        badge: null,
      },
    ],
  },
  {
    label: 'CAREER',
    items: [
      {
        id: 'nav-jobs',
        href: '/daily-progress-dashboard',
        icon: Briefcase,
        label: 'Job Matcher',
        badge: '5',
      },
      {
        id: 'nav-resume',
        href: '/daily-progress-dashboard',
        icon: FileText,
        label: 'Resume Builder',
        badge: null,
      },
    ],
  },
  {
    label: 'INSIGHTS',
    items: [
      {
        id: 'nav-analytics',
        href: '/daily-progress-dashboard',
        icon: BarChart3,
        label: 'Analytics',
        badge: null,
      },
      {
        id: 'nav-achievements',
        href: '/daily-progress-dashboard',
        icon: Trophy,
        label: 'Achievements',
        badge: '3',
      },
    ],
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className="relative flex flex-col h-full border-r border-border z-20 transition-all duration-300 ease-in-out"
      style={{
        width: collapsed ? '72px' : '240px',
        background: 'linear-gradient(180deg, rgba(18,18,31,0.98) 0%, rgba(10,10,15,0.98) 100%)',
      }}
    >
      {/* Logo */}
      <div
        className={`flex items-center gap-3 px-4 py-5 border-b border-border ${collapsed ? 'justify-center px-0' : ''}`}
      >
        <AppLogo size={32} />
        {!collapsed && (
          <span className="font-bold text-base tracking-tight text-foreground truncate">
            PathFinder
          </span>
        )}
      </div>
      {/* User Streak + XP mini */}
      {!collapsed && (
        <div className="mx-3 mt-3 mb-1 p-3 rounded-xl glass-card">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-neon-amber" />
              <span className="text-xs font-semibold text-neon-amber font-mono">47 day streak</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-neon-violet" />
              <span className="text-xs font-mono text-neon-violet">4,820 XP</span>
            </div>
          </div>
          <div className="progress-track h-1.5 w-full">
            <div className="xp-bar-fill h-full rounded-full" style={{ width: '68%' }} />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-muted-foreground">Level 12</span>
            <span className="text-xs text-muted-foreground">5,000 XP next</span>
          </div>
        </div>
      )}
      {collapsed && (
        <div className="flex flex-col items-center gap-2 py-3 border-b border-border">
          <div
            className="flex items-center justify-center w-9 h-9 rounded-lg"
            style={{ background: 'rgba(251,191,36,0.1)' }}
          >
            <Flame className="w-4 h-4 text-neon-amber" />
          </div>
          <span className="text-xs font-mono text-neon-amber">47</span>
        </div>
      )}
      {/* Nav Groups */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {navGroups?.map((group) => (
          <div key={`group-${group?.label}`}>
            {!collapsed && (
              <p className="text-xs font-semibold tracking-widest text-muted-foreground px-2 mb-1.5 uppercase">
                {group?.label}
              </p>
            )}
            <ul className="space-y-0.5">
              {group?.items?.map((item) => {
                const isActive = pathname === item?.href;
                const Icon = item?.icon;
                return (
                  <li key={item?.id}>
                    <Link
                      href={item?.href}
                      title={collapsed ? item?.label : undefined}
                      className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                        ${
                          isActive
                            ? 'sidebar-item-active text-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }
                        ${collapsed ? 'justify-center px-0 mx-1' : ''}
                      `}
                    >
                      <Icon
                        className={`w-4.5 h-4.5 flex-shrink-0 ${isActive ? 'text-primary' : ''}`}
                        size={18}
                      />
                      {!collapsed && <span className="flex-1 truncate">{item?.label}</span>}
                      {!collapsed && item?.badge && (
                        <span className="text-xs font-mono px-1.5 py-0.5 rounded-full bg-primary/20 text-neon-violet">
                          {item?.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      {/* Bottom Actions */}
      <div className="border-t border-border p-3 space-y-1">
        <Link
          href="/daily-progress-dashboard"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 ${collapsed ? 'justify-center px-0 mx-1' : ''}`}
          title={collapsed ? 'Notifications' : undefined}
        >
          <Bell size={18} />
          {!collapsed && <span>Notifications</span>}
          {!collapsed && (
            <span className="ml-auto text-xs font-mono px-1.5 py-0.5 rounded-full bg-neon-pink/20 text-neon-pink">
              2
            </span>
          )}
        </Link>
        <Link
          href="/daily-progress-dashboard"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 ${collapsed ? 'justify-center px-0 mx-1' : ''}`}
          title={collapsed ? 'Settings' : undefined}
        >
          <Settings size={18} />
          {!collapsed && <span>Settings</span>}
        </Link>

        {/* User Profile */}
        <div
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mt-2 ${collapsed ? 'justify-center px-0 mx-1' : ''}`}
        >
          <div
            className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)' }}
          >
            AK
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">Arjun Kumar</p>
              <p className="text-xs text-muted-foreground truncate">AI Engineer track</p>
            </div>
          )}
          {!collapsed && (
            <button
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="Sign out"
            >
              <LogOut size={15} />
            </button>
          )}
        </div>
      </div>
      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-all duration-200 z-30"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}
