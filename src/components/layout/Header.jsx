import React, { useState } from "react";
import { Search, Plus, Sun, Moon, Sparkles, CheckSquare, BookOpen, Clock, FileText } from "lucide-react";
import { useStudy } from "../../context/StudyContext";
import NotificationPopover from "../common/NotificationPopover";

export default function Header() {
  const { isDarkMode, toggleDarkMode, setSearchOpen, openModal } = useStudy();
  const [quickMenuOpen, setQuickMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl px-6">
      {/* Search Input Trigger */}
      <button
        onClick={() => setSearchOpen(true)}
        className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition w-64 sm:w-80 shadow-inner"
      >
        <Search className="h-4 w-4 text-slate-400" />
        <span className="flex-1 text-left">Search tasks, courses, notes...</span>
        <kbd className="hidden sm:inline-block rounded bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600 dark:text-slate-300">
          ⌘K
        </kbd>
      </button>

      {/* Action Controls */}
      <div className="flex items-center gap-3">
        {/* Quick Add Menu Dropdown */}
        <div className="relative">
          <button
            onClick={() => setQuickMenuOpen((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 transition"
          >
            <Plus className="h-4 w-4" />
            <span>Create</span>
          </button>

          {quickMenuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setQuickMenuOpen(false)} />
              <div className="absolute right-0 mt-2 z-50 w-48 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-2 space-y-1">
                <button
                  onClick={() => {
                    setQuickMenuOpen(false);
                    openModal("task");
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <CheckSquare className="h-4 w-4 text-indigo-500" />
                  New Task
                </button>
                <button
                  onClick={() => {
                    setQuickMenuOpen(false);
                    openModal("note");
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <FileText className="h-4 w-4 text-emerald-500" />
                  New Note
                </button>
                <button
                  onClick={() => {
                    setQuickMenuOpen(false);
                    openModal("assignment");
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <BookOpen className="h-4 w-4 text-amber-500" />
                  New Assignment
                </button>
                <button
                  onClick={() => {
                    setQuickMenuOpen(false);
                    openModal("exam");
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <Clock className="h-4 w-4 text-rose-500" />
                  New Exam
                </button>
              </div>
            </>
          )}
        </div>

        {/* Notifications Popover */}
        <NotificationPopover />

        {/* Theme Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className="rounded-xl p-2.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-slate-600" />}
        </button>
      </div>
    </header>
  );
}
