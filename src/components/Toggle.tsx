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
      {/* show=true means the password is currently visible as text —
          EyeOff signals "click to hide", matching the convention used
          on the Login page. The original had this inverted (showed
          <Eye> while already revealed) and a leftover text-red-900
          that didn't match anything else in the app. */}
      {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    </button>
  );
}
