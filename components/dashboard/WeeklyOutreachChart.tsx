"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

const data = [
  { week: "Week 1", outreach: 12, replies: 3 },
  { week: "Week 2", outreach: 18, replies: 5 },
  { week: "Week 3", outreach: 24, replies: 7 },
  { week: "Week 4", outreach: 15, replies: 4 },
  { week: "Week 5", outreach: 28, replies: 9 },
  { week: "Week 6", outreach: 22, replies: 6 },
  { week: "Week 7", outreach: 32, replies: 11 },
];

export function WeeklyOutreachChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorOutreach" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorReplies" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="week" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#141417",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "12px",
          }}
          cursor={{ stroke: "rgba(255,255,255,0.1)", strokeWidth: 1 }}
        />
        <Area type="monotone" dataKey="outreach" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorOutreach)" name="Messages Sent" />
        <Area type="monotone" dataKey="replies" stroke="#22c55e" strokeWidth={2} fillOpacity={1} fill="url(#colorReplies)" name="Replies" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
