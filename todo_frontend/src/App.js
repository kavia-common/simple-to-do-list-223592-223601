import React, { useMemo, useState } from "react";
import "./index.css";
import "./App.css";

import Navbar from "./components/Navbar";
import TaskForm from "./components/TaskForm";
import Filters from "./components/Filters";
import TaskList from "./components/TaskList";

import useLocalStorage from "./hooks/useLocalStorage";
import { STORAGE_KEY, DEFAULT_FILTERS, EMPTY_TASK } from "./utils/constants";
import { normalizeForSearch, validateTask } from "./utils/validation";

/**
 * PUBLIC_INTERFACE
 * App - To-Do SPA using localStorage for persistence.
 * Features:
 * - Create, edit, delete, toggle complete
 * - Categories, priorities, due dates
 * - Search, filter, and sort
 * - Responsive layout; accessible controls
 *
 * localStorage key: todo.tasks.v1
 */
function App() {
  // tasks persistence
  const [tasks, setTasks, clearStorage] = useLocalStorage(STORAGE_KEY, []);
  // filters and ui state
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [editing, setEditing] = useState(null);

  // PUBLIC_INTERFACE
  const addTask = (partial) => {
    /** Add a new validated task. */
    const { valid, value, errors } = validateTask({ ...EMPTY_TASK, ...partial });
    if (!valid) {
      // Gracefully no-op; TaskForm shows inline errors instead.
      return errors;
    }
    const now = Date.now();
    const newTask = {
      ...value,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
    return null;
  };

  // PUBLIC_INTERFACE
  const updateTask = (patch) => {
    /** Update an existing task by id. */
    const { valid, value } = validateTask(patch);
    if (!valid || !value.id) return;
    const now = Date.now();
    setTasks((prev) =>
      prev.map((t) => (t.id === value.id ? { ...t, ...value, updatedAt: now } : t))
    );
  };

  // PUBLIC_INTERFACE
  const deleteTask = (id) => {
    /** Delete task by id. */
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // PUBLIC_INTERFACE
  const toggleComplete = (id) => {
    /** Toggle completion state by id. */
    const now = Date.now();
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed, updatedAt: now } : t))
    );
  };

  // PUBLIC_INTERFACE
  const clearCompleted = () => {
    /** Remove all completed tasks. */
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  const visibleTasks = useMemo(() => {
    const q = normalizeForSearch(filters.query);

    let list = tasks.filter((t) => {
      const matchesQuery =
        !q ||
        normalizeForSearch(t.title).includes(q) ||
        normalizeForSearch(t.description).includes(q);

      const matchesCategory =
        filters.category === "all" || t.category === filters.category;

      const matchesPriority =
        filters.priority === "all" || t.priority === filters.priority;

      const matchesStatus =
        filters.status === "all" ||
        (filters.status === "open" && !t.completed) ||
        (filters.status === "completed" && t.completed);

      return matchesQuery && matchesCategory && matchesPriority && matchesStatus;
    });

    const priorityRank = { high: 0, medium: 1, low: 2 };

    list.sort((a, b) => {
      switch (filters.sort) {
        case "dueAsc": {
          const ad = a.dueDate ? Date.parse(a.dueDate) : Infinity;
          const bd = b.dueDate ? Date.parse(b.dueDate) : Infinity;
          return ad - bd;
        }
        case "dueDesc": {
          const ad = a.dueDate ? Date.parse(a.dueDate) : -Infinity;
          const bd = b.dueDate ? Date.parse(b.dueDate) : -Infinity;
          return bd - ad;
        }
        case "priority": {
          return priorityRank[a.priority] - priorityRank[b.priority];
        }
        case "createdDesc":
        default:
          return b.createdAt - a.createdAt;
      }
    });

    return list;
  }, [tasks, filters]);

  return (
    <div className="App">
      <Navbar>
        <button className="btn" onClick={clearCompleted} aria-label="Clear all completed tasks">
          Clear Completed
        </button>
        <button className="btn" style={{ marginLeft: 8 }} onClick={clearStorage} aria-label="Reset all data">
          Reset Data
        </button>
      </Navbar>

      <main className="container" role="main">
        <TaskForm
          onSubmit={(payload) => {
            if (editing) {
              updateTask({ ...editing, ...payload });
              setEditing(null);
            } else {
              addTask(payload);
            }
          }}
          onCancel={editing ? () => setEditing(null) : undefined}
          initialTask={editing || undefined}
        />

        <Filters
          value={filters}
          onChange={setFilters}
          onClearCompleted={clearCompleted}
        />

        <TaskList
          tasks={visibleTasks}
          onToggleComplete={toggleComplete}
          onEdit={(task) => setEditing(task)}
          onDelete={deleteTask}
        />
      </main>
    </div>
  );
}

export default App;
