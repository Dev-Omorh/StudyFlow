function TaskCard({ task, onDelete, onEdit, onToggle }) {
  return (
    <div className="task-card flex flex-col items-start justify-between gap-4 rounded-xl bg-white p-4 shadow sm:flex-row sm:items-center sm:p-5">
      <div className="flex min-w-0 flex-wrap items-start gap-4">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />

        <button onClick={() => onDelete(task.id)}>Delete</button>
        <button onClick={() => onEdit(task.id)}>Edit</button>

        <div>
          <h3 className="break-words font-semibold text-lg">{task.title}</h3>
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
