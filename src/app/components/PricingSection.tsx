'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, Zap, Crown, Sparkles } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';

const plans = [
  {
    id: 'plan-free',
    name: 'Explorer',
    price: { monthly: 0, annual: 0 },
    description: 'Start your journey with AI-generated roadmaps.',
    icon: Zap,
    iconColor: 'text-neon-green',
    iconBg: 'rgba(52,211,153,0.15)',
    features: [
      '1 active career roadmap',
      'AI interview (basic, 8 questions)',
      'Beginner stage unlocked',
      '5 AI mentor messages/day',
      'Basic progress tracking',
      'Community access',
    ],
    missing: ['Advanced stages', 'Resume builder', 'Job matcher', 'Portfolio builder'],
    cta: 'Start Free',
    href: '/sign-up-login-screen',
    highlight: false,
    badge: null,
  },
  {
    id: 'plan-pro',
    name: 'Pathfinder Pro',
    price: { monthly: 19, annual: 15 },
    description: 'Full roadmap access with AI mentor and career tools.',
    icon: Sparkles,
    iconColor: 'text-neon-violet',
    iconBg: 'rgba(124,58,237,0.15)',
    features: [
      '3 active career roadmaps',
      'Full AI interview (15+ questions)',
      'All 4 stages unlocked',
      'Unlimited AI mentor chat',
      'Skill radar & analytics',
      'Resume builder (ATS)',
      'Job matcher (25 matches/month)',
      'Study planner & schedules',
      'Weekly progress reports',
    ],
    missing: [],
    cta: 'Start Pro — $19/mo',
    href: '/sign-up-login-screen',
    highlight: true,
    badge: 'Most Popular',
  },
  {
    id: 'plan-elite',
    name: 'Career Elite',
    price: { monthly: 49, annual: 39 },
    description: 'Everything — plus 1:1 coaching and priority AI.',
    icon: Crown,
    iconColor: 'text-neon-amber',
    iconBg: 'rgba(251,191,36,0.15)',
    features: [
      'Unlimited roadmaps',
      'Priority GPT-4o AI mentor',
      'Mock interview simulator',
      'Portfolio builder + deployment',
      'Unlimited job matching',
      'LinkedIn profile optimizer',
      'Certification roadmap',
      'Career coach review (2x/month)',
      'Salary negotiation guide',
      'Referral network access',
    ],
    missing: [],
    cta: 'Go Elite — $49/mo',
    href: '/sign-up-login-screen',
    highlight: false,
    badge: 'Best Value',
  },
];

export default function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-24 px-6 lg:px-8 xl:px-10">
      <div className="max-w-screen-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
            Invest in Your <span className="text-gradient-violet">Future</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            One platform. Every tool you need to go from beginner to employed.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 glass-card rounded-full px-2 py-1.5">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${!annual ? 'bg-primary text-white' : 'text-muted-foreground'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${annual ? 'bg-primary text-white' : 'text-muted-foreground'}`}
            >
              Annual
              <span className="ml-2 text-xs text-neon-green font-semibold">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans?.map((plan) => {
            const Icon = plan?.icon;
            const price = annual ? plan?.price?.annual : plan?.price?.monthly;
            return (
              <div
                key={plan?.id}
                className={`relative glass-card p-8 flex flex-col gap-6 transition-all duration-300 ${
                  plan?.highlight
                    ? 'neon-glow-violet border-primary/50 scale-105'
                    : 'glass-card-hover'
                }`}
              >
                {plan?.badge && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white"
                    style={{
                      background: plan?.highlight
                        ? 'linear-gradient(135deg, #7C3AED, #06B6D4)'
                        : 'linear-gradient(135deg, #FBBF24, #D97706)',
                    }}
                  >
                    {plan?.badge}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: plan?.iconBg }}
                    >
                      <Icon className={plan?.iconColor} size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{plan?.name}</h3>
                  </div>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-5xl font-extrabold font-mono text-foreground tabular-nums">
                      ${price}
                    </span>
                    {price > 0 && <span className="text-muted-foreground text-sm">/month</span>}
                    {price === 0 && <span className="text-muted-foreground text-sm">forever</span>}
                  </div>
                  <p className="text-sm text-muted-foreground">{plan?.description}</p>
                </div>
                <ul className="space-y-2.5 flex-1">
                  {plan?.features?.map((feat) => (
                    <li
                      key={`${plan?.id}-feat-${feat}`}
                      className="flex items-start gap-2.5 text-sm text-foreground"
                    >
                      <Check size={16} className="text-neon-green flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan?.href}
                  className={`block text-center py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95 ${
                    plan?.highlight
                      ? 'text-white neon-glow-violet'
                      : 'glass-card border border-border text-foreground hover:border-primary/40'
                  }`}
                  style={
                    plan?.highlight
                      ? {
                          background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
                        }
                      : undefined
                  }
                >
                  {plan?.cta}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
