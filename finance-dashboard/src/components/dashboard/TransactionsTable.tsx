'use client';

import { recentTransactions } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";
import { Filter, Sliders } from "lucide-react";
import Link from "next/link";
import React from "react";

type FilterState = {
  category: string;
  method: string;
};

const uniqueValues = {
  category: Array.from(new Set(recentTransactions.map((txn) => txn.category))),
  method: Array.from(new Set(recentTransactions.map((txn) => txn.method))),
};

export const TransactionsTable: React.FC = () => {
  const [filters, setFilters] = React.useState<FilterState>({
    category: "All",
    method: "All",
  });

  const filteredTransactions = recentTransactions.filter((txn) => {
    const categoryMatch =
      filters.category === "All" || txn.category === filters.category;
    const methodMatch = filters.method === "All" || txn.method === filters.method;
    return categoryMatch && methodMatch;
  });

  return (
    <section
      id="receipts"
      className="glass-panel relative overflow-hidden rounded-4xl border border-white/10 bg-white/10 p-6"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(64,224,208,0.2),transparent_65%)] opacity-70" />
      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-100/80">
              Recent Transactions
            </p>
            <h3 className="text-2xl font-semibold text-white">
              Crystal-clear movement of money
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-100">
            <Filter className="h-4 w-4 text-cyan-200" />
            <Select
              label="Category"
              options={["All", ...uniqueValues.category]}
              value={filters.category}
              onChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}
            />
            <Select
              label="Method"
              options={["All", ...uniqueValues.method]}
              value={filters.method}
              onChange={(value) => setFilters((prev) => ({ ...prev, method: value }))}
            />
            <button className="rounded-2xl border border-white/10 bg-white/10 px-3 py-1.5 text-xs text-slate-100 transition hover:border-cyan-300/40 hover:bg-cyan-400/20">
              Export CSV
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10">
          <table className="min-w-full border-collapse bg-white/5 text-left text-sm text-slate-100 backdrop-blur-xl">
            <thead className="bg-white/5 text-xs uppercase tracking-widest text-cyan-100/75">
              <tr>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Description</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Method</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((txn, index) => (
                <motion.tr
                  key={txn.id}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -80px" }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className="group border-t border-white/5 text-sm text-slate-100 transition hover:bg-cyan-400/10"
                >
                  <td className="px-5 py-3 text-slate-200/80">{txn.date}</td>
                  <td className="px-5 py-3">
                    <div className="flex flex-col">
                      <span className="font-semibold text-white">
                        {txn.description}
                      </span>
                      <Link
                        href={`/receipts/${txn.id}`}
                        className="text-xs text-cyan-200/80 underline-offset-4 hover:text-cyan-100 hover:underline"
                      >
                        view receipt intelligence
                      </Link>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-cyan-100/90">{txn.category}</td>
                  <td className="px-5 py-3 font-semibold">
                    <Amount value={txn.amount} />
                  </td>
                  <td className="px-5 py-3 text-slate-200/80">{txn.method}</td>
                  <td className="px-5 py-3 text-xs uppercase tracking-wide">
                    <span
                      className={`rounded-full px-2.5 py-1 ${
                        txn.status === "cleared"
                          ? "bg-emerald-500/20 text-emerald-200"
                          : "bg-amber-500/20 text-amber-200"
                      }`}
                    >
                      {txn.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

const Amount: React.FC<{ value: number }> = ({ value }) => {
  const formatted = formatCurrency(Math.abs(value));
  return (
    <span className={value < 0 ? "text-rose-300" : "text-emerald-300"}>
      {value < 0 ? "-" : "+"}
      {formatted}
    </span>
  );
};

const Select: React.FC<{
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}> = ({ label, options, value, onChange }) => (
  <label className="flex items-center gap-1 rounded-2xl border border-white/10 bg-white/10 px-3 py-1.5">
    <Sliders className="h-3.5 w-3.5 text-cyan-200/75" />
    <span className="text-[11px] uppercase tracking-[0.25em] text-slate-200/60">
      {label}
    </span>
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="bg-transparent text-xs text-white outline-none"
    >
      {options.map((option) => (
        <option key={option} value={option} className="bg-slate-900">
          {option}
        </option>
      ))}
    </select>
  </label>
);

