'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { Menu, X, Sparkles } from 'lucide-react';

const navLinks = [
  { id: 'nav-features', href: '#features', label: 'Features' },
  { id: 'nav-how', href: '#how-it-works', label: 'How It Works' },
  { id: 'nav-pricing', href: '#pricing', label: 'Pricing' },
  { id: 'nav-faq', href: '#faq', label: 'FAQ' },
];

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-card border-b border-border py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <AppLogo size={36} />
          <span className="font-bold text-lg tracking-tight text-foreground">
            AI<span className="text-gradient-violet">PathFinder</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks?.map((link) => (
            <a
              key={link?.id}
              href={link?.href}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-lg hover:bg-muted"
            >
              {link?.label}
            </a>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/sign-up-login-screen"
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up-login-screen"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)' }}
          >
            <Sparkles size={15} />
            Get Started Free
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass-card border-t border-border mt-2 mx-4 rounded-xl p-4 space-y-2">
          {navLinks?.map((link) => (
            <a
              key={`mobile-${link?.id}`}
              href={link?.href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              {link?.label}
            </a>
          ))}
          <div className="pt-2 border-t border-border flex flex-col gap-2">
            <Link
              href="/sign-up-login-screen"
              className="block px-4 py-2.5 text-sm font-medium text-center text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up-login-screen"
              className="block px-4 py-2.5 text-sm font-semibold text-center text-white rounded-xl transition-all active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
              }}
            >
              Get Started Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
