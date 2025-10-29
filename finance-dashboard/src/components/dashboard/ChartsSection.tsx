'use client';

import {
  categorySpendingData,
  spendingOverTimeData,
} from "@/lib/data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Pie,
  PieChart,
} from "recharts";
import React from "react";

type ChartTooltipPayload = {
  color?: string;
  name?: string;
  value?: number;
};

type ChartTooltipProps = {
  active?: boolean;
  payload?: ChartTooltipPayload[];
  label?: string;
};

const CustomTooltip = ({ active, payload, label }: ChartTooltipProps) => {
  if (active && payload && payload.length) {
    const items = payload;
    return (
      <div className="rounded-2xl border border-white/20 bg-slate-900/90 px-4 py-3 text-sm text-slate-100 shadow-xl backdrop-blur-xl">
        <p className="text-xs uppercase tracking-widest text-cyan-200/80">
          {label}
        </p>
        {items.map((entry, index) => (
          <p key={index} className="mt-1 flex items-center gap-2">
            <span
              className="inline-flex h-2 w-2 rounded-full"
              style={{ backgroundColor: (entry?.color as string) ?? "#40E0D0" }}
            />
            <span className="text-slate-200/85">
              {entry?.name}: <strong>{entry?.value as number}</strong>
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const ChartsSection: React.FC = () => {
  const [timeRange, setTimeRange] = React.useState<"6M" | "12M">("6M");

  const timeSeries =
    timeRange === "6M"
      ? spendingOverTimeData
      : [
          { month: "Jun", actual: 62, projected: 60 },
          { month: "Jul", actual: 66, projected: 63 },
          { month: "Aug", actual: 71, projected: 68 },
          { month: "Sep", actual: 74, projected: 72 },
          ...spendingOverTimeData,
        ];

  return (
    <section
      id="analytics"
      className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]"
    >
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -80px" }}
        transition={{ duration: 0.45 }}
        className="glass-panel relative overflow-hidden rounded-4xl border border-white/10 bg-white/10 p-6"
      >
        <div className="absolute -top-32 left-24 h-48 w-48 rounded-full bg-cyan-400/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-sky-500/25 blur-[140px]" />
        <div className="relative z-10 flex items-start justify-between gap-3 pb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-100/80">
              Spending Trajectory
            </p>
            <h3 className="text-2xl font-semibold text-white">
              AI vs actual monthly outflow
            </h3>
            <p className="text-sm text-slate-200/70">
              Aurora recalibrates projections weekly using cashflow velocity and
              category drift.
            </p>
          </div>
          <div className="flex gap-2 rounded-2xl border border-white/10 bg-white/10 p-1 text-xs">
            {(["6M", "12M"] as const).map((option) => (
              <button
                key={option}
                onClick={() => setTimeRange(option)}
                className={cn(
                  "rounded-2xl px-3 py-1 transition-colors",
                  timeRange === option
                    ? "bg-cyan-500/40 text-white"
                    : "text-slate-200/75",
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className="relative z-10 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={timeSeries} barSize={16} barGap={6}>
              <CartesianGrid
                strokeDasharray="4 10"
                stroke="rgba(148, 163, 184, 0.15)"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "rgba(226, 232, 240, 0.85)", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fill: "rgba(226, 232, 240, 0.65)", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ color: "rgba(226,232,240,0.8)" }}
                iconType="circle"
              />
              <Bar
                radius={[10, 10, 6, 6]}
                dataKey="actual"
                name="Actual"
                fill="url(#actualGradient)"
              />
              <Bar
                radius={[10, 10, 6, 6]}
                dataKey="projected"
                name="AI Projection"
                fill="url(#projectedGradient)"
              />
              <defs>
                <linearGradient id="actualGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#40E0D0" stopOpacity={0.95} />
                  <stop offset="95%" stopColor="#1F3B73" stopOpacity={0.5} />
                </linearGradient>
                <linearGradient
                  id="projectedGradient"
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#7FDBFF" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#0E4E5D" stopOpacity={0.4} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.article>

      <motion.article
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -80px" }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="glass-panel relative rounded-4xl border border-white/10 bg-white/10 p-6"
      >
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-100/80">
            Category Split
          </p>
          <h3 className="text-xl font-semibold text-white">
            Where your money flows
          </h3>
        </div>
        <div className="relative z-10 mt-2 h-64">
          <ResponsiveContainer>
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Pie
                data={categorySpendingData}
                innerRadius={70}
                outerRadius={95}
                paddingAngle={3}
                dataKey="value"
              >
                {categorySpendingData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="relative z-10 flex flex-col gap-2 text-sm">
          {categorySpendingData.map((entry) => (
            <div
              key={entry.name}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-slate-100"
            >
              <span className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                {entry.name}
              </span>
              <span>{entry.value}%</span>
            </div>
          ))}
        </div>
      </motion.article>
    </section>
  );
};
