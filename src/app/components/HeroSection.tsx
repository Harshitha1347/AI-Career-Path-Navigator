'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { ArrowRight, Sparkles, Play, ChevronRight } from 'lucide-react';

const goalExamples = [
  'Become an AI Engineer',
  'Become a Data Scientist',
  'Become a Product Manager',
  'Become a Full Stack Developer',
  'Become a UI/UX Designer',
  'Become a Cloud Architect',
  'Become a Cybersecurity Expert',
  'Become a Game Developer',
  'Become a Blockchain Developer',
  'Become an IAS Officer',
];

const headlineWords = ['Learn', 'Grow', 'Succeed'];

export default function HeroSection() {
  const [currentGoal, setCurrentGoal] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [headlineIdx, setHeadlineIdx] = useState(0);
  const router = useRouter();
  const typeEffect = useCallback(() => {
    const goal = goalExamples?.[currentGoal];
    if (!isDeleting) {
      if (displayText?.length < goal?.length) {
        setDisplayText(goal?.slice(0, displayText?.length + 1));
      } else {
        setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText?.length > 0) {
        setDisplayText(displayText?.slice(0, -1));
      } else {
        setIsDeleting(false);
        setCurrentGoal((prev) => (prev + 1) % goalExamples?.length);
      }
    }
  }, [displayText, isDeleting, currentGoal]);

  useEffect(() => {
    const timeout = setTimeout(typeEffect, isDeleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [typeEffect, isDeleting]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineIdx((prev) => (prev + 1) % headlineWords?.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  const generateRoadmap = async () => {
    if (!searchValue.trim()) {
      alert('Please enter your career goal');
      return;
    }

    try {
      const response = await fetch('/api/mentor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: searchValue,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.log(text);
        alert('Server Error');
        return;
      }
      
      const data = await response.json();
      
      const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) {
  alert('Please login first');
  return;
}
const { error } = await supabase
  .from('user_progress')
  .upsert({
    user_id: user.id,
    current_goal: data.goal,
    roadmap_progress: 0,
    streak: 0,
    xp: 0,
    job_readiness: 0,
    today_hours: 0,
    weekly_topics: data.roadmap.length,
  });

if (error) {
  console.warn('Roadmap Save Error:', error);
  alert(`Roadmap Save Error: ${error.message}`);
  return;
}
      console.log(data);

      console.log(data);

      localStorage.setItem('goal', data.goal);
      localStorage.setItem('roadmap', JSON.stringify(data.roadmap));
      localStorage.setItem('skills', JSON.stringify(data.skills));
      localStorage.setItem('projects', JSON.stringify(data.projects));
      localStorage.setItem('duration', data.duration);
      localStorage.setItem('level', data.level);

      router.push('/daily-progress-dashboard');
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 gradient-mesh-bg hero-grid-pattern">
      {/* Glow blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(6,182,212,0.1) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        aria-hidden="true"
      />
      {/* Badge */}
      <div className="mb-8 flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/30 animate-fade-in">
        <Sparkles size={14} className="text-neon-violet" />
        <span className="text-sm font-medium text-muted-foreground">
          Powered by <span className="text-neon-violet font-semibold">GPT-4o</span> + LangChain +
          RAG
        </span>
        <ChevronRight size={14} className="text-muted-foreground" />
      </div>
      {/* Headline */}
      <h1
        className="text-center font-extrabold leading-tight mb-6 animate-slide-up"
        style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
      >
        <span className="block text-foreground">What do you want to</span>
        <span className="block">
          <span className="text-gradient-violet glow-text-violet">
            {headlineWords?.[headlineIdx]}
          </span>
          <span className="text-foreground"> and </span>
          <span className="text-gradient-cyan glow-text-cyan">Achieve?</span>
        </span>
      </h1>
      <p className="text-center text-lg text-muted-foreground max-w-2xl mb-10 leading-relaxed animate-slide-up">
        Tell our AI your dream career. It interviews you, builds a personalized roadmap, tracks your
        daily progress, and guides you every step of the way — like a mentor who never sleeps.
      </p>
      {/* Search Bar */}
      <div className="w-full max-w-2xl mb-6 animate-slide-up">
        <div className="relative glass-card neon-border-violet rounded-2xl p-1.5 flex items-center gap-3 group focus-within:border-primary/70 transition-all duration-300">
          <div className="flex items-center gap-2 px-3">
            <Sparkles size={18} className="text-neon-violet flex-shrink-0" />
          </div>
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e?.target?.value)}
              placeholder=""
              className="w-full bg-transparent text-foreground text-lg font-medium outline-none placeholder-transparent"
              aria-label="Enter your career goal"
            />
            {searchValue === '' && (
              <span className="absolute inset-0 flex items-center text-lg font-medium text-muted-foreground pointer-events-none typing-cursor">
                {displayText}
              </span>
            )}
          </div>
          <button
            onClick={generateRoadmap}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 active:scale-95 flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)' }}
          >
            <span>Generate Roadmap</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Example chips */}
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          {goalExamples?.slice(0, 6)?.map((goal) => (
            <button
              key={`chip-${goal}`}
              onClick={() => setSearchValue(goal)}
              className="px-3 py-1.5 text-xs font-medium rounded-full glass-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-200"
            >
              {goal}
            </button>
          ))}
        </div>
      </div>
      {/* Social Proof Row */}
      <div className="flex items-center gap-6 animate-fade-in">
        <div className="flex -space-x-2">
          {['AK', 'SR', 'PM', 'NJ', 'VR']?.map((initials, i) => (
            <div
              key={`avatar-${initials}`}
              className="w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold text-white"
              style={{
                background: `linear-gradient(135deg, hsl(${i * 60 + 260}, 70%, 55%), hsl(${i * 60 + 290}, 80%, 60%))`,
                zIndex: 5 - i,
              }}
            >
              {initials}
            </div>
          ))}
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="text-foreground font-semibold">50,000+</span> learners building their
          careers
        </div>
        <div className="flex items-center gap-1">
          {[0, 1, 2, 3, 4]?.map((i) => (
            <svg
              key={`star-${i}`}
              className="w-4 h-4 text-neon-amber"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-sm text-muted-foreground ml-1">4.9/5</span>
        </div>
      </div>
      {/* Demo Video CTA */}
      <button className="mt-8 flex items-center gap-3 px-6 py-3 rounded-xl glass-card border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-200 group">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(124,58,237,0.2)' }}
        >
          <Play size={14} className="text-neon-violet ml-0.5" />
        </div>
        <span>Watch 2-min demo</span>
        <ArrowRight
          size={14}
          className="group-hover:translate-x-1 transition-transform duration-200"
        />
      </button>
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-soft">
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-primary/50" />
        <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
      </div>
    </section>
  );
}
