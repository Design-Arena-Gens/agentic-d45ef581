'use client';

import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { languages } from "@/lib/data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Bell,
  Languages,
  Mic,
  Search,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import Image from "next/image";
import React from "react";

export const TopNav: React.FC = () => {
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);
  const [language, setLanguage] = React.useState("en");

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="glass-panel sticky top-6 z-20 flex items-center justify-between gap-6 rounded-3xl bg-glass-dark/60 px-6 py-4 backdrop-saturate-[180%]"
    >
      <div className="flex items-center gap-4">
        <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-3xl border border-cyan-300/40 bg-gradient-to-br from-cyan-500/70 via-sky-500/55 to-emerald-400/45 shadow-lg shadow-cyan-900/40">
          <Sparkles className="h-6 w-6 text-white" />
          <motion.span
            className="absolute inset-0"
            animate={{ rotate: [0, 3, 0, -3, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-100/80">
            Finance OS
          </p>
          <h1 className="text-xl font-semibold text-white">
            Aurora Intelligence Dashboard
          </h1>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-4">
        <div
          className={cn(
            "relative hidden w-[320px] max-w-md items-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition-all duration-300 focus-within:border-cyan-300/40 focus-within:bg-cyan-400/10 sm:flex",
            isSearchFocused && "border-cyan-400/60 bg-cyan-400/15",
          )}
        >
          <Search className="mr-3 h-4.5 w-4.5 text-cyan-100/70" />
          <input
            type="text"
            placeholder="Ask Aurora anything about your money…"
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-300/60 focus:outline-none"
          />
          <button className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white transition hover:bg-white/25">
            /
          </button>
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-200/80 shadow-glass md:flex"
        >
          <ShieldCheck className="h-4 w-4 text-cyan-200" />
          <span>AI Guard: Active</span>
        </motion.div>

        <div className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-200/80 sm:flex">
          <Languages className="h-4 w-4 text-cyan-200/90" />
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            className="bg-transparent text-xs text-white outline-none"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code} className="bg-slate-900">
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        <motion.button
          whileTap={{ scale: 0.94 }}
          className="hidden h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/40 bg-cyan-500/20 text-cyan-100 shadow-glass transition-colors hover:bg-cyan-400/25 sm:flex"
        >
          <Mic className="h-5 w-5" />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.94 }}
          className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-cyan-100 shadow-glass transition hover:border-cyan-300/40 hover:bg-cyan-400/15"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400 text-[10px] font-semibold text-slate-900">
            3
          </span>
        </motion.button>

        <ThemeToggle />

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-3 py-2 pr-4 text-sm text-white"
        >
          <div className="relative h-10 w-10 overflow-hidden rounded-2xl border border-cyan-300/30">
            <Image
              src="https://i.pravatar.cc/100?img=68"
              alt="Profile avatar"
              fill
              className="object-cover"
            />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-white">Aisha Kapoor</p>
            <p className="text-xs text-cyan-100/75">AI Finance Architect</p>
          </div>
          <User className="h-4 w-4 text-cyan-100/80" />
        </motion.div>
      </div>
    </motion.header>
  );
};
