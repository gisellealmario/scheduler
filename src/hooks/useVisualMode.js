import { useState } from "react";

//As seen here, the `useVisualMode` function can take an initial argument to set the mode state. We then return an object `{ mode }`, which can also be written as `{ mode: mode }`. This lets our tests (and components) access the current value of the mode from the hook.

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]); 
  const [mode, setMode] = useState(initial)

  function transition(newMode, replace = false) {
    // If replace is true, replace the current mode in history with the new mode
    setMode(newMode);
    setHistory((prev) => (replace ? [...prev.slice(0, prev.length - 1), newMode] : [...prev, newMode]));
  }

  function back() {
    // Check if we are not already at the initial mode
    if (history.length > 1) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1)]);
      setMode(history[history.length - 2]);
    }
  }

  return { mode, transition, back };
}