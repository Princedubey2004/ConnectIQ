/* components/landing/AnimatedLanding.tsx */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Bot, Target, Users, Zap, Play, CheckCircle2,
  BarChart3, MessageSquarePlus, Sparkles, Bell, TrendingUp,
  Menu, X, Star, ExternalLink,
  ChevronRight, Shield, Briefcase,
} from "lucide-react";
import { DemoSection } from "@/components/landing/DemoSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { motion, type Variants } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";

// ── Animation Variants ─────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" as const } },
};

// ── NavLink Component ──────────────────────────────────────────────
function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}

// ── Social Proof Numbers ───────────────────────────────────────────
const METRICS = [
  { value: "2,400+", label: "Students", icon: Users },
  { value: "18,000+", label: "Messages Generated", icon: MessageSquarePlus },
  { value: "32%", label: "Avg Response Rate", icon: TrendingUp },
  { value: "840+", label: "Interviews Secured", icon: Briefcase },
];

// ── Feature Cards ──────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Sparkles,
    title: "AI Message Generator",
    desc: "Generate hyper-personalized LinkedIn requests, cold emails, referral asks, and follow-ups — tailored to each recruiter's background.",
    color: "text-violet-400",
    bg: "bg-violet-400/10",
    badge: "GPT-Powered",
  },
  {
    icon: Users,
    title: "Recruiter CRM Board",
    desc: "A Kanban board to track every recruiter from cold contact to offer. Drag-and-drop cards, add notes, and never lose track.",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    badge: "Drag & Drop",
  },
  {
    icon: Bell,
    title: "Smart Follow-ups",
    desc: "Never let a warm lead go cold. ConnectIQ surfaces recruiters who haven't replied and prompts you exactly when to follow up.",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    badge: "Auto-Reminders",
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    desc: "Track your response rate, pipeline health, and weekly outreach volume. Know exactly what's working in your search.",
    color: "text-green-400",
    bg: "bg-green-400/10",
    badge: "Real-time",
  },
  {
    icon: Target,
    title: "Profile Personalization",
    desc: "Save your resume summary, skills, and target companies. AI uses your profile to write messages that actually sound like you.",
    color: "text-red-400",
    bg: "bg-red-400/10",
    badge: "Context-Aware",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    desc: "Your data is encrypted at rest and in transit. We never share your information or use it for advertising.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    badge: "Privacy-First",
  },
];

// ── How It Works Steps ──────────────────────────────────────────────
const STEPS = [
  { step: "01", title: "Add Recruiter", desc: "Enter recruiter details from LinkedIn. Set your goal — internship, full-time, referral, or informational chat." },
  { step: "02", title: "Generate Message", desc: "Let AI draft the perfect message. Review, copy, and send. One click saves the recruiter to your CRM." },
  { step: "03", title: "Track Conversation", desc: "Move recruiters through your pipeline. Get reminded when to follow up." },
  { step: "04", title: "Land Interview", desc: "Watch your response rate climb and land the interviews you deserve." },
];

// ── Companies ──────────────────────────────────────────────────────
const COMPANIES = ["Google", "Microsoft", "Amazon", "Meta", "Stripe", "Atlassian"];

