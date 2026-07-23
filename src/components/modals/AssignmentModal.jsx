import React, { useState, useEffect } from "react";
import { X, Check } from "lucide-react";
import { useStudy } from "../../context/StudyContext";

export default function AssignmentModal() {
  const { activeModal, closeModal, editingItem, addAssignment, updateAssignment, courses } = useStudy();

  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("not_started");
  const [priority, setPriority] = useState("medium");
  const [score, setScore] = useState("");
  const [maxScore, setMaxScore] = useState(100);
  const [weight, setWeight] = useState(15);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingItem) {
      setTitle(editingItem.title || "");
      setCourseId(editingItem.courseId || (courses[0]?.id || ""));
      setDueDate(editingItem.dueDate || new Date().toISOString().split("T")[0]);
      setStatus(editingItem.status || "not_started");
      setPriority(editingItem.priority || "medium");
      setScore(editingItem.score !== null && editingItem.score !== undefined ? editingItem.score : "");
      setMaxScore(editingItem.maxScore || 100);
      setWeight(editingItem.weight || 15);
      setDescription(editingItem.description || "");
    } else {
      setTitle("");
      setCourseId(courses[0]?.id || "");
      setDueDate(new Date().toISOString().split("T")[0]);
      setStatus("not_started");
      setPriority("medium");
      setScore("");
      setMaxScore(100);
      setWeight(15);
      setDescription("");
    }
  }, [editingItem, courses]);

  if (activeModal !== "assignment") return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const assignmentPayload = {
      title,
      courseId,
      dueDate,
      status,
      priority,
      score: score !== "" ? Number(score) : null,
      maxScore: Number(maxScore),
      weight: Number(weight),
      description,
    };

    if (editingItem) {
      updateAssignment(editingItem.id, assignmentPayload);
    } else {
      addAssignment(assignmentPayload);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 transition-all">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {editingItem ? "Edit Assignment" : "Track New Assignment"}
          </h2>
          <button
            onClick={closeModal}
            className="rounded-lg p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Assignment Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Problem Set 4: AVL Trees"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-4 py-2.5 text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Course
              </label>
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3 py-2.5 text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code} - {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Due Date
              </label>
              <input
                type="date"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3 py-2 text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Status Stage
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3 py-2.5 text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none"
              >
                <option value="not_started">Not Started</option>
                <option value="in_progress">In Progress</option>
                <option value="submitted">Submitted</option>
                <option value="graded">Graded</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3 py-2.5 text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none"
              >
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Score
              </label>
              <input
                type="number"
                placeholder="e.g. 95"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3 py-2 text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Max Score
              </label>
              <input
                type="number"
                value={maxScore}
                onChange={(e) => setMaxScore(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3 py-2 text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Weight %
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3 py-2 text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Description / Notes
            </label>
            <textarea
              rows={2}
              placeholder="Instructions or key requirements..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-4 py-2 text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={closeModal}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition"
            >
              <Check className="h-4 w-4" />
              {editingItem ? "Save Assignment" : "Add Assignment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
