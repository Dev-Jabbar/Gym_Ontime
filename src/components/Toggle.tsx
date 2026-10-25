"use client";

import { Eye, EyeOff } from "lucide-react";

type ToggleProps = {
  show: boolean;
  onToggle: () => void;
};

export default function Toggle({ show, onToggle }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={show ? "Hide password" : "Show password"}
      className="text-gray-400 hover:text-gray-600 transition-colors"
    >
      {/* show=true means the password is visible as text, so the EyeOff icon
          signals "click to hide" (the same convention as the login page). */}
      {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    </button>
  );
}
