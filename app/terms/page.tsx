import type { Metadata } from "next";
import Link from "next/link";
import { FileText, CheckSquare, AlertTriangle, Scale, Users, ArrowLeft, Gavel } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service — ConnectIQ",
  description: "ConnectIQ's terms of service, acceptable use policy, and user responsibilities.",
};

const sections = [
  {
    icon: FileText,
    title: "Terms of Service",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    content: [
      {
        subtitle: "Agreement",
        text: 'By accessing or using ConnectIQ ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the Service.',
      },
      {
        subtitle: "Service Description",
        text: "ConnectIQ is an AI-powered networking CRM designed to help students and early-career professionals generate personalized recruiter messages, track conversations, and manage their job search pipeline.",
      },
      {
        subtitle: "Eligibility",
        text: "You must be at least 16 years old to use ConnectIQ. By using the Service, you represent that you meet this age requirement and have the legal capacity to enter into this agreement.",
      },
      {
        subtitle: "Account Responsibility",
        text: "You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account at security@connectiq.app.",
      },
    ],
  },
  {
    icon: CheckSquare,
    title: "Acceptable Use",
    color: "text-green-400",
    bg: "bg-green-400/10",
    content: [
      {
        subtitle: "Permitted Uses",
        text: "ConnectIQ may be used for: generating personalized professional outreach messages, managing recruiter relationships, tracking job application status, and organizing your networking pipeline.",
      },
      {
        subtitle: "Prohibited Uses",
        text: "You may NOT use ConnectIQ to: generate spam or bulk unsolicited messages, impersonate others, collect data from recruiters without consent, violate any applicable laws, interfere with the Service's operation, or resell access to the Service.",
      },
      {
        subtitle: "AI-Generated Content",
        text: "You are responsible for reviewing and taking ownership of all AI-generated messages before sending them. ConnectIQ provides tools to assist your outreach — the content remains your responsibility.",
      },
      {
        subtitle: "Rate Limits",
        text: "To ensure fair usage, message generation may be subject to rate limiting. Attempts to circumvent rate limits may result in account suspension.",
      },
    ],
  },
  {
    icon: Users,
    title: "User Responsibilities",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    content: [
      {
        subtitle: "Accuracy of Information",
        text: "You agree to provide accurate information when creating your account and profile. Providing false information may result in account termination.",
      },
      {
        subtitle: "Professional Conduct",
        text: "Messages generated with ConnectIQ should be used for genuine professional networking. Using the tool to harass, mislead, or manipulate recruiters is strictly prohibited.",
      },
      {
        subtitle: "Compliance with Platform Rules",
        text: "When using ConnectIQ to reach out via LinkedIn or email, you remain responsible for complying with LinkedIn's User Agreement, anti-spam laws (CAN-SPAM, GDPR), and any other applicable regulations.",
      },
      {
        subtitle: "Data You Input",
        text: "You retain ownership of any data you input (recruiter information, profile details, etc.). By using the Service, you grant ConnectIQ a limited license to process this data to provide the Service.",
      },
    ],
  },
  {
    icon: Scale,
    title: "Intellectual Property",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    content: [
      {
        subtitle: "Our IP",
        text: "ConnectIQ, its logo, design, codebase, and all original content are the property of ConnectIQ and protected by applicable intellectual property laws.",
      },
      {
        subtitle: "Your Content",
        text: "You own the data you input. AI-generated messages are created for your use — you may use, modify, and send them as you see fit.",
      },
      {
        subtitle: "Feedback",
        text: "Any feedback, suggestions, or ideas you provide about ConnectIQ may be used by us to improve the Service without compensation or attribution.",
      },
    ],
  },
  {
    icon: AlertTriangle,
    title: "Limitation of Liability",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    content: [
      {
        subtitle: "No Guarantees",
        text: 'ConnectIQ is provided "as is" without warranties of any kind. We do not guarantee that using our Service will result in job interviews, offers, or any specific career outcomes.',
      },
      {
        subtitle: "Liability Cap",
        text: "To the maximum extent permitted by law, ConnectIQ's total liability to you for any claims arising from use of the Service shall not exceed the amount you paid for the Service in the 12 months preceding the claim.",
      },
      {
        subtitle: "Indirect Damages",
        text: "ConnectIQ shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, even if advised of the possibility of such damages.",
      },
      {
        subtitle: "Indemnification",
        text: "You agree to indemnify and hold harmless ConnectIQ and its team from any claims, damages, or expenses arising from your use of the Service or violation of these Terms.",
      },
    ],
  },
  {
    icon: Gavel,
    title: "General Terms",
    color: "text-red-400",
    bg: "bg-red-400/10",
    content: [
      {
        subtitle: "Termination",
        text: "We reserve the right to suspend or terminate your account at any time for violations of these Terms. You may also delete your account at any time by contacting us.",
      },
      {
        subtitle: "Changes to Terms",
        text: "We may update these Terms from time to time. We will notify registered users of significant changes via email. Continued use of the Service constitutes acceptance of updated Terms.",
      },
      {
        subtitle: "Governing Law",
        text: "These Terms are governed by the laws of India. Any disputes will be resolved in the courts of New Delhi, India.",
      },
      {
        subtitle: "Contact",
        text: "For questions about these Terms, contact us at legal@connectiq.app.",
      },
    ],
  },
];

export default function TermsPage() {
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
            <FileText className="h-4 w-4" />
            Legal Agreement
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Terms of Service
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Please read these terms carefully before using ConnectIQ. They outline your rights and responsibilities.
          </p>
          <p className="text-sm text-muted-foreground">
            Last updated: <span className="text-foreground font-medium">June 4, 2025</span>
          </p>
        </div>

        {/* Quick Summary */}
        <div className="rounded-2xl border border-border bg-surface p-6 mb-10">
          <h2 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <CheckSquare className="h-4 w-4 text-green-400" />
            Plain English Summary
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[
              "Use ConnectIQ for genuine professional networking — not spam.",
              "You own your data. We only use it to provide the Service.",
              "AI-generated messages are your responsibility to review before sending.",
              "We're not liable for career outcomes — but we'll always try our best to help.",
              "You can delete your account and all data at any time.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((section, i) => {
            const Icon = section.icon;
            return (
              <div key={i} className="rounded-2xl border border-border bg-surface p-6 sm:p-8 space-y-6">
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
          <h2 className="text-lg font-bold text-foreground">Questions about these terms?</h2>
          <p className="text-muted-foreground text-sm">
            Contact us at{" "}
            <a href="mailto:legal@connectiq.app" className="text-primary hover:underline font-medium">
              legal@connectiq.app
            </a>
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Link href="/contact" className="text-sm text-primary hover:underline font-medium">
              Contact Us
            </Link>
            <span className="text-muted-foreground">·</span>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-6 px-4 text-center text-sm text-muted-foreground mt-12">
        © {new Date().getFullYear()} ConnectIQ. All rights reserved.
      </footer>
    </div>
  );
}
