import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import GlobalSearchModal from "../common/GlobalSearchModal";
import TaskModal from "../modals/TaskModal";
import CourseModal from "../modals/CourseModal";
import AssignmentModal from "../modals/AssignmentModal";
import ExamModal from "../modals/ExamModal";
import NoteModal from "../modals/NoteModal";

export default function AppLayout({ children }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Sidebar
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />
      {mobileNavOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          isNavOpen={mobileNavOpen}
          onMenuClick={() => setMobileNavOpen(true)}
        />

        <main className="mx-auto w-full max-w-7xl min-w-0 flex-1 space-y-6 p-4 sm:space-y-8 sm:p-6 lg:p-8 animate-in fade-in duration-300">
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
