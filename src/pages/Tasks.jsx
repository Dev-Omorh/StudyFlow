import { useState } from "react";
import Header from "../components/Header";
import FilterButton from "../components/Filter Button";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";

const [tasks, setTasks] = useState("");

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
  setTasks([...tasks.editTasks]);
}

function Tasks() {
  return (
    <>
      <Sidebar />
      <Header />

      <FilterButton />

      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />

      <TaskModal />
    </>
  );
}

export default Tasks;
