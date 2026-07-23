import React, { useState } from "react";
import {
  Sliders,
  Moon,
  Sun,
  RotateCcw,
  Sparkles,
  Lock,
  Database,
  Calendar,
  Bell,
  UploadCloud,
  Check,
  Heart,
} from "lucide-react";
import { useStudy } from "../context/StudyContext";

export default function Settings() {
  const { isDarkMode, toggleDarkMode, resetToSeedData, userProfile } = useStudy();

  const [votes, setVotes] = useState({
    auth: 42,
    cloud: 38,
    calendar: 56,
    notifications: 29,
    uploads: 47,
  });

  const [userVoted, setUserVoted] = useState({});

  const handleVote = (key) => {
    setUserVoted((prev) => {
      const isAlreadyVoted = prev[key];
      setVotes((v) => ({
        ...v,
        [key]: isAlreadyVoted ? v[key] - 1 : v[key] + 1,
      }));
      return { ...prev, [key]: !isAlreadyVoted };
    });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Settings & Future Roadmap
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Customize your preferences, manage LocalStorage state, and vote on upcoming features.
        </p>
      </div>

      {/* Preferences & Reset Card */}
      <div className="glass-card rounded-3xl p-6 space-y-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
          App Preferences & Data Management
        </h3>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Theme Appearance</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Currently using <span className="font-semibold">{isDarkMode ? "Dark Obsidian" : "Light Glass"}</span> theme.
            </p>
          </div>
          <button
            onClick={toggleDarkMode}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-4 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 transition"
          >
            {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-600" />}
            Toggle Theme
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800 pt-4">
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Reset Sample Dataset</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Restore default demo courses, tasks, exams, and notes into LocalStorage.
            </p>
          </div>
          <button
            onClick={resetToSeedData}
            className="inline-flex items-center gap-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 px-4 py-2.5 text-xs font-bold text-rose-500 transition"
          >
            <RotateCcw className="h-4 w-4" />
            Reset Data
          </button>
        </div>
      </div>

      {/* Future Features Interactive Roadmap */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-indigo-500" />
              Future Roadmap & Features
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Vote on which phase 2 features you want prioritized!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              key: "auth",
              title: "User Authentication & Profiles",
              desc: "Sign up, multi-device synchronization, and secure student accounts.",
              icon: Lock,
              badge: "Phase 2",
            },
            {
              key: "cloud",
              title: "Cloud Database Persistence",
              desc: "Real-time sync to PostgreSQL/Firebase cloud storage.",
              icon: Database,
              badge: "Phase 2",
            },
            {
              key: "calendar",
              title: "Google Calendar & iCal Sync",
              desc: "Two-way sync with Google Calendar, Apple Calendar, and Outlook.",
              icon: Calendar,
              badge: "Phase 2",
            },
            {
              key: "notifications",
              title: "Real-Time Push Notifications",
              desc: "Web push notifications and SMS study alerts before deadlines.",
              icon: Bell,
              badge: "Phase 2",
            },
            {
              key: "uploads",
              title: "PDF & Document File Uploads",
              desc: "Upload syllabus PDFs, lab reports, and assignment attachments.",
              icon: UploadCloud,
              badge: "Phase 2",
            },
          ].map((item) => {
            const Icon = item.icon;
            const hasVoted = userVoted[item.key];
            return (
              <div
                key={item.key}
                className="glass-card rounded-2xl p-5 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500 px-2.5 py-0.5">
                      {item.badge}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 dark:text-white text-base">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-semibold text-slate-400">
                    {votes[item.key]} Votes
                  </span>

                  <button
                    onClick={() => handleVote(item.key)}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                      hasVoted
                        ? "bg-rose-500 text-white shadow-md shadow-rose-500/25"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                    }`}
                  >
                    <Heart className={`h-3.5 w-3.5 ${hasVoted ? "fill-white" : ""}`} />
                    {hasVoted ? "Voted" : "Upvote"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
