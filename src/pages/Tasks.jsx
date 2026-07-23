import React, { useState } from "react";
import {
  CheckSquare,
  Plus,
  Filter,
  Kanban,
  List,
  Edit2,
  Trash2,
  Clock,
  Tag,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { useStudy } from "../context/StudyContext";

export default function Tasks() {
  const { tasks, courses, toggleTaskStatus, deleteTask, openModal } = useStudy();

  const [viewMode, setViewMode] = useState("list"); // 'list' | 'kanban'
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtering
  const filteredTasks = tasks.filter((t) => {
    const matchesCourse = selectedCourse === "all" || t.courseId === selectedCourse;
    const matchesPriority = selectedPriority === "all" || t.priority === selectedPriority;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCourse && matchesPriority && matchesSearch;
  });

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
      {/* Page Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Tasks & Action Items
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Organize, prioritize, and check off your academic workloads.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex rounded-xl bg-slate-200/80 dark:bg-slate-800 p-1 border border-slate-300/60 dark:border-slate-700">
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                viewMode === "list"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              <List className="h-4 w-4" />
              List
            </button>
            <button
              onClick={() => setViewMode("kanban")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                viewMode === "kanban"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              <Kanban className="h-4 w-4" />
              Kanban
            </button>
          </div>

          <button
            onClick={() => openModal("task")}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 transition"
          >
            <Plus className="h-4 w-4" />
            Create Task
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="glass-card rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1">
          <input
            type="text"
            placeholder="Filter tasks by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-72 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-xs font-semibold text-slate-500">Course:</span>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="all">All Courses</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.code}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Priority:</span>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Task View */}
      {viewMode === "list" ? (
        <div className="glass-card rounded-3xl p-6 space-y-3">
          {filteredTasks.length === 0 ? (
            <p className="py-12 text-center text-sm text-slate-400">No tasks match your filter.</p>
          ) : (
            filteredTasks.map((task) => {
              const isDone = task.status === "completed";
              return (
                <div
                  key={task.id}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/50 p-4 transition hover:border-indigo-500/50 hover:shadow-md gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <button
                      onClick={() => toggleTaskStatus(task.id)}
                      className="mt-0.5 text-indigo-600 dark:text-indigo-400 hover:scale-110 transition"
                    >
                      {isDone ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      ) : (
                        <Circle className="h-5 w-5 text-slate-400 hover:text-indigo-500" />
                      )}
                    </button>

                    <div>
                      <h4
                        className={`text-sm font-bold text-slate-900 dark:text-white ${
                          isDone ? "line-through text-slate-400 dark:text-slate-500" : ""
                        }`}
                      >
                        {task.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-2 mt-1.5">
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                          style={{ backgroundColor: getCourseColor(task.courseId) }}
                        >
                          {getCourseCode(task.courseId)}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                          <Clock className="h-3 w-3" /> Due {task.dueDate}
                        </span>
                        <span className="text-[11px] text-slate-400">⏱️ {task.estimatedTime}</span>
                        {task.tags &&
                          task.tags.map((tg) => (
                            <span
                              key={tg}
                              className="inline-flex items-center gap-1 text-[10px] bg-slate-200/60 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md"
                            >
                              <Tag className="h-2.5 w-2.5" />
                              {tg}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 border-slate-200/40 dark:border-slate-700/40 pt-2 sm:pt-0">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full priority-${task.priority}`}
                    >
                      {task.priority} Priority
                    </span>

                    <div className="flex items-center gap-1 opacity-90 sm:opacity-0 group-hover:opacity-100 transition">
                      <button
                        onClick={() => openModal("task", task)}
                        className="rounded-lg p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                        title="Edit Task"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="rounded-lg p-1.5 text-slate-400 hover:text-rose-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                        title="Delete Task"
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
      ) : (
        /* Kanban Board View */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { key: "todo", title: "To Do", color: "border-slate-400" },
            { key: "in_progress", title: "In Progress", color: "border-amber-400" },
            { key: "completed", title: "Completed", color: "border-emerald-400" },
          ].map((col) => {
            const colTasks = filteredTasks.filter((t) => t.status === col.key);
            return (
              <div
                key={col.key}
                className="glass-card rounded-3xl p-5 flex flex-col justify-between space-y-4"
              >
                <div className={`flex items-center justify-between border-b-2 ${col.color} pb-3`}>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    {col.title}
                  </h3>
                  <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-xs font-bold text-slate-600 dark:text-slate-300">
                    {colTasks.length}
                  </span>
                </div>

                <div className="space-y-3 flex-1 min-h-[300px]">
                  {colTasks.map((task) => (
                    <div
                      key={task.id}
                      className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-4 shadow-sm space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                          style={{ backgroundColor: getCourseColor(task.courseId) }}
                        >
                          {getCourseCode(task.courseId)}
                        </span>
                        <span
                          className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full priority-${task.priority}`}
                        >
                          {task.priority}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {task.title}
                      </h4>

                      <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 dark:border-slate-700/50 pt-2">
                        <span>📅 {task.dueDate}</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => openModal("task", task)}
                            className="p-1 hover:text-indigo-500"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="p-1 hover:text-rose-500"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
