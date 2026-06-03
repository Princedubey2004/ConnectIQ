"use client";

import { motion, type Variants } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, MessageSquarePlus, TrendingUp, Briefcase, Gift, ArrowUpRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WeeklyOutreachChart } from "@/components/dashboard/WeeklyOutreachChart";
import { ResponseTrendsChart } from "@/components/dashboard/ResponseTrendsChart";
import { FollowUpSuccessChart } from "@/components/dashboard/FollowUpSuccessChart";
import type { ReactNode } from "react";

// ── Animation Variants ──────────────────────────────────────────────
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

const chartReveal: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

// ── Types ────────────────────────────────────────────────────────────
export interface MetricData {
  title: string;
  value: string;
  change: string;
  trend: "up" | "neutral";
  icon: "Users" | "MessageSquarePlus" | "TrendingUp" | "Briefcase" | "Gift";
  color: string;
  bg: string;
}

interface AnimatedAnalyticsProps {
  metrics: MetricData[];
  pipelineChildren: ReactNode;
}

// ── Icon Map ─────────────────────────────────────────────────────────
const iconMap = {
  Users,
  MessageSquarePlus,
  TrendingUp,
  Briefcase,
  Gift,
};

// ── Component ────────────────────────────────────────────────────────
export function AnimatedAnalytics({ metrics, pipelineChildren }: AnimatedAnalyticsProps) {
  return (
    <div className="space-y-8 pb-8">
      {/* Header — fade in */}
      <motion.div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground mt-1">Track your networking performance and conversion rates.</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Date filter — subtle scale on hover */}
          <motion.select
            className="h-9 px-3 rounded-md bg-white/5 border border-white/10 text-sm text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <option className="bg-surface" value="7d">Last 7 days</option>
            <option className="bg-surface" value="30d">Last 30 days</option>
            <option className="bg-surface" value="90d">Last 90 days</option>
            <option className="bg-surface" value="all">All time</option>
          </motion.select>
          
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button variant="outline" className="h-9 px-3 bg-white/5 border-white/10 text-foreground hover:bg-white/10 gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* KPI Metrics — staggered fade-in-up with hover lift */}
      <motion.div
        className="grid gap-4 md:grid-cols-3 lg:grid-cols-5"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {metrics.map((metric, i) => {
          const Icon = iconMap[metric.icon];
          return (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="glass-panel border-white/5 hover:border-white/10 transition-all group relative overflow-hidden h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardContent className="p-5 relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg ${metric.bg}`}>
                      <Icon className={`h-4 w-4 ${metric.color}`} />
                    </div>
                    {metric.trend === "up" && (
                      <span className="text-xs font-medium text-green-400 flex items-center gap-0.5">
                        <ArrowUpRight className="h-3 w-3" /> {metric.change}
                      </span>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{metric.title}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Charts Row 1 — whileInView animations */}
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          variants={chartReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <Card className="glass-panel border-white/5 h-full">
            <CardHeader>
              <CardTitle className="text-lg">Weekly Outreach</CardTitle>
              <CardDescription>Messages sent vs replies received each week.</CardDescription>
            </CardHeader>
            <CardContent className="pl-0">
              <WeeklyOutreachChart />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={chartReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <Card className="glass-panel border-white/5 h-full">
            <CardHeader>
              <CardTitle className="text-lg">Response Trends</CardTitle>
              <CardDescription>Your response rate over the last 6 months.</CardDescription>
            </CardHeader>
            <CardContent className="pl-0">
              <ResponseTrendsChart />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row 2 — whileInView + pipeline breakdown on scroll */}
      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          className="lg:col-span-1"
          variants={chartReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <Card className="glass-panel border-white/5 h-full">
            <CardHeader>
              <CardTitle className="text-lg">Follow-up Success Rate</CardTitle>
              <CardDescription>Conversion rate by follow-up attempt.</CardDescription>
            </CardHeader>
            <CardContent className="pl-0">
              <FollowUpSuccessChart />
            </CardContent>
          </Card>
        </motion.div>

        {/* Pipeline Breakdown — animated on scroll */}
        <motion.div
          className="lg:col-span-2"
          variants={chartReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <Card className="glass-panel border-white/5 h-full">
            <CardHeader>
              <CardTitle className="text-lg">Pipeline Breakdown</CardTitle>
              <CardDescription>Current distribution of recruiters across stages.</CardDescription>
            </CardHeader>
            <CardContent>
              {pipelineChildren}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
