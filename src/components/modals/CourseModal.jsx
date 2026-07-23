import React, { useState, useEffect } from "react";
import { X, Check } from "lucide-react";
import { useStudy } from "../../context/StudyContext";

export default function CourseModal() {
  const { activeModal, closeModal, editingItem, addCourse, updateCourse } = useStudy();

  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [instructor, setInstructor] = useState("");
  const [room, setRoom] = useState("");
  const [creditHours, setCreditHours] = useState(3);
  const [gradeGoal, setGradeGoal] = useState("A");
  const [currentGrade, setCurrentGrade] = useState(90);
  const [color, setColor] = useState("#6366f1");
  const [schedule, setSchedule] = useState("");

  useEffect(() => {
    if (editingItem) {
      setCode(editingItem.code || "");
      setTitle(editingItem.title || "");
      setInstructor(editingItem.instructor || "");
      setRoom(editingItem.room || "");
      setCreditHours(editingItem.creditHours || 3);
      setGradeGoal(editingItem.gradeGoal || "A");
      setCurrentGrade(editingItem.currentGrade || 90);
      setColor(editingItem.color || "#6366f1");
      setSchedule(editingItem.schedule || "");
    } else {
      setCode("");
      setTitle("");
      setInstructor("");
      setRoom("");
      setCreditHours(3);
      setGradeGoal("A");
      setCurrentGrade(90);
      setColor("#6366f1");
      setSchedule("Mon, Wed • 10:00 AM");
    }
  }, [editingItem]);

  if (activeModal !== "course") return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code.trim() || !title.trim()) return;

    const coursePayload = {
      code,
      title,
      instructor,
      room,
      creditHours,
      gradeGoal,
      currentGrade,
      color,
      schedule,
    };

    if (editingItem) {
      updateCourse(editingItem.id, coursePayload);
    } else {
      addCourse(coursePayload);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 transition-all">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {editingItem ? "Edit Course" : "Add New Course"}
          </h2>
          <button
            onClick={closeModal}
            className="rounded-lg p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Code
              </label>
              <input
                type="text"
                required
                placeholder="CS 201"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3 py-2 text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Course Title
              </label>
              <input
                type="text"
                required
                placeholder="Data Structures & Algorithms"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-4 py-2 text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Instructor
              </label>
              <input
                type="text"
                placeholder="Dr. Vance"
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3 py-2 text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Location / Room
              </label>
              <input
                type="text"
                placeholder="Science Hall 304"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3 py-2 text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Credits
              </label>
              <input
                type="number"
                min="1"
                max="6"
                value={creditHours}
                onChange={(e) => setCreditHours(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3 py-2 text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Grade Goal
              </label>
              <input
                type="text"
                placeholder="A"
                value={gradeGoal}
                onChange={(e) => setGradeGoal(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3 py-2 text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Current %
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={currentGrade}
                onChange={(e) => setCurrentGrade(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3 py-2 text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Class Schedule
            </label>
            <input
              type="text"
              placeholder="Mon, Wed, Fri • 10:00 AM - 11:30 AM"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-4 py-2 text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Color Tag
            </label>
            <div className="flex items-center gap-3">
              {["#6366f1", "#ec4899", "#10b981", "#f59e0b", "#8b5cf6", "#06b6d4"].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`h-7 w-7 rounded-full border-2 transition ${
                    color === c ? "border-white scale-110 shadow-md" : "border-transparent"
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
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
              {editingItem ? "Save Changes" : "Add Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
