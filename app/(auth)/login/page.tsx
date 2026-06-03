"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Eye, EyeOff, AlertCircle, ArrowRight, Sparkles, Users, BarChart3 } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

const features = [
  { icon: Sparkles, text: "AI-powered recruiter messages" },
  { icon: Users, text: "Kanban CRM to track pipeline" },
  { icon: BarChart3, text: "Analytics & follow-up reminders" },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await signIn("credentials", { redirect: false, email, password });
      if (res?.error) {
        setError("Invalid email or password. Please try again.");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel — Branding */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[40%] flex-col justify-between p-10 xl:p-14 bg-surface border-r border-border relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-bold text-xl relative z-10">
          <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold shadow-[0_0_20px_rgba(109,93,246,0.5)]">
            CQ
          </div>
          <span className="text-foreground">ConnectIQ</span>
        </Link>

        {/* Middle content */}
        <motion.div
          className="space-y-8 relative z-10"
          initial="hidden"
          animate="visible"
        >
          <div className="space-y-3">
            <h2 className="text-3xl xl:text-4xl font-bold text-foreground leading-tight">
              Land your dream internship
              <span className="text-primary"> faster.</span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Join 2,400+ students using AI to personalize their recruiter outreach and track every conversation.
            </p>
          </div>

          <div className="space-y-3">
            {features.map(({ icon: Icon, text }, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                className="flex items-center gap-3"
              >
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-foreground font-medium">{text}</span>
              </motion.div>
            ))}
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-3 p-4 rounded-2xl border border-border bg-background/50">
            <div className="flex -space-x-2">
              {["AM", "PS", "RC", "SP"].map((init, i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-surface flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: `hsl(${i * 60 + 220}, 70%, 55%)` }}
                >
                  {init}
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">840+ interviews secured</p>
              <p className="text-[10px] text-muted-foreground">by students just like you</p>
            </div>
          </div>
        </motion.div>

        <p className="text-xs text-muted-foreground relative z-10">© {new Date().getFullYear()} ConnectIQ</p>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-12">
        {/* Mobile logo */}
        <Link href="/" className="flex lg:hidden items-center gap-2 font-bold text-xl mb-8">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
            CQ
          </div>
          <span className="text-foreground">ConnectIQ</span>
        </Link>

        <motion.div
          className="w-full max-w-sm space-y-8"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Welcome back</h1>
            <p className="text-muted-foreground text-sm">Sign in to your ConnectIQ account</p>
          </motion.div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2.5 rounded-xl bg-red-500/10 border border-red-500/20 p-3.5 text-sm text-red-400"
            >
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Form */}
          <motion.form variants={fadeUp} custom={1} onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="student@example.com"
                className="auth-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                autoComplete="email"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide" htmlFor="password">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="auth-input pr-11"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(109,93,246,0.3)] disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.99 }}
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>Sign In <ArrowRight className="h-4 w-4" /></>
              )}
            </motion.button>
          </motion.form>

          {/* Divider */}
          <motion.div variants={fadeUp} custom={2} className="relative flex items-center gap-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">Don&apos;t have an account?</span>
            <div className="flex-1 h-px bg-border" />
          </motion.div>

          {/* Register link */}
          <motion.div variants={fadeUp} custom={3}>
            <Link href="/register">
              <button className="w-full h-11 border border-border hover:bg-surface-hover text-foreground font-semibold rounded-xl flex items-center justify-center gap-2 transition-all text-sm">
                Create a Free Account
              </button>
            </Link>
          </motion.div>

          <motion.p variants={fadeUp} custom={4} className="text-center text-xs text-muted-foreground">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-primary hover:underline">Terms</Link>
            {" "}and{" "}
            <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
