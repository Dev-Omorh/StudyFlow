import { useState } from "react";
import Header from "../components/Header";
import FilterButton from "../components/Filter Button";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";

const [tasks, setTasks] = useState([
  {
    id: 1,
    title: "Complete Problem Set 5",
    course: "MATH 202",
    priority: "High",
    completed: false,
    dueDate: "2026-07-15"
  },
  {
    id: 2,
    title: "Read Chapter 7",
    course: "PSY 101",
    priority: "Medium",
    completed: false,
    dueDate: "2026-07-16"
  },
]);

function deleteTask(id) {
  setTasks(tasks.filter((task) => task.id !== id));
}

function toggleTask(id) {
  setTasks(
    tasks.map((task) => (task.id === id ? { ...task, completed } : task)),
  );
}

function addTask(newTask) {
  setTasks([...tasks, newTask]);
}

function editTask(id, updatedTask) {
  ...
}

function Tasks() {
  return (
    <>
      <Sidebar />
      <Header />

      <FilterButton />

      {task.map((task) => 
      <TaskCard
      key={task.id} 
      task={task} 
      onDelete={deletetask} 
      onEdit={editTask}
      onToggle={toggleComplete}  />)}
      

      <TaskModal />
    </>
  );
}

export default Tasks;
