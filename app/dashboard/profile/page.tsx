"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Briefcase, GraduationCap, X, Plus, Save, Loader2, Check, UploadCloud, FileText, Sparkles, Target, Globe } from "lucide-react";

const MotionButton = motion.create(Button);
const MotionCard = motion.create(Card);
import AnimatedProfile from "@/components/dashboard/AnimatedProfile";
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 24 },
  },
};

type ProfileData = {
  fullName: string;
  college: string;
  degree: string;
  graduationYear: string;
  skills: string[];
  targetRoles: string[];
  targetCompanies: string[];
  resumeUrl: string;
  linkedinUrl: string;
  portfolioUrl: string;
  githubUrl: string;
};

const EMPTY_PROFILE: ProfileData = {
  fullName: "",
  college: "",
  degree: "",
  graduationYear: "",
  skills: [],
  targetRoles: [],
  targetCompanies: [],
  resumeUrl: "",
  linkedinUrl: "",
  portfolioUrl: "",
  githubUrl: "",
};

const PROFILE_FIELDS: (keyof ProfileData)[] = [
  "fullName", "college", "degree", "graduationYear",
  "skills", "targetRoles", "targetCompanies",
  "resumeUrl", "linkedinUrl", "portfolioUrl", "githubUrl",
];

function TagInput({
  tags,
  onAdd,
  onRemove,
  placeholder,
}: {
  tags: string[];
  onAdd: (tag: string) => void;
  onRemove: (index: number) => void;
  placeholder: string;
}) {
  const [value, setValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim()) {
      e.preventDefault();
      onAdd(value.trim());
      setValue("");
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <AnimatePresence mode="popLayout">
          {tags.map((tag, i) => (
            <motion.span
              key={tag + "-" + i}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="inline-flex items-center gap-1 bg-primary/10 text-primary border border-primary/20 text-xs font-medium px-2.5 py-1 rounded-md"
            >
              {tag}
              <button onClick={() => onRemove(i)} className="hover:text-white transition-colors">
                <X className="h-3 w-3" />
              </button>
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
      <div className="relative">
        <Plus className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground/50" />
        <Input
          placeholder={placeholder}
          className="pl-9 bg-white/5 border-white/10 text-sm h-9"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>(EMPTY_PROFILE);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    setUploadingResume(true);
    // Simulate AI extraction taking 2 seconds
    setTimeout(() => {
      setProfile({
        ...profile,
        skills: [...new Set([...profile.skills, "React", "TypeScript", "Node.js", "MongoDB", "Python"])],
        targetRoles: [...new Set([...profile.targetRoles, "Software Engineer", "Full Stack Developer"])],
        resumeUrl: "resume_extracted.pdf"
      });
      setUploadingResume(false);
    }, 2000);
  };

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        setProfile({
          fullName: data.fullName || "",
          college: data.college || "",
          degree: data.degree || "",
          graduationYear: data.graduationYear || "",
          skills: data.skills || [],
          targetRoles: data.targetRoles || [],
          targetCompanies: data.targetCompanies || [],
          resumeUrl: data.resumeUrl || "",
          linkedinUrl: data.linkedinUrl || "",
          portfolioUrl: data.portfolioUrl || "",
          githubUrl: data.githubUrl || "",
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const completion = useCallback(() => {
    let filled = 0;
    for (const key of PROFILE_FIELDS) {
      const val = profile[key];
      if (Array.isArray(val)) {
        if (val.length > 0) filled++;
      } else if (val && val.trim() !== "") {
        filled++;
      }
    }
    return Math.round((filled / PROFILE_FIELDS.length) * 100);
  }, [profile]);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (error) {
      console.error("Failed to save profile", error);
    } finally {
      setSaving(false);
    }
  };

  const pct = completion();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
  <AnimatedProfile>
    <motion.div
      className="space-y-8 pb-8 max-w-4xl"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        variants={cardVariants}
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile Setup</h1>
          <p className="text-muted-foreground mt-1">Complete your profile to personalize AI-generated messages.</p>
        </div>
        <MotionButton
          className="bg-foreground text-background hover:bg-foreground/90 font-semibold shadow-sm"
          onClick={handleSave}
          disabled={saving}
          whileHover={{ scale: 1.04, boxShadow: "0 4px 20px rgba(255,255,255,0.1)" }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : saved ? <Check className="mr-2 h-4 w-4 text-green-500" /> : <Save className="mr-2 h-4 w-4" />}
          {saved ? "Saved!" : "Save Profile"}
        </MotionButton>
      </motion.div>

      {/* Progress Bar */}
      <MotionCard className="glass-panel border-white/5" variants={cardVariants}>
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Profile Completion</span>
            <span className="text-sm font-bold text-foreground">{pct}%</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {pct === 100 ? "🎉 Your profile is complete!" : `Fill in ${PROFILE_FIELDS.length - Math.round((pct / 100) * PROFILE_FIELDS.length)} more fields to maximize AI personalization.`}
          </p>
        </CardContent>
      </MotionCard>

      {/* Resume Upload AI */}
      <MotionCard className="glass-panel border-white/5 border-primary/20 bg-primary/5" variants={cardVariants}>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" /> Auto-Fill with Resume
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-center border border-dashed border-primary/30 rounded-xl p-6 bg-white/[0.01]">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              {uploadingResume ? <Loader2 className="h-6 w-6 text-primary animate-spin" /> : <FileText className="h-6 w-6 text-primary" />}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-sm font-semibold">Upload your resume (PDF/DOCX)</p>
              <p className="text-xs text-muted-foreground mt-1">We'll automatically extract your skills, experience, and projects.</p>
            </div>
            <div className="relative">
              <input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                accept=".pdf,.doc,.docx" 
                onChange={handleResumeUpload}
                disabled={uploadingResume}
              />
              <Button variant="secondary" className="pointer-events-none" disabled={uploadingResume}>
                {uploadingResume ? "Extracting Data..." : "Upload File"}
              </Button>
            </div>
          </div>
          {profile.resumeUrl && !uploadingResume && (
             <p className="text-xs text-green-400 mt-3 flex items-center gap-1.5"><Check className="h-3 w-3" /> Successfully extracted data from {profile.resumeUrl}</p>
          )}
        </CardContent>
      </MotionCard>

      {/* Personal Information */}
      <MotionCard className="glass-panel border-white/5" variants={cardVariants}>
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Personal Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <div className="h-20 w-20 rounded-full bg-surface-hover border border-border flex items-center justify-center relative group overflow-hidden shrink-0">
              {profile.fullName ? (
                <span className="text-2xl font-bold text-muted-foreground group-hover:opacity-0 transition-opacity">{profile.fullName.charAt(0)}</span>
              ) : (
                <User className="h-8 w-8 text-muted-foreground group-hover:opacity-0 transition-opacity" />
              )}
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <UploadCloud className="h-4 w-4 text-white mb-1" />
                <span className="text-[10px] text-white font-medium">Upload</span>
                <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
              </div>
            </div>
            <div className="flex-1 space-y-1.5 w-full">
              <label className="text-xs text-muted-foreground font-medium">Full Name</label>
              <Input
                placeholder="e.g. John Doe"
                className="bg-white/5 border-white/10 text-sm h-9"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium">College / University</label>
              <Input className="bg-white/5 border-white/10 text-sm h-9" placeholder="IIT Delhi" value={profile.college} onChange={(e) => setProfile({ ...profile, college: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium">Degree</label>
              <Input className="bg-white/5 border-white/10 text-sm h-9" placeholder="B.Tech Computer Science" value={profile.degree} onChange={(e) => setProfile({ ...profile, degree: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium">Graduation Year</label>
              <Input className="bg-white/5 border-white/10 text-sm h-9" placeholder="2026" value={profile.graduationYear} onChange={(e) => setProfile({ ...profile, graduationYear: e.target.value })} />
            </div>
          </div>
        </CardContent>
      </MotionCard>

      {/* Career Goals */}
      <MotionCard className="glass-panel border-white/5" variants={cardVariants}>
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="p-2 rounded-lg bg-yellow-400/10">
            <Target className="h-5 w-5 text-yellow-400" />
          </div>
          <div>
            <CardTitle className="text-lg">Career Goals</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-medium">Skills (press Enter to add)</label>
            <TagInput
              tags={profile.skills}
              onAdd={(tag) => setProfile({ ...profile, skills: [...profile.skills, tag] })}
              onRemove={(i) => setProfile({ ...profile, skills: profile.skills.filter((_, idx) => idx !== i) })}
              placeholder="e.g. React, Python, System Design"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-medium">Target Roles (press Enter to add)</label>
            <TagInput
              tags={profile.targetRoles}
              onAdd={(tag) => setProfile({ ...profile, targetRoles: [...profile.targetRoles, tag] })}
              onRemove={(i) => setProfile({ ...profile, targetRoles: profile.targetRoles.filter((_, idx) => idx !== i) })}
              placeholder="e.g. SWE Intern, Product Manager"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-medium">Target Companies (press Enter to add)</label>
            <TagInput
              tags={profile.targetCompanies}
              onAdd={(tag) => setProfile({ ...profile, targetCompanies: [...profile.targetCompanies, tag] })}
              onRemove={(i) => setProfile({ ...profile, targetCompanies: profile.targetCompanies.filter((_, idx) => idx !== i) })}
              placeholder="e.g. Google, Stripe, Vercel"
            />
          </div>
        </CardContent>
      </MotionCard>

      {/* Digital Presence */}
      <MotionCard className="glass-panel border-white/5" variants={cardVariants}>
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="p-2 rounded-lg bg-green-400/10">
            <Globe className="h-5 w-5 text-green-400" />
          </div>
          <div>
            <CardTitle className="text-lg">Digital Presence</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium">LinkedIn URL</label>
              <Input className="bg-white/5 border-white/10 text-sm h-9" placeholder="https://linkedin.com/in/your-profile" value={profile.linkedinUrl} onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium">GitHub URL</label>
              <Input className="bg-white/5 border-white/10 text-sm h-9" placeholder="https://github.com/username" value={profile.githubUrl} onChange={(e) => setProfile({ ...profile, githubUrl: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium">Portfolio URL</label>
              <Input className="bg-white/5 border-white/10 text-sm h-9" placeholder="https://yourportfolio.com" value={profile.portfolioUrl} onChange={(e) => setProfile({ ...profile, portfolioUrl: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium">Resume Link</label>
              <Input className="bg-white/5 border-white/10 text-sm h-9" placeholder="https://drive.google.com/your-resume" value={profile.resumeUrl} onChange={(e) => setProfile({ ...profile, resumeUrl: e.target.value })} />
            </div>
          </div>
        </CardContent>
      </MotionCard>
    </motion.div>
    </AnimatedProfile>
  );
}
