function TaskCard({ task, onDelete, onEdit, onToggle }) {
  return (
    <div className="task-card bg-white rounded-xl shadow p-5 flex justify-between items-center">
      <div className="flex gap-4 ">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />

        <button onClick={() => onDelete(task.id)}>Delete</button>
        <button onClick={() => onEdit(task.id)}>Edit</button>

        <div>
          <h3 className="font-semibold text-lg">{task.title}</h3>
          <p className="text-gray-500">{task.course}</p>
          <p className="text-red-500">{task.dueDate}</p>
        </div>
      </div>
      <span
        className={`px-3 py-1 rounded-full ${
          task.prioriy === "High"
            ? "bg-red-100 text-red-600"
            : task.prioriy === "Medium"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-green-100 text-shadow-green-600"
        }`}
      >
        {task.prioriy}
      </span>
    </div>
  );
}

export default TaskCard;
