import React, { useState } from "react";
import { Bell, CheckCheck, Clock, BookOpen, AlertCircle, Sparkles } from "lucide-react";
import { useStudy } from "../../context/StudyContext";

export default function NotificationPopover() {
  const { notifications, markNotificationAsRead, clearAllNotifications } = useStudy();
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative rounded-xl p-2.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        title="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          <div className="absolute right-0 mt-3 z-50 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Notifications</h3>
                <span className="rounded-full bg-indigo-100 dark:bg-indigo-950 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  {unreadCount} new
                </span>
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={clearAllNotifications}
                  className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                >
                  <CheckCheck className="h-3.5 w-3.5" />
                  Mark all read
                </button>
              )}
            </div>

            <div className="mt-3 space-y-2 max-h-80 overflow-y-auto pr-1">
              {notifications.length === 0 ? (
                <p className="py-6 text-center text-xs text-slate-400">No notifications</p>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markNotificationAsRead(n.id)}
                    className={`cursor-pointer rounded-xl p-3 text-xs transition border ${
                      !n.read
                        ? "bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-800/40"
                        : "bg-slate-50/50 dark:bg-slate-800/30 border-slate-100 dark:border-slate-800"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="mt-0.5">
                        {n.type === "exam" && <AlertCircle className="h-4 w-4 text-rose-500" />}
                        {n.type === "assignment" && <BookOpen className="h-4 w-4 text-amber-500" />}
                        {n.type === "system" && <Sparkles className="h-4 w-4 text-indigo-500" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-slate-900 dark:text-white">{n.title}</p>
                          <span className="flex items-center gap-1 text-[10px] text-slate-400">
                            <Clock className="h-3 w-3" />
                            {n.timestamp}
                          </span>
                        </div>
                        <p className="mt-1 text-slate-600 dark:text-slate-300 leading-relaxed">
                          {n.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
