import React, { useState } from "react";
import {
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  Clock,
  Award,
  CheckCircle,
  FileText,
  ChevronRight,
} from "lucide-react";
import { useStudy } from "../context/StudyContext";

export default function Assignments() {
  const {
    assignments,
    courses,
    cycleAssignmentStatus,
    deleteAssignment,
    openModal,
  } = useStudy();

  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { key: "all", label: "All Assignments" },
    { key: "not_started", label: "Not Started" },
    { key: "in_progress", label: "In Progress" },
    { key: "submitted", label: "Submitted" },
    { key: "graded", label: "Graded" },
  ];

  const filteredAssignments = assignments.filter(
    (a) => activeTab === "all" || a.status === activeTab
  );

  const getCourseCode = (courseId) => {
    const c = courses.find((crs) => crs.id === courseId);
    return c ? c.code : "General";
  };

  const getCourseColor = (courseId) => {
    const c = courses.find((crs) => crs.id === courseId);
    return c ? c.color : "#6366f1";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Assignment Tracker
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track coursework through stages from initial draft to final grade.
          </p>
        </div>

        <button
          onClick={() => openModal("assignment")}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 transition"
        >
          <Plus className="h-4 w-4" />
          Track Assignment
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {tabs.map((tab) => {
          const count =
            tab.key === "all"
              ? assignments.length
              : assignments.filter((a) => a.status === tab.key).length;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                activeTab === tab.key
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                  : "bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] ${
                  activeTab === tab.key
                    ? "bg-white/20 text-white"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Assignments List */}
      <div className="glass-card rounded-3xl p-6 space-y-4">
        {filteredAssignments.length === 0 ? (
          <p className="py-12 text-center text-sm text-slate-400">
            No assignments found under <span className="font-semibold">{activeTab}</span>.
          </p>
        ) : (
          filteredAssignments.map((item) => {
            const scorePct =
              item.score !== null ? Math.round((item.score / item.maxScore) * 100) : null;

            return (
              <div
                key={item.id}
                className="group flex flex-col md:flex-row md:items-center justify-between rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/50 p-5 transition hover:border-indigo-500/50 hover:shadow-md gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 font-extrabold text-xs">
                    {item.weight}%
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: getCourseColor(item.courseId) }}
                      >
                        {getCourseCode(item.courseId)}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        Due {item.dueDate}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                      {item.title}
                    </h3>

                    {item.description && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 border-slate-200/40 dark:border-slate-700/40 pt-3 md:pt-0">
                  {/* Score pill */}
                  {scorePct !== null && (
                    <div className="text-right">
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        {item.score} / {item.maxScore}
                      </p>
                      <span
                        className={`text-[10px] font-bold ${
                          scorePct >= 90
                            ? "text-emerald-500"
                            : scorePct >= 80
                            ? "text-amber-500"
                            : "text-rose-500"
                        }`}
                      >
                        {scorePct}% Grade
                      </span>
                    </div>
                  )}

                  {/* Stage Badge Trigger Button */}
                  <button
                    onClick={() => cycleAssignmentStatus(item.id)}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider transition hover:scale-105 badge-${item.status}`}
                    title="Click to advance stage"
                  >
                    <span>{item.status.replace("_", " ")}</span>
                    <ChevronRight className="h-3 w-3 opacity-60" />
                  </button>

                  <div className="flex items-center gap-1 opacity-90 md:opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => openModal("assignment", item)}
                      className="rounded-lg p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                      title="Edit Assignment"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteAssignment(item.id)}
                      className="rounded-lg p-1.5 text-slate-400 hover:text-rose-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                      title="Delete Assignment"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
