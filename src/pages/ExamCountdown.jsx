import React, { useState, useEffect } from "react";
import {
  Clock,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Circle,
  MapPin,
  Target,
  BookOpen,
  Award,
} from "lucide-react";
import { useStudy } from "../context/StudyContext";

export default function ExamCountdown() {
  const { exams, courses, toggleExamTopic, deleteExam, openModal } = useStudy();

  const [selectedExamId, setSelectedExamId] = useState(() => exams[0]?.id || null);

  const selectedExam = exams.find((e) => e.id === selectedExamId) || exams[0];

  // Real-time ticking timer for selected exam
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const updateDiff = () => {
      if (!selectedExam?.examDate) return;
      const diff = new Date(selectedExam.examDate).getTime() - new Date().getTime();
      if (diff <= 0) {
        setTimeRemaining({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);
      setTimeRemaining({ days, hours, mins, secs });
    };

    updateDiff();
    const interval = setInterval(updateDiff, 1000);
    return () => clearInterval(interval);
  }, [selectedExam]);

  const getCourseCode = (courseId) => {
    const c = courses.find((crs) => crs.id === courseId);
    return c ? c.code : "General";
  };

  const getCourseColor = (courseId) => {
    const c = courses.find((crs) => crs.id === courseId);
    return c ? c.color : "#6366f1";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Exam Countdown & Scope
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track exam schedules, target scores, and mark off study checklist topics.
          </p>
        </div>

        <button
          onClick={() => openModal("exam")}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 transition"
        >
          <Plus className="h-4 w-4" />
          Schedule Exam
        </button>
      </div>

      {/* Selected Exam Live Ticker Hero */}
      {selectedExam ? (
        <div className="glass-card rounded-3xl p-8 relative overflow-hidden bg-gradient-to-br from-indigo-900/10 via-slate-900/5 to-rose-900/10 border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200/60 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="rounded-full px-3 py-1 text-xs font-extrabold text-white"
                  style={{ backgroundColor: getCourseColor(selectedExam.courseId) }}
                >
                  {getCourseCode(selectedExam.courseId)}
                </span>
                <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider">
                  Exam Weight: {selectedExam.weight}%
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {selectedExam.title}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => openModal("exam", selectedExam)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 transition"
              >
                <Edit2 className="h-3.5 w-3.5" />
                Edit
              </button>
              <button
                onClick={() => deleteExam(selectedExam.id)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 px-3.5 py-2 text-xs font-semibold text-rose-500 transition"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </button>
            </div>
          </div>

          {/* Ticking Counter Display */}
          <div className="py-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="rounded-2xl bg-white/80 dark:bg-slate-800/80 p-5 shadow-lg border border-slate-200/60 dark:border-slate-700/60 backdrop-blur-md">
                <span className="text-4xl sm:text-5xl font-extrabold text-indigo-600 dark:text-indigo-400">
                  {timeRemaining.days}
                </span>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-2">
                  Days
                </p>
              </div>

              <div className="rounded-2xl bg-white/80 dark:bg-slate-800/80 p-5 shadow-lg border border-slate-200/60 dark:border-slate-700/60 backdrop-blur-md">
                <span className="text-4xl sm:text-5xl font-extrabold text-indigo-600 dark:text-indigo-400">
                  {timeRemaining.hours.toString().padStart(2, "0")}
                </span>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-2">
                  Hours
                </p>
              </div>

              <div className="rounded-2xl bg-white/80 dark:bg-slate-800/80 p-5 shadow-lg border border-slate-200/60 dark:border-slate-700/60 backdrop-blur-md">
                <span className="text-4xl sm:text-5xl font-extrabold text-indigo-600 dark:text-indigo-400">
                  {timeRemaining.mins.toString().padStart(2, "0")}
                </span>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-2">
                  Minutes
                </p>
              </div>

              <div className="rounded-2xl bg-white/80 dark:bg-slate-800/80 p-5 shadow-lg border border-slate-200/60 dark:border-slate-700/60 backdrop-blur-md">
                <span className="text-4xl sm:text-5xl font-extrabold text-rose-500">
                  {timeRemaining.secs.toString().padStart(2, "0")}
                </span>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-2">
                  Seconds
                </p>
              </div>
            </div>
          </div>

          {/* Scope Checklist for Selected Exam */}
          <div className="border-t border-slate-200/60 dark:border-slate-800 pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-indigo-500" />
                Study Scope Checklist
              </h3>
              <span className="text-xs font-semibold text-slate-400">
                {selectedExam.checklist?.filter((c) => c.completed).length || 0} /{" "}
                {selectedExam.checklist?.length || 0} Topics Mastered
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedExam.checklist?.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleExamTopic(selectedExam.id, item.id)}
                  className={`flex items-center gap-3 rounded-2xl p-3.5 text-xs font-medium cursor-pointer transition border ${
                    item.completed
                      ? "bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 text-slate-400 dark:text-slate-500 line-through"
                      : "bg-white/80 dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-700/60 text-slate-800 dark:text-slate-200 hover:border-indigo-500/50"
                  }`}
                >
                  {item.completed ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  ) : (
                    <Circle className="h-4 w-4 text-slate-400 flex-shrink-0" />
                  )}
                  <span>{item.topic}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-card rounded-3xl p-12 text-center text-slate-400">
          No exams scheduled. Click "+ Schedule Exam" to add one.
        </div>
      )}

      {/* List of All Exams */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          All Scheduled Exams ({exams.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {exams.map((exam) => {
            const isSelected = exam.id === selectedExam?.id;
            return (
              <div
                key={exam.id}
                onClick={() => setSelectedExamId(exam.id)}
                className={`glass-card rounded-2xl p-5 cursor-pointer transition-all ${
                  isSelected
                    ? "ring-2 ring-indigo-500 scale-[1.02] shadow-xl"
                    : "hover:scale-[1.01]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[10px] font-extrabold text-white"
                    style={{ backgroundColor: getCourseColor(exam.courseId) }}
                  >
                    {getCourseCode(exam.courseId)}
                  </span>
                  <span className="text-[11px] font-semibold text-rose-500">
                    {exam.weight}% Weight
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {exam.title}
                </h4>

                <div className="mt-3 space-y-1 text-xs text-slate-500 dark:text-slate-400">
                  <p className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    {new Date(exam.examDate).toLocaleString()}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    {exam.location}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
