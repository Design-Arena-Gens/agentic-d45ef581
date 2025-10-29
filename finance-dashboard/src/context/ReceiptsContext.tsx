'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";

export type ReceiptSource = "upload" | "imported" | "manual" | "voice";

export type Receipt = {
  id: string;
  date: string;
  merchant: string;
  amount: number;
  category: string;
  method: string;
  currency: string;
  notes?: string;
  fileName?: string;
  fileUrl?: string;
  source: ReceiptSource;
  summary: string;
  items?: Array<{ name: string; price: number }>;
  createdAt: number;
};

type ReceiptsContextValue = {
  receipts: Receipt[];
  addReceipt: (payload: Omit<Receipt, "id" | "createdAt">) => Receipt;
  updateReceipt: (id: string, payload: Partial<Receipt>) => void;
  removeReceipt: (id: string) => void;
};

const ReceiptsContext = createContext<ReceiptsContextValue | undefined>(
  undefined,
);

const FALLBACK_DATA: Receipt[] = [
  {
    id: "rct-1001",
    date: "2024-05-04",
    merchant: "Fresh Farm Grocers",
    amount: 124.55,
    category: "Groceries",
    method: "UPI • Paytm Wallet",
    currency: "INR",
    notes: "Weekly essentials stock-up",
    source: "imported",
    fileName: "fresh-farm.pdf",
    summary:
      "₹124.55 spent at Fresh Farm Grocers for household essentials. You saved ₹45 with membership credits.",
    createdAt: Date.now() - 86400000 * 4,
    fileUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    items: [
      { name: "Organic produce bundle", price: 54.2 },
      { name: "Dairy & eggs", price: 32.9 },
      { name: "Household supplies", price: 37.45 },
    ],
  },
  {
    id: "rct-1002",
    date: "2024-05-02",
    merchant: "Metro Fuel",
    amount: 58.75,
    category: "Transport",
    method: "Visa • **** 3921",
    currency: "INR",
    source: "imported",
    summary:
      "₹58.75 spent on petrol at Metro Fuel. You're 12% above average transport spending this month.",
    createdAt: Date.now() - 86400000 * 6,
    fileName: "metro-fuel.jpg",
    fileUrl:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "rct-1003",
    date: "2024-05-01",
    merchant: "Urban Bite Bistro",
    amount: 36.0,
    category: "Food & Dining",
    method: "Cash",
    currency: "INR",
    source: "manual",
    summary:
      "₹36.00 spent dining at Urban Bite Bistro. This is your third eating-out expense this week.",
    createdAt: Date.now() - 86400000 * 7,
  },
];

const RECEIPT_STORAGE_KEY = "agentic-finance-receipts";

export const ReceiptsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [receipts, setReceipts] = useState<Receipt[]>(() => {
    if (typeof window === "undefined") return FALLBACK_DATA;
    try {
      const stored = window.localStorage.getItem(RECEIPT_STORAGE_KEY);
      if (!stored) {
        return FALLBACK_DATA;
      }
      const parsed = JSON.parse(stored) as Receipt[];
      return parsed.length ? parsed : FALLBACK_DATA;
    } catch (error) {
      console.error("Failed to parse stored receipts", error);
      return FALLBACK_DATA;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(RECEIPT_STORAGE_KEY, JSON.stringify(receipts));
  }, [receipts]);

  const addReceipt = React.useCallback(
    (payload: Omit<Receipt, "id" | "createdAt">) => {
      const newReceipt: Receipt = {
        ...payload,
        id: uuid(),
        createdAt: Date.now(),
      };
      setReceipts((prev) => [newReceipt, ...prev]);
      return newReceipt;
    },
    [],
  );

  const updateReceipt = React.useCallback(
    (id: string, payload: Partial<Receipt>) => {
      setReceipts((prev) =>
        prev.map((receipt) =>
          receipt.id === id ? { ...receipt, ...payload } : receipt,
        ),
      );
    },
    [],
  );

  const removeReceipt = React.useCallback((id: string) => {
    setReceipts((prev) => prev.filter((receipt) => receipt.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      receipts,
      addReceipt,
      updateReceipt,
      removeReceipt,
    }),
    [receipts, addReceipt, updateReceipt, removeReceipt],
  );

  return (
    <ReceiptsContext.Provider value={value}>
      {children}
    </ReceiptsContext.Provider>
  );
};

export const useReceipts = () => {
  const ctx = useContext(ReceiptsContext);
  if (!ctx) {
    throw new Error("useReceipts must be used within ReceiptsProvider");
  }
  return ctx;
};
