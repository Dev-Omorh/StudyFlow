import Dashboard from "../pages/Dashboard";
import Tasks from "../pages/Tasks";
import Courses from "../pages/Courses";
import Assignment from "../pages/Assignments";
import Examcountdown from "../pages/Exam countdown";
import Notes from "../pages/Note";

function SideBar() {
  return (
    <div>
      <Dashboard />
      <Tasks />
      <Courses />
      <Assignment />
      <Examcountdown />
      <Notes />
    </div>
  );
}

export default SideBar;
