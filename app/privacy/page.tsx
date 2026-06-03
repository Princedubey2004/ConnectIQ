import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Database, Cookie, Trash2, Lock, UserCheck, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — ConnectIQ",
  description: "Learn how ConnectIQ collects, uses, and protects your personal data.",
};

const sections = [
  {
    icon: Database,
    title: "Data We Collect",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    content: [
      {
        subtitle: "Account Information",
        text: "When you create an account, we collect your name, email address, and a securely hashed password. We never store your password in plain text.",
      },
      {
        subtitle: "Profile Data",
        text: "Information you voluntarily provide: college/university, degree, graduation year, target roles, target companies, skills, LinkedIn URL, GitHub URL, portfolio URL, and resume summary. This data is used exclusively to personalize your AI-generated messages.",
      },
      {
        subtitle: "Usage Data",
        text: "We collect data on features you use, pages visited, and interactions within the app. This helps us improve the product experience.",
      },
      {
        subtitle: "Recruiter CRM Data",
        text: "Recruiter names, companies, roles, LinkedIn URLs, notes, and status updates you add to your CRM board. This data belongs to you and is stored securely in our database.",
      },
    ],
  },
  {
    icon: Cookie,
    title: "Cookies & Tracking",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    content: [
      {
        subtitle: "Session Cookies",
        text: "We use session cookies (via NextAuth.js) to keep you signed in. These are essential for the app to function and are stored securely as HTTP-only cookies.",
      },
      {
        subtitle: "Preference Cookies",
        text: "We store your theme preference (dark/light mode) in localStorage. No tracking cookies or third-party advertising cookies are used.",
      },
      {
        subtitle: "Analytics",
        text: "We do not currently use third-party analytics tools. Any future analytics will be disclosed here and will prioritize your privacy.",
      },
    ],
  },
  {
    icon: Lock,
    title: "Data Security",
    color: "text-green-400",
    bg: "bg-green-400/10",
    content: [
      {
        subtitle: "Encryption",
        text: "All data is transmitted over HTTPS/TLS. Passwords are hashed using bcrypt with a minimum cost factor of 12 before storage.",
      },
      {
        subtitle: "Database Security",
        text: "Your data is stored in MongoDB Atlas with network-level access controls, IP allowlisting, and encrypted storage at rest.",
      },
      {
        subtitle: "API Security",
        text: "All API routes are protected by JWT-based session validation via NextAuth. You can only access your own data — cross-user data access is architecturally prevented.",
      },
    ],
  },
  {
    icon: UserCheck,
    title: "Your Rights",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    content: [
      {
        subtitle: "Access & Portability",
        text: "You have the right to request a copy of all data we hold about you. Contact us at privacy@connectiq.app and we will respond within 30 days.",
      },
      {
        subtitle: "Correction",
        text: "You can update your profile information at any time from the Profile page in your dashboard.",
      },
      {
        subtitle: "Objection",
        text: "You may object to certain processing of your data. We will honor these requests unless we have a compelling legitimate interest or legal obligation.",
      },
    ],
  },
  {
    icon: Trash2,
    title: "Account Deletion",
    color: "text-red-400",
    bg: "bg-red-400/10",
    content: [
      {
        subtitle: "How to Delete Your Account",
        text: "To delete your account and all associated data, email us at privacy@connectiq.app with the subject line 'Account Deletion Request' from your registered email address.",
      },
      {
        subtitle: "What Gets Deleted",
        text: "Upon deletion, we permanently remove: your account, profile data, all CRM recruiter entries, all generated messages, and any associated preferences. This action is irreversible.",
      },
      {
        subtitle: "Processing Time",
        text: "Deletions are processed within 7 business days. Backups are purged within 30 days.",
      },
    ],
  },
  {
    icon: Shield,
    title: "Third-Party Services",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    content: [
      {
        subtitle: "Google Gemini AI",
        text: "We send recruiter context and your profile summary to Google's Gemini API to generate personalized messages. This data is processed per Google's AI usage policies. We do not send personally identifiable information beyond what you explicitly input.",
      },
      {
        subtitle: "MongoDB Atlas",
        text: "Your data is stored on MongoDB Atlas, a cloud database service. Atlas is SOC 2 Type 2 certified and GDPR compliant.",
      },
      {
        subtitle: "Vercel",
        text: "Our app is hosted on Vercel. Server logs may be retained for up to 30 days per Vercel's standard policy.",
      },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-surface/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Hero */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary font-medium">
            <Shield className="h-4 w-4" />
            Your Privacy Matters
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We believe privacy is a right, not a feature. Here's exactly what we collect, why, and how you can control it.
          </p>
          <p className="text-sm text-muted-foreground">
            Last updated: <span className="text-foreground font-medium">June 4, 2025</span>
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((section, i) => {
            const Icon = section.icon;
            return (
              <div
                key={i}
                className="rounded-2xl border border-border bg-surface p-6 sm:p-8 space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${section.bg}`}>
                    <Icon className={`h-5 w-5 ${section.color}`} />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
                </div>
                <div className="space-y-5 pl-0 sm:pl-12">
                  {section.content.map((item, j) => (
                    <div key={j} className="space-y-1.5">
                      <h3 className="font-semibold text-foreground text-sm">{item.subtitle}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact */}
        <div className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8 text-center space-y-3">
          <h2 className="text-lg font-bold text-foreground">Questions about your privacy?</h2>
          <p className="text-muted-foreground text-sm">
            Reach out to us at{" "}
            <a href="mailto:privacy@connectiq.app" className="text-primary hover:underline font-medium">
              privacy@connectiq.app
            </a>{" "}
            — we respond to all privacy inquiries within 5 business days.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Link href="/contact" className="text-sm text-primary hover:underline font-medium">
              Contact Us
            </Link>
            <span className="text-muted-foreground">·</span>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 px-4 text-center text-sm text-muted-foreground mt-12">
        © {new Date().getFullYear()} ConnectIQ. All rights reserved.
      </footer>
    </div>
  );
}
