import React, { useState } from "react";
import {
  BookOpen,
  Plus,
  User,
  MapPin,
  Clock,
  Award,
  Edit2,
  Trash2,
  FileCheck2,
  FileText,
  X,
} from "lucide-react";
import { useStudy } from "../context/StudyContext";

export default function Courses() {
  const { courses, tasks, assignments, exams, notes, deleteCourse, openModal } = useStudy();
  const [selectedCourseDetail, setSelectedCourseDetail] = useState(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Course Directory
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your enrolled subjects, schedules, credit hours, and grade targets.
          </p>
        </div>

        <button
          onClick={() => openModal("course")}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 transition"
        >
          <Plus className="h-4 w-4" />
          Add New Course
        </button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => {
          const courseTasks = tasks.filter((t) => t.courseId === course.id);
          const courseAssignments = assignments.filter((a) => a.courseId === course.id);
          const courseExams = exams.filter((e) => e.courseId === course.id);
          const courseNotes = notes.filter((n) => n.courseId === course.id);

          return (
            <div
              key={course.id}
              className="glass-card rounded-3xl p-6 glow-on-hover flex flex-col justify-between space-y-4 relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-2"
                style={{ backgroundColor: course.color }}
              />

              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between">
                  <span
                    className="rounded-full px-3 py-1 text-xs font-extrabold text-white shadow-sm"
                    style={{ backgroundColor: course.color }}
                  >
                    {course.code}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openModal("course", course)}
                      className="rounded-lg p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      title="Edit Course"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteCourse(course.id)}
                      className="rounded-lg p-1.5 text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      title="Delete Course"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {course.title}
                </h3>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <User className="h-3.5 w-3.5 text-slate-400" />
                    <span>{course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    <span>{course.room}</span>
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span>{course.schedule}</span>
                  </div>
                </div>
              </div>

              {/* Grade Progress Bar */}
              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-4 border border-slate-200/60 dark:border-slate-700/50 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Award className="h-3.5 w-3.5 text-amber-500" /> Current Score
                  </span>
                  <span className="text-slate-900 dark:text-white">
                    {course.currentGrade}% (Goal: {course.gradeGoal})
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(course.currentGrade, 100)}%`,
                      backgroundColor: course.color,
                    }}
                  />
                </div>
              </div>

              {/* Quick Summary Counts & Inspection */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>{courseTasks.length} tasks</span>
                  <span>•</span>
                  <span>{courseAssignments.length} assignments</span>
                  <span>•</span>
                  <span>{courseNotes.length} notes</span>
                </div>

                <button
                  onClick={() => setSelectedCourseDetail(course)}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  View Details &rarr;
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Course Detail Modal */}
      {selectedCourseDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <span
                  className="rounded-full px-3 py-1 text-xs font-extrabold text-white"
                  style={{ backgroundColor: selectedCourseDetail.color }}
                >
                  {selectedCourseDetail.code}
                </span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {selectedCourseDetail.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedCourseDetail(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Tabs Breakdown */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Associated Assignments
                </h4>
                <div className="space-y-2">
                  {assignments
                    .filter((a) => a.courseId === selectedCourseDetail.id)
                    .map((a) => (
                      <div
                        key={a.id}
                        className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-slate-800/40 p-3 text-xs"
                      >
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {a.title}
                        </span>
                        <span className="rounded-full bg-indigo-500/10 text-indigo-500 px-2 py-0.5 font-bold">
                          {a.status}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Associated Notes
                </h4>
                <div className="space-y-2">
                  {notes
                    .filter((n) => n.courseId === selectedCourseDetail.id)
                    .map((n) => (
                      <div
                        key={n.id}
                        className="rounded-xl bg-slate-50 dark:bg-slate-800/40 p-3 text-xs flex items-center justify-between"
                      >
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {n.title}
                        </span>
                        <span className="text-[10px] text-slate-400">{n.category}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
