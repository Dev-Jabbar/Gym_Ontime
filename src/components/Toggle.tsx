"use client";

import { Eye, EyeOff } from "lucide-react";

type ToggleProps = {
  show: boolean;
  onToggle: () => void;
};

export default function Toggle({ show, onToggle }: ToggleProps) {
  return (
    <button type="button" onClick={onToggle} className="text-red-900">
      {show ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
    </button>
  );
}
