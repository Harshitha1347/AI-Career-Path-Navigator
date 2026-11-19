'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Brain,
  CheckCircle2,
  Sparkles,
  Target,
  Map,
  BookOpen,
  GraduationCap,
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

interface CareerProfile {
  current_situation: string;
  education_level: string;
  education_field: string;
  education_year: string;
  education_details: string;
  current_skills: string[];
  experience_level: string;
  experience_details: string;
  interests: string[];
  strengths: string;
  weaknesses: string;
  career_goal: string;
  target_role: string;
  study_hours: number;
  learning_style: string;
  target_timeline: string;
  preferred_work_mode: string;
  location: string;
}

interface Analysis {
  readiness: number;
  goal: string;
  profileSummary: string;
  strengths: string[];
  skillGaps: string[];
  roadmap: string[];
  firstAction: string;
}

const requiredSkills: Record<string, string[]> = {
  'AI Engineer': [
    'Python',
    'SQL',
    'Machine Learning',
    'Deep Learning',
    'Generative AI',
    'Git/GitHub',
    'Cloud Computing',
  ],

  'Machine Learning Engineer': [
    'Python',
    'SQL',
    'Machine Learning',
    'Deep Learning',
    'Git/GitHub',
    'Cloud Computing',
  ],

  'Data Scientist': [
    'Python',
    'SQL',
    'Machine Learning',
    'Statistics',
    'Data Science',
    'Git/GitHub',
  ],

  'Data Analyst': [
    'SQL',
    'Python',
    'Excel',
    'Data Science',
  ],

  'Full Stack Developer': [
    'HTML/CSS',
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
    'SQL',
    'Git/GitHub',
  ],

  'Frontend Developer': [
    'HTML/CSS',
    'JavaScript',
    'TypeScript',
    'React',
    'Git/GitHub',
  ],

  'Backend Developer': [
    'JavaScript',
    'TypeScript',
    'Node.js',
    'SQL',
    'Git/GitHub',
  ],

  'Cloud Engineer': [
    'Python',
    'Linux',
    'Git/GitHub',
    'Cloud Computing',
  ],

  'Cybersecurity Engineer': [
    'Python',
    'C++',
    'Git/GitHub',
    'Cloud Computing',
  ],

  'UI/UX Designer': [
    'UI/UX Design',
    'Research',
  ],

  'Product Manager': [
    'Research',
    'Business',
    'SQL',
  ],
};

const defaultRequirements = [
  'Core technical skills',
  'Problem solving',
  'Projects',
  'Communication',
  'Interview preparation',
];

function buildAnalysis(profile: CareerProfile): Analysis {
  const goal =
    profile.target_role ||
    profile.career_goal ||
    'Career Development';

  const requirements =
    requiredSkills[goal] || defaultRequirements;

  const userSkills = profile.current_skills || [];

  const skillGaps = requirements.filter(
    (skill) =>
      !userSkills.some(
        (userSkill) =>
          userSkill.toLowerCase() === skill.toLowerCase(),
      ),
  );

  let readiness = 20;

  if (profile.education_level) readiness += 10;
  if (profile.education_field) readiness += 10;

  if (userSkills.length >= 2) readiness += 10;
  if (userSkills.length >= 5) readiness += 10;

  if (profile.experience_level) readiness += 10;
  if (profile.experience_details) readiness += 10;

  if (profile.interests?.length) readiness += 5;
  if (profile.strengths) readiness += 5;
  if (profile.career_goal) readiness += 5;
  if (profile.study_hours) readiness += 5;

  readiness = Math.min(readiness, 100);

  const strengths = [
    profile.education_field,
    ...userSkills.slice(0, 3),
    ...(profile.interests || []).slice(0, 2),
  ].filter(Boolean);

  const roadmap = createRoadmap(
    goal,
    skillGaps,
    profile,
  );

  return {
    readiness,
    goal,
    profileSummary: createProfileSummary(profile, goal),
    strengths,
    skillGaps,
    roadmap,
    firstAction:
      skillGaps.length > 0
        ? `Start with ${skillGaps[0]} because it is part of the requirements for ${goal}.`
        : `Strengthen your existing skills and begin building projects for ${goal}.`,
  };
}

function createProfileSummary(
  profile: CareerProfile,
  goal: string,
) {
  const education = [
    profile.education_level,
    profile.education_field,
    profile.education_year,
  ]
    .filter(Boolean)
    .join(' • ');

  const situation =
    profile.current_situation || 'your current stage';

  const experience =
    profile.experience_level || 'your current experience';

  return `You are currently a ${situation.toLowerCase()} with a background in ${
    education || 'your current education'
  }. Your current experience level is ${experience.toLowerCase()}, and your target is to become a ${goal}. Your roadmap is designed around your existing foundation, available study time of ${profile.study_hours} hour(s) per day, and target timeline of ${profile.target_timeline}.`;
}

