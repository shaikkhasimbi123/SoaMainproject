import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = ({ className = "" }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-colors border ${
        isDark
          ? "bg-slate-800 text-amber-400 border-slate-700 hover:bg-slate-700"
          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
      } ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "38px",
        height: "38px",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--color-card-border)",
        background: "var(--color-card)",
        color: isDark ? "var(--color-warning)" : "var(--color-text-primary)",
        cursor: "pointer",
        transition: "all var(--transition-fast)"
      }}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

export default ThemeToggle;
