'use client';

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  BadgeHelp,
  ChartBar,
  CreditCard,
  Layers3,
  Receipt,
  Settings,
  Split,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

const sidebarItems = [
  {
    label: "Dashboard",
    icon: Layers3,
    href: "/",
  },
  {
    label: "Analytics",
    icon: ChartBar,
    href: "/#analytics",
  },
  {
    label: "Receipts",
    icon: Receipt,
    href: "/#receipts",
  },
  {
    label: "Cards",
    icon: CreditCard,
    href: "/#cards",
  },
  {
    label: "Splitwise AI",
    icon: Split,
    href: "/#splitwise",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/#settings",
  },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [active, setActive] = React.useState(sidebarItems[0].href);

  React.useEffect(() => {
    if (!pathname) return;
    const matched = sidebarItems.find((item) =>
      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href),
    );
    if (matched) {
      setActive(matched.href);
    }
  }, [pathname]);

  return (
    <motion.aside
      initial={{ x: -24, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="glass-panel hidden w-64 shrink-0 flex-col bg-glass-dark/50 p-6 text-slate-100 md:flex"
    >
      <div className="flex items-center gap-3 pb-8">
        <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500/80 via-sky-500/75 to-emerald-400/70 shadow-lg shadow-cyan-900/40">
          <span className="text-lg font-semibold text-white">AI</span>
          <motion.span
            className="absolute inset-0 scale-110 rounded-2xl border border-white/30"
            animate={{
              rotate: [0, 3, 0, -3, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-cyan-200/80">
            Aurora Finance OS
          </p>
          <h2 className="text-lg font-semibold text-slate-50">
            Quantum Budgeteer
          </h2>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setActive(item.href)}
              className={cn(
                "group relative flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium transition-all duration-300",
                "text-slate-300/80 hover:bg-white/5 hover:text-white",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-2xl border border-cyan-300/40 bg-cyan-400/10 shadow-lg shadow-cyan-900/30"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-slate-100">
                <Icon className="h-4.5 w-4.5" />
              </span>
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-4 text-xs text-slate-200/75">
        <div className="flex items-center gap-2 text-cyan-200">
          <BadgeHelp className="h-4 w-4" />
          <span className="font-semibold uppercase tracking-widest">
            Need assistance?
          </span>
        </div>
        <p className="mt-3 leading-relaxed text-slate-300/80">
          Ask the conversational AI to build new budget rules, translate
          summaries, or auto-notify friends about settlements.
        </p>
      </div>
    </motion.aside>
  );
};

