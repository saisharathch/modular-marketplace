import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Array<{ value: string; label: string }>;
  error?: string;
}

export function Select({
  label,
  options,
  error,
  className = "",
  ...props
}: SelectProps) {
  return (
    <div>
      {label && (
        <label className="mb-2 block text-sm font-medium text-slate-200">
          {label}
        </label>
      )}
      <select
        className={`w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-white outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600 ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  );
}
