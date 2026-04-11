import { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({
  label,
  error,
  className = "",
  ...props
}: TextareaProps) {
  return (
    <div>
      {label && (
        <label className="mb-2 block text-sm font-medium text-slate-200">
          {label}
        </label>
      )}
      <textarea
        className={`min-h-[120px] w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-white placeholder-slate-500 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600 resize-none ${className}`}
        {...props}
      />
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  );
}
