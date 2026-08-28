import React from 'react';
import { UserPlus, Brain, Map, TrendingUp, Briefcase } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';

const steps = [
  {
    id: 'step-signup',
    number: '01',
    icon: UserPlus,
    title: 'Sign Up & Set Your Goal',
    description:
      'Create your account and tell the AI what you want to become. No judgment — any career goal is valid.',
    color: 'text-neon-violet',
    bg: 'rgba(124,58,237,0.15)',
  },
  {
    id: 'step-interview',
    number: '02',
    icon: Brain,
    title: 'AI Interviews You',
    description:
      'Answer 15 smart questions about your background, current skills, timeline, and learning preferences.',
    color: 'text-neon-cyan',
    bg: 'rgba(6,182,212,0.15)',
  },
  {
    id: 'step-roadmap',
    number: '03',
    icon: Map,
    title: 'Get Your Personalized Roadmap',
    description:
      'Your AI-generated roadmap appears — with stages, topics, resources, projects, and milestones custom to you.',
    color: 'text-neon-green',
    bg: 'rgba(52,211,153,0.15)',
  },
  {
    id: 'step-progress',
    number: '04',
    icon: TrendingUp,
    title: 'Track Daily Progress',
    description:
      'Check in daily, complete topics, maintain your streak, earn XP, and watch your skill radar grow.',
    color: 'text-neon-pink',
    bg: 'rgba(244,114,182,0.15)',
  },
  {
    id: 'step-job',
    number: '05',
    icon: Briefcase,
    title: 'Land Your Dream Job',
    description:
      'When job-ready, use the resume builder and job matcher to apply to companies hiring for your exact skill set.',
    color: 'text-neon-amber',
    bg: 'rgba(251,191,36,0.15)',
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 px-6 lg:px-8 xl:px-10">
      <div className="max-w-screen-2xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
            How It <span className="text-gradient-cyan">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            From goal to job offer in 5 structured steps — guided by AI every step of the way.
          </p>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div
            className="hidden lg:block absolute top-16 left-0 right-0 h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(124,58,237,0.4), rgba(6,182,212,0.4), transparent)',
            }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps?.map((step) => {
              const Icon = step?.icon;
              return (
                <div key={step?.id} className="flex flex-col items-center text-center gap-4 group">
                  <div className="relative">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: step?.bg,
                        border: `1px solid ${step?.bg}`,
                      }}
                    >
                      <Icon className={step?.color} size={26} />
                    </div>
                    <div
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono text-white"
                      style={{
                        background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
                      }}
                    >
                      {step?.number?.slice(1)}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground mb-2">{step?.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {step?.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
