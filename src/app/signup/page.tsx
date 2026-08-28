'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleSignIn(e: React.FormEvent) {
    console.log('🚀 handleSignIn() started');
    e.preventDefault();

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('=================================');
      console.log('EMAIL:', email);
      console.log('PASSWORD:', password);
      console.log('LOGIN DATA:', data);
      console.log('LOGIN ERROR:', error);
      console.log('=================================');

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }

      alert('Login Successful!');

      router.push('/daily-progress-dashboard');
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="w-full max-w-md bg-slate-900 rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Sign In</h1>

        <form onSubmit={handleSignIn} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-violet-600 py-3 text-white font-semibold hover:bg-violet-700"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-slate-400">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-violet-400 hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
