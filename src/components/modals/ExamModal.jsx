import { useState, useEffect } from "react";
import { X, Check, Plus, Trash2 } from "lucide-react";
import { useStudy } from "../../context/useStudy";

export default function ExamModal() {
  const { activeModal, closeModal, editingItem, addExam, updateExam, courses } =
    useStudy();

  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [examDate, setExamDate] = useState("");
  const [location, setLocation] = useState("");
  const [weight, setWeight] = useState(25);
  const [targetGrade, setTargetGrade] = useState("A");
  const [topics, setTopics] = useState([]);
  const [newTopicInput, setNewTopicInput] = useState("");

  useEffect(() => {
    if (editingItem) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Reset form fields when the edit target changes.
      setTitle(editingItem.title || "");
      setCourseId(editingItem.courseId || courses[0]?.id || "");
      setExamDate(
        editingItem.examDate ? editingItem.examDate.substring(0, 16) : "",
      );
      setLocation(editingItem.location || "");
      setWeight(editingItem.weight || 25);
      setTargetGrade(editingItem.targetGrade || "A");
      setTopics(editingItem.checklist || []);
    } else {
      const tomorrow = new Date(Date.now() + 7 * 86400000)
        .toISOString()
        .substring(0, 16);
      setTitle("");
      setCourseId(courses[0]?.id || "");
      setExamDate(tomorrow);
      setLocation("Hall 101");
      setWeight(25);
      setTargetGrade("A");
      setTopics([
        {
          topic: "Chapter 1 & 2 Core Definitions",
          completed: false,
        },
        { topic: "Formula derivations & proofs", completed: false },
      ]);
    }
  }, [editingItem, courses]);

  if (activeModal !== "exam") return null;

  const handleAddTopic = () => {
    if (!newTopicInput.trim()) return;
    setTopics((prev) => [
      ...prev,
      {
        topic: newTopicInput.trim(),
        completed: false,
      },
    ]);
    setNewTopicInput("");
  };

  const handleRemoveTopic = (topicIndex) => {
    setTopics((prev) => prev.filter((_, index) => index !== topicIndex));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const examPayload = {
      title,
      courseId,
      examDate,
      location,
      weight: Number(weight),
      targetGrade,
      checklist: topics,
    };

    if (editingItem) {
      updateExam(editingItem.id, examPayload);
    } else {
      addExam(examPayload);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-3 backdrop-blur-sm animate-in fade-in duration-200 sm:items-center sm:p-4">
      <div className="my-auto max-h-[calc(100dvh-1.5rem)] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl transition-all dark:border-slate-800 dark:bg-slate-900 sm:max-h-[90vh] sm:p-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {editingItem ? "Edit Exam Countdown" : "Schedule New Exam"}
          </h2>
          <button
            onClick={closeModal}
            aria-label="Close exam form"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Exam Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Midterm 2: Graph Theory"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-4 py-2.5 text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                Date & Time
              </label>
              <input
                type="datetime-local"
                required
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3 py-2 text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Location
              </label>
              <input
                type="text"
                placeholder="Hall 304"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
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

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Target Grade
              </label>
              <input
                type="text"
                value={targetGrade}
                onChange={(e) => setTargetGrade(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3 py-2 text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Study Scope Topics Checklist
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Add topic (e.g. Dijkstra algorithm)..."
                value={newTopicInput}
                onChange={(e) => setNewTopicInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTopic();
                  }
                }}
                className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddTopic}
                className="rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 px-3 py-2 text-sm font-medium text-slate-800 dark:text-slate-200 transition"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {topics.map((t, index) => (
                <div
                  key={t.id || `${t.topic}-${index}`}
                  className="flex items-center justify-between rounded-lg bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/50"
                >
                  <span>{t.topic}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTopic(index)}
                    className="text-slate-400 hover:text-rose-500"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
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
              {editingItem ? "Save Changes" : "Create Exam Countdown"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
