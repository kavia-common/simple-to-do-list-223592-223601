export const STORAGE_KEY = "todo.tasks.v1";

export const CATEGORIES = [
  { value: "work", label: "Work" },
  { value: "personal", label: "Personal" },
];

export const PRIORITIES = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export const DEFAULT_FILTERS = {
  query: "",
  category: "all",
  priority: "all",
  status: "all", // all | open | completed
  sort: "dueAsc", // dueAsc | dueDesc | priority | createdDesc
};

export const EMPTY_TASK = {
  id: "",
  title: "",
  description: "",
  category: "work",
  priority: "medium",
  dueDate: "",
  completed: false,
  createdAt: 0,
  updatedAt: 0,
};
