import { useState } from "react";
import {
  Plus,
  Search,
  Star,
  Download,
  Edit2,
  Trash2,
  Calendar,
} from "lucide-react";
import { useStudy } from "../context/useStudy";

export default function Notes() {
  const { notes, courses, toggleFavoriteNote, deleteNote, openModal } =
    useStudy();

  const [selectedNoteId, setSelectedNoteId] = useState(
    () => notes[0]?.id || null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourseFilter, setSelectedCourseFilter] = useState("all");

  const filteredNotes = notes.filter((n) => {
    const matchesCourse =
      selectedCourseFilter === "all" || n.courseId === selectedCourseFilter;
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCourse && matchesSearch;
  });

  const activeNote =
    notes.find((n) => n.id === selectedNoteId) || filteredNotes[0] || notes[0];

  const getCourseCode = (courseId) => {
    const c = courses.find((crs) => crs.id === courseId);
    return c ? c.code : "General";
  };

  const getCourseColor = (courseId) => {
    const c = courses.find((crs) => crs.id === courseId);
    return c ? c.color : "#6366f1";
  };

  const handleExportMarkdown = (note) => {
    if (!note) return;
    const blob = new Blob([`# ${note.title}\n\n${note.content}`], {
      type: "text/markdown",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${note.title.toLowerCase().replace(/\s+/g, "_")}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Notes & Study Guides
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Capture lectures, markdown notes, formula cheatsheets, and export
            anytime.
          </p>
        </div>

        <button
          onClick={() => openModal("note")}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 transition"
        >
          <Plus className="h-4 w-4" />
          Create Note
        </button>
      </div>

      {/* Two Column Split Workspace */}
      <div className="grid min-h-0 grid-cols-1 gap-4 lg:min-h-150 lg:grid-cols-12 sm:gap-6">
        {/* Left Column: Notes Directory */}
        <div className="glass-card min-w-0 space-y-4 rounded-3xl p-4 lg:col-span-5 sm:p-5">
          <div className="space-y-3">
            {/* Search & Course Filter */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-9 pr-3 text-base text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800/60 dark:text-white sm:py-2 sm:text-sm"
              />
            </div>

            <div className="flex items-center justify-between">
              <select
                value={selectedCourseFilter}
                onChange={(e) => setSelectedCourseFilter(e.target.value)}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="all">All Courses</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code}
                  </option>
                ))}
              </select>

              <span className="text-xs text-slate-400 font-semibold">
                {filteredNotes.length} notes
              </span>
            </div>
          </div>

          {/* List of Notes */}
          <div className="max-h-72 space-y-2.5 overflow-y-auto pr-1 sm:max-h-125 lg:flex-1">
            {filteredNotes.length === 0 ? (
              <p className="py-12 text-center text-xs text-slate-400">
                No notes match.
              </p>
            ) : (
              filteredNotes.map((n) => {
                const isSelected = n.id === activeNote?.id;
                return (
                  <div
                    key={n.id}
                    onClick={() => setSelectedNoteId(n.id)}
                    className={`group rounded-2xl p-4 cursor-pointer transition border ${
                      isSelected
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/25"
                        : "bg-slate-50/80 dark:bg-slate-800/40 border-slate-200/70 dark:border-slate-700/50 hover:border-indigo-500/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                          isSelected ? "bg-white/20 text-white" : "text-white"
                        }`}
                        style={{
                          backgroundColor: isSelected
                            ? undefined
                            : getCourseColor(n.courseId),
                        }}
                      >
                        {getCourseCode(n.courseId)}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavoriteNote(n.id);
                        }}
                        aria-label={`${n.favorite ? "Remove" : "Add"} ${n.title} ${n.favorite ? "from" : "to"} favorites`}
                        className={`inline-flex h-11 w-11 items-center justify-center p-1 transition ${
                          n.favorite
                            ? "text-amber-400"
                            : isSelected
                              ? "text-white/60 hover:text-white"
                              : "text-slate-300 hover:text-amber-400"
                        }`}
                      >
                        <Star
                          className={`h-4 w-4 ${n.favorite ? "fill-amber-400" : ""}`}
                        />
                      </button>
                    </div>

                    <h4
                      className={`text-sm font-bold mt-2 ${
                        isSelected
                          ? "text-white"
                          : "text-slate-900 dark:text-white"
                      }`}
                    >
                      {n.title}
                    </h4>

                    <p
                      className={`text-xs line-clamp-2 mt-1 ${
                        isSelected
                          ? "text-indigo-100"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {n.content.replace(/[#*`]/g, "")}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Note Canvas Viewer */}
        <div className="glass-card min-w-0 space-y-4 rounded-3xl p-4 lg:col-span-7 sm:p-6">
          {activeNote ? (
            <>
              <div className="space-y-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="rounded-full px-3 py-1 text-xs font-extrabold text-white"
                      style={{
                        backgroundColor: getCourseColor(activeNote.courseId),
                      }}
                    >
                      {getCourseCode(activeNote.courseId)}
                    </span>
                    <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
                      {activeNote.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      onClick={() => handleExportMarkdown(activeNote)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 transition"
                      title="Export Markdown File"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Export
                    </button>
                    <button
                      onClick={() => openModal("note", activeNote)}
                      aria-label="Edit note"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 p-2 text-slate-500 transition hover:text-indigo-600 dark:bg-slate-800"
                      title="Edit Note"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteNote(activeNote.id)}
                      aria-label="Delete note"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-rose-500/10 p-2 text-rose-500 transition hover:bg-rose-500/20"
                      title="Delete Note"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <h2 className="break-words text-2xl font-extrabold text-slate-900 dark:text-white">
                  {activeNote.title}
                </h2>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" /> Updated{" "}
                    {new Date(activeNote.updatedAt).toLocaleString()}
                  </span>
                  <span>•</span>
                  <span>{activeNote.content.split(/\s+/).length} words</span>
                </div>
              </div>

              {/* Formatted Markdown Content Body */}
              <div className="max-h-105 min-w-0 flex-1 overflow-y-auto break-words pr-2 font-mono text-sm leading-relaxed whitespace-pre-wrap text-slate-800 dark:text-slate-200">
                {activeNote.content}
              </div>
            </>
          ) : (
            <div className="py-24 text-center text-slate-400">
              Select a note to view canvas.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
