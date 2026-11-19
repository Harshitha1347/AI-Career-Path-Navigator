'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  GraduationCap,
  Briefcase,
  Target,
  Sparkles,
  Clock,
  BookOpen,
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

interface CareerProfile {
  currentSituation: string;
  educationLevel: string;
  educationField: string;
  educationYear: string;
  educationDetails: string;
  currentSkills: string[];
  experienceLevel: string;
  experienceDetails: string;
  interests: string[];
  strengths: string;
  weaknesses: string;
  careerGoal: string;
  targetRole: string;
  studyHours: number;
  learningStyle: string;
  targetTimeline: string;
  preferredWorkMode: string;
  location: string;
}

const situations = [
  'Degree-Pursuing Student',
  'Graduate - Looking for First Job',
  'Graduate - Career Gap',
];

const educationLevels = [
  'B.Tech / B.E',
  'B.Sc',
  'B.Com',
  'BCA',
  'BBA',
  'BA',
  'MCA',
  'M.Sc',
  'M.Tech',
  'MBA',
  'Other Degree',
];

const skills = [
  'Python',
  'C++',
  'Java',
  'JavaScript',
  'TypeScript',
  'SQL',
  'HTML/CSS',
  'React',
  'Node.js',
  'Machine Learning',
  'Deep Learning',
  'Generative AI',
  'Git/GitHub',
  'Cloud Computing',
  'Excel',
];

const interests = [
  'Artificial Intelligence',
  'Machine Learning',
  'Data Science',
  'Web Development',
  'Cybersecurity',
  'Cloud Computing',
  'UI/UX Design',
  'Mobile Development',
  'Research',
  'Business',
];

const goals = [
  'AI Engineer',
  'Machine Learning Engineer',
  'Data Scientist',
  'Data Analyst',
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'Cloud Engineer',
  'Cybersecurity Engineer',
  'UI/UX Designer',
  'Product Manager',
  'Other',
];

const inputClass =
  'w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-cyan-400 transition';

