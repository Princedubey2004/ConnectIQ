"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Sparkles, Copy, Check, Save, RotateCcw, Building2, User, Loader2 } from "lucide-react";

type GeneratedMessages = {
  linkedin: string;
  followUp: string;
  referral: string;
  coldEmail: string;
};

// -- Animation Variants --
const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const formContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const formFieldVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

const resultCardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      type: "spring" as const,
      stiffness: 260,
      damping: 22,
    },
  }),
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2 },
  },
};

const shimmerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: "easeOut" as const,
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const pulseAnimation = {
  opacity: [0.4, 1, 0.4] as number[],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
} as const;

const buttonHover = {
  scale: 1.04,
  transition: { type: "spring" as const, stiffness: 400, damping: 15 },
};

const buttonTap = {
  scale: 0.97,
};

export default function GeneratorPage() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [messages, setMessages] = useState<GeneratedMessages | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedToCrm, setSavedToCrm] = useState(false);

  const [activeTab, setActiveTab] = useState<"linkedin" | "email" | "followUp">("linkedin");
  const [form, setForm] = useState({
    recruiterName: "",
    company: "",
    role: "Technical Recruiter",
    goal: "Internship",
    messageType: "LinkedIn Request",
    tone: "Professional",
    length: "Short",
    resumeSummary: "",
    additionalContext: "",
  });

  const handleGenerate = async () => {
    setLoading(true);
    setMessages(null);
    setSavedToCrm(false);
    
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);
      
      setMessages(data);
    } catch (error) {
      console.error("Failed to generate messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveToCRM = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/recruiters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.recruiterName,
          company: form.company,
          role: form.role,
          status: "To Contact",
          notes: "Auto-saved from AI Generator. Goal: " + form.goal,
        }),
      });
      if (res.ok) {
        setSavedToCrm(true);
      }
    } catch (error) {
      console.error("Failed to save to CRM", error);
    } finally {
      setSaving(false);
    }
  };

  const ResultCard = ({ title, content, id, index }: { title: string; content: string; id: string; index: number }) => (
    <motion.div
      custom={index}
      variants={resultCardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
    >
      <Card className="glass-panel border-white/5 bg-white/[0.02] shadow-none hover:border-white/10 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
          <CardTitle className="text-sm font-semibold text-primary">{title}</CardTitle>
          <motion.div whileHover={buttonHover} whileTap={buttonTap}>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={() => handleCopy(content, id)}
            >
              {copiedId === id ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
            </Button>
          </motion.div>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{content}</p>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <motion.div
      className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-6rem)] relative overflow-hidden"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      
      {/* Left Panel: Input Form */}
      <div className="w-full lg:w-[400px] xl:w-[450px] shrink-0 flex flex-col h-full bg-surface border border-white/5 rounded-2xl overflow-hidden shadow-xl z-10">
        <div className="p-4 border-b border-white/5 bg-white/[0.02]">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" /> Input Context
          </h2>
          <p className="text-xs text-muted-foreground mt-1">Provide details to generate personalized outreach.</p>
        </div>
        
        <div className="p-4 space-y-5 overflow-y-auto custom-scrollbar flex-1">
          <motion.div
            className="space-y-4"
            variants={formContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="grid grid-cols-2 gap-4" variants={formFieldVariants}>
              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground font-medium">Recruiter Name</label>
                <div className="relative">
                  <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground/50" />
                  <Input 
                    placeholder="e.g. Jane Doe" 
                    className="pl-9 bg-white/5 border-white/10 text-sm h-9"
                    value={form.recruiterName}
                    onChange={(e) => setForm({...form, recruiterName: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground font-medium">Company</label>
                <div className="relative">
                  <Building2 className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground/50" />
                  <Input 
                    placeholder="e.g. Google" 
                    className="pl-9 bg-white/5 border-white/10 text-sm h-9"
                    value={form.company}
                    onChange={(e) => setForm({...form, company: e.target.value})}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div className="space-y-1.5" variants={formFieldVariants}>
              <label className="text-xs text-muted-foreground font-medium">Recruiter Role</label>
              <Input 
                placeholder="e.g. University Recruiter" 
                className="bg-white/5 border-white/10 text-sm h-9"
                value={form.role}
                onChange={(e) => setForm({...form, role: e.target.value})}
              />
            </motion.div>

            <motion.div className="space-y-1.5 flex flex-col" variants={formFieldVariants}>
              <label className="text-xs text-muted-foreground font-medium">Message Type</label>
              <select 
                className="bg-white/5 border border-white/10 h-9 text-sm rounded-md px-3 text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                value={form.messageType} 
                onChange={(e) => setForm({...form, messageType: e.target.value})}
              >
                <option className="bg-surface" value="LinkedIn Request">LinkedIn Request</option>
                <option className="bg-surface" value="Referral Request">Referral Request</option>
                <option className="bg-surface" value="Cold Email">Cold Email</option>
                <option className="bg-surface" value="Follow-Up">Follow-Up</option>
                <option className="bg-surface" value="Thank You Message">Thank You Message</option>
                <option className="bg-surface" value="Interview Follow-Up">Interview Follow-Up</option>
              </select>
            </motion.div>

            <motion.div className="grid grid-cols-2 gap-4" variants={formFieldVariants}>
              <div className="space-y-1.5 flex flex-col">
                <label className="text-xs text-muted-foreground font-medium">Tone</label>
                <select 
                  className="bg-white/5 border border-white/10 h-9 text-sm rounded-md px-3 text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                  value={form.tone} 
                  onChange={(e) => setForm({...form, tone: e.target.value})}
                >
                  <option className="bg-surface" value="Professional">Professional</option>
                  <option className="bg-surface" value="Friendly">Friendly</option>
                  <option className="bg-surface" value="Formal">Formal</option>
                  <option className="bg-surface" value="Confident">Confident</option>
                  <option className="bg-surface" value="Concise">Concise</option>
                </select>
              </div>
              <div className="space-y-1.5 flex flex-col">
                <label className="text-xs text-muted-foreground font-medium">Length</label>
                <select 
                  className="bg-white/5 border border-white/10 h-9 text-sm rounded-md px-3 text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                  value={form.length} 
                  onChange={(e) => setForm({...form, length: e.target.value})}
                >
                  <option className="bg-surface" value="Short">Short (50 words)</option>
                  <option className="bg-surface" value="Medium">Medium (100 words)</option>
                  <option className="bg-surface" value="Long">Long (200 words)</option>
                </select>
              </div>
            </motion.div>

            <motion.div className="space-y-1.5" variants={formFieldVariants}>
              <label className="text-xs text-muted-foreground font-medium">Your Background (Resume Summary)</label>
              <textarea 
                placeholder="e.g. CS student at Stanford, built 3 full-stack apps, incoming SWE intern at Meta." 
                className="w-full rounded-md px-3 py-2 bg-white/5 border border-white/10 text-sm min-h-[80px] resize-none focus:ring-2 focus:ring-primary focus:outline-none custom-scrollbar text-foreground"
                value={form.resumeSummary}
                onChange={(e) => setForm({...form, resumeSummary: e.target.value})}
              />
            </motion.div>

            <motion.div className="space-y-1.5" variants={formFieldVariants}>
              <label className="text-xs text-muted-foreground font-medium">Additional Context (Optional)</label>
              <textarea 
                placeholder="e.g. We went to the same college, or I met them at a career fair." 
                className="w-full rounded-md px-3 py-2 bg-white/5 border border-white/10 text-sm min-h-[60px] resize-none focus:ring-2 focus:ring-primary focus:outline-none custom-scrollbar text-foreground"
                value={form.additionalContext}
                onChange={(e) => setForm({...form, additionalContext: e.target.value})}
              />
            </motion.div>
          </motion.div>
        </div>

        <div className="p-4 border-t border-white/5 bg-white/[0.02]">
          <motion.div whileHover={buttonHover} whileTap={buttonTap}>
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all"
              onClick={handleGenerate}
              disabled={loading || !form.recruiterName || !form.company}
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              {loading ? "Generating Output..." : "Generate Messages"}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Right Panel: Output Chat UI */}
      <div className="flex-1 flex flex-col h-full bg-[#0a0a0c]/50 border border-white/5 rounded-2xl relative overflow-hidden backdrop-blur-3xl z-10">
        {/* Header */}
        <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-white/[0.01]">
          <h2 className="font-semibold text-sm">Output Area</h2>
          <AnimatePresence>
            {messages && (
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <motion.div whileHover={buttonHover} whileTap={buttonTap}>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 border-white/10 bg-white/5 text-xs hover:bg-white/10"
                    onClick={handleGenerate}
                    disabled={loading}
                  >
                    <RotateCcw className="mr-1.5 h-3 w-3" /> Regenerate
                  </Button>
                </motion.div>
                <motion.div whileHover={buttonHover} whileTap={buttonTap}>
                  <Button 
                    size="sm" 
                    className="h-8 bg-foreground text-background hover:bg-foreground/90 text-xs shadow-sm"
                    onClick={handleSaveToCRM}
                    disabled={saving || savedToCrm}
                  >
                    {savedToCrm ? <Check className="mr-1.5 h-3 w-3 text-green-500" /> : <Save className="mr-1.5 h-3 w-3" />}
                    {savedToCrm ? "Saved" : "Save to CRM"}
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar relative">
          <AnimatePresence mode="wait">
            {!messages && !loading && (
              <motion.div
                key="empty-state"
                className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-50 space-y-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 0.5, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <div className="h-16 w-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Ready to Generate</h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-xs">Fill out the context on the left and let AI write your outreach in seconds.</p>
                </div>
              </motion.div>
            )}

            {loading && (
              <motion.div
                key="loading-state"
                className="space-y-6 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {[0, 1, 2, 3].map(i => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={shimmerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="glass-panel border-white/5 rounded-xl p-4 space-y-3 relative overflow-hidden"
                  >
                    <motion.div
                      className="h-5 w-32 bg-white/10 rounded"
                      animate={pulseAnimation}
                    />
                    <motion.div
                      className="h-4 w-full bg-white/5 rounded"
                      animate={pulseAnimation}
                    />
                    <motion.div
                      className="h-4 w-3/4 bg-white/5 rounded"
                      animate={pulseAnimation}
                    />
                    {/* Shimmer overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 0.15,
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {messages && !loading && (
              <motion.div
                key="results-state"
                className="max-w-3xl mx-auto flex flex-col h-full pb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-2">
                  <button
                    onClick={() => setActiveTab("linkedin")}
                    className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${activeTab === "linkedin" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                  >
                    LinkedIn Version
                  </button>
                  <button
                    onClick={() => setActiveTab("email")}
                    className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${activeTab === "email" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                  >
                    Email Version
                  </button>
                  <button
                    onClick={() => setActiveTab("followUp")}
                    className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${activeTab === "followUp" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                  >
                    Follow-Up
                  </button>
                </div>
                
                <div className="flex gap-4 items-start flex-1 overflow-y-auto">
                  <motion.div
                    className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30 mt-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" as const, stiffness: 400, damping: 15, delay: 0.1 }}
                  >
                    <Bot className="h-4 w-4 text-primary" />
                  </motion.div>
                  <div className="space-y-4 w-full pb-8">
                    <motion.p
                      className="text-sm text-foreground mt-1 mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.4 }}
                    >
                      Here is your <span className="font-semibold text-primary">{form.tone.toLowerCase()}, {form.length.toLowerCase()}</span> message for <span className="font-semibold text-primary">{form.recruiterName}</span>:
                    </motion.p>
                    
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="w-full h-full min-h-[300px]"
                      >
                        {activeTab === "linkedin" && (
                          <ResultCard title="LinkedIn Connection Request" content={messages.linkedin} id="linkedin" index={0} />
                        )}
                        {activeTab === "email" && (
                          <ResultCard title="Cold Email" content={messages.coldEmail} id="coldEmail" index={0} />
                        )}
                        {activeTab === "followUp" && (
                          <ResultCard title="Follow-up Message" content={messages.followUp} id="followUp" index={0} />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
