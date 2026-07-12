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
  icon?: React.ReactNode;
};

export default function Field<T extends FieldValues>({
  id,
  label,
  type = "text",
  placeholder,
  register,
  error,
  right,
  icon,
}: FieldProps<T>) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <div className="relative">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {icon}
          </div>
        )}

        <input
          {...register(id)}
          type={type}
          placeholder={placeholder}
          className={`w-full h-12 ${icon ? "pl-11" : "pl-4"} ${
            right ? "pr-11" : "pr-4"
          } rounded-xl text-gray-900 text-sm transition-all placeholder:text-gray-400
            focus:outline-none focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-400
            ${
              error
                ? "bg-red-50/50 border border-red-300"
                : "bg-gray-50 border border-transparent focus:border-orange-400"
            }`}
        />

        {right && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
            {right}
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
