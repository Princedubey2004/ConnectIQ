"use client";

import { motion, type Variants } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquarePlus, Users, Briefcase, Reply, TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = { Users, MessageSquarePlus, Reply, Briefcase };

interface KPI {
  title: string;
  value: string;
  description: string;
  iconName: string;
  trend?: string;
  trendUp?: boolean;
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 20 },
  },
};

function Skeleton() {
  return (
    <Card className="border-border bg-surface overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="skeleton h-3.5 w-24" />
          <div className="skeleton h-8 w-8 rounded-md" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="skeleton h-8 w-16 mb-2" />
        <div className="skeleton h-3 w-32" />
      </CardContent>
    </Card>
  );
}

export function AnimatedKPIs({ kpis }: { kpis: KPI[] }) {
  if (!kpis || kpis.length === 0) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} />)}
      </div>
    );
  }

  return (
    <motion.div
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {kpis.map((kpi, index) => {
        const Icon = iconMap[kpi.iconName] || Users;
        const isZero = kpi.value === "0";
        return (
          <motion.div key={index} variants={cardVariants} whileHover={{ y: -2, transition: { duration: 0.15 } }}>
            <Card className="border-border bg-surface hover:border-primary/20 transition-all shadow-sm relative overflow-hidden group h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground truncate pr-2">
                  {kpi.title}
                </CardTitle>
                <div className="p-2 bg-surface-hover rounded-md group-hover:bg-primary/15 transition-colors shrink-0">
                  <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className={`text-2xl sm:text-3xl font-bold ${isZero ? "text-muted-foreground" : "text-foreground"}`}>
                  {kpi.value}
                </div>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{kpi.description}</p>
                {kpi.trend && (
                  <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${kpi.trendUp ? "text-green-400" : "text-red-400"}`}>
                    {kpi.trendUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {kpi.trend}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
