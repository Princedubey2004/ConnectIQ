"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Eye, EyeOff, AlertCircle, CheckCircle2, ArrowRight, Sparkles, Users, BarChart3 } from "lucide-react";

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

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "8+ characters", pass: password.length >= 8 },
    { label: "Uppercase letter", pass: /[A-Z]/.test(password) },
    { label: "Number", pass: /[0-9]/.test(password) },
  ];
  const score = checks.filter((c) => c.pass).length;
  const colors = ["bg-red-500", "bg-yellow-500", "bg-green-500"];
  const labels = ["Weak", "Fair", "Strong"];

  if (!password) return null;

  return (
    <div className="space-y-2 mt-2">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i < score ? colors[score - 1] : "bg-border"
            }`}
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {checks.map((c, i) => (
            <span key={i} className={`text-[10px] flex items-center gap-1 ${c.pass ? "text-green-400" : "text-muted-foreground"}`}>
              <span>{c.pass ? "✓" : "·"}</span> {c.label}
            </span>
          ))}
        </div>
        {score > 0 && (
          <span className={`text-[10px] font-semibold ${colors[score - 1].replace("bg-", "text-")}`}>
            {labels[score - 1]}
          </span>
        )}
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState<"general" | "duplicate">("general");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      setErrorType("general");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setErrorType("general");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409 || data.message?.toLowerCase().includes("exists")) {
          setErrorType("duplicate");
          setError("An account with this email already exists.");
        } else {
          setErrorType("general");
          setError(data.message || "Registration failed. Please try again.");
        }
      } else {
        setSuccess(true);
        setTimeout(() => router.push("/login"), 2500);
      }
    } catch {
      setErrorType("general");
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[40%] flex-col justify-between p-10 xl:p-14 bg-surface border-r border-border relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <Link href="/" className="flex items-center gap-2.5 font-bold text-xl relative z-10">
          <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold shadow-[0_0_20px_rgba(109,93,246,0.5)]">
            CQ
          </div>
          <span className="text-foreground">ConnectIQ</span>
        </Link>

        <motion.div className="space-y-8 relative z-10" initial="hidden" animate="visible">
          <div className="space-y-3">
            <h2 className="text-3xl xl:text-4xl font-bold text-foreground leading-tight">
              Your job search,
              <span className="text-primary"> supercharged.</span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Create your free account and start generating personalized recruiter messages in minutes.
            </p>
          </div>

          <div className="space-y-3">
            {features.map(({ icon: Icon, text }, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-foreground font-medium">{text}</span>
              </motion.div>
            ))}
          </div>

          <div className="p-4 rounded-2xl border border-border bg-background/50 space-y-1.5">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-yellow-400 text-sm">★</span>
              ))}
            </div>
            <p className="text-sm text-foreground font-medium">
              &ldquo;Got 4 recruiter responses in my first month!&rdquo;
            </p>
            <p className="text-xs text-muted-foreground">— Sneha Patel, NIT Trichy · Amazon Intern</p>
          </div>
        </motion.div>

        <p className="text-xs text-muted-foreground relative z-10">© {new Date().getFullYear()} ConnectIQ</p>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-12">
        {/* Mobile logo */}
        <Link href="/" className="flex lg:hidden items-center gap-2 font-bold text-xl mb-8">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
            CQ
          </div>
          <span className="text-foreground">ConnectIQ</span>
        </Link>

        <motion.div
          className="w-full max-w-sm space-y-6"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.div variants={fadeUp} className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Create your account</h1>
            <p className="text-muted-foreground text-sm">Free forever · No credit card required</p>
          </motion.div>

          {/* Duplicate email error */}
          {error && errorType === "duplicate" && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-4 space-y-3"
            >
              <div className="flex items-start gap-2.5 text-sm text-yellow-400">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>Account already exists. Sign in instead.</span>
              </div>
              <Link href="/login">
                <button className="w-full h-9 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 font-semibold rounded-lg text-sm flex items-center justify-center gap-2 transition-colors border border-yellow-500/20">
                  Sign In to ConnectIQ <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </Link>
            </motion.div>
          )}

          {/* General error */}
          {error && errorType === "general" && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2.5 rounded-xl bg-red-500/10 border border-red-500/20 p-3.5 text-sm text-red-400"
            >
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Success state */}
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center space-y-3 rounded-xl bg-green-500/10 border border-green-500/20 p-6"
            >
              <CheckCircle2 className="h-10 w-10 text-green-400" />
              <div>
                <p className="font-semibold text-foreground">Account created!</p>
                <p className="text-sm text-muted-foreground mt-1">Redirecting to sign in...</p>
              </div>
            </motion.div>
          )}

          {!success && (
            <motion.form variants={fadeUp} custom={1} onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide" htmlFor="name">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Prince Dubey"
                  className="auth-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  autoComplete="name"
                />
              </div>

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
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="auth-input pr-11"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    autoComplete="new-password"
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
                <PasswordStrength password={password} />
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
                    Creating account...
                  </>
                ) : (
                  <>Create Account <ArrowRight className="h-4 w-4" /></>
                )}
              </motion.button>
            </motion.form>
          )}

          <motion.div variants={fadeUp} custom={2} className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </motion.div>

          <motion.p variants={fadeUp} custom={3} className="text-center text-xs text-muted-foreground">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="text-primary hover:underline">Terms</Link>
            {" "}and{" "}
            <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
