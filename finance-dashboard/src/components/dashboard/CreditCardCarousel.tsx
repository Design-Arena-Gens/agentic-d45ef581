'use client';

import { creditCards } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, CreditCard } from "lucide-react";
import React from "react";

export const CreditCardCarousel: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (!container) return;
    const scrollAmount = direction === "left" ? -280 : 280;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section
      id="cards"
      className="glass-panel relative overflow-hidden rounded-4xl border border-white/10 bg-white/10 p-6"
    >
      <div className="relative z-10 flex items-center justify-between pb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-100/80">
            Cards & Wallets
          </p>
          <h3 className="text-2xl font-semibold text-white">
            Gradient cards with AI usage guard
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <CarouselButton direction="left" onClick={() => scroll("left")} />
          <CarouselButton direction="right" onClick={() => scroll("right")} />
        </div>
      </div>
      <div
        ref={containerRef}
        className="relative z-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
      >
        {creditCards.map((card, index) => {
          const usagePercent = Math.round((card.balance / card.limit) * 100);
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -80px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="group relative flex min-w-[260px] max-w-[280px] snap-center flex-col overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br p-6 text-white shadow-glass"
              style={{ backgroundImage: undefined }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.color}`}
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_55%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10 flex h-full flex-col gap-4">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-white/70">
                      {card.name}
                    </p>
                    <p className="text-lg font-semibold">{card.number}</p>
                  </div>
                  <div className="rounded-2xl bg-white/15 px-3 py-1 text-xs font-medium text-white">
                    Aurora AI
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-white/70">
                      Current Balance
                    </p>
                    <p className="text-3xl font-semibold">
                      {formatCurrency(card.balance)}
                    </p>
                  </div>
                  <CreditCard className="h-8 w-8 text-white/60" />
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs uppercase tracking-widest text-white/70">
                    <span>Usage</span>
                    <span>{usagePercent}%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-white/30">
                    <motion.div
                      className="h-full rounded-full bg-white/90"
                      style={{ width: `${usagePercent}%` }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${usagePercent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
                <div className="mt-auto rounded-2xl bg-white/15 p-3 text-xs text-white/85">
                  <p>
                    AI tip: pay ₹
                    {Math.max(0, card.balance - card.limit * 0.3).toLocaleString(
                      "en-IN",
                    )}{" "}
                    to lower utilization & boost credit score.
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

const CarouselButton: React.FC<{
  direction: "left" | "right";
  onClick: () => void;
}> = ({ direction, onClick }) => (
  <motion.button
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white shadow-glass transition hover:border-cyan-300/40 hover:bg-cyan-400/20"
    aria-label={`Scroll ${direction}`}
  >
    {direction === "left" ? (
      <ChevronLeft className="h-5 w-5" />
    ) : (
      <ChevronRight className="h-5 w-5" />
    )}
  </motion.button>
);

