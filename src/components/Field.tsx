"use client";

import { UseFormRegister, FieldValues, Path } from "react-hook-form";

type FieldProps<T extends FieldValues> = {
  id: Path<T>;
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  error?: string;
  right?: React.ReactNode;
};

export default function Field<T extends FieldValues>({
  id,
  label,
  type = "text",
  placeholder,
  register,
  error,
  right,
}: FieldProps<T>) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs uppercase tracking-widest text-zinc-400">
        {label}
      </label>

      <div className="relative">
        <input
          {...register(id)}
          type={type}
          placeholder={placeholder}
          className={`w-full h-11 px-3 rounded-lg bg-zinc-950 text-white border transition
            focus:outline-none focus:border-emerald-500
            ${error ? "border-red-500" : "border-zinc-800"}`}
        />

        {right && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {right}
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
