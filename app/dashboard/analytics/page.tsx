import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/db";
import { Recruiter } from "@/models/Recruiter";
import { Message } from "@/models/Message";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, MessageSquarePlus, TrendingUp, Briefcase, Gift, ArrowUpRight } from "lucide-react";
import { WeeklyOutreachChart } from "@/components/dashboard/WeeklyOutreachChart";
import { ResponseTrendsChart } from "@/components/dashboard/ResponseTrendsChart";
import { FollowUpSuccessChart } from "@/components/dashboard/FollowUpSuccessChart";
import { AnimatedAnalytics } from "@/components/dashboard/AnimatedAnalytics";

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  await dbConnect();
  const userId = session.user.id;

  const recruitersContacted = await Recruiter.countDocuments({ userId, status: { $ne: "To Contact" } });
  const messagesSent = await Message.countDocuments({ userId });
  const totalRecruiters = await Recruiter.countDocuments({ userId });
  const repliedRecruiters = await Recruiter.countDocuments({
    userId,
    status: { $in: ["Followed Up", "Interview Scheduled", "Offer"] },
  });
  const interviews = await Recruiter.countDocuments({ userId, status: "Interview Scheduled" });
  const offers = await Recruiter.countDocuments({ userId, status: "Offer" });

  const responseRate = totalRecruiters > 0 ? ((repliedRecruiters / totalRecruiters) * 100).toFixed(1) : "0.0";

  const metrics = [
    {
      title: "Recruiters Contacted",
      value: recruitersContacted.toString(),
      change: "+12%",
      trend: "up" as const,
      icon: "Users" as const,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      title: "Messages Sent",
      value: messagesSent.toString(),
      change: "+8%",
      trend: "up" as const,
      icon: "MessageSquarePlus" as const,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      title: "Response Rate",
      value: `${responseRate}%`,
      change: "+3.2%",
      trend: "up" as const,
      icon: "TrendingUp" as const,
      color: "text-green-400",
      bg: "bg-green-400/10",
    },
    {
      title: "Interviews Secured",
      value: interviews.toString(),
      change: "+2",
      trend: "up" as const,
      icon: "Briefcase" as const,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
    },
    {
      title: "Offers Received",
      value: offers.toString(),
      change: offers > 0 ? "+1" : "—",
      trend: offers > 0 ? "up" as const : "neutral" as const,
      icon: "Gift" as const,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
  ];

  return (
    <AnimatedAnalytics
      metrics={metrics}
      pipelineChildren={<PipelineBreakdown userId={userId} />}
    />
  );
}

async function PipelineBreakdown({ userId }: { userId: string }) {
  const stages = [
    { name: "To Contact", color: "bg-slate-500" },
    { name: "Contacted", color: "bg-blue-500" },
    { name: "Followed Up", color: "bg-yellow-500" },
    { name: "Interview Scheduled", color: "bg-primary" },
    { name: "Offer", color: "bg-green-500" },
  ];

  const counts = await Promise.all(
    stages.map(async (stage) => {
      const count = await Recruiter.countDocuments({ userId, status: stage.name as import("@/models/Recruiter").RecruiterStatus });
      return { ...stage, count };
    })
  );

  const total = counts.reduce((sum, s) => sum + s.count, 0);

  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      <div className="h-3 w-full rounded-full bg-white/5 overflow-hidden flex">
        {counts.map((stage, i) => (
          <div
            key={i}
            className={`${stage.color} h-full transition-all duration-500`}
            style={{ width: total > 0 ? `${(stage.count / total) * 100}%` : "0%" }}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-2">
        {counts.map((stage, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5">
            <div className={`w-3 h-3 rounded-full ${stage.color} shrink-0`} />
            <div>
              <p className="text-lg font-bold text-foreground">{stage.count}</p>
              <p className="text-xs text-muted-foreground">{stage.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
