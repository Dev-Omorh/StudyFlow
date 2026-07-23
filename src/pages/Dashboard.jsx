import React, { useState, useEffect } from "react";
import {
  CheckSquare,
  BookOpen,
  Clock,
  Flame,
  Award,
  Plus,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ArrowRight,
  TrendingUp,
  FileText,
  Calendar,
} from "lucide-react";
import { useStudy } from "../context/StudyContext";

export default function Dashboard() {
  const {
    tasks,
    courses,
    assignments,
    exams,
    notes,
    userProfile,
    toggleTaskStatus,
    openModal,
  } = useStudy();

  // Pomodoro Focus Timer State
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const toggleTimer = () => setTimerRunning((prev) => !prev);
  const resetTimer = () => {
    setTimerRunning(false);
    setTimerSeconds(25 * 60);
  };

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Metrics Calculations
  const todayStr = new Date().toISOString().split("T")[0];
  const tasksDueToday = tasks.filter((t) => t.dueDate === todayStr && t.status !== "completed");
  const pendingAssignments = assignments.filter((a) => a.status !== "graded");
  
  // Nearest upcoming exam
  const sortedExams = [...exams].sort(
    (a, b) => new Date(a.examDate).getTime() - new Date(b.examDate).getTime()
  );
  const nextExam = sortedExams[0];

  // Exam Countdown calculation
  const getExamDiff = (examDateStr) => {
    if (!examDateStr) return { days: 0, hours: 0, mins: 0, secs: 0 };
    const diff = new Date(examDateStr).getTime() - new Date().getTime();
    if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    return { days, hours, mins, secs };
  };

  const [timeRemaining, setTimeRemaining] = useState(() => getExamDiff(nextExam?.examDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(getExamDiff(nextExam?.examDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [nextExam]);

  return (
    <div className="space-y-8">
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-800 p-8 text-white shadow-2xl shadow-indigo-600/20">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md px-3 py-1 text-xs font-semibold tracking-wide text-indigo-100 mb-3 border border-white/20">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Fall 2026 Academic Term</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Welcome back, {userProfile.name}! 👋
            </h1>
            <p className="mt-2 text-indigo-100/90 text-sm max-w-xl">
              You have <span className="font-bold text-white">{tasks.filter((t) => t.status !== "completed").length} active tasks</span> and <span className="font-bold text-white">{pendingAssignments.length} pending assignments</span> this week. Let's conquer your study goals!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openModal("task")}
              className="inline-flex items-center gap-2 rounded-2xl bg-white hover:bg-slate-50 px-5 py-3 text-sm font-bold text-indigo-600 shadow-xl transition transform hover:scale-105"
            >
              <Plus className="h-4 w-4" />
              Add Task
            </button>
            <button
              onClick={() => openModal("note")}
              className="inline-flex items-center gap-2 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md px-5 py-3 text-sm font-bold text-white border border-white/20 transition"
            >
              <FileText className="h-4 w-4" />
              Quick Note
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card rounded-2xl p-5 glow-on-hover flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Due Today
            </p>
            <h3 className="mt-1 text-3xl font-extrabold text-slate-900 dark:text-white">
              {tasksDueToday.length}
            </h3>
            <p className="mt-1 text-[11px] font-medium text-indigo-500">
              {tasksDueToday.length === 0 ? "All caught up!" : "Requires attention"}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500">
            <Calendar className="h-6 w-6" />
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 glow-on-hover flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Pending Assignments
            </p>
            <h3 className="mt-1 text-3xl font-extrabold text-slate-900 dark:text-white">
              {pendingAssignments.length}
            </h3>
            <p className="mt-1 text-[11px] font-medium text-amber-500">
              {assignments.filter((a) => a.status === "in_progress").length} in progress
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">
            <BookOpen className="h-6 w-6" />
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 glow-on-hover flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Upcoming Exams
            </p>
            <h3 className="mt-1 text-3xl font-extrabold text-slate-900 dark:text-white">
              {exams.length}
            </h3>
            <p className="mt-1 text-[11px] font-medium text-rose-500">
              Next in {timeRemaining.days}d {timeRemaining.hours}h
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500">
            <Clock className="h-6 w-6" />
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 glow-on-hover flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Current GPA
            </p>
            <h3 className="mt-1 text-3xl font-extrabold text-slate-900 dark:text-white">
              {userProfile.currentGPA}
            </h3>
            <p className="mt-1 text-[11px] font-medium text-emerald-500 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> Target: {userProfile.targetGPA}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
            <Award className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Main Grid: Urgent Countdown + Pomodoro Focus */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Urgent Exam Live Ticker */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-500 uppercase tracking-wider">
                <Clock className="h-4 w-4" /> Next Upcoming Exam
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {nextExam ? nextExam.title : "No upcoming exams"}
              </h2>
            </div>
            {nextExam && (
              <span className="rounded-full bg-rose-500/10 border border-rose-500/30 px-3 py-1 text-xs font-semibold text-rose-500">
                Weight: {nextExam.weight}%
              </span>
            )}
          </div>

          {nextExam ? (
            <div className="my-6">
              <div className="grid grid-cols-4 gap-3 text-center">
                <div className="rounded-2xl bg-slate-100/70 dark:bg-slate-800/60 p-4 border border-slate-200/50 dark:border-slate-700/50">
                  <span className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
                    {timeRemaining.days}
                  </span>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                    Days
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-100/70 dark:bg-slate-800/60 p-4 border border-slate-200/50 dark:border-slate-700/50">
                  <span className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
                    {timeRemaining.hours.toString().padStart(2, "0")}
                  </span>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                    Hours
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-100/70 dark:bg-slate-800/60 p-4 border border-slate-200/50 dark:border-slate-700/50">
                  <span className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
                    {timeRemaining.mins.toString().padStart(2, "0")}
                  </span>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                    Mins
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-100/70 dark:bg-slate-800/60 p-4 border border-slate-200/50 dark:border-slate-700/50">
                  <span className="text-3xl sm:text-4xl font-extrabold text-rose-500">
                    {timeRemaining.secs.toString().padStart(2, "0")}
                  </span>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                    Secs
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/30 rounded-xl p-3">
                <span>📍 Location: <strong className="text-slate-800 dark:text-slate-200">{nextExam.location}</strong></span>
                <span>🎯 Target: <strong className="text-emerald-500">{nextExam.targetGrade}</strong></span>
              </div>
            </div>
          ) : (
            <p className="py-12 text-center text-sm text-slate-400">
              No exams scheduled right now. Relax or add a new exam!
            </p>
          )}
        </div>

        {/* Pomodoro Quick Timer Card */}
        <div className="glass-card rounded-3xl p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-amber-500" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Focus Pomodoro</h3>
            </div>
            <span className="text-xs font-semibold text-slate-400">25 Min Focus</span>
          </div>

          <div className="my-6 text-center">
            <span className="text-5xl font-extrabold tracking-widest font-mono text-slate-900 dark:text-white">
              {formatTimer(timerSeconds)}
            </span>
            <p className="text-xs text-slate-400 mt-2">
              {timerRunning ? "🔥 Deep Study Session active..." : "Ready to focus?"}
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={toggleTimer}
              className={`flex-1 inline-flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold text-white transition ${
                timerRunning
                  ? "bg-amber-500 hover:bg-amber-600 shadow-lg shadow-amber-500/25"
                  : "bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/25"
              }`}
            >
              {timerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {timerRunning ? "Pause" : "Start Focus"}
            </button>
            <button
              onClick={resetTimer}
              className="rounded-xl bg-slate-100 dark:bg-slate-800 p-2.5 text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
              title="Reset Timer"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Task & Notes Quick Glance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Task List */}
        <div className="glass-card rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-indigo-500" />
              Today's Action Items
            </h3>
            <button
              onClick={() => openModal("task")}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              + New Task
            </button>
          </div>

          <div className="space-y-2.5">
            {tasks.slice(0, 4).map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50 p-3.5 transition hover:border-indigo-500/40"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.status === "completed"}
                    onChange={() => toggleTaskStatus(task.id)}
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                  <div>
                    <p
                      className={`text-sm font-semibold text-slate-900 dark:text-white ${
                        task.status === "completed" ? "line-through text-slate-400 dark:text-slate-500" : ""
                      }`}
                    >
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] font-medium text-slate-400">{task.estimatedTime}</span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full priority-${task.priority}`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Notes */}
        <div className="glass-card rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-emerald-500" />
              Recent Notes
            </h3>
            <button
              onClick={() => openModal("note")}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              + New Note
            </button>
          </div>

          <div className="space-y-3">
            {notes.slice(0, 3).map((note) => (
              <div
                key={note.id}
                className="rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50 p-4 transition hover:border-emerald-500/40"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold px-2.5 py-0.5">
                    {note.category}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {new Date(note.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm mt-2">
                  {note.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                  {note.content.replace(/[#*`]/g, "")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
