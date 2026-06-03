"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { name: "Mon", total: Math.floor(Math.random() * 10) + 2 },
  { name: "Tue", total: Math.floor(Math.random() * 10) + 4 },
  { name: "Wed", total: Math.floor(Math.random() * 10) + 5 },
  { name: "Thu", total: Math.floor(Math.random() * 10) + 3 },
  { name: "Fri", total: Math.floor(Math.random() * 10) + 8 },
  { name: "Sat", total: Math.floor(Math.random() * 10) + 2 },
  { name: "Sun", total: Math.floor(Math.random() * 10) + 1 },
];

export function OverviewChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="name"
          stroke="#52525b"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          dy={10}
        />
        <YAxis
          stroke="#52525b"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#141417",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            color: "#fff",
          }}
          itemStyle={{ color: "#6366f1", fontWeight: "bold" }}
          cursor={{ stroke: "rgba(255,255,255,0.1)", strokeWidth: 1 }}
        />
        <Area
          type="monotone"
          dataKey="total"
          stroke="#6366f1"
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorTotal)"
          activeDot={{ r: 6, fill: "#6366f1", stroke: "#fff", strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
