import React, { useEffect, useState } from "react";
import { CATEGORIES, PRIORITIES, EMPTY_TASK } from "../utils/constants";
import { validateTask } from "../utils/validation";

/**
 * PUBLIC_INTERFACE
 * TaskForm - handles both create and update flows.
 *
 * Props:
 * - onSubmit(task) => void    // required
 * - onCancel?() => void
 * - initialTask?              // optional task to edit
 */
export default function TaskForm({ onSubmit, onCancel, initialTask }) {
  const [task, setTask] = useState(EMPTY_TASK);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialTask) setTask({ ...initialTask });
  }, [initialTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((t) => ({ ...t, [name]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    const checked = validateTask(task);
    setErrors(checked.errors);
    if (checked.valid) {
      onSubmit(checked.value);
      if (!initialTask) {
        setTask(EMPTY_TASK); // reset only for create
      }
    }
  };

  return (
    <form className="card elevated section" onSubmit={submit} aria-label={initialTask ? "Edit task form" : "Add task form"}>
      <div className="container" style={{ padding: "16px" }}>
        <div className="form-row">
          <label htmlFor="title">
            Title
            <input
              id="title"
              name="title"
              className="input"
              value={task.title}
              onChange={handleChange}
              placeholder="e.g., Prepare project report"
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? "title-error" : undefined}
              required
            />
            {errors.title && (
              <span id="title-error" className="helper" role="alert">
                {errors.title}
              </span>
            )}
          </label>

          <label htmlFor="category">
            Category
            <select
              id="category"
              name="category"
              className="select"
              value={task.category}
              onChange={handleChange}
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="priority">
            Priority
            <select
              id="priority"
              name="priority"
              className="select"
              value={task.priority}
              onChange={handleChange}
            >
              {PRIORITIES.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="dueDate">
            Due date
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              className="input"
              value={task.dueDate || ""}
              onChange={handleChange}
              aria-invalid={Boolean(errors.dueDate)}
              aria-describedby={errors.dueDate ? "duedate-error" : undefined}
            />
            {errors.dueDate && (
              <span id="duedate-error" className="helper" role="alert">
                {errors.dueDate}
              </span>
            )}
          </label>
        </div>

        <label htmlFor="description" className="section" style={{ marginTop: 12 }}>
          Description
          <textarea
            id="description"
            name="description"
            className="textarea"
            rows={3}
            value={task.description}
            placeholder="Add notes or details..."
            onChange={handleChange}
          />
        </label>

        <div className="section" style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
          {onCancel && (
            <button type="button" className="btn ghost" onClick={onCancel} aria-label="Cancel editing task">Cancel</button>
          )}
          <button type="submit" className="btn primary" aria-label={initialTask ? "Save changes" : "Add task"}>
            {initialTask ? "Save changes" : "Add task"}
          </button>
        </div>
      </div>
    </form>
  );
}
