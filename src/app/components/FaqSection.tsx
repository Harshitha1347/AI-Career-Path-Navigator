'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    id: 'faq-how-personalized',
    q: 'How personalized is the AI roadmap?',
    a: 'Extremely. Before generating your roadmap, our AI interviews you with 15+ questions covering your current education, skills, available daily hours, budget, target companies, preferred learning style, and deadline. The result is a roadmap built specifically for you — not a generic template.',
  },
  {
    id: 'faq-careers',
    q: 'Which career paths does AI PathFinder support?',
    a: 'We support 240+ career paths including Software Engineering, AI/ML, Data Science, Product Management, UI/UX Design, Cloud Architecture, Cybersecurity, Game Development, DevOps, Blockchain, and non-tech careers like IAS Officer, Doctor, Entrepreneur, and more.',
  },
  {
    id: 'faq-no-experience',
    q: 'Can I use this with zero experience?',
    a: "Absolutely. The AI interview identifies your starting point and builds a roadmap from the very beginning. Whether you're a high school student, career switcher, or experienced professional, the roadmap adapts to where you are.",
  },
  {
    id: 'faq-ai-mentor',
    q: 'How does the AI mentor work?',
    a: 'The AI mentor is a 24/7 chat assistant powered by GPT-4o with memory of your full learning context. It can help with coding questions, explain concepts, review your projects, prepare you for interviews, and even motivate you on tough days.',
  },
  {
    id: 'faq-job-match',
    q: 'How accurate is the job matching?',
    a: "The job matcher compares your current skill set against real job requirements and shows a match percentage. It also highlights exactly which skills you're missing and estimates how long it will take to acquire them — so you can prioritize effectively.",
  },
  {
    id: 'faq-cancel',
    q: 'Can I cancel anytime?',
    a: 'Yes. No contracts, no hidden fees. Cancel your subscription anytime from your account settings. Your roadmap data and progress are retained for 12 months after cancellation.',
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<string | null>('faq-how-personalized');

  return (
    <section id="faq" className="py-24 px-6 lg:px-8 xl:px-10">
      <div className="max-w-screen-2xl mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-foreground mb-4">
              Frequently Asked <span className="text-gradient-cyan">Questions</span>
            </h2>
          </div>

          <div className="space-y-3">
            {faqs?.map((faq) => {
              const isOpen = open === faq?.id;
              return (
                <div
                  key={faq?.id}
                  className={`glass-card border transition-all duration-300 ${isOpen ? 'border-primary/40' : 'border-border'}`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : faq?.id)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-semibold text-foreground">{faq?.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-muted-foreground flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5">
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq?.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
