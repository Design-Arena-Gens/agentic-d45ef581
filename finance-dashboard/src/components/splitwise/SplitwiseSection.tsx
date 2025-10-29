'use client';

import { splitwiseGroups } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { BellRing, HandCoins, PlusCircle, Users } from "lucide-react";
import React from "react";

type Member = {
  name: string;
  owes: number;
  gets: number;
};

type Group = {
  id: string;
  name: string;
  members: Member[];
  nextAction: string;
  smartReminder: string;
};

export const SplitwiseSection: React.FC = () => {
  const [groups, setGroups] = React.useState<Group[]>(splitwiseGroups);
  const [groupName, setGroupName] = React.useState("");
  const [reminderPreview, setReminderPreview] = React.useState<string | null>(
    null,
  );

  const handleAddGroup = () => {
    if (!groupName.trim()) return;
    setGroups((prev) => [
      {
        id: `grp-${Date.now()}`,
        name: groupName,
        members: [
          { name: "You", owes: 0, gets: 0 },
          { name: "New Member", owes: 0, gets: 0 },
        ],
        nextAction:
          "AI will auto-scan transactions tagged to this group and suggest smart splits.",
        smartReminder:
          "No reminders yet. Ask Aurora voice assistant to schedule one.",
      },
      ...prev,
    ]);
    setGroupName("");
  };

  return (
    <section
      id="splitwise"
      className="glass-panel relative overflow-hidden rounded-4xl border border-white/12 bg-white/10 p-6"
    >
      <div className="absolute -left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[160px]" />
      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-100/80">
              Splitwise AI Clone
            </p>
            <h3 className="text-2xl font-semibold text-white">
              Collaborative groups, smart settlements, gentle nudges
            </h3>
          </div>
          <div className="flex items-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-100">
            <Users className="h-4 w-4 text-cyan-200" />
            <span>{groups.length} active groups</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-3xl border border-white/10 bg-white/5 p-4 md:flex-row md:items-center">
          <input
            value={groupName}
            onChange={(event) => setGroupName(event.target.value)}
            placeholder="Create a new AI-powered group…"
            className="flex-1 rounded-2xl bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-300/60 focus:outline-none"
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddGroup}
            className="flex items-center gap-2 rounded-2xl border border-cyan-300/40 bg-cyan-500/20 px-4 py-3 text-sm font-semibold text-cyan-100 hover:bg-cyan-400/25"
          >
            <PlusCircle className="h-5 w-5" />
            Add Group
          </motion.button>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <AnimatePresence>
            {groups.map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -80px" }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                className="group relative overflow-hidden rounded-3xl border border-white/12 bg-white/8 p-5 text-slate-100"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(64,224,208,0.18),transparent_60%)] opacity-80" />
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-white">
                      {group.name}
                    </h4>
                    <span className="rounded-2xl border border-white/10 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-cyan-100/70">
                      Auto-Sync
                    </span>
                  </div>
                  <div className="space-y-2">
                    {group.members.map((member) => (
                      <div
                        key={member.name}
                        className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                      >
                        <span className="font-medium text-white">
                          {member.name}
                        </span>
                        <span className="text-xs uppercase tracking-wide text-slate-200/75">
                          {member.owes > 0 && (
                            <span className="text-rose-200">
                              owes {formatCurrency(member.owes)}
                            </span>
                          )}
                          {member.gets > 0 && (
                            <span className="text-emerald-200">
                              gets {formatCurrency(member.gets)}
                            </span>
                          )}
                          {member.owes === 0 && member.gets === 0 && (
                            <span className="text-slate-300/70">settled</span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm text-slate-100/80">
                    <HandCoins className="mb-2 h-4 w-4 text-cyan-200" />
                    {group.nextAction}
                  </div>
                  <button
                    onMouseEnter={() => setReminderPreview(group.smartReminder)}
                    onMouseLeave={() => setReminderPreview(null)}
                    className="inline-flex items-center gap-2 text-xs text-cyan-100/80 underline-offset-4 hover:text-cyan-100 hover:underline"
                  >
                    <BellRing className="h-4 w-4" />
                    Smart reminder
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {reminderPreview && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex items-center gap-3 rounded-3xl border border-cyan-300/40 bg-cyan-500/15 px-5 py-3 text-sm text-cyan-100"
            >
              <BellRing className="h-5 w-5" />
              {reminderPreview}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

