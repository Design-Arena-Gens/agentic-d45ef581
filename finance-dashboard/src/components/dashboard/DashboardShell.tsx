'use client';

import { TopNav } from "@/components/layout/TopNav";
import { Sidebar } from "@/components/layout/Sidebar";
import { AIInsights } from "@/components/dashboard/AIInsights";
import { OverviewCards } from "@/components/dashboard/OverviewCards";
import { ChartsSection } from "@/components/dashboard/ChartsSection";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import { ReceiptsTable } from "@/components/receipts/ReceiptsTable";
import { CreditCardCarousel } from "@/components/dashboard/CreditCardCarousel";
import { VoiceAssistant } from "@/components/ai/VoiceAssistant";
import { SplitwiseSection } from "@/components/splitwise/SplitwiseSection";
import { AdvancedAIHighlights } from "@/components/dashboard/AdvancedAIHighlights";
import { ReceiptScanner } from "@/components/receipts/ReceiptScanner";
import { motion } from "framer-motion";
import React from "react";
import { Sparkles } from "lucide-react";

export const DashboardShell: React.FC = () => {
  return (
    <div className="flex min-h-screen gap-6 px-4 py-6 md:px-8">
      <Sidebar />
      <main className="relative flex w-full flex-col gap-6 md:pl-2">
        <TopNav />

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="glass-panel relative overflow-hidden rounded-4xl border border-white/10 bg-white/10 p-6"
        >
          <div className="absolute -right-24 top-10 h-56 w-56 rounded-full bg-cyan-500/20 blur-[160px]" />
          <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.5em] text-cyan-100/70">
                Dashboard Pulse
              </p>
              <h2 className="text-3xl font-semibold text-white">
                Futuristic finance, orchestrated by AI
              </h2>
              <p className="text-sm text-slate-200/75">
                Blend of Paytm wallet agility, Mint-style analytics, and
                Splitwise collaboration — now amplified with conversational AI.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-cyan-100">
              <Sparkles className="h-4 w-4" />
              Aurora is learning from your patterns in real time.
            </div>
          </div>
        </motion.section>

        <AIInsights />
        <OverviewCards />
        <ChartsSection />
        <CreditCardCarousel />
        <TransactionsTable />
        <ReceiptsTable />
        <VoiceAssistant />
        <SplitwiseSection />
        <AdvancedAIHighlights />
      </main>
      <ReceiptScanner />
    </div>
  );
};

