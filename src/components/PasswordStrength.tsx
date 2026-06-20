"use client";

import { Check } from "lucide-react";

export default function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;

  const checks = [
    { label: "8+ characters", ok: password.length >= 8 },
    { label: "Uppercase", ok: /[A-Z]/.test(password) },
    { label: "Number", ok: /[0-9]/.test(password) },
  ];

  return (
    <div className="flex flex-wrap gap-3 mt-2 text-xs">
      {checks.map((c) => (
        <span
          key={c.label}
          className={`flex items-center gap-1 ${
            c.ok ? "text-emerald-400" : "text-zinc-500"
          }`}
        >
          <Check className="w-3 h-3" opacity={c.ok ? 1 : 0.3} />
          {c.label}
        </span>
      ))}
    </div>
  );
}
