"use client";

import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, TrendingUp, Briefcase } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Prince Dubey",
    college: "IIT Delhi",
    role: "SWE Intern @ Google",
    avatar: "PD",
    gradientFrom: "from-blue-500",
    gradientTo: "to-cyan-400",
    quote: "ConnectIQ completely changed how I approached recruiter outreach. Instead of sending generic messages, the AI helped me craft personalized notes that actually got replies. Landed my dream internship at Google within 3 weeks of using it.",
    stat: "Google SWE Intern",
    statType: "role" as const,
    responseRate: "38%",
    stars: 5,
  },
  {
    name: "Aditya Sharma",
    college: "BITS Pilani",
    role: "PM Intern @ Microsoft",
    avatar: "AS",
    gradientFrom: "from-purple-500",
    gradientTo: "to-pink-400",
    quote: "I was struggling to get responses from recruiters on LinkedIn. After using ConnectIQ's AI generator and CRM board, my response rate jumped from 5% to 34%. The follow-up reminders are a game changer — I never miss a window now.",
    stat: "5% → 34%",
    statType: "rate" as const,
    responseRate: "34%",
    stars: 5,
  },
  {
    name: "Aman Verma",
    college: "UC Berkeley",
    role: "SWE Intern @ Stripe",
    avatar: "AV",
    gradientFrom: "from-green-500",
    gradientTo: "to-emerald-400",
    quote: "The Kanban board is incredible for staying organized. I was tracking 50+ recruiters and ConnectIQ made it effortless. Moved from cold outreach to interview in just 8 days with Stripe. This tool is a must-have for any CS student.",
    stat: "Stripe SWE Intern",
    statType: "role" as const,
    responseRate: "42%",
    stars: 5,
  },
  {
    name: "Sneha Gupta",
    college: "NIT Trichy",
    role: "Data Science Intern @ Amazon",
    avatar: "SG",
    gradientFrom: "from-orange-500",
    gradientTo: "to-yellow-400",
    quote: "Before ConnectIQ, I had zero replies from cold outreach. The personalized message templates and the ability to track every conversation in one place helped me secure 4 interviews in my first month. Ended up at Amazon!",
    stat: "0 → 4 Interviews",
    statType: "rate" as const,
    responseRate: "28%",
    stars: 5,
  },
];
export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const next = useCallback(() => {
    setDirection("right");
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setDirection("left");
    setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, next]);

  // Show 3 cards on desktop: previous, current, next
  const getVisibleIndices = () => {
    const prevIdx = (current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
    const nextIdx = (current + 1) % TESTIMONIALS.length;
    return [prevIdx, current, nextIdx];
  };

  const visibleIndices = getVisibleIndices();

  return (
    <section className="w-full py-24 lg:py-32 px-4 relative overflow-hidden border-t border-white/5">
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary font-medium backdrop-blur-md">
            <Star className="mr-2 h-4 w-4 fill-primary" /> Loved by students
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Real results from <br className="hidden md:block" />real students
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join hundreds of students who&apos;ve transformed their job search with ConnectIQ.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={() => { prev(); setIsAutoPlaying(false); }}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-surface border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-white/20 transition-all shadow-lg hidden lg:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => { next(); setIsAutoPlaying(false); }}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-surface border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-white/20 transition-all shadow-lg hidden lg:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleIndices.map((idx, position) => {
              const t = TESTIMONIALS[idx];
              const isCenter = position === 1;
              return (
                <div
                  key={`${idx}-${current}`}
                  className={`rounded-2xl border p-6 transition-all duration-500 ${
                    isCenter
                      ? "glass-panel border-white/10 scale-100 opacity-100 shadow-2xl"
                      : "bg-white/[0.01] border-white/5 scale-[0.97] opacity-60 hidden md:block"
                  }`}
                >
                  {/* Quote Icon */}
                  <Quote className="h-8 w-8 text-primary/20 mb-4" />

                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>

                  {/* Quote Text */}
                  <p className="text-sm text-foreground leading-relaxed mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  {/* Stat Badge */}
                  <div className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 mb-6 ${
                    t.statType === "role"
                      ? "bg-green-500/10 border border-green-500/20"
                      : "bg-primary/10 border border-primary/20"
                  }`}>
                    {t.statType === "role" ? (
                      <Briefcase className="h-3.5 w-3.5 text-green-400" />
                    ) : (
                      <TrendingUp className="h-3.5 w-3.5 text-primary" />
                    )}
                    <span className={`text-xs font-semibold ${t.statType === "role" ? "text-green-400" : "text-primary"}`}>
                      {t.stat}
                    </span>
                    {t.statType === "rate" && (
                      <span className="text-[10px] text-muted-foreground">response rate</span>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-white/5 mb-5" />

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${t.gradientFrom} ${t.gradientTo} flex items-center justify-center text-sm font-bold text-white shrink-0 shadow-lg`}>
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.college} · {t.role}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrent(i); setIsAutoPlaying(false); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "w-8 bg-primary" : "w-1.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Social Proof Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-8">
          {[
            { value: "2,400+", label: "Students active" },
            { value: "18,000+", label: "Messages generated" },
            { value: "32%", label: "Avg response rate" },
            { value: "840+", label: "Interviews secured" },
          ].map((stat, i) => (
            <div key={i} className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
