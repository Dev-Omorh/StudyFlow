import { NavLink } from "react-router-dom";

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
