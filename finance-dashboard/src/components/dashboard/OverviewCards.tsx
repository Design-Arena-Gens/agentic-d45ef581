'use client';

import { overviewMetrics } from "@/lib/data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import React from "react";

export const OverviewCards: React.FC = () => {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {overviewMetrics.map((metric, index) => (
        <motion.article
          key={metric.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px" }}
          transition={{ duration: 0.45, delay: index * 0.06 }}
          className={cn(
            "group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-5 text-slate-100 shadow-glass backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-cyan-300/40",
          )}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(64,224,208,0.22),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="relative z-10 flex h-full flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.35em] text-cyan-100/70">
              {metric.label}
            </span>
            <h3 className="text-3xl font-semibold text-white">
              {metric.currency}
              {metric.value}
            </h3>
            <p className="text-sm text-slate-200/75">{metric.subLabel}</p>
            {metric.id === "metric-wallet" && (
              <WalletButton label={metric.actionLabel ?? "Add"} />
            )}
          </div>
        </motion.article>
      ))}
    </section>
  );
};

const WalletButton: React.FC<{ label: string }> = ({ label }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.96 }}
    className="mt-auto inline-flex items-center gap-2 self-start rounded-2xl border border-cyan-300/50 bg-cyan-500/20 px-4 py-1.5 text-sm font-medium text-cyan-100 shadow-lg shadow-cyan-900/30 transition hover:bg-cyan-400/25"
  >
    <Plus className="h-4 w-4" />
    {label}
    <ArrowRight className="h-4 w-4" />
  </motion.button>
);
