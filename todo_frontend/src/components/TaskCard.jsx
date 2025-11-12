import React from "react";

/**
 * PUBLIC_INTERFACE
 * TaskCard - single task display with action buttons.
 *
 * Props:
 * - task
 * - onToggleComplete(id)
 * - onEdit(task)
 * - onDelete(id)
 */
export default function TaskCard({ task, onToggleComplete, onEdit, onDelete }) {
  const dueLabel = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date";
  const categoryClass = `badge category-${task.category}`;
  const priorityClass = `badge priority-${task.priority}`;

  return (
    <article className="task-card card" aria-label={`Task: ${task.title}`} data-testid="task-card">
      <div>
        <h3 className="task-title" style={{ textDecoration: task.completed ? "line-through" : undefined }}>
          <label style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <input
              type="checkbox"
              aria-label={task.completed ? "Mark as open" : "Mark as completed"}
              className="checkbox"
              checked={!!task.completed}
              onChange={() => onToggleComplete(task.id)}
            />
            <span>{task.title}</span>
          </label>
        </h3>
        {task.description && <p className="helper" style={{ marginTop: 4 }}>{task.description}</p>}

        <div className="task-meta" style={{ marginTop: 8 }}>
          <span className={categoryClass} aria-label={`Category ${task.category}`}>{task.category}</span>
          <span className={priorityClass} aria-label={`Priority ${task.priority}`}>{task.priority}</span>
          <span className="badge" aria-label={`Due ${dueLabel}`}>📅 {dueLabel}</span>
        </div>
      </div>

      <div className="task-actions">
        <button className="btn" onClick={() => onEdit(task)} aria-label={`Edit ${task.title}`}>Edit</button>
        <button className="btn" onClick={() => onDelete(task.id)} aria-label={`Delete ${task.title}`}>Delete</button>
      </div>
    </article>
  );
}
