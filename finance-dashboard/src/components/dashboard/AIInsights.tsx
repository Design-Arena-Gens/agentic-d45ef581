'use client';

import { insightCards } from "@/lib/data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import React from "react";

export const AIInsights: React.FC = () => {
  return (
    <section className="glass-panel relative overflow-hidden rounded-4xl bg-glass-dark/60 p-6 text-slate-100 shadow-glass transition-all hover:border-cyan-300/30">
      <div className="absolute -left-[35%] -top-[45%] h-[60vh] w-[60vw] rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute -right-[20%] bottom-[-40%] h-[50vh] w-[55vw] rounded-full bg-sky-500/10 blur-[140px]" />
      <div className="relative z-10 mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.5em] text-cyan-100/70">
            Aurora Insights
          </p>
          <h2 className="gradient-text text-2xl font-semibold">
            AI projections and budget guardrails
          </h2>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-200/75">
          <span className="inline-flex items-center gap-2 rounded-2xl border border-cyan-300/40 bg-cyan-500/15 px-4 py-2 text-cyan-100">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Live AI coach
          </span>
          <span className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-sky-300" />
            Updated 2m ago
          </span>
        </div>
      </div>

      <div className="relative z-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {insightCards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -80px" }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 via-white/5 to-white/0 p-4 backdrop-blur-2xl"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(82,211,255,0.28),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative z-10 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-cyan-100/70">
                    {card.subtitle}
                  </p>
                  <h3 className="text-lg font-semibold text-white">
                    {card.title}
                  </h3>
                </div>
                <TrendBadge trend={card.trend} delta={card.delta} />
              </div>
              <p className="text-sm leading-relaxed text-slate-200/80">
                {card.message}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const TrendBadge: React.FC<{ trend: "up" | "down" | "steady"; delta: string }> = ({
  trend,
  delta,
}) => {
  const icon =
    trend === "up" ? (
      <ArrowUpRight className="h-4 w-4" />
    ) : trend === "down" ? (
      <ArrowDownRight className="h-4 w-4" />
    ) : (
      <Minus className="h-4 w-4" />
    );

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-2xl border px-3 py-1 text-xs font-medium",
        trend === "up" &&
          "border-emerald-300/40 bg-emerald-400/15 text-emerald-200",
        trend === "down" &&
          "border-rose-300/40 bg-rose-400/15 text-rose-200",
        trend === "steady" &&
          "border-slate-300/40 bg-slate-200/10 text-slate-100",
      )}
    >
      {icon}
      {delta}
    </span>
  );
};

