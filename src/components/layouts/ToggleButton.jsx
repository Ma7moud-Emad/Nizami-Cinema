import { useEffect, useState } from "react";

/**
 * Theme toggle button component for switching between light and dark modes
 * Persists user preference in localStorage and respects system preferences
 */
export default function ToggleButton() {
  // State to track current theme mode - defaults to "light"
  const [mode, setMode] = useState("light");

  /**
   * Initialize theme on component mount
   * Checks for saved user preference or system preference
   */
  useEffect(() => {
    // Retrieve saved theme preference from localStorage
    const savedMode = localStorage.getItem("mode");
    const html = document.documentElement; // Root HTML element for applying theme class

    if (savedMode) {
      // Use saved preference if available
      setMode(savedMode);
      html.className = savedMode;
    } else {
      // Detect system preference for color scheme
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const initialMode = systemPrefersDark ? "dark" : "light";
      setMode(initialMode);
      html.className = initialMode;
    }
  }, []); // Empty dependency array - runs only on mount

  /**
   * Apply theme class to document element whenever mode changes
   */
  useEffect(() => {
    document.documentElement.className = mode;
  }, [mode]); // Runs whenever mode state changes

  /**
   * Handle toggle button click - switch between light and dark modes
   */
  function handleClick() {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("mode", newMode); // Persist preference
  }

  return (
    // Toggle button container with track styling
    <button
      onClick={handleClick}
      className="w-11 h-5 bg-[#e5e5e5] rounded-xl px-1 cursor-pointer"
      aria-label={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
    >
      {/* Toggle knob that slides based on current mode */}
      <span
        className={`block w-4 h-4 rounded-full bg-[#121212] transition-all duration-500 ${
          mode === "light"
            ? "translate-x-5" // Right position for light mode
            : "translate-x-0" // Left position for dark mode
        }`}
      ></span>
    </button>
  );
}
