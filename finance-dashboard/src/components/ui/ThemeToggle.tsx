'use client';

import { MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import React from "react";

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const activeTheme = theme === "system" ? systemTheme : theme;
  const isDark = activeTheme !== "light";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <motion.button
      whileTap={{ scale: 0.94 }}
      onClick={handleToggle}
      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-slate-100 shadow-glass transition-all hover:border-cyan-300/40 hover:bg-cyan-400/20"
      aria-label="Toggle dark mode"
    >
      <motion.span
        key={isDark ? "moon" : "sun"}
        initial={{ opacity: 0, rotate: -20, scale: 0.7 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        exit={{ opacity: 0, rotate: 20, scale: 0.7 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <MoonStar className="h-5 w-5 text-cyan-100" />
        ) : (
          <Sun className="h-5 w-5 text-sky-500" />
        )}
      </motion.span>
    </motion.button>
  );
};

