import { BrowerRouter, Routes, Route } from "react-router-dom";
import Assignment from "./pages/Assignments";
import Examcountdown from "./pages/ExamCountdown";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Courses from "./pages/Courses";
import Notes from "./pages/Note";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/notes" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/assignment" element={<Assignment />} />
          <Route path="/examcountdown" element={<Examcountdown />} />
          <Route path="/notes" element={<Notes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
