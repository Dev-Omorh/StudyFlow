import React, { useEffect } from "react";
import { Search, X, CheckSquare, BookOpen, Clock, FileText, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStudy } from "../../context/StudyContext";

export default function GlobalSearchModal() {
  const { searchOpen, setSearchOpen, searchQuery, setSearchQuery, tasks, courses, assignments, exams, notes } = useStudy();
  const navigate = useNavigate();

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape" && searchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen, setSearchOpen]);

  if (!searchOpen) return null;

  const q = searchQuery.toLowerCase().trim();

  const filteredTasks = q ? tasks.filter((t) => t.title.toLowerCase().includes(q)) : [];
  const filteredAssignments = q ? assignments.filter((a) => a.title.toLowerCase().includes(q)) : [];
  const filteredExams = q ? exams.filter((e) => e.title.toLowerCase().includes(q)) : [];
  const filteredNotes = q ? notes.filter((n) => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)) : [];
  const filteredCourses = q ? courses.filter((c) => c.title.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)) : [];

  const hasResults =
    filteredTasks.length > 0 ||
    filteredAssignments.length > 0 ||
    filteredExams.length > 0 ||
    filteredNotes.length > 0 ||
    filteredCourses.length > 0;

  const handleSelect = (path) => {
    setSearchOpen(false);
    setSearchQuery("");
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 pt-16 sm:pt-24 animate-in fade-in duration-150">
      <div className="w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-all">
        {/* Search Header */}
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 px-4 py-3.5">
          <Search className="h-5 w-5 text-slate-400" />
          <input
            type="text"
            autoFocus
            placeholder="Search tasks, notes, courses, exams, assignments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={() => setSearchOpen(false)}
            className="rounded-lg p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">
          {!q ? (
            <div className="py-8 text-center text-xs text-slate-400 space-y-2">
              <p>Type anything to search across your STUDYFLOW workspace</p>
              <div className="flex justify-center gap-2 pt-2">
                <span className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-1">Tasks</span>
                <span className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-1">Assignments</span>
                <span className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-1">Notes</span>
                <span className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-1">Exams</span>
              </div>
            </div>
          ) : !hasResults ? (
            <div className="py-8 text-center text-sm text-slate-400">
              No matching items found for <span className="font-semibold text-slate-600 dark:text-slate-300">"{searchQuery}"</span>
            </div>
          ) : (
            <>
              {/* Tasks */}
              {filteredTasks.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Tasks ({filteredTasks.length})
                  </h4>
                  <div className="space-y-1">
                    {filteredTasks.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => handleSelect("/tasks")}
                        className="group flex items-center justify-between rounded-xl p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800/70 cursor-pointer transition"
                      >
                        <div className="flex items-center gap-2.5">
                          <CheckSquare className="h-4 w-4 text-indigo-500" />
                          <span className="text-sm text-slate-800 dark:text-slate-200 font-medium">
                            {t.title}
                          </span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-400 opacity-0 group-hover:opacity-100 transition" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Assignments */}
              {filteredAssignments.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Assignments ({filteredAssignments.length})
                  </h4>
                  <div className="space-y-1">
                    {filteredAssignments.map((a) => (
                      <div
                        key={a.id}
                        onClick={() => handleSelect("/assignments")}
                        className="group flex items-center justify-between rounded-xl p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800/70 cursor-pointer transition"
                      >
                        <div className="flex items-center gap-2.5">
                          <BookOpen className="h-4 w-4 text-amber-500" />
                          <span className="text-sm text-slate-800 dark:text-slate-200 font-medium">
                            {a.title}
                          </span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-400 opacity-0 group-hover:opacity-100 transition" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {filteredNotes.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Notes ({filteredNotes.length})
                  </h4>
                  <div className="space-y-1">
                    {filteredNotes.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => handleSelect("/notes")}
                        className="group flex items-center justify-between rounded-xl p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800/70 cursor-pointer transition"
                      >
                        <div className="flex items-center gap-2.5">
                          <FileText className="h-4 w-4 text-emerald-500" />
                          <span className="text-sm text-slate-800 dark:text-slate-200 font-medium">
                            {n.title}
                          </span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-400 opacity-0 group-hover:opacity-100 transition" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Exams */}
              {filteredExams.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Exams ({filteredExams.length})
                  </h4>
                  <div className="space-y-1">
                    {filteredExams.map((e) => (
                      <div
                        key={e.id}
                        onClick={() => handleSelect("/examcountdown")}
                        className="group flex items-center justify-between rounded-xl p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800/70 cursor-pointer transition"
                      >
                        <div className="flex items-center gap-2.5">
                          <Clock className="h-4 w-4 text-rose-500" />
                          <span className="text-sm text-slate-800 dark:text-slate-200 font-medium">
                            {e.title}
                          </span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-400 opacity-0 group-hover:opacity-100 transition" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
