import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  BookOpen,
  FileCheck2,
  Clock,
  FileText,
  Bot,
  Sliders,
  Flame,
  Sparkles,
  X,
} from "lucide-react";
import { useStudy } from "../../context/useStudy";

export default function Sidebar({ isOpen, onClose }) {
  const { tasks, courses, assignments, exams, notes, userProfile } = useStudy();

  const pendingTasksCount = tasks.filter(
    (t) => t.status !== "completed",
  ).length;
  const pendingAssignmentsCount = assignments.filter(
    (a) => a.status !== "graded",
  ).length;

  const navItems = [
    { label: "Dashboard", path: "/", icon: LayoutDashboard },
    {
      label: "Tasks",
      path: "/tasks",
      icon: CheckSquare,
      badge: pendingTasksCount,
    },
    {
      label: "Courses",
      path: "/courses",
      icon: BookOpen,
      badge: courses.length,
    },
    {
      label: "Assignments",
      path: "/assignments",
      icon: FileCheck2,
      badge: pendingAssignmentsCount,
    },
    {
      label: "Exam Countdown",
      path: "/examcountdown",
      icon: Clock,
      badge: exams.length,
    },
    { label: "Notes", path: "/notes", icon: FileText, badge: notes.length },
    {
      label: "AI Study Assistant",
      path: "/ai-assistant",
      icon: Bot,
      isSpecial: true,
    },
    { label: "Settings & Roadmap", path: "/settings", icon: Sliders },
  ];

  return (
    <aside
      id="primary-navigation"
      className={`fixed inset-y-0 left-0 z-50 flex h-dvh w-72 shrink-0 flex-col justify-between border-r border-slate-200 bg-white/95 backdrop-blur-xl transition-transform duration-300 dark:border-slate-800/80 dark:bg-slate-900/95 lg:sticky lg:inset-y-auto lg:left-auto lg:z-30 lg:h-screen lg:w-64 lg:translate-x-0 lg:bg-white/70 lg:dark:bg-slate-900/80 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-100 dark:border-slate-800/60">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-tr from-indigo-600 via-indigo-500 to-cyan-400 text-white shadow-lg shadow-indigo-500/25">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
              STUDY
              <span className="text-indigo-500 dark:text-indigo-400">FLOW</span>
            </h1>
            <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
              Student Hub
            </p>
          </div>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={onClose}
            className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `group flex min-h-11 items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 dark:bg-indigo-600"
                      : item.isSpecial
                        ? "text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`h-4 w-4 transition-transform group-hover:scale-110 ${
                          isActive ? "text-white" : ""
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== undefined && item.badge > 0 && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer Streak & User Quick Pill */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800/60">
        <div className="rounded-xl bg-linear-to-r from-amber-500/10 via-amber-500/5 to-rose-500/10 dark:from-amber-950/40 dark:to-rose-950/40 border border-amber-500/20 p-3 mb-3">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-amber-500 animate-bounce" />
            <div>
              <p className="text-xs font-bold text-amber-700 dark:text-amber-400">
                {userProfile.streakDays} Day Study Streak!
              </p>
              <p className="text-[10px] text-amber-600/80 dark:text-amber-300/70">
                Consistency is key to an A+
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            className="h-9 w-9 rounded-full object-cover border-2 border-indigo-500/30"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
              {userProfile.name}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
              GPA:{" "}
              <span className="font-semibold text-emerald-500">
                {userProfile.currentGPA}
              </span>{" "}
              / 4.0
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