export default function AnimatedLanding() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile nav on resize
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background relative overflow-x-hidden">
      {/* Glow Background */}
      <div className="glow-bg pointer-events-none" />

      {/* ── Navbar ───────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "glass-panel border-b border-border shadow-sm"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link className="flex items-center gap-2.5 font-bold text-xl shrink-0" href="/">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold shadow-[0_0_15px_rgba(109,93,246,0.5)]">
              CQ
            </div>
            <span className="text-foreground hidden sm:block">ConnectIQ</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 items-center">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#how-it-works">How it Works</NavLink>
            <NavLink href="#testimonials">Testimonials</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <Link href="/login" className="hidden sm:block">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground font-medium">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(109,93,246,0.3)] transition-all font-semibold"
              >
                Get Started
              </Button>
            </Link>
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-hover transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden glass-panel border-t border-border px-4 py-4 space-y-3"
          >
            {[
              { label: "Features", href: "#features" },
              { label: "How it Works", href: "#how-it-works" },
              { label: "Testimonials", href: "#testimonials" },
              { label: "Contact", href: "/contact" },
              { label: "Sign In", href: "/login" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </header>

      <main className="flex-1 pt-24 sm:pt-28">
        {/* ── Hero Section ─────────────────────────────────────── */}
        <section className="w-full pb-16 lg:pb-24 flex flex-col items-center text-center px-4 relative z-10">
          <div className="glow-orb top-10 left-1/2 -translate-x-1/2 absolute" />

          <motion.div
            className="max-w-4xl space-y-6 sm:space-y-8"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} className="flex justify-center">
              <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary font-medium backdrop-blur-md">
                <Zap className="mr-2 h-3.5 w-3.5" />
                AI-Powered Recruiter Outreach
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground leading-[1.05] pb-2"
            >
              Your Personal Networking OS for Landing
              <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-400"> Internships and Full-Time Offers</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mx-auto max-w-3xl text-base sm:text-lg text-muted-foreground font-medium leading-relaxed"
            >
              Generate personalized recruiter outreach, track every conversation, automate follow-ups, and increase interview conversion rates.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-2"
            >
              <Link href="/register">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-base sm:text-lg px-8 h-12 sm:h-14 bg-primary hover:bg-primary/90 text-primary-foreground transition-all font-bold rounded-full shadow-[0_0_30px_rgba(109,93,246,0.4)]"
                >
                  Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-base sm:text-lg px-8 h-12 sm:h-14 border-border hover:bg-surface-hover transition-all font-semibold rounded-full"
                >
                  <Play className="mr-2 h-4 w-4 text-primary fill-primary" /> Watch Demo
                </Button>
              </Link>
            </motion.div>

            {/* Trust line */}
            <motion.p variants={fadeUp} custom={4} className="text-xs text-muted-foreground">
              Free forever · No credit card required · 2,400+ students
            </motion.p>
          </motion.div>

          {/* ── Social Proof Metrics ───────────────────────────── */}
          <motion.div
            className="w-full max-w-3xl mx-auto mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {METRICS.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={i}
                  className="text-center p-4 sm:p-5 rounded-2xl border border-border bg-surface hover:bg-surface-hover transition-colors"
                >
                  <Icon className="h-4 w-4 text-primary mx-auto mb-2" />
                  <div className="text-xl sm:text-2xl font-bold text-foreground">{m.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{m.label}</div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* ── Product Mockup ─────────────────────────────────── */}
          <motion.div
            className="w-full max-w-6xl mx-auto mt-16"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="relative rounded-2xl border border-border glass-panel shadow-2xl overflow-hidden ring-1 ring-primary/10">
              {/* Window chrome */}
              <div className="h-10 sm:h-12 border-b border-border bg-surface/80 flex items-center px-3 sm:px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="mx-auto bg-surface rounded-md px-4 sm:px-20 py-1 text-xs text-muted-foreground border border-border flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-green-400 inline-block" />
                  <span className="text-primary text-xs">app.connectiq.com</span>
                </div>
              </div>
              {/* Mockup body */}
              <div className="grid md:grid-cols-[220px_1fr] bg-background/80 backdrop-blur-2xl">
                {/* Sidebar */}
                <div className="hidden md:flex flex-col border-r border-border p-4 gap-4">
                  <div className="h-7 w-3/4 bg-surface rounded-lg" />
                  <div className="space-y-1.5 mt-4">
                    {[
                      { icon: BarChart3, label: "Overview", active: false },
                      { icon: Users, label: "CRM Board", active: true },
                      { icon: MessageSquarePlus, label: "Generator", active: false },
                      { icon: BarChart3, label: "Analytics", active: false },
                    ].map(({ icon: Icon, label, active }, i) => (
                      <div key={i} className={`h-8 w-full rounded-lg flex items-center px-3 gap-2 text-xs font-medium transition-colors ${active ? "bg-primary/15 border border-primary/20 text-primary" : "text-muted-foreground bg-surface/50"}`}>
                        <Icon className="w-3.5 h-3.5" /> {label}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Main content */}
                <div className="p-4 sm:p-6 space-y-5 min-h-[340px] overflow-hidden">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="space-y-1">
                      <div className="h-6 w-36 sm:w-48 bg-surface rounded-lg" />
                      <div className="h-3.5 w-24 sm:w-56 bg-surface/60 rounded" />
                    </div>
                    <div className="h-9 w-28 sm:w-32 bg-primary rounded-lg" />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {["Recruiters", "Messages", "Replies", "Interviews"].map((m, i) => (
                      <div key={i} className="p-3 sm:p-4 rounded-xl border border-border bg-surface space-y-1.5">
                        <div className="text-[10px] text-muted-foreground">{m}</div>
                        <div className="text-lg sm:text-xl font-bold text-foreground">
                          {["142", "384", "56", "14.5%"][i]}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3 overflow-x-hidden">
                    {["To Contact", "Contacted", "Follow Up", "Interview"].map((col, i) => (
                      <div key={i} className="min-w-[120px] sm:min-w-[160px] flex-1 space-y-2">
                        <div className="text-[10px] text-muted-foreground font-medium flex items-center gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${["bg-slate-400","bg-blue-400","bg-yellow-400","bg-primary"][i]}`} />
                          {col}
                        </div>
                        {Array.from({ length: i === 2 ? 3 : i === 0 ? 2 : 1 }).map((_, j) => (
                          <div key={j} className="w-full bg-surface border border-border rounded-xl p-3 space-y-2">
                            <div className="flex gap-2 items-center">
                              <div className="w-5 h-5 rounded-full bg-surface-hover" />
                              <div className="h-3 w-16 bg-surface-hover rounded" />
                            </div>
                            <div className="h-2.5 w-12 bg-surface-hover/60 rounded" />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── Logos Section ────────────────────────────────────── */}
        <section className="w-full py-10 sm:py-14 border-y border-border bg-surface/30">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-6 sm:mb-8">
              Students from these companies use ConnectIQ
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 md:gap-14">
              {COMPANIES.map((name) => (
                <span
                  key={name}
                  className="text-lg sm:text-xl font-bold tracking-tight text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors duration-300 select-none"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Problem Section ────────────────────────────────────── */}
        <section className="w-full py-20 px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={stagger}
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-4"
            >
              <motion.h2 variants={fadeUp} className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-foreground">
                Why Job Portals Don&apos;t Work
              </motion.h2>
              <motion.p variants={fadeUp} className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
                Applying online is a black hole. Networking is the only way to stand out.
              </motion.p>
            </motion.div>
            
            <motion.div 
              className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto"
              initial="hidden"
              whileInView="visible"
              variants={stagger}
              viewport={{ once: true, margin: "-60px" }}
            >
              <motion.div variants={fadeUp} className="p-8 rounded-2xl bg-surface border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.05)]">
                <div className="text-4xl font-extrabold text-red-400 mb-2">98%</div>
                <div className="text-sm font-medium text-foreground">of applications are ignored</div>
                <p className="text-xs text-muted-foreground mt-2">When you apply through a job portal, your resume goes into a pile with thousands of others.</p>
              </motion.div>
              <motion.div variants={fadeUp} className="p-8 rounded-2xl bg-surface border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.05)]">
                <div className="text-4xl font-extrabold text-green-400 mb-2">12x</div>
                <div className="text-sm font-medium text-foreground">higher chance with referrals</div>
                <p className="text-xs text-muted-foreground mt-2">Getting a direct referral from an employee guarantees your resume is seen by a recruiter.</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── Demo Section ─────────────────────────────────────── */}
        <DemoSection />

        {/* ── Features Section ──────────────────────────────────── */}
        <section id="features" className="w-full py-20 sm:py-28 lg:py-32 px-4 relative scroll-mt-16">
          <div className="max-w-6xl mx-auto space-y-14 sm:space-y-16">
            <motion.div
              className="text-center space-y-4"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.p variants={fadeUp} className="text-sm font-semibold text-primary uppercase tracking-widest">
                Features
              </motion.p>
              <motion.h2 variants={fadeUp} custom={1} className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-foreground">
                Everything you need to
                <br className="hidden sm:block" /> network like a pro
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
                Stop sending generic copy-paste messages. Start having conversations that convert.
              </motion.p>
            </motion.div>

            <motion.div
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {FEATURES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    custom={i}
                    className="feature-card p-7 sm:p-8 flex flex-col"
                  >
                    <div className="flex items-start justify-between mb-5">
                      <div className={`p-3 rounded-xl ${f.bg} inline-flex`}>
                        <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${f.color}`} />
                      </div>
                      <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${f.bg} ${f.color} border-current/20`}>
                        {f.badge}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2.5 text-foreground">{f.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">{f.desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ── Testimonials Section ──────────────────────────────── */}
        <div id="testimonials" className="scroll-mt-16">
          <TestimonialsSection />
        </div>

        {/* ── How It Works Section ───────────────────────────────── */}
        <section id="how-it-works" className="w-full py-20 sm:py-28 lg:py-32 px-4 border-t border-border bg-surface/20 scroll-mt-16">
          <div className="max-w-6xl mx-auto space-y-14 sm:space-y-16">
            <motion.div
              className="text-center space-y-4"
              initial="hidden"
              whileInView="visible"
              variants={stagger}
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.p variants={fadeUp} className="text-sm font-semibold text-primary uppercase tracking-widest">
                How It Works
              </motion.p>
              <motion.h2 variants={fadeUp} custom={1} className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-foreground">
                From zero to interview
                <br className="hidden sm:block" /> in 4 simple steps
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
                A focused workflow designed to maximize your interview conversion rate.
              </motion.p>
            </motion.div>

            <motion.div
              className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-4 relative"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {/* Connecting line (desktop) */}
              <div className="absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent hidden lg:block" />

              {STEPS.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={i}
                  className="relative flex flex-col items-start sm:items-center lg:items-center text-left sm:text-center space-y-4"
                >
                  {/* Step bubble */}
                  <div className="relative">
                    <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-surface border border-border flex items-center justify-center shadow-sm z-10 relative">
                      <span className="step-number text-2xl sm:text-3xl">{item.step}</span>
                    </div>
                    {/* Connector dot on mobile */}
                    {i < STEPS.length - 1 && (
                      <div className="absolute left-7 sm:hidden top-full mt-2 h-8 w-px bg-gradient-to-b from-primary/30 to-transparent" />
                    )}
                  </div>
                  <div className="space-y-2 pl-1 sm:pl-0">
                    <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  {i < STEPS.length - 1 && (
                    <ChevronRight className="hidden lg:block absolute -right-5 top-5 h-5 w-5 text-primary/30" />
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* CTA under How It Works */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/register">
                <Button
                  size="lg"
                  className="h-12 sm:h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full shadow-[0_0_30px_rgba(109,93,246,0.35)] transition-all"
                >
                  Start for Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── FAQ Section ────────────────────────────────────────── */}
        <section className="w-full py-20 sm:py-28 lg:py-32 px-4 border-t border-border bg-background">
          <div className="max-w-4xl mx-auto space-y-12">
            <motion.div
              className="text-center space-y-4"
              initial="hidden"
              whileInView="visible"
              variants={stagger}
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.h2 variants={fadeUp} className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                Frequently Asked Questions
              </motion.h2>
              <motion.p variants={fadeUp} className="text-muted-foreground text-base sm:text-lg">
                Everything you need to know about ConnectIQ.
              </motion.p>
            </motion.div>

            <motion.div
              className="grid gap-6 sm:grid-cols-2"
              initial="hidden"
              whileInView="visible"
              variants={stagger}
              viewport={{ once: true, margin: "-60px" }}
            >
              {[
                { q: "Is ConnectIQ really free?", a: "Yes! ConnectIQ is completely free for students. We believe networking tools should be accessible to everyone." },
                { q: "How does the AI generator work?", a: "We use OpenAI's models to analyze your profile and the recruiter's details to craft highly personalized messages that sound human." },
                { q: "Is my data secure?", a: "Absolutely. We encrypt your data at rest and in transit. Your information is never sold to third parties." },
                { q: "Can I use it for full-time roles?", a: "Yes, ConnectIQ works for internships, full-time roles, new grad positions, and even informational interviews." }
              ].map((faq, i) => (
                <motion.div key={i} variants={fadeUp} className="p-6 rounded-2xl bg-surface border border-border">
                  <h3 className="font-bold text-lg mb-2 text-foreground">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Final CTA Section ─────────────────────────────────── */}
        <section className="w-full py-24 sm:py-32 px-4 text-center relative overflow-hidden">
          {/* Glow layers */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/10 to-background pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(109,93,246,0.2)_0%,_transparent_70%)] pointer-events-none" />

          <motion.div
            className="max-w-3xl mx-auto space-y-6 sm:space-y-8 relative z-10"
            initial="hidden"
            whileInView="visible"
            variants={stagger}
            viewport={{ once: true, margin: "-80px" }}
          >
            {/* Stars */}
            <motion.div variants={fadeUp} className="flex justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              ))}
            </motion.div>

            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground"
            >
              Ready to upgrade
              <br />your job search?
            </motion.h2>

            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg sm:text-xl max-w-xl mx-auto">
              Join <span className="text-foreground font-semibold">2,400+ students</span> who&apos;ve secured{" "}
              <span className="text-foreground font-semibold">840+ interviews</span> using ConnectIQ. Start free today.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/register">
                <div className="relative inline-block">
                  <div className="cta-glow rounded-full" />
                  <Button
                    size="lg"
                    className="relative h-12 sm:h-14 px-10 text-base sm:text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full transition-all"
                  >
                    Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 sm:h-14 px-8 text-base sm:text-lg border-border hover:bg-surface-hover font-semibold rounded-full"
                >
                  Sign In
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} custom={4} className="flex flex-wrap justify-center gap-6 pt-4">
              {["Free forever", "No credit card", "Cancel anytime"].map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  {item}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="w-full border-t border-border bg-surface/30 px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-10 sm:mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1 space-y-4">
              <Link href="/" className="flex items-center gap-2.5 font-bold">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold shadow-lg shadow-primary/30">
                  CQ
                </div>
                <span className="text-foreground text-lg">ConnectIQ</span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">
                AI-powered networking CRM for students and fresh graduates.
              </p>
              <div className="flex items-center gap-3">
                {[
                  { icon: ExternalLink, href: "https://twitter.com", label: "Twitter" },
                  { icon: ExternalLink, href: "https://github.com", label: "GitHub" },
                  { icon: ExternalLink, href: "https://linkedin.com", label: "LinkedIn" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="h-8 w-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface-hover transition-colors"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Product */}
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-foreground">Product</p>
              {[
                { label: "Features", href: "#features" },
                { label: "How It Works", href: "#how-it-works" },
                { label: "Testimonials", href: "#testimonials" },
                { label: "Dashboard", href: "/dashboard" },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Account */}
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-foreground">Account</p>
              {[
                { label: "Sign Up Free", href: "/register" },
                { label: "Sign In", href: "/login" },
                { label: "Profile Settings", href: "/dashboard/profile" },
                { label: "Contact Us", href: "/contact" },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Legal */}
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-foreground">Legal</p>
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} ConnectIQ. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm">
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
