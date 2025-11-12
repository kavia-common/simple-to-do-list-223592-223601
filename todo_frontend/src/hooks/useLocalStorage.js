/**
 * PUBLIC_INTERFACE
 * useLocalStorage - React hook to sync state with localStorage.
 *
 * This hook reads an initial value from localStorage by key, and keeps it
 * in sync when the state changes. It safely handles JSON parsing and
 * stringifying, and avoids throwing on malformed storage values.
 *
 * @param {string} key localStorage key
 * @param {T|() => T} initial Initial value or factory
 * @returns {[T, Function, Function]} value, setter, clear function
 */
import { useEffect, useRef, useState } from "react";

// PUBLIC_INTERFACE
export function useLocalStorage(key, initial) {
  /** This is a public function. */
  const isFirst = useRef(true);

  const readFromStorage = () => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw == null) return typeof initial === "function" ? initial() : initial;
      return JSON.parse(raw);
    } catch {
      return typeof initial === "function" ? initial() : initial;
    }
  };

  const [value, setValue] = useState(readFromStorage);

  // keep storage in sync
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // swallow storage errors; non-critical for UX
    }
  }, [key, value]);

  const clear = () => {
    try {
      window.localStorage.removeItem(key);
    } finally {
      setValue(typeof initial === "function" ? initial() : initial);
    }
  };

  return [value, setValue, clear];
}

export default useLocalStorage;
