'use client';

import { useReceipts } from "@/context/ReceiptsContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Loader2,
  Receipt,
  Scan,
  UploadCloud,
  X,
} from "lucide-react";
import React from "react";

type ScannerState =
  | { status: "idle" }
  | { status: "scanning"; fileName: string }
  | { status: "success"; fileName: string; summary: string };

const AI_SUMMARIES = [
  "Aurora detected 3 line items with 98% confidence and tagged it under Food & Dining.",
  "Receipt parsed with smart OCR. Merchant verified via location insights.",
  "Payment auto-linked to Visa ending 3921. Tax credits identified for FY24.",
];

const randomSummary = () =>
  AI_SUMMARIES[Math.floor(Math.random() * AI_SUMMARIES.length)];

export const ReceiptScanner: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scannerState, setScannerState] = React.useState<ScannerState>({
    status: "idle",
  });
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const { addReceipt } = useReceipts();

  const handleFiles = async (files: FileList | null) => {
    if (!files || !files.length) return;
    const file = files[0];
    const fileUrl = URL.createObjectURL(file);

    setScannerState({ status: "scanning", fileName: file.name });

    // simulate AI extraction
    setTimeout(() => {
      const amount = parseFloat(
        (file.name.match(/\d+(\.\d{1,2})?/)?.[0] ?? "1245.80"),
      );
      const receipt = addReceipt({
        date: new Date().toISOString().slice(0, 10),
        merchant: guessMerchant(file.name),
        amount: Number.isFinite(amount) ? amount : 1250.5,
        category: smartCategoryDetect(file.name),
        method: "UPI • Aurora Pay",
        currency: "INR",
        notes: "AI receipt ingestion",
        fileName: file.name,
        fileUrl,
        source: "upload",
        summary: randomSummary(),
        items: [
          { name: "AI extracted item 01", price: 420.3 },
          { name: "AI extracted item 02", price: 830.5 },
        ],
      });
      setScannerState({
        status: "success",
        fileName: file.name,
        summary: receipt.summary,
      });
    }, 1800);
  };

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.88 }}
        onClick={() => {
          setIsOpen(true);
          setScannerState({ status: "idle" });
        }}
        className="fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 via-sky-500 to-emerald-400 text-white shadow-[0_20px_45px_rgba(0,191,255,0.45)] transition hover:shadow-[0_25px_60px_rgba(64,224,208,0.55)]"
      >
        <Scan className="h-8 w-8" />
        <span className="absolute -top-2 right-3 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-slate-900">
          AI
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/75 backdrop-blur-2xl p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-4xl border border-cyan-300/30 bg-slate-900/80 p-6 text-slate-100 shadow-glass"
            >
              <button
                className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/10 p-2 text-white hover:border-cyan-300/40 hover:bg-cyan-400/20"
                onClick={() => setIsOpen(false)}
                aria-label="Close receipt scanner"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.5em] text-cyan-100/80">
                    AI Receipt Scanner
                  </p>
                  <h3 className="text-2xl font-semibold text-white">
                    Drop a PDF or snap a photo. Aurora handles the rest.
                  </h3>
                </div>

                <motion.div
                  className="flex min-h-[200px] flex-col items-center justify-center gap-4 rounded-3xl border border-white/20 border-dashed bg-white/5 p-6 text-center transition hover:border-cyan-300/40 hover:bg-cyan-400/10"
                  onClick={() => inputRef.current?.click()}
                >
                  <UploadCloud className="h-12 w-12 text-cyan-200" />
                  <div className="space-y-1 text-sm text-slate-200/80">
                    <p>
                      Drag & drop receipt image/PDF here or{" "}
                      <span className="text-cyan-100 underline">
                        browse files
                      </span>
                    </p>
                    <p className="text-xs uppercase tracking-widest text-cyan-100/60">
                      Supports OCR with multi-language recognition
                    </p>
                  </div>
                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(event) => handleFiles(event.target.files)}
                    className="hidden"
                  />
                </motion.div>

                <AnimatePresence mode="wait">
                  {scannerState.status === "scanning" && (
                    <motion.div
                      key="scanning"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
                    >
                      <Loader2 className="h-5 w-5 animate-spin text-cyan-200" />
                      <div className="text-left">
                        <p className="font-medium text-white">
                          Analyzing {scannerState.fileName}
                        </p>
                        <p className="text-xs text-slate-300/70">
                          Parsing merchant, totals, taxes, and line items using
                          GlassOCR 4.2
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {scannerState.status === "success" && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="flex items-start gap-4 rounded-3xl border border-emerald-300/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100"
                    >
                      <Receipt className="mt-1 h-5 w-5" />
                      <div>
                        <p className="font-semibold">
                          Synced & categorized: {scannerState.fileName}
                        </p>
                        <p className="text-xs text-emerald-50/80">
                          {scannerState.summary}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid gap-3 text-xs text-slate-200/75 md:grid-cols-2">
                  <FeaturePill title="Smart Category Auto-Detection" />
                  <FeaturePill title="AI translation & currency normalization" />
                  <FeaturePill title="Tax/GST ready extractions" />
                  <FeaturePill title="Auto-link with transactions" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const FeaturePill: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
    <FileText className="h-4 w-4 text-cyan-200/80" />
    <span>{title}</span>
  </div>
);

const guessMerchant = (fileName: string) => {
  const normalized = fileName.toLowerCase();
  if (normalized.includes("uber")) return "Uber Mobility";
  if (normalized.includes("zomato")) return "Zomato";
  if (normalized.includes("swiggy")) return "Swiggy";
  if (normalized.includes("fuel") || normalized.includes("petrol"))
    return "Metro Fuel";
  if (normalized.includes("rent")) return "Urban Living Rentals";
  return "Aurora Partner Merchant";
};

const smartCategoryDetect = (fileName: string) => {
  const normalized = fileName.toLowerCase();
  if (normalized.match(/uber|ola|fuel|petrol/)) return "Transport";
  if (normalized.match(/zomato|swiggy|restaurant|food/)) return "Food & Dining";
  if (normalized.match(/rent|lease/)) return "Housing";
  if (normalized.match(/shopping|store|mall/)) return "Shopping";
  if (normalized.match(/bill|utility|electric/)) return "Utilities";
  return "General";
};

