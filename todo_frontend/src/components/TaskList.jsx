import React from "react";
import TaskCard from "./TaskCard";

/**
 * PUBLIC_INTERFACE
 * TaskList - list/grid of tasks with callbacks.
 *
 * Props:
 * - tasks: Array
 * - onToggleComplete(id)
 * - onEdit(task)
 * - onDelete(id)
 */
export default function TaskList({ tasks, onToggleComplete, onEdit, onDelete }) {
  if (!tasks.length) {
    return (
      <div className="card section empty">
        <div className="container" style={{ padding: 24 }}>
          Nothing here yet. Add your first task above ✨
        </div>
      </div>
    );
  }

  return (
    <section className="task-grid section" aria-label="Task list">
      {tasks.map((t) => (
        <TaskCard
          key={t.id}
          task={t}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}
