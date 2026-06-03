"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

const data = [
  { month: "Jan", rate: 18 },
  { month: "Feb", rate: 22 },
  { month: "Mar", rate: 28 },
  { month: "Apr", rate: 25 },
  { month: "May", rate: 35 },
  { month: "Jun", rate: 42 },
];

export function ResponseTrendsChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="month" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#141417",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "12px",
          }}
          formatter={(value: any) => [`${value}%`, "Response Rate"]}
          cursor={{ stroke: "rgba(255,255,255,0.1)", strokeWidth: 1 }}
        />
        <Line
          type="monotone"
          dataKey="rate"
          stroke="#f59e0b"
          strokeWidth={3}
          dot={{ fill: "#f59e0b", stroke: "#141417", strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, fill: "#f59e0b", stroke: "#fff", strokeWidth: 2 }}
          name="Response Rate"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
