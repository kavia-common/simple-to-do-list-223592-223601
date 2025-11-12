const isNonEmpty = (s) => typeof s === "string" && s.trim().length > 0;
const isDateStr = (s) => !s || !Number.isNaN(Date.parse(s));
const isEnum = (v, values) => values.includes(v);

// PUBLIC_INTERFACE
export function validateTask(input) {
  /** Validate a task object; returns { valid, errors, value } */
  const errors = {};
  const value = { ...input };

  if (!isNonEmpty(value.title)) {
    errors.title = "Title is required.";
  } else {
    value.title = value.title.trim();
  }

  if (!isDateStr(value.dueDate)) {
    errors.dueDate = "Due date must be a valid date.";
  }

  if (!isEnum(value.category, ["work", "personal"])) {
    errors.category = "Category must be 'work' or 'personal'.";
  }

  if (!isEnum(value.priority, ["low", "medium", "high"])) {
    errors.priority = "Priority must be low, medium, or high.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    value,
  };
}

// PUBLIC_INTERFACE
export function normalizeForSearch(s) {
  /** Normalize a string for searching (lowercase and trim) */
  return (s || "").toString().toLowerCase().trim();
}
