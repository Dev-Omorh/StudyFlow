import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { StudyProvider } from "./context/StudyContext";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Courses from "./pages/Courses";
import Assignments from "./pages/Assignments";
import ExamCountdown from "./pages/ExamCountdown";
import Notes from "./pages/Notes";
import AIAssistant from "./pages/AIAssistant";
import Settings from "./pages/Settings";

function App() {
  return (
    <StudyProvider>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/examcountdown" element={<ExamCountdown />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/settings" element={<Settings />} />
            {/* Fallback redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </StudyProvider>
  );
}

export default App;
