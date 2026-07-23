import React, { useState, useEffect } from "react";
import { X, Check } from "lucide-react";
import { useStudy } from "../../context/StudyContext";

export default function NoteModal() {
  const { activeModal, closeModal, editingItem, addNote, updateNote, courses } = useStudy();

  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [category, setCategory] = useState("Lecture Notes");
  const [tagsStr, setTagsStr] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editingItem) {
      setTitle(editingItem.title || "");
      setCourseId(editingItem.courseId || (courses[0]?.id || ""));
      setCategory(editingItem.category || "Lecture Notes");
      setTagsStr(editingItem.tags ? editingItem.tags.join(", ") : "");
      setContent(editingItem.content || "");
    } else {
      setTitle("");
      setCourseId(courses[0]?.id || "");
      setCategory("Lecture Notes");
      setTagsStr("Study Notes");
      setContent("# Key Concepts\n\n- Point 1\n- Point 2\n\n### Summary\nWrite main key takeaways here.");
    }
  }, [editingItem, courses]);

  if (activeModal !== "note") return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tags = tagsStr
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const notePayload = {
      title,
      courseId,
      category,
      tags,
      content,
    };

    if (editingItem) {
      updateNote(editingItem.id, notePayload);
    } else {
      addNote(notePayload);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 transition-all max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {editingItem ? "Edit Note" : "Create New Study Note"}
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
              Note Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Graph Traversal Algorithms Overview"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-4 py-2.5 text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
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
                    {c.code}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3 py-2.5 text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none"
              >
                <option value="Lecture Notes">Lecture Notes</option>
                <option value="Study Guide">Study Guide</option>
                <option value="Reference">Reference</option>
                <option value="Cheatsheet">Cheatsheet</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Tags
              </label>
              <input
                type="text"
                placeholder="Trees, Midterm"
                value={tagsStr}
                onChange={(e) => setTagsStr(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3 py-2 text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Note Content (Markdown supported)
            </label>
            <textarea
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-4 font-mono text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none"
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
              {editingItem ? "Save Changes" : "Save Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
