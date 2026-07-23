import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import GlobalSearchModal from "../common/GlobalSearchModal";
import TaskModal from "../modals/TaskModal";
import CourseModal from "../modals/CourseModal";
import AssignmentModal from "../modals/AssignmentModal";
import ExamModal from "../modals/ExamModal";
import NoteModal from "../modals/NoteModal";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-8 animate-in fade-in duration-300">
          {children}
        </main>
      </div>

      {/* Global Modals */}
      <GlobalSearchModal />
      <TaskModal />
      <CourseModal />
      <AssignmentModal />
      <ExamModal />
      <NoteModal />
    </div>
  );
}
