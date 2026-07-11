function TaskCard({ task }) {
  return (
    <div className="task-card">
      <input type="checkbox" checkbox={task.completed} />

      <div>
        <h3>{task.title}</h3>
        <p>{task.course}</p>
      </div>

      <span>{task.prioriy}</span>
    </div>
  );
}

export default TaskCard;