export default function CareerInterviewPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  const [profile, setProfile] = useState<CareerProfile>({
    currentSituation: '',
    educationLevel: '',
    educationField: '',
    educationYear: '',
    educationDetails: '',
    currentSkills: [],
    experienceLevel: '',
    experienceDetails: '',
    interests: [],
    strengths: '',
    weaknesses: '',
    careerGoal: '',
    targetRole: '',
    studyHours: 2,
    learningStyle: 'Mixed',
    targetTimeline: '6 months',
    preferredWorkMode: '',
    location: '',
  });

  const totalSteps = 8;

  const isStudent =
    profile.currentSituation === 'Degree-Pursuing Student';

  const isCareerGap =
    profile.currentSituation === 'Graduate - Career Gap';

  const isGraduate =
    profile.currentSituation.startsWith('Graduate');

  const updateProfile = (
    field: keyof CareerProfile,
    value: string | number | string[],
  ) => {
    setProfile((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const toggleArrayValue = (
    field: 'currentSkills' | 'interests',
    value: string,
  ) => {
    setProfile((previous) => {
      const values = previous[field];

      return {
        ...previous,
        [field]: values.includes(value)
          ? values.filter((item) => item !== value)
          : [...values, value],
      };
    });
  };

  const validateStep = () => {
    if (step === 1 && !profile.currentSituation) {
      toast.error('Please select your current situation.');
      return false;
    }

    if (step === 2) {
      if (!profile.educationLevel) {
        toast.error('Please select your degree.');
        return false;
      }

      if (!profile.educationYear.trim()) {
        toast.error(
          isStudent
            ? 'Please enter your current year of study.'
            : 'Please enter your graduation year.',
        );
        return false;
      }
    }

    if (step === 6 && !profile.targetRole.trim()) {
      toast.error('Please select or enter your career goal.');
      return false;
    }

    return true;
  };

  const nextStep = () => {
    if (!validateStep()) return;

    if (step < totalSteps) {
      setStep((previous) => previous + 1);
    }
  };

  const previousStep = () => {
    if (step > 1) {
      setStep((previous) => previous - 1);
    }
  };

  const saveProfile = async () => {
    if (!validateStep()) return;

    setIsSaving(true);

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        toast.error('Please log in before continuing.');
        router.push('/sign-up-login-screen');
        return;
      }

      const { error } = await supabase
        .from('career_profiles')
        .upsert(
          {
            user_id: user.id,

            current_situation: profile.currentSituation,

            education_level: profile.educationLevel,
            education_field: profile.educationField,
            education_year: profile.educationYear,
            education_details: profile.educationDetails,

            current_skills: profile.currentSkills,

            experience_level: profile.experienceLevel,
            experience_details: profile.experienceDetails,

            interests: profile.interests,
            strengths: profile.strengths,
            weaknesses: profile.weaknesses,

            career_goal: profile.careerGoal,
            target_role: profile.targetRole,

            study_hours: profile.studyHours,
            learning_style: profile.learningStyle,
            target_timeline: profile.targetTimeline,

            preferred_work_mode: profile.preferredWorkMode,
            location: profile.location,

            updated_at: new Date().toISOString(),
          },
          {
            onConflict: 'user_id',
          },
        );

      if (error) {
        console.error('Career profile error:', error);
        toast.error(error.message);
        return;
      }

      toast.success('Career profile saved successfully!');
      router.push('/career-analysis');
    } catch (error) {
      console.error('Save profile error:', error);
      toast.error('Something went wrong while saving your profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <StepHeader
              step="STEP 1"
              title="Where are you in your degree journey?"
              description="Choose your current situation so we can personalize your learning, projects, internships and job preparation."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {situations.map((item) => {
                const selected = profile.currentSituation === item;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      updateProfile('currentSituation', item)
                    }
                    className={`p-5 rounded-2xl border text-left transition ${
                      selected
                        ? 'border-cyan-400 bg-cyan-400/10'
                        : 'border-slate-700 bg-slate-900/60 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item === 'Degree-Pursuing Student' ? (
                        <GraduationCap className="text-cyan-400" />
                      ) : (
                        <Briefcase className="text-cyan-400" />
                      )}

                      <span className="text-white font-medium">
                        {item}
                      </span>

                      {selected && (
                        <Check className="ml-auto text-cyan-400" />
                      )}
                    </div>

                    <p className="text-sm text-slate-400 mt-3">
                      {item === 'Degree-Pursuing Student'
                        ? 'Build skills, complete projects and prepare for internships and campus placements.'
                        : item === 'Graduate - Looking for First Job'
                          ? 'Prepare your resume, portfolio, interviews and entry-level job applications.'
                          : 'Refresh existing skills, rebuild confidence and prepare to return to work.'}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <StepHeader
              step="STEP 2"
              title="Tell us about your degree"
              description="Your academic background helps us choose relevant skills, projects and career opportunities."
            />

            <Field label="Degree">
              <select
                value={profile.educationLevel}
                onChange={(e) =>
                  updateProfile('educationLevel', e.target.value)
                }
                className={inputClass}
              >
                <option value="">Select your degree</option>
                {educationLevels.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Specialization / Branch">
              <input
                value={profile.educationField}
                onChange={(e) =>
                  updateProfile('educationField', e.target.value)
                }
                placeholder="Example: Artificial Intelligence & Machine Learning"
                className={inputClass}
              />
            </Field>

            <Field
              label={
                isStudent
                  ? 'Current Year of Study'
                  : 'Graduation Year'
              }
            >
              <input
                value={profile.educationYear}
                onChange={(e) =>
                  updateProfile('educationYear', e.target.value)
                }
                placeholder={
                  isStudent
                    ? 'Example: 2nd Year, 3rd Year, Final Year'
                    : 'Example: 2025'
                }
                className={inputClass}
              />
            </Field>

            <Field
              label={
                isStudent
                  ? 'Academic Details'
                  : 'Academic and Graduation Details'
              }
            >
              <textarea
                value={profile.educationDetails}
                onChange={(e) =>
                  updateProfile('educationDetails', e.target.value)
                }
                placeholder="Subjects, academic achievements, certifications, technologies, etc."
                rows={4}
                className={inputClass}
              />
            </Field>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <StepHeader
              step="STEP 3"
              title="What skills do you currently have?"
              description="Select the technical skills you already know. You can update them as you learn."
            />

            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => {
                const selected = profile.currentSkills.includes(skill);

                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() =>
                      toggleArrayValue('currentSkills', skill)
                    }
                    className={`px-4 py-3 rounded-xl border transition ${
                      selected
                        ? 'border-cyan-400 bg-cyan-400/10 text-cyan-300'
                        : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    {selected && '✓ '}
                    {skill}
                  </button>
                );
              })}
            </div>

            <p className="text-sm text-slate-400">
              Tip: select only skills you have some familiarity with. Your
              roadmap will identify other skills to develop.
            </p>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <StepHeader
              step="STEP 4"
              title={
                isCareerGap
                  ? 'Tell us about your previous experience'
                  : isGraduate
                    ? 'What practical experience do you have?'
                    : 'What is your current experience level?'
              }
              description="This helps us decide where your learning roadmap should begin."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Complete Beginner',
                'Beginner',
                'Intermediate',
                'Advanced',
              ].map((level) => {
                const selected = profile.experienceLevel === level;

                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() =>
                      updateProfile('experienceLevel', level)
                    }
                    className={`p-4 rounded-xl border ${
                      selected
                        ? 'border-cyan-400 bg-cyan-400/10 text-cyan-300'
                        : 'border-slate-700 bg-slate-900 text-white'
                    }`}
                  >
                    {level}
                  </button>
                );
              })}
            </div>

            <Field
              label={
                isCareerGap
                  ? 'Previous work, projects and skills to refresh'
                  : isGraduate
                    ? 'Projects, internships and practical experience'
                    : 'Projects, internships or practical exposure'
              }
            >
              <textarea
                value={profile.experienceDetails}
                onChange={(e) =>
                  updateProfile('experienceDetails', e.target.value)
                }
                placeholder={
                  isCareerGap
                    ? 'Describe previous roles, previous projects, skills you used and what you want to refresh.'
                    : 'Describe your academic projects, internships, certifications, work experience or practical exposure.'
                }
                rows={5}
                className={inputClass}
              />
            </Field>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <StepHeader
              step="STEP 5"
              title="Help us understand your interests"
              description="Your interests, strengths and challenges help personalize your career plan."
            />

            <Field label="Areas you are interested in">
              <div className="flex flex-wrap gap-3">
                {interests.map((interest) => {
                  const selected = profile.interests.includes(interest);

                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() =>
                        toggleArrayValue('interests', interest)
                      }
                      className={`px-4 py-3 rounded-xl border ${
                        selected
                          ? 'border-cyan-400 bg-cyan-400/10 text-cyan-300'
                          : 'border-slate-700 bg-slate-900 text-slate-300'
                      }`}
                    >
                      {selected && '✓ '}
                      {interest}
                    </button>
                  );
                })}
              </div>
            </Field>

            <Field label="What are your strengths?">
              <textarea
                value={profile.strengths}
                onChange={(e) =>
                  updateProfile('strengths', e.target.value)
                }
                placeholder="Problem solving, creativity, communication, mathematics..."
                rows={3}
                className={inputClass}
              />
            </Field>

            <Field label="What would you like to improve?">
              <textarea
                value={profile.weaknesses}
                onChange={(e) =>
                  updateProfile('weaknesses', e.target.value)
                }
                placeholder="Coding, communication, mathematics, interviews, confidence..."
                rows={3}
                className={inputClass}
              />
            </Field>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <StepHeader
              step="STEP 6"
              title={
                isStudent
                  ? 'What is your career goal?'
                  : isCareerGap
                    ? 'What role would you like to return to?'
                    : 'What job role are you targeting?'
              }
              description="Choose a target role to connect your current skills with your career goal."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {goals.map((goal) => {
                const selected = profile.targetRole === goal;

                return (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => {
                      updateProfile('careerGoal', goal);
                      updateProfile('targetRole', goal);
                    }}
                    className={`p-4 rounded-xl border text-left ${
                      selected
                        ? 'border-cyan-400 bg-cyan-400/10 text-cyan-300'
                        : 'border-slate-700 bg-slate-900 text-white'
                    }`}
                  >
                    {goal}
                  </button>
                );
              })}
            </div>

            <Field label="Or enter a different career goal">
              <input
                value={profile.targetRole}
                onChange={(e) => {
                  updateProfile('targetRole', e.target.value);
                  updateProfile('careerGoal', e.target.value);
                }}
                placeholder="Example: Generative AI Engineer"
                className={inputClass}
              />
            </Field>

            <Field label="What is your main goal?">
              <select
                value={profile.careerGoal}
                onChange={(e) =>
                  updateProfile('careerGoal', e.target.value)
                }
                className={inputClass}
              >
                <option value="">Select your priority</option>
                {(
                  isStudent
                    ? [
                        'AI/ML internship',
                        'Campus placements',
                        'Build projects and portfolio',
                        'Develop job-ready skills',
                        'Explore career options',
                      ]
                    : isCareerGap
                      ? [
                          'Refresh technical skills',
                          'Return to work',
                          'Build recent projects',
                          'Update resume',
                          'Prepare for interviews',
                        ]
                      : [
                          'Get my first job',
                          'Prepare for off-campus placements',
                          'Build projects and portfolio',
                          'Develop job-ready skills',
                          'Prepare for interviews',
                        ]
                ).map((goal) => (
                  <option key={goal} value={goal}>
                    {goal}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <StepHeader
              step="STEP 7"
              title="Create a realistic learning plan"
              description="Tell us how much time you can commit and how you prefer to learn."
            />

            <Field label="Hours available per day">
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((hours) => {
                  const selected = profile.studyHours === hours;

                  return (
                    <button
                      key={hours}
                      type="button"
                      onClick={() =>
                        updateProfile('studyHours', hours)
                      }
                      className={`p-4 rounded-xl border ${
                        selected
                          ? 'border-cyan-400 bg-cyan-400/10 text-cyan-300'
                          : 'border-slate-700 bg-slate-900 text-white'
                      }`}
                    >
                      {hours === 5 ? '5+' : hours}h
                    </button>
                  );
                })}
              </div>
            </Field>

            <Field label="Target timeline">
              <select
                value={profile.targetTimeline}
                onChange={(e) =>
                  updateProfile('targetTimeline', e.target.value)
                }
                className={inputClass}
              >
                <option>3 months</option>
                <option>6 months</option>
                <option>9 months</option>
                <option>1 year</option>
                <option>2+ years</option>
              </select>
            </Field>

            <Field label="Preferred learning style">
              <select
                value={profile.learningStyle}
                onChange={(e) =>
                  updateProfile('learningStyle', e.target.value)
                }
                className={inputClass}
              >
                <option>Mixed</option>
                <option>Videos</option>
                <option>Reading</option>
                <option>Hands-on Practice</option>
              </select>
            </Field>

            <Field label="Preferred work mode">
              <select
                value={profile.preferredWorkMode}
                onChange={(e) =>
                  updateProfile('preferredWorkMode', e.target.value)
                }
                className={inputClass}
              >
                <option value="">Select</option>
                <option>Remote</option>
                <option>Hybrid</option>
                <option>On-site</option>
                <option>Any</option>
              </select>
            </Field>

            <Field label="Preferred work location">
              <input
                value={profile.location}
                onChange={(e) =>
                  updateProfile('location', e.target.value)
                }
                placeholder="Example: Bengaluru, Hyderabad, Remote"
                className={inputClass}
              />
            </Field>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <StepHeader
              step="STEP 8"
              title="Review your career profile"
              description="Check your answers before we generate your personalized career plan."
            />

            <div className="grid gap-3">
              <Summary
                title="Current Situation"
                value={profile.currentSituation}
              />

              <Summary
                title="Degree & Specialization"
                value={`${profile.educationLevel}${
                  profile.educationField
                    ? ` • ${profile.educationField}`
                    : ''
                }`}
              />

              <Summary
                title={isStudent ? 'Current Year' : 'Graduation Year'}
                value={profile.educationYear}
              />

              <Summary
                title="Academic Details"
                value={profile.educationDetails || 'Not specified'}
              />

              <Summary
                title="Current Skills"
                value={
                  profile.currentSkills.join(', ') ||
                  'No skills selected'
                }
              />

              <Summary
                title="Experience Level"
                value={profile.experienceLevel || 'Not specified'}
              />

              <Summary
                title="Experience Details"
                value={profile.experienceDetails || 'Not specified'}
              />

              <Summary
                title="Interests"
                value={
                  profile.interests.join(', ') || 'Not specified'
                }
              />

              <Summary
                title="Career Goal / Target Role"
                value={profile.targetRole || profile.careerGoal}
              />

              <Summary
                title="Learning Capacity"
                value={`${profile.studyHours} hours/day`}
              />

              <Summary
                title="Target Timeline"
                value={profile.targetTimeline}
              />

              <Summary
                title="Preferred Learning Style"
                value={profile.learningStyle}
              />
            </div>

            <div className="p-5 rounded-2xl border border-cyan-500/20 bg-cyan-500/5">
              <div className="flex items-start gap-3">
                <Sparkles className="text-cyan-400 mt-1" />

                <div>
                  <p className="text-white font-semibold">
                    Your personalized path is ready to build
                  </p>

                  <p className="text-sm text-slate-400 mt-1">
                    {isStudent
                      ? 'Your roadmap will focus on degree-stage learning, projects, internships and placement preparation.'
                      : isCareerGap
                        ? 'Your roadmap will focus on refreshing skills, rebuilding your portfolio and preparing to return to work.'
                        : 'Your roadmap will focus on job-ready skills, projects, resume preparation and entry-level interviews.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-300 text-sm">
            <Sparkles size={16} />
            AI Career Navigator
          </div>

          <h1 className="text-4xl font-extrabold mt-5">
            Let's build your career path
          </h1>

          <p className="text-slate-400 mt-3">
            Personalized career guidance for degree students and graduates.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-sm text-slate-400 mb-2">
            <span>
              Step {step} of {totalSteps}
            </span>

            <span>
              {Math.round((step / totalSteps) * 100)}%
            </span>
          </div>

          <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-300"
              style={{
                width: `${(step / totalSteps) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-6 md:p-10">
          {renderStep()}

          <div className="flex justify-between mt-10 pt-6 border-t border-slate-800">
            <button
              type="button"
              onClick={previousStep}
              disabled={step === 1 || isSaving}
              className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-700 text-slate-300 disabled:opacity-30"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            {step < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold"
              >
                Continue
                <ArrowRight size={18} />
              </button>
            ) : (
              <button
                type="button"
                onClick={saveProfile}
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold disabled:opacity-50"
              >
                {isSaving ? (
                  <span className="animate-pulse">
                    Building your path...
                  </span>
                ) : (
                  <>
                    Analyze My Career
                    <Target size={18} />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function StepHeader({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <p className="text-cyan-400 text-sm font-semibold mb-2">
        {step}
      </p>

      <h2 className="text-3xl font-bold text-white">
        {title}
      </h2>

      <p className="text-slate-400 mt-2">
        {description}
      </p>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-sm text-slate-300">
        {label}
      </label>

      <div className="mt-2">{children}</div>
    </div>
  );
}

function Summary({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
      <span className="text-slate-400 text-sm">
        {title}
      </span>

      <span className="text-white text-sm md:text-right max-w-xl">
        {value || 'Not specified'}
      </span>
    </div>
  );
}