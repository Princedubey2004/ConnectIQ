import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/db";
import { Recruiter } from "@/models/Recruiter";
import { Message } from "@/models/Message";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { OverviewChart } from "@/components/dashboard/OverviewChart";
import { AnimatedKPIs } from "@/components/dashboard/AnimatedKPIs";
import { AnimatedTimeline, AnimatedActivity } from "@/components/dashboard/AnimatedActivity";
import { AnimatedGreeting } from "@/components/dashboard/AnimatedGreeting";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  await dbConnect();
  const userId = session.user.id;

  const [messagesSent, recruitersAdded, repliesReceived, interviews] = await Promise.all([
    Message.countDocuments({ userId }),
    Recruiter.countDocuments({ userId }),
    Recruiter.countDocuments({ userId, status: { $in: ["Followed Up", "Interview Scheduled", "Offer"] } }),
    Recruiter.countDocuments({ userId, status: "Interview Scheduled" }),
  ]);

  // Pipeline breakdown
  const [toContact, contacted, followedUp, offers, rejected] = await Promise.all([
    Recruiter.countDocuments({ userId, status: "To Contact" }),
    Recruiter.countDocuments({ userId, status: "Contacted" }),
    Recruiter.countDocuments({ userId, status: "Followed Up" }),
    Recruiter.countDocuments({ userId, status: "Offer" }),
    Recruiter.countDocuments({ userId, status: "Rejected" }),
  ]);

  const kpis = [
    { title: "Recruiters Added", value: recruitersAdded.toString(), description: "Total in your CRM pipeline", iconName: "Users" },
    { title: "Messages Sent", value: messagesSent.toString(), description: "AI-generated outreach messages", iconName: "MessageSquarePlus" },
    { title: "Replies Received", value: repliesReceived.toString(), description: "From initial outreach", iconName: "Reply" },
    { title: "Interviews", value: interviews.toString(), description: "Currently interviewing", iconName: "Briefcase" },
  ];

  const activities = [
    { id: 1, action: "Generated message for", target: "Sarah Jenkins at Google", time: "2 hours ago", iconName: "MessageSquarePlus", color: "text-blue-400" },
    { id: 2, action: "Moved", target: "Michael Chen to Interviewing", time: "5 hours ago", iconName: "Briefcase", color: "text-primary" },
    { id: 3, action: "Added new recruiter:", target: "Priya Patel at Stripe", time: "Yesterday", iconName: "Users", color: "text-green-400" },
    { id: 4, action: "Marked as Replied:", target: "David Kim at Notion", time: "2 days ago", iconName: "Reply", color: "text-yellow-400" },
  ];

  const followUpsRaw = await Recruiter.find({ userId, status: "Contacted" })
    .sort({ createdAt: 1 })
    .limit(4)
    .lean();

  const followUps = followUpsRaw.map((r: any) => ({
    _id: r._id.toString(),
    name: r.name,
    company: r.company,
  }));

  const pipeline = [
    { label: "To Contact", count: toContact, color: "bg-slate-400" },
    { label: "Contacted", count: contacted, color: "bg-blue-400" },
    { label: "Follow Up", count: followedUp, color: "bg-yellow-400" },
    { label: "Interviewing", count: interviews, color: "bg-primary" },
    { label: "Offer", count: offers, color: "bg-green-400" },
    { label: "Rejected", count: rejected, color: "bg-red-400" },
  ];

  const firstName = session?.user?.name?.split(" ")[0] || "there";

  return (
    <div className="space-y-6 sm:space-y-8 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <AnimatedGreeting userName={firstName} />
        <Link
          href="/dashboard/generator"
          className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold transition-all shadow-[0_0_15px_rgba(109,93,246,0.25)] shrink-0"
        >
          ✨ Generate Message
        </Link>
      </div>

      {/* KPI Metrics */}
      <AnimatedKPIs kpis={kpis} />

      {/* Pipeline Bar */}
      {recruitersAdded > 0 && (
        <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-foreground text-sm">Pipeline Breakdown</h2>
              <p className="text-xs text-muted-foreground mt-0.5">{recruitersAdded} total recruiters across {pipeline.filter(p => p.count > 0).length} stages</p>
            </div>
            <Link href="/dashboard/crm" className="text-xs text-primary hover:underline font-medium">
              Open CRM →
            </Link>
          </div>
          <div className="flex gap-1.5 h-2.5 rounded-full overflow-hidden">
            {pipeline.map((stage) =>
              stage.count > 0 ? (
                <div
                  key={stage.label}
                  className={`${stage.color} rounded-full transition-all`}
                  style={{ flex: stage.count }}
                  title={`${stage.label}: ${stage.count}`}
                />
              ) : null
            )}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {pipeline.map((stage) => (
              <div key={stage.label} className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${stage.color}`} />
                <span className="text-xs text-muted-foreground">{stage.label}</span>
                <span className="text-xs font-semibold text-foreground">{stage.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-7">
        {/* Main Chart */}
        <Card className="lg:col-span-4 border-border bg-surface">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Outreach Activity</CardTitle>
            <CardDescription className="text-xs">Messages generated over the last 7 days.</CardDescription>
          </CardHeader>
          <CardContent className="pl-0">
            <OverviewChart />
          </CardContent>
        </Card>

        {/* Activity Timeline */}
        <AnimatedTimeline activities={activities} />
      </div>

      {/* Follow Ups */}
      <AnimatedActivity activities={activities} followUps={followUps} />
    </div>
  );
}
