'use client';

import { AnimatePresence, motion } from "framer-motion";
import {
  Download,
  Globe2,
  Languages,
  ShieldCheck,
  Sparkle,
  ToggleLeft,
  Wand2,
} from "lucide-react";
import React from "react";
import jsPDF from "jspdf";

const highlights = [
  {
    title: "Smart Category Engine",
    description:
      "Aurora auto-detects merchants, sentiment, and GL codes with 96% accuracy, even for handwritten slips.",
    icon: Wand2,
  },
  {
    title: "Conversational Chatbot",
    description:
      "Ask natural questions, trigger exports, or translate summaries into 20 languages instantly.",
    icon: Sparkle,
  },
  {
    title: "Security Bubbles",
    description:
      "Multi-layer anomaly guard, biometric approvals, and encryption with continuous threat scoring.",
    icon: ShieldCheck,
  },
];

export const AdvancedAIHighlights: React.FC = () => {
  const [isGeneratingPdf, setIsGeneratingPdf] = React.useState(false);

  const generatePdf = async () => {
    setIsGeneratingPdf(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Aurora AI Monthly Summary", 20, 20);
    doc.setFontSize(12);
    doc.text("Cashflow is stable. Spending is within 94% of smart budget.", 20, 32);
    doc.text("Top spend categories: Transport, Food & Dining, Shopping.", 20, 42);
    doc.text("AI recommendations:", 20, 52);
    doc.text("- Allocate ₹4,500 more to Emergency Fund.", 28, 62);
    doc.text("- Freeze Neo Cashback card for 2 weeks.", 28, 72);
    doc.text("- Schedule voice reminder for Splitwise settlement.", 28, 82);
    doc.save("aurora-summary.pdf");
    setIsGeneratingPdf(false);
  };

  return (
    <section
      id="settings"
      className="glass-panel relative overflow-hidden rounded-4xl border border-white/10 bg-white/10 p-6"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(64,224,208,0.16),transparent_65%)]" />
      <div className="relative z-10 flex flex-col gap-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-100/80">
              Advanced AI Features
            </p>
            <h3 className="text-2xl font-semibold text-white">
              Continuously learning, dangerously smart
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-cyan-100/80">
            <span className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-1.5">
              <ToggleLeft className="h-4 w-4" />
              Dark / Light Auto
            </span>
            <span className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-1.5">
              <Languages className="h-4 w-4" />
              Multi-language
            </span>
            <span className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-1.5">
              <Globe2 className="h-4 w-4" />
              Voice Control
            </span>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -80px" }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 text-slate-100"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(127,255,212,0.12),transparent_70%)]" />
                <div className="relative z-10 space-y-2">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-100">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="text-lg font-semibold text-white">
                    {highlight.title}
                  </h4>
                  <p className="text-sm text-slate-200/75">
                    {highlight.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={generatePdf}
          disabled={isGeneratingPdf}
          className="inline-flex items-center gap-3 self-start rounded-2xl border border-cyan-300/40 bg-cyan-500/20 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/25 disabled:opacity-70"
        >
          <Download className="h-5 w-5" />
          {isGeneratingPdf ? "Generating summary…" : "Generate monthly PDF"}
        </motion.button>

        <AnimatePresence>
          {isGeneratingPdf && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="text-xs uppercase tracking-[0.3em] text-cyan-100/80"
            >
              AI curating dynamic report — 89% done…
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

