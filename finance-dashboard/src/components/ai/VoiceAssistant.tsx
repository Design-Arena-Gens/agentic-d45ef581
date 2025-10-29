'use client';

import { useReceipts } from "@/context/ReceiptsContext";
import { formatCurrency } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  AudioLines,
  Bot,
  Mic,
  MicOff,
  Send,
  Sparkles,
  Volume2,
} from "lucide-react";
import React from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type SpeechRecognitionResultEvent = {
  results: Array<{
    [index: number]: { transcript: string };
  }>;
};

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionResultEvent) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: (() => void) | null;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

const synth = typeof window !== "undefined" ? window.speechSynthesis : null;

export const VoiceAssistant: React.FC = () => {
  const { addReceipt } = useReceipts();
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "assistant-hello",
      role: "assistant",
      content:
        "Hey there! Ask anything about your money or say “I spent ₹100 on coffee” and I’ll log it instantly.",
    },
  ]);
  const [inputValue, setInputValue] = React.useState("");
  const [isListening, setIsListening] = React.useState(false);
  const recognitionRef = React.useRef<SpeechRecognitionLike | null>(null);

  const appendMessage = React.useCallback((message: Omit<Message, "id">) => {
    setMessages((prev) => [
      ...prev,
      { id: `${message.role}-${Date.now()}`, ...message },
    ]);
  }, []);

  const speak = React.useCallback((text: string) => {
    if (!synth) return;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    synth.speak(utterance);
  }, []);

  const processQuery = React.useCallback(
    (query: string) => {
      if (!query.trim()) return;
      appendMessage({ role: "user", content: query });

      const normalized = query.toLowerCase();
      if (normalized.includes("i spent")) {
        const amountMatch = query.match(/₹?\s?(\d+[.,]?\d*)/);
        const category = detectCategory(query);
        const amount = amountMatch
          ? parseFloat(amountMatch[1].replace(",", ""))
          : 0;
        const receipt = addReceipt({
          amount: amount || 250,
          category,
          currency: "INR",
          date: new Date().toISOString().slice(0, 10),
          merchant: "Voice Log",
          method: "Voice Capture",
          notes: "Logged via Voice AI",
          source: "voice",
          summary: `Logged ${formatCurrency(amount || 0)} under ${category} via voice command.`,
        });

        const reply = `Got it. I logged ${formatCurrency(
          receipt.amount,
        )} under ${receipt.category}. I’ll keep an eye on trends. Anything else?`;
        appendMessage({ role: "assistant", content: reply });
        speak(reply);
        setInputValue("");
        return;
      }

      const response = generateAIResponse(query);
      appendMessage({ role: "assistant", content: response });
      speak(response);
      setInputValue("");
    },
    [addReceipt, appendMessage, speak],
  );

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const speechWindow = window as typeof window & {
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
      SpeechRecognition?: SpeechRecognitionConstructor;
    };
    const SpeechRecognitionClass =
      speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;
    if (SpeechRecognitionClass) {
      const recognition = new SpeechRecognitionClass();
      recognition.lang = "en-IN";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: SpeechRecognitionResultEvent) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
        processQuery(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      recognitionRef.current?.stop();
    };
  }, [processQuery]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      processQuery(
        "Sorry, voice recognition is not supported in this browser. Try typing your request.",
      );
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <section className="glass-panel relative overflow-hidden rounded-4xl border border-white/10 bg-white/10 p-6 text-slate-100">
      <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-cyan-500/20 blur-[140px]" />
      <div className="relative z-10 flex flex-col gap-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-100/80">
              AI Voice Concierge
            </p>
            <h3 className="text-2xl font-semibold text-white">
              Speak to Aurora, your conversational finance co-pilot
            </h3>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 px-3 py-1.5 text-xs uppercase tracking-[0.35em] text-cyan-100/70">
            beta 4.2
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleListening}
            className={`flex h-14 w-14 items-center justify-center rounded-3xl border ${isListening ? "border-rose-300/50 bg-rose-500/30 text-rose-100" : "border-cyan-300/40 bg-cyan-400/20 text-cyan-100"} shadow-glass transition`}
          >
            {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
            <span className="absolute -bottom-4 text-[11px] uppercase tracking-[0.35em] text-slate-200/70">
              {isListening ? "Listening…" : "Tap to talk"}
            </span>
          </motion.button>
          <div className="flex-1 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200/80">
            <AnimatePresence>
              {messages.slice(-3).map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className={`mb-3 flex items-start gap-3 last:mb-0 ${
                    message.role === "assistant"
                      ? "text-cyan-100"
                      : "text-slate-200/80"
                  }`}
                >
                  <div className="mt-0.5 rounded-2xl bg-white/10 p-2">
                    {message.role === "assistant" ? (
                      <Bot className="h-4 w-4 text-cyan-100" />
                    ) : (
                      <AudioLines className="h-4 w-4 text-slate-200/80" />
                    )}
                  </div>
                  <p>{message.content}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            processQuery(inputValue);
          }}
          className="flex items-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm shadow-inner shadow-black/10"
        >
          <input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="Type a question or log an expense…"
            className="flex-1 bg-transparent text-slate-100 placeholder:text-slate-300/60 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => speak(messages[messages.length - 1]?.content ?? "")}
            className="rounded-2xl border border-white/10 bg-white/10 p-2 text-cyan-100 transition hover:border-cyan-300/40 hover:bg-cyan-400/20"
          >
            <Volume2 className="h-5 w-5" />
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 rounded-2xl border border-cyan-300/40 bg-cyan-500/20 px-4 py-2 text-slate-100 transition hover:bg-cyan-400/25"
          >
            Send <Send className="h-4 w-4" />
          </button>
        </form>

        <div className="grid gap-3 text-xs text-slate-200/75 md:grid-cols-3">
          <QuickChip label="Monthly summary PDF" />
          <QuickChip label="Smart reminders" />
          <QuickChip label="Voice powered splits" />
          <QuickChip label="Auto-categorize bills" />
          <QuickChip label="Explain unusual spend" />
          <QuickChip label="Set saving challenges" />
        </div>
      </div>
    </section>
  );
};

const detectCategory = (query: string) => {
  const normalized = query.toLowerCase();
  if (normalized.match(/coffee|burger|food|pizza|restaurant/))
    return "Food & Dining";
  if (normalized.match(/metro|uber|cab|fuel|ticket/)) return "Transport";
  if (normalized.match(/rent|maintenance|bill|electric/)) return "Housing";
  if (normalized.match(/movie|netflix|music|gaming/)) return "Entertainment";
  if (normalized.match(/grocery|supermarket/)) return "Groceries";
  return "General";
};

const generateAIResponse = (query: string) => {
  if (query.toLowerCase().includes("top spending")) {
    return "Transport and Food remain your top spenders this week. Use the card carousel to freeze the Neo CashBack card if you’d like to limit lifestyle spends.";
  }
  if (query.toLowerCase().includes("budget")) {
    return "You’re at 62% of the smart budget for May. I recommend lowering discretionary spending by ₹4,500 and moving it to the SIP Booster goal.";
  }
  return "Processed! I’ll keep learning from your patterns and optimize your cash flow. Ask for a monthly summary or trigger a smart reminder anytime.";
};

const QuickChip: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-flex items-center gap-1 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.25em] text-cyan-100/70">
    <Sparkles className="h-3.5 w-3.5" />
    {label}
  </span>
);
