import React from "react";
import { DEFAULT_FILTERS } from "../utils/constants";
import { FiSearch, FiRotateCcw, FiCheckCircle } from "react-icons/fi";

/**
 * PUBLIC_INTERFACE
 * Filters - search and filtering toolbar.
 *
 * Props:
 * - value: filters object
 * - onChange(next) => void
 * - onClearCompleted?() => void
 */
export default function Filters({ value, onChange, onClearCompleted }) {
  const f = { ...DEFAULT_FILTERS, ...value };

  const set = (patch) => onChange({ ...f, ...patch });

  return (
    <section className="section card" aria-label="Filters" style={{ padding: 16 }}>
      <div className="filters">
        <label htmlFor="query">
          Search
          <div className="input-with-icon">
            <FiSearch aria-hidden="true" className="input-leading-icon icon" />
            <input
              id="query"
              className="input"
              placeholder="Search tasks..."
              value={f.query}
              onChange={(e) => set({ query: e.target.value })}
            />
          </div>
        </label>

        <label htmlFor="filter-category">
          Category
          <select
            id="filter-category"
            className="select"
            value={f.category}
            onChange={(e) => set({ category: e.target.value })}
          >
            <option value="all">All</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
          </select>
        </label>

        <label htmlFor="filter-priority">
          Priority
          <select
            id="filter-priority"
            className="select"
            value={f.priority}
            onChange={(e) => set({ priority: e.target.value })}
          >
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <label htmlFor="filter-status">
          Status
          <select
            id="filter-status"
            className="select"
            value={f.status}
            onChange={(e) => set({ status: e.target.value })}
          >
            <option value="all">All</option>
            <option value="open">Open</option>
            <option value="completed">Completed</option>
          </select>
        </label>

        <label htmlFor="filter-sort">
          Sort by
          <select
            id="filter-sort"
            className="select"
            value={f.sort}
            onChange={(e) => set({ sort: e.target.value })}
          >
            <option value="dueAsc">Due date (asc)</option>
            <option value="dueDesc">Due date (desc)</option>
            <option value="priority">Priority</option>
            <option value="createdDesc">Recently added</option>
          </select>
        </label>
      </div>

      <div className="section" style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="btn" onClick={() => onChange(DEFAULT_FILTERS)} aria-label="Reset filters">
          <FiRotateCcw aria-hidden="true" className="icon" />
          <span>Reset</span>
        </button>
        {onClearCompleted && (
          <button className="btn accent" style={{ marginLeft: 8 }} onClick={onClearCompleted} aria-label="Clear completed tasks">
            <FiCheckCircle aria-hidden="true" className="icon" />
            <span>Clear completed</span>
          </button>
        )}
      </div>
    </section>
  );
}
