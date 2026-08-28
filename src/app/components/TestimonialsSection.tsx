import React from 'react';

const testimonials = [
  {
    id: 'testimonial-arjun',
    name: 'Arjun Mehta',
    role: 'Software Engineer @ Google',
    avatar: 'AM',
    avatarGrad: 'linear-gradient(135deg, #7C3AED, #9F67FF)',
    quote:
      'I had no idea where to start with machine learning. PathFinder gave me a 6-month roadmap that took me from Python basics to landing an ML role at Google. The daily check-ins kept me accountable.',
    rating: 5,
    tag: 'AI Engineer Track',
  },
  {
    id: 'testimonial-priya',
    name: 'Priya Nair',
    role: 'Product Manager @ Razorpay',
    avatar: 'PN',
    avatarGrad: 'linear-gradient(135deg, #06B6D4, #0891B2)',
    quote:
      "The AI interview was incredibly insightful — it identified gaps in my product thinking I didn't even know I had. The roadmap it created included case studies and PM frameworks I actually use at work.",
    rating: 5,
    tag: 'Product Manager Track',
  },
  {
    id: 'testimonial-samuel',
    name: 'Samuel Okonkwo',
    role: 'Full Stack Developer @ Flutterwave',
    avatar: 'SO',
    avatarGrad: 'linear-gradient(135deg, #34D399, #059669)',
    quote:
      'As someone from Lagos with no CS degree, I was skeptical. But the roadmap adapted to my 2-hour daily schedule and budget constraints. 9 months later I got my first tech job.',
    rating: 5,
    tag: 'Full Stack Track',
  },
  {
    id: 'testimonial-chen',
    name: 'Chen Wei',
    role: 'Data Scientist @ Alibaba',
    avatar: 'CW',
    avatarGrad: 'linear-gradient(135deg, #F472B6, #DB2777)',
    quote:
      'The skill radar chart showed me exactly which areas were weak. I focused my study on those gaps, and my interview performance improved dramatically within 2 months.',
    rating: 5,
    tag: 'Data Science Track',
  },
  {
    id: 'testimonial-aisha',
    name: 'Aisha Rahman',
    role: 'UX Designer @ Canva',
    avatar: 'AR',
    avatarGrad: 'linear-gradient(135deg, #FBBF24, #D97706)',
    quote:
      'The portfolio builder feature is incredible. It automatically generated my portfolio from my completed projects. Canva recruiters reached out after seeing it on GitHub.',
    rating: 5,
    tag: 'UI/UX Design Track',
  },
  {
    id: 'testimonial-marcos',
    name: 'Marcos Ferreira',
    role: 'Cloud Architect @ AWS',
    avatar: 'MF',
    avatarGrad: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
    quote:
      "The certification engine recommended the exact AWS certs I needed in the right order. Saved me hundreds of dollars by not taking unnecessary exams. Now I'm a certified Solutions Architect.",
    rating: 5,
    tag: 'Cloud Architecture Track',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 px-6 lg:px-8 xl:px-10 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
            Real People, <span className="text-gradient-violet">Real Careers</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Learners who used AI PathFinder to land jobs they only dreamed about.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials?.map((t) => (
            <div key={t?.id} className="glass-card glass-card-hover p-6 flex flex-col gap-4">
              {/* Stars */}
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4]?.map((i) => (
                  <svg
                    key={`${t?.id}-star-${i}`}
                    className="w-4 h-4 text-neon-amber"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                &ldquo;{t?.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                  style={{ background: t?.avatarGrad }}
                >
                  {t?.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{t?.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{t?.role}</p>
                </div>
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0"
                  style={{
                    background: 'rgba(124,58,237,0.15)',
                    color: 'var(--neon-violet)',
                  }}
                >
                  {t?.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
