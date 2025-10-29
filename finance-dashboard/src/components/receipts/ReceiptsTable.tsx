'use client';

import { useReceipts } from "@/context/ReceiptsContext";
import { formatCurrency } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRightSquare, FileText, Filter } from "lucide-react";
import Link from "next/link";
import React from "react";

export const ReceiptsTable: React.FC = () => {
  const { receipts } = useReceipts();
  const [category, setCategory] = React.useState("All");

  const uniqueCategories = Array.from(
    new Set(receipts.map((receipt) => receipt.category)),
  );

  const filteredReceipts =
    category === "All"
      ? receipts
      : receipts.filter((receipt) => receipt.category === category);

  return (
    <section className="glass-panel relative overflow-hidden rounded-4xl border border-white/10 bg-white/10 p-6 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(64,224,208,0.18),transparent_65%)]" />
      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-100/80">
              AI Receipt Vault
            </p>
            <h3 className="text-2xl font-semibold text-white">
              Digitized proofs with neural summaries
            </h3>
          </div>
          <label className="flex items-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-4 py-2 text-xs">
            <Filter className="h-4 w-4 text-cyan-200" />
            <span className="text-xs uppercase tracking-[0.3em] text-slate-200/80">
              Category
            </span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="bg-transparent text-sm text-white outline-none"
            >
              {["All", ...uniqueCategories].map((value) => (
                <option key={value} value={value} className="bg-slate-900">
                  {value}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10">
          <table className="min-w-full bg-white/5 text-left text-sm text-slate-100 backdrop-blur-xl">
            <thead className="bg-white/5 text-xs uppercase tracking-widest text-cyan-100/75">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Merchant</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Source</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence initial={false}>
                {filteredReceipts.map((receipt, index) => (
                  <motion.tr
                    key={receipt.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                    className="border-t border-white/5 text-sm text-slate-100 transition hover:bg-cyan-400/10"
                  >
                    <td className="px-4 py-3 text-slate-200/80">{receipt.date}</td>
                    <td className="px-4 py-3 font-semibold text-white">
                      {receipt.merchant}
                      <p className="text-xs font-normal text-cyan-100/75">
                        {receipt.summary}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-cyan-100/80">
                      {receipt.category}
                    </td>
                    <td className="px-4 py-3 font-semibold text-emerald-200">
                      {formatCurrency(receipt.amount)}
                    </td>
                    <td className="px-4 py-3 text-slate-200/80">
                      {receipt.source.toUpperCase()}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/receipts/${receipt.id}`}
                        className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-cyan-100/80 hover:border-cyan-300/40 hover:bg-cyan-400/20"
                      >
                        <ArrowUpRightSquare className="h-4 w-4" />
                        View
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        <p className="inline-flex items-center gap-2 text-xs text-cyan-100/80">
          <FileText className="h-4 w-4" />
          Aurora extracts GST invoices, line items, and cross-links them with card statements.
        </p>
      </div>
    </section>
  );
};

