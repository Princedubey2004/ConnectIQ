"use client";

import { useState, useEffect } from "react";
import { UserPlus, Sparkles, MessageSquare, Trophy, ArrowRight, CheckCircle2 } from "lucide-react";

const STEPS = [
  {
    id: 1,
    title: "Add Recruiter",
    subtitle: "Enter recruiter details into your CRM",
    icon: UserPlus,
    color: "from-blue-500 to-cyan-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    accent: "text-blue-400",
    content: (
      <div className="space-y-4 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
            <UserPlus className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">New Recruiter</div>
            <div className="text-xs text-muted-foreground">Add to pipeline</div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Name</div>
            <div className="h-9 rounded-lg bg-white/5 border border-white/10 flex items-center px-3 text-sm text-foreground">Sarah Chen</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Company</div>
              <div className="h-9 rounded-lg bg-white/5 border border-white/10 flex items-center px-3 text-sm text-foreground">Google</div>
            </div>
            <div className="space-y-1.5">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Role</div>
              <div className="h-9 rounded-lg bg-white/5 border border-white/10 flex items-center px-3 text-sm text-foreground">University Recruiter</div>
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">LinkedIn</div>
            <div className="h-9 rounded-lg bg-white/5 border border-white/10 flex items-center px-3 text-xs text-blue-400">linkedin.com/in/sarah-chen</div>
          </div>
          <div className="pt-2">
            <div className="h-10 rounded-lg bg-blue-500 flex items-center justify-center text-sm font-semibold text-white shadow-lg shadow-blue-500/20">
              <UserPlus className="h-4 w-4 mr-2" /> Add to CRM
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: "Generate Message",
    subtitle: "AI writes personalized outreach",
    icon: Sparkles,
    color: "from-primary to-purple-400",
    bg: "bg-primary/10",
    border: "border-primary/20",
    accent: "text-primary",
    content: (
      <div className="space-y-4 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">AI Generator</div>
            <div className="text-xs text-muted-foreground">Powered by Gemini</div>
          </div>
        </div>
        <div className="rounded-xl bg-white/[0.03] border border-white/5 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
              <Sparkles className="h-3 w-3 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">LinkedIn Connection Request</span>
          </div>
          <p className="text-sm text-foreground leading-relaxed">
            Hi Sarah! I&apos;m a CS student at Stanford working on full-stack projects with React and Python. I&apos;d love to connect and learn about SWE opportunities at Google. Would you be open to a quick chat?
          </p>
          <div className="flex gap-2 pt-1">
            <div className="h-7 px-3 rounded-md bg-white/5 border border-white/10 flex items-center text-[10px] text-muted-foreground cursor-pointer hover:bg-white/10 transition-colors">Copy</div>
            <div className="h-7 px-3 rounded-md bg-primary/10 border border-primary/20 flex items-center text-[10px] text-primary cursor-pointer hover:bg-primary/20 transition-colors">Regenerate</div>
          </div>
        </div>
        <div className="rounded-xl bg-white/[0.03] border border-white/5 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
              <Sparkles className="h-3 w-3 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">Cold Email</span>
          </div>
          <p className="text-sm text-foreground leading-relaxed">
            Subject: Stanford CS Student — Interested in Google SWE Roles
            <br />
            <span className="text-muted-foreground">Dear Sarah, I hope this email finds you well...</span>
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: "Track Conversation",
    subtitle: "Manage pipeline with drag & drop",
    icon: MessageSquare,
    color: "from-yellow-500 to-orange-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    accent: "text-yellow-400",
    content: (
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-yellow-400" />
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">CRM Board</div>
            <div className="text-xs text-muted-foreground">Drag to update status</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { name: "Contacted", color: "bg-blue-400", cards: [{ n: "Sarah C.", c: "Google" }, { n: "Mike R.", c: "Meta" }] },
            { name: "Follow Up", color: "bg-yellow-400", cards: [{ n: "Lisa T.", c: "Stripe" }] },
            { name: "Interview", color: "bg-primary", cards: [{ n: "James W.", c: "Apple" }] },
          ].map((col, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
                <div className={`w-1.5 h-1.5 rounded-full ${col.color}`} />
                {col.name}
              </div>
              {col.cards.map((card, j) => (
                <div key={j} className="rounded-lg bg-white/5 border border-white/10 p-3 space-y-1.5 hover:border-white/20 transition-colors cursor-grab">
                  <div className="text-xs font-medium text-foreground">{card.n}</div>
                  <div className="text-[10px] text-muted-foreground">{card.c}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 pt-2 text-xs text-muted-foreground">
          <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
          <span>Sarah Chen moved to <span className="text-yellow-400 font-medium">Follow Up</span></span>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: "Land Interview",
    subtitle: "Track wins and celebrate success",
    icon: Trophy,
    color: "from-green-500 to-emerald-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    accent: "text-green-400",
    content: (
      <div className="p-6 space-y-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-xl bg-green-500/20 flex items-center justify-center">
            <Trophy className="h-5 w-5 text-green-400" />
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">Interview Secured! 🎉</div>
            <div className="text-xs text-muted-foreground">Your pipeline is working</div>
          </div>
        </div>
        <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-sm font-bold text-white">SC</div>
              <div>
                <div className="text-sm font-semibold text-foreground">Sarah Chen — Google</div>
                <div className="text-xs text-green-400">Interview Scheduled</div>
              </div>
            </div>
            <div className="h-7 px-3 rounded-full bg-green-500/20 text-green-400 text-[10px] font-medium flex items-center">SWE Intern</div>
          </div>
          <div className="h-px bg-white/5" />
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="rounded-lg bg-white/[0.03] p-3">
              <div className="text-lg font-bold text-foreground">42%</div>
              <div className="text-[10px] text-muted-foreground">Response Rate</div>
            </div>
            <div className="rounded-lg bg-white/[0.03] p-3">
              <div className="text-lg font-bold text-foreground">3</div>
              <div className="text-[10px] text-muted-foreground">Interviews</div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-green-400 font-medium">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Pipeline conversion: 14.5%
        </div>
      </div>
    ),
  },
];

export function DemoSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const currentStep = STEPS[activeStep];

  return (
    <section id="demo" className="w-full py-24 lg:py-32 px-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary font-medium backdrop-blur-md">
            <Sparkles className="mr-2 h-4 w-4" /> See it in action
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            From cold outreach to <br className="hidden md:block" />interview in 4 steps
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Watch how ConnectIQ streamlines your entire recruiter networking workflow.
          </p>
        </div>

        {/* Step Navigator */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const isActive = i === activeStep;
            return (
              <button
                key={step.id}
                onClick={() => {
                  setActiveStep(i);
                  setIsAutoPlaying(false);
                }}
                className={`relative rounded-xl p-4 text-left transition-all duration-300 border ${
                  isActive
                    ? `${step.bg} ${step.border} shadow-lg`
                    : "bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]"
                }`}
              >
                {/* Progress bar for autoplay */}
                {isActive && isAutoPlaying && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden rounded-b-xl">
                    <div className="h-full bg-gradient-to-r from-primary to-primary/50 animate-progress-bar" />
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${isActive ? step.bg : "bg-white/5"}`}>
                    <Icon className={`h-4 w-4 ${isActive ? step.accent : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <div className={`text-xs font-bold ${isActive ? step.accent : "text-muted-foreground"}`}>Step {step.id}</div>
                    <div className={`text-sm font-semibold ${isActive ? "text-foreground" : "text-muted-foreground"}`}>{step.title}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Laptop Mockup */}
        <div className="max-w-3xl mx-auto">
          {/* Laptop Top Bezel */}
          <div className="mx-8 h-3 bg-[#2a2a2d] rounded-t-2xl border-t border-x border-white/10" />
          
          {/* Laptop Screen */}
          <div className="mx-4 rounded-t-xl border border-white/10 bg-[#0c0c0e] shadow-2xl shadow-black/50 overflow-hidden relative">
            {/* Browser Chrome */}
            <div className="h-10 bg-[#1a1a1e] border-b border-white/5 flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-white/5 rounded-md px-12 py-1 text-[10px] text-muted-foreground border border-white/5 flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                  app.connectiq.com
                </div>
              </div>
            </div>

            {/* Screen Content — animated */}
            <div className="min-h-[400px] relative">
              {STEPS.map((step, i) => (
                <div
                  key={step.id}
                  className={`absolute inset-0 transition-all duration-500 ease-out ${
                    i === activeStep
                      ? "opacity-100 translate-y-0"
                      : i < activeStep
                      ? "opacity-0 -translate-y-4"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  {step.content}
                </div>
              ))}
            </div>
          </div>

          {/* Laptop Bottom Bezel */}
          <div className="mx-4 h-3 bg-[#2a2a2d] border-x border-b border-white/10 rounded-b-md" />
          <div className="mx-12 h-2 bg-[#1e1e21] rounded-b-2xl border-x border-b border-white/5" />
          <div className="mx-24 h-1 bg-[#1a1a1d] rounded-b-xl" />
        </div>
      </div>
    </section>
  );
}
