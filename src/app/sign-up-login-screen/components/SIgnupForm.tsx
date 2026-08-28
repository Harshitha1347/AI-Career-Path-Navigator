'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, Globe, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

const quickGoals = [
  { id: 'qg-ai', label: 'AI Engineer', emoji: '🤖' },
  { id: 'qg-ds', label: 'Data Scientist', emoji: '📊' },
  { id: 'qg-fe', label: 'Frontend Dev', emoji: '💻' },
  { id: 'qg-pm', label: 'Product Manager', emoji: '🎯' },
  { id: 'qg-ux', label: 'UX Designer', emoji: '🎨' },
  { id: 'qg-cloud', label: 'Cloud Architect', emoji: '☁️' },
];

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

export default function SignupForm({ onSwitchToLogin }: SignupFormProps) {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>();

  const password = watch('password');

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);

    try {
      console.clear();
      console.log('🚀 Signup Started');

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
          },
        },
      });

      console.log(authData);
      console.log(authError);

      if (authError) {
        toast.error(authError.message);
        setIsLoading(false);
        return;
      }

      if (!authData.user) {
        toast.error('User not created.');
        setIsLoading(false);
        return;
      }

      toast.success('Account created successfully!');

      router.push('/daily-progress-dashboard');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-foreground mb-1.5">Start your journey</h1>

        <p className="text-sm text-muted-foreground">
          AI PathFinder will interview you and build your personalized roadmap.
        </p>
      </div>

      {/* Quick Goal Selection */}

      <div className="mb-6">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
          What do you want to become? (optional)
        </p>

        <div className="flex flex-wrap gap-2">
          {quickGoals.map((goal) => (
            <button
              key={goal.id}
              type="button"
              onClick={() => setSelectedGoal(selectedGoal === goal.id ? null : goal.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                selectedGoal === goal.id
                  ? 'bg-primary/20 border border-primary/50 text-neon-violet'
                  : 'glass-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30'
              }`}
            >
              <span>{goal.emoji}</span>
              {goal.label}
            </button>
          ))}
        </div>
      </div>

      {/* OAuth */}

      <div className="flex gap-3 mb-5">
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl glass-card border border-border text-sm font-medium"
        >
          <Globe size={16} />
          Google
        </button>

        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl glass-card border border-border text-sm font-medium"
        >
          GitHub
        </button>
      </div>

      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-border" />

        <span className="text-xs text-muted-foreground">or with email</span>

        <div className="flex-1 h-px bg-border" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {/* Name */}
        <div>
          <label
            htmlFor="signup-name"
            className="block text-sm font-semibold text-foreground mb-1.5"
          >
            Full Name
          </label>

          <div className="relative">
            <User
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <input
              id="signup-name"
              type="text"
              autoComplete="name"
              placeholder="Enter your full name"
              {...register('name', {
                required: 'Full name is required',
                minLength: {
                  value: 2,
                  message: 'Name should contain at least 2 characters',
                },
              })}
              className={`w-full pl-10 pr-4 py-3 rounded-xl bg-input border text-foreground outline-none transition-all duration-200
              ${errors.name ? 'border-red-500' : 'border-border focus:border-primary'}`}
            />
          </div>

          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="signup-email"
            className="block text-sm font-semibold text-foreground mb-1.5"
          >
            Email Address
          </label>

          <div className="relative">
            <Mail
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <input
              id="signup-email"
              type="email"
              autoComplete="email"
              placeholder="example@gmail.com"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address',
                },
              })}
              className={`w-full pl-10 pr-4 py-3 rounded-xl bg-input border text-foreground outline-none transition-all duration-200
              ${errors.email ? 'border-red-500' : 'border-border focus:border-primary'}`}
            />
          </div>

          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>
        {/* Password */}
        <div>
          <label
            htmlFor="signup-password"
            className="block text-sm font-semibold text-foreground mb-1.5"
          >
            Password
          </label>

          <div className="relative">
            <Lock
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Enter password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d).+$/,
                  message: 'Password must contain one uppercase letter and one number',
                },
              })}
              className={`w-full pl-10 pr-12 py-3 rounded-xl bg-input border text-foreground outline-none transition-all duration-200 ${
                errors.password ? 'border-red-500' : 'border-border focus:border-primary'
              }`}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff size={18} className="text-muted-foreground" />
              ) : (
                <Eye size={18} className="text-muted-foreground" />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="signup-confirm"
            className="block text-sm font-semibold text-foreground mb-1.5"
          >
            Confirm Password
          </label>

          <div className="relative">
            <Lock
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <input
              id="signup-confirm"
              type={showConfirm ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Confirm password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === password || 'Passwords do not match',
              })}
              className={`w-full pl-10 pr-12 py-3 rounded-xl bg-input border text-foreground outline-none transition-all duration-200 ${
                errors.confirmPassword ? 'border-red-500' : 'border-border focus:border-primary'
              }`}
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showConfirm ? (
                <EyeOff size={18} className="text-muted-foreground" />
              ) : (
                <Eye size={18} className="text-muted-foreground" />
              )}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>
        {/* Terms & Conditions */}
        <div className="flex items-start gap-3">
          <input
            id="terms"
            type="checkbox"
            {...register('terms', {
              required: 'Please accept the Terms & Conditions',
            })}
            className="mt-1 h-4 w-4 rounded border-border"
          />

          <label htmlFor="terms" className="text-sm text-muted-foreground">
            I agree to the{' '}
            <span className="text-primary cursor-pointer hover:underline">Terms & Conditions</span>{' '}
            and <span className="text-primary cursor-pointer hover:underline">Privacy Policy</span>
          </label>
        </div>

        {errors.terms && <p className="text-xs text-red-500">{errors.terms.message}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 rounded-xl py-3 font-semibold text-white transition-all duration-200 disabled:opacity-60"
          style={{
            background: 'linear-gradient(135deg,#7C3AED,#06B6D4)',
          }}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" opacity="0.3" />

                <path d="M22 12a10 10 0 00-10-10" stroke="white" strokeWidth="4" />
              </svg>
              Creating Account...
            </>
          ) : (
            <>
              Create Account
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      {/* Footer */}
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">Already have an account?</p>

        <button
          type="button"
          onClick={onSwitchToLogin}
          className="mt-2 font-semibold text-primary hover:underline"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
