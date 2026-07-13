import { NavLink } from "react-route-dom";
import Assignment from "../pages/Assignments";
import Examcountdown from "../pages/ExamCountdown";
import Dashboard from "../pages/Dashboard";
import Tasks from "../pages/Tasks";
import Courses from "../pages/Courses";
import Notes from "../pages/Note";

function SideBar() {
  return (
    <div>
      <NavLink to="/">Dashboard </NavLink>
      <NavLink to="/tasks">Tasks </NavLink>
      <NavLink to="/courses">Courses</NavLink>
      <NavLink to="/assignment">Assignment </NavLink>
      <NavLink to="/examcountdown">Examcountdown </NavLink>

      <NavLink to="/notes">Notes</NavLink>
    </div>
  );
}

export default SideBar;
