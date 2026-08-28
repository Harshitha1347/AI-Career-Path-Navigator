import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { Mail } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinSvgIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const footerLinks = {
  Product: [
    { id: 'fl-features', label: 'Features', href: '#features' },
    { id: 'fl-pricing', label: 'Pricing', href: '#pricing' },
    { id: 'fl-roadmap', label: 'Roadmap', href: '#' },
    { id: 'fl-changelog', label: 'Changelog', href: '#' },
  ],
  'Career Paths': [
    { id: 'fl-ai', label: 'AI Engineer', href: '/sign-up-login-screen' },
    { id: 'fl-ds', label: 'Data Scientist', href: '/sign-up-login-screen' },
    { id: 'fl-pm', label: 'Product Manager', href: '/sign-up-login-screen' },
    { id: 'fl-design', label: 'UX Designer', href: '/sign-up-login-screen' },
  ],
  Company: [
    { id: 'fl-about', label: 'About', href: '#' },
    { id: 'fl-blog', label: 'Blog', href: '#' },
    { id: 'fl-careers', label: 'Careers', href: '#' },
    { id: 'fl-press', label: 'Press', href: '#' },
  ],
  Legal: [
    { id: 'fl-privacy', label: 'Privacy Policy', href: '#' },
    { id: 'fl-terms', label: 'Terms of Service', href: '#' },
    { id: 'fl-cookies', label: 'Cookie Policy', href: '#' },
    { id: 'fl-security', label: 'Security', href: '#' },
  ],
};

const socialLinks = [
  { id: 'social-github', Icon: GithubIcon, href: '#', label: 'GitHub' },
  { id: 'social-twitter', Icon: TwitterIcon, href: '#', label: 'Twitter' },
  {
    id: 'social-linkedin',
    Icon: LinkedinSvgIcon,
    href: '#',
    label: 'LinkedIn',
  },
];

export default function LandingFooter() {
  return (
    <footer className="border-t border-border py-16 px-6 lg:px-8 xl:px-10">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <AppLogo size={32} />
              <span className="font-bold text-lg tracking-tight text-foreground">
                AI<span className="text-gradient-violet">PathFinder</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
              AI-powered career mentor that builds personalized roadmaps and guides you from where
              you are to where you want to be.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks?.map(({ id, Icon, href, label }) => (
                <a
                  key={id}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-200"
                >
                  <Icon />
                </a>
              ))}
              <a
                href="#"
                aria-label="Email"
                className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-200"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks)?.map(([section, links]) => (
            <div key={`footer-${section}`}>
              <h4 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-4">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links?.map((link) => (
                  <li key={link?.id}>
                    <Link
                      href={link?.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link?.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 AI PathFinder. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
