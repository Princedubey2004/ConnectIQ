"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, ExternalLink, MessageSquare, Send, CheckCircle2,
  AlertCircle, ArrowLeft, Clock, Sparkles,
} from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("loading");

    // Simulate submit (replace with actual API call if you add email sending)
    await new Promise((r) => setTimeout(r, 1500));

    // Build mailto as fallback
    const subject = encodeURIComponent(form.subject || "ConnectIQ Support");
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.open(`mailto:hello@connectiq.app?subject=${subject}&body=${body}`);
    setStatus("success");
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "For general inquiries, feedback, and support",
      action: "hello@connectiq.app",
      href: "mailto:hello@connectiq.app",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "border-blue-400/20",
    },
    {
      icon: ExternalLink,
      title: "LinkedIn",
      description: "Follow our journey and connect with the team",
      action: "linkedin.com/company/connectiq",
      href: "https://linkedin.com/company/connectiq",
      color: "text-sky-400",
      bg: "bg-sky-400/10",
      border: "border-sky-400/20",
    },
    {
      icon: Clock,
      title: "Response Time",
      description: "We typically respond within 24 hours",
      action: "Mon – Fri, 9am – 6pm IST",
      href: null,
      color: "text-green-400",
      bg: "bg-green-400/10",
      border: "border-green-400/20",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-surface/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold shadow-lg shadow-primary/30">
              CQ
            </div>
            <span className="text-foreground">ConnectIQ</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Hero */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary font-medium">
            <MessageSquare className="h-4 w-4" />
            Get in Touch
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            We&apos;d love to hear from you
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Whether you have a question, feedback, or just want to say hi — we read every message and respond personally.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Contact Methods */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">Other ways to reach us</h2>

            <div className="space-y-4">
              {contactMethods.map((method, i) => {
                const Icon = method.icon;
                const content = (
                  <div className={`rounded-2xl border ${method.border} bg-surface p-5 flex items-start gap-4 group transition-all duration-200 ${method.href ? "hover:border-opacity-50 hover:bg-surface-hover cursor-pointer" : ""}`}>
                    <div className={`p-2.5 rounded-xl ${method.bg} shrink-0`}>
                      <Icon className={`h-5 w-5 ${method.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-sm">{method.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{method.description}</p>
                      <p className={`text-sm font-medium mt-2 ${method.color} truncate`}>{method.action}</p>
                    </div>
                  </div>
                );
                return method.href ? (
                  <a key={i} href={method.href} target={method.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                    {content}
                  </a>
                ) : (
                  <div key={i}>{content}</div>
                );
              })}
            </div>

            {/* FAQ Teaser */}
            <div className="rounded-2xl border border-border bg-surface p-6 space-y-4 mt-8">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-foreground text-sm">Common Questions</h3>
              </div>
              {[
                { q: "Is ConnectIQ free?", a: "Yes — ConnectIQ is completely free for students." },
                { q: "Does AI read my messages?", a: "Only the context you provide is sent to Gemini AI to generate messages. We don't read your sent messages." },
                { q: "How do I delete my account?", a: "Email privacy@connectiq.app with 'Account Deletion Request'." },
              ].map((faq, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-sm font-medium text-foreground">{faq.q}</p>
                  <p className="text-xs text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <h2 className="text-xl font-bold text-foreground mb-6">Send a message</h2>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center space-y-4 py-12"
                >
                  <div className="h-16 w-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Message sent!</h3>
                  <p className="text-muted-foreground text-sm max-w-xs">
                    Your default email client has opened with your message pre-filled. We&apos;ll reply within 24 hours.
                  </p>
                  <button
                    onClick={() => { setStatus("idle"); setForm({ name: "", email: "", subject: "", message: "" }); }}
                    className="text-sm text-primary hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {status === "error" && (
                    <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      Something went wrong. Please try emailing us directly.
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">Your Name *</label>
                      <input
                        type="text"
                        placeholder="Prince Dubey"
                        className="auth-input"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">Email Address *</label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        className="auth-input"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Subject</label>
                    <select
                      className="auth-input"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    >
                      <option value="">Select a topic...</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Bug Report">Bug Report</option>
                      <option value="Feature Request">Feature Request</option>
                      <option value="Account Help">Account Help</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Privacy / Data">Privacy / Data</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Message *</label>
                    <textarea
                      placeholder="Tell us how we can help you..."
                      className="auth-input resize-none min-h-[140px]"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === "loading" || !form.name || !form.email || !form.message}
                    className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(109,93,246,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {status === "loading" ? (
                      <>
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </motion.button>

                  <p className="text-xs text-muted-foreground text-center">
                    This will open your email client with your message pre-filled.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-6 px-4 text-center text-sm text-muted-foreground mt-12">
        <div className="flex justify-center gap-4 mb-2">
          <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          <span>·</span>
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
        </div>
        © {new Date().getFullYear()} ConnectIQ. All rights reserved.
      </footer>
    </div>
  );
}
