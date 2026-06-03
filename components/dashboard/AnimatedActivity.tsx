"use client";

import { motion, type Variants } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MessageSquarePlus,
  Users,
  Briefcase,
  Reply,
  Clock,
  CheckCircle2,
  MoreHorizontal,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  MessageSquarePlus,
  Users,
  Briefcase,
  Reply,
};

/* ── Activity types ── */

interface Activity {
  id: number;
  action: string;
  target: string;
  time: string;
  iconName: string;
  color: string;
}

interface FollowUp {
  _id: string;
  name: string;
  company: string;
}

interface AnimatedActivityProps {
  activities: Activity[];
  followUps: FollowUp[];
}

/* ── Variants ── */

const timelineContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const timelineItemVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1, x: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 20 },
  },
};

const followUpContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const followUpItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 20 },
  },
};

const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1, y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 20, delay: 0.2 },
  },
};

/* ── Component ── */

export function AnimatedActivity({
  activities,
  followUps,
}: AnimatedActivityProps) {
  return (
    <>
      {/* ── Follow-ups Section ── */}
      <motion.div variants={fadeInVariants} initial="hidden" animate="visible">
        <Card className="glass-panel border-white/5">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Upcoming Follow-ups</CardTitle>
              <CardDescription>
                Recruiters who haven&apos;t replied yet.
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-8 border-white/10 bg-white/5 text-xs"
            >
              View All
            </Button>
          </CardHeader>
          <CardContent>
            {followUps.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
                <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-green-400" />
                </div>
                <p className="text-sm text-muted-foreground">
                  You&apos;re all caught up! No pending follow-ups.
                </p>
              </div>
            ) : (
              <motion.div
                className="space-y-4"
                variants={followUpContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {followUps.map((recruiter) => (
                  <motion.div
                    key={recruiter._id}
                    variants={followUpItemVariants}
                    whileHover={{ y: -2 }}
                    className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                        {recruiter.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {recruiter.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {recruiter.company} • Contacted recently
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary"
                      >
                        Draft Reply
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}

/* ── Timeline (exported separately for placement in the grid) ── */

export function AnimatedTimeline({ activities }: { activities: Activity[] }) {
  return (
    <Card className="lg:col-span-3 glass-panel border-white/5">
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
        <CardDescription>Your latest networking actions.</CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          className="space-y-6"
          variants={timelineContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {activities.map((activity, index) => {
            const Icon = iconMap[activity.iconName] || Users;
            return (
              <motion.div
                key={activity.id}
                variants={timelineItemVariants}
                className="flex gap-4 relative"
              >
                {/* Vertical Line */}
                {index !== activities.length - 1 && (
                  <div className="absolute left-4 top-10 bottom-[-24px] w-[1px] bg-white/10" />
                )}
                <div
                  className={`mt-1 h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 z-10 ${activity.color}`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-foreground">
                    <span className="text-muted-foreground">
                      {activity.action}
                    </span>{" "}
                    <span className="font-medium">{activity.target}</span>
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {activity.time}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </CardContent>
    </Card>
  );
}
