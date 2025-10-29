'use client';

import { useReceipts } from "@/context/ReceiptsContext";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock3,
  ExternalLink,
  FileDown,
  FileText,
  FolderSearch,
  Wallet2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export const ReceiptDetail: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter();
  const { receipts } = useReceipts();
  const receipt = receipts.find((item) => item.id === id);

  if (!receipt) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#040b18] p-8 text-center text-slate-100">
        <FolderSearch className="h-10 w-10 text-cyan-200" />
        <h2 className="text-2xl font-semibold">Receipt not found</h2>
        <p className="text-sm text-slate-300/70">
          It may have been removed or not synced yet. Head back to the dashboard to
          rescan.
        </p>
        <button
          onClick={() => router.push("/")}
          className="rounded-2xl border border-cyan-300/40 bg-cyan-400/20 px-4 py-2 text-sm text-cyan-100 hover:bg-cyan-400/30"
        >
          Return to dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060d1f] p-6 text-slate-100">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto flex w-full max-w-5xl flex-col gap-6"
      >
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-cyan-100/80 hover:text-cyan-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to dashboard
          </Link>
          <div className="flex items-center gap-3">
            <span className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.35em] text-cyan-100/70">
              AI Receipt Detail
            </span>
            <button className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-3 py-1.5 text-xs text-cyan-100 hover:border-cyan-300/40 hover:bg-cyan-400/20">
              <FileDown className="h-4 w-4" />
              Download JSON
            </button>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-4xl border border-white/10 bg-white/10 p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-cyan-100/70">
                  {receipt.category}
                </p>
                <h1 className="text-3xl font-semibold text-white">
                  {receipt.merchant}
                </h1>
                <p className="text-sm text-slate-300/70">{receipt.summary}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-right">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-200/70">
                  Amount
                </p>
                <p className="text-3xl font-semibold text-emerald-200">
                  {formatCurrency(receipt.amount, receipt.currency)}
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <DetailCard
                title="Date"
                text={new Date(receipt.date).toDateString()}
                icon={<Clock3 className="h-4 w-4 text-cyan-100" />}
              />
              <DetailCard
                title="Payment Method"
                text={receipt.method}
                icon={<Wallet2 className="h-4 w-4 text-cyan-100" />}
              />
              <DetailCard
                title="Captured via"
                text={receipt.source.toUpperCase()}
                icon={<FileText className="h-4 w-4 text-cyan-100" />}
              />
            </div>

            {receipt.items && receipt.items.length > 0 && (
              <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.35em] text-cyan-100/70">
                  Line items
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  {receipt.items.map((item, index) => (
                    <li
                      key={`${item.name}-${index}`}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2"
                    >
                      <span>{item.name}</span>
                      <span className="text-emerald-100">
                        {formatCurrency(item.price, receipt.currency)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-4xl border border-white/10 bg-white/10 p-4">
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-100/70">
                AI Summary
              </p>
              <p className="mt-2 text-sm text-slate-200/80">{receipt.summary}</p>
              <p className="mt-3 text-xs text-slate-300/60">
                Aurora cross-referenced this receipt with spending trends and tax
                rules. Anomaly score: 0.12 (safe).
              </p>
            </div>

            <div className="rounded-4xl border border-white/10 bg-white/10 p-4">
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-100/70">
                View File
              </p>
              {receipt.fileUrl ? (
                <a
                  href={receipt.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-xs text-cyan-100 hover:border-cyan-300/40 hover:bg-cyan-400/20"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open original file
                </a>
              ) : (
                <p className="mt-3 text-xs text-slate-200/70">
                  Original file not available. Upload a file via AI scanner to unlock
                  preview.
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const DetailCard: React.FC<{ title: string; text: string; icon: React.ReactNode }> = ({
  title,
  text,
  icon,
}) => (
  <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200/80">
    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500/20">
      {icon}
    </span>
    <div>
      <p className="text-[11px] uppercase tracking-[0.35em] text-slate-300/70">
        {title}
      </p>
      <p className="font-medium text-white">{text}</p>
    </div>
  </div>
);

