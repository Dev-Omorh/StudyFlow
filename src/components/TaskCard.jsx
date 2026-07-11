function TaskCard({ task, onDelete, onEdit, onToggle }) {
  return (
    <div className="task-card">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />

      <button onClick={() => onDelete(task.id)}>Delete</button>
      <button onClick={() => onEdit(task.id)}>Edit</button>

      <div>
        <h3>{task.title}</h3>
        <p>{task.course}</p>
      </div>

      <span>{task.prioriy}</span>
    </div>
  );
}

export default TaskCard;