function createRoadmap(
  goal: string,
  gaps: string[],
  profile: CareerProfile,
) {
  const roadmap: string[] = [];

  if (gaps.length > 0) {
    roadmap.push(
      `Strengthen ${gaps[0]} fundamentals`,
    );
  }

  if (gaps.length > 1) {
    roadmap.push(
      `Learn ${gaps.slice(1, 3).join(' and ')}`,
    );
  }

  roadmap.push(
    `Build a beginner project related to ${goal}`,
  );

  roadmap.push(
    'Build an intermediate portfolio project',
  );

  roadmap.push(
    'Publish projects and document them on GitHub',
  );

  if (
    profile.experience_level === 'Complete Beginner' ||
    profile.experience_level === 'Beginner'
  ) {
    roadmap.push(
      'Practice coding and role-specific interview questions',
    );
  } else {
    roadmap.push(
      'Practice advanced interview and system/problem-solving questions',
    );
  }

  roadmap.push(
    'Prepare resume and demonstrate measurable project outcomes',
  );

  roadmap.push(
    `Apply for ${goal} internships, entry-level roles or relevant opportunities`,
  );

  return roadmap;
}

export default function CareerAnalysisPage() {
  const router = useRouter();

  const [profile, setProfile] =
    useState<CareerProfile | null>(null);

  const [analysis, setAnalysis] =
    useState<Analysis | null>(null);

  const [loading, setLoading] = useState(true);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    if (!analysis) return;

    const timer = setInterval(() => {
      setProgress((previous) => {
        if (previous >= 100) {
          clearInterval(timer);
          return 100;
        }

        return previous + 5;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [analysis]);

  const loadProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push('/sign-up-login-screen');
        return;
      }

      const { data, error } = await supabase
        .from('career_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Profile loading error:', error);
        toast.error(
          'Could not load your career profile.',
        );
        return;
      }

      setProfile(data);

      const generated = buildAnalysis(data);

      setAnalysis(generated);
    } catch (error) {
      console.error(error);
      toast.error('Unable to analyze your profile.');
    } finally {
      setLoading(false);
    }
  };

  const openDashboard = () => {
    router.push('/daily-progress-dashboard');
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-5">
            <Brain
              size={30}
              className="text-cyan-400 animate-pulse"
            />
          </div>

          <h1 className="text-2xl font-bold">
            Loading your career profile...
          </h1>

          <p className="text-slate-400 mt-2">
            We're preparing your personalized analysis.
          </p>
        </div>
      </main>
    );
  }

  if (!profile || !analysis) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Career profile not found
          </h1>

          <button
            onClick={() =>
              router.push('/career-interview')
            }
            className="mt-5 px-5 py-3 rounded-xl bg-cyan-500"
          >
            Complete Interview
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-4 py-10">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-300">
            <Sparkles size={16} />
            Personalized Career Analysis
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-5">
            Your path to{' '}
            <span className="text-cyan-400">
              {analysis.goal}
            </span>
          </h1>

          <p className="text-slate-400 max-w-2xl mx-auto mt-4">
            We connected your current education, skills,
            experience and future goal to create your starting
            career plan.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 md:p-8">

          <AnalysisRow
            icon={GraduationCap}
            title="Understanding your background"
            description={analysis.profileSummary}
            complete={progress >= 25}
          />

          <AnalysisRow
            icon={Target}
            title="Identifying your skill gaps"
            description={
              analysis.skillGaps.length
                ? `You currently have ${
                    profile.current_skills?.length || 0
                  } selected skills. ${
                    analysis.skillGaps.length
                  } important target skills still need development.`
                : 'Your selected skills cover the initial requirements for your target role.'
            }
            complete={progress >= 50}
          />

          <AnalysisRow
            icon={Map}
            title="Building your roadmap"
            description={`${analysis.roadmap.length} personalized steps created for your current level and timeline.`}
            complete={progress >= 75}
          />

          <AnalysisRow
            icon={BookOpen}
            title="Preparing your next actions"
            description={analysis.firstAction}
            complete={progress >= 100}
          />

          <div className="mt-8">
            <div className="flex justify-between text-sm text-slate-400 mb-2">
              <span>Analysis progress</span>
              <span>{progress}%</span>
            </div>

            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>

          {progress >= 100 && (
            <button
              onClick={openDashboard}
              className="w-full mt-8 py-4 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 font-semibold flex items-center justify-center gap-2"
            >
              Open My Personalized Dashboard
              <Target size={18} />
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

function AnalysisRow({
  icon: Icon,
  title,
  description,
  complete,
}: {
  icon: typeof Brain;
  title: string;
  description: string;
  complete: boolean;
}) {
  return (
    <div className="flex gap-4 p-4 rounded-2xl mb-3 border border-transparent bg-slate-950/30">
      <div className="w-11 h-11 shrink-0 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
        {complete ? (
          <CheckCircle2 size={22} />
        ) : (
          <Icon size={22} />
        )}
      </div>

      <div>
        <h3 className="font-semibold text-lg">
          {title}
        </h3>

        <p className="text-sm text-slate-400 mt-1">
          {description}
        </p>
      </div>
    </div>
  );
}