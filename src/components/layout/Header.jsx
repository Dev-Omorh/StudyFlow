import { useState } from "react";
import {
  Search,
  Plus,
  Sun,
  Moon,
  CheckSquare,
  BookOpen,
  Clock,
  FileText,
  Menu,
} from "lucide-react";
import { useStudy } from "../../context/useStudy";
import NotificationPopover from "../common/NotificationPopover";

export default function Header({ isNavOpen, onMenuClick }) {
  const { isDarkMode, toggleDarkMode, setSearchOpen, openModal } = useStudy();
  const [quickMenuOpen, setQuickMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full min-w-0 items-center justify-between gap-2 border-b border-slate-200 bg-white/90 px-3 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/90 sm:gap-4 sm:px-6">
      <button
        type="button"
        aria-label="Open navigation menu"
        aria-controls="primary-navigation"
        aria-expanded={isNavOpen}
        onClick={onMenuClick}
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>
      {/* Search Input Trigger */}
      <button
        onClick={() => setSearchOpen(true)}
        aria-label="Search tasks, courses, and notes"
        className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-medium text-slate-400 shadow-inner transition hover:text-slate-600 dark:border-slate-800 dark:bg-slate-800/50 dark:hover:text-slate-200 sm:max-w-sm sm:gap-3 sm:px-4"
      >
        <Search className="h-4 w-4 text-slate-400" />
        <span className="hidden min-w-0 flex-1 truncate text-left sm:block">
          Search tasks, courses, notes...
        </span>
        <kbd className="hidden sm:inline-block rounded bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600 dark:text-slate-300">
          ⌘K
        </kbd>
      </button>

      {/* Action Controls */}
      <div className="flex shrink-0 items-center gap-1 sm:gap-3">
        {/* Quick Add Menu Dropdown */}
        <div className="relative">
          <button
            onClick={() => setQuickMenuOpen((prev) => !prev)}
            aria-expanded={quickMenuOpen}
            aria-haspopup="menu"
            aria-label="Create new item"
            className="inline-flex h-11 items-center gap-1.5 rounded-xl bg-indigo-600 px-3 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-500 sm:gap-2 sm:px-4"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Create</span>
          </button>

          {quickMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setQuickMenuOpen(false)}
              />
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
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5 text-amber-400" />
          ) : (
            <Moon className="h-5 w-5 text-slate-600" />
          )}
        </button>
      </div>
    </header>
  );
}
