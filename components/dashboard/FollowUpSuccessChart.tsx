"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

const data = [
  { stage: "1st Follow-up", success: 42 },
  { stage: "2nd Follow-up", success: 28 },
  { stage: "3rd Follow-up", success: 15 },
  { stage: "4th+", success: 8 },
];

export function FollowUpSuccessChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="stage" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#141417",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "12px",
          }}
          formatter={(value: any) => [`${value}%`, "Success Rate"]}
          cursor={{ fill: "rgba(255,255,255,0.03)" }}
        />
        <Bar
          dataKey="success"
          fill="#6366f1"
          radius={[6, 6, 0, 0]}
          name="Success Rate"
          barSize={40}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
