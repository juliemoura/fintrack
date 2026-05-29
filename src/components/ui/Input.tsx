import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  icon?: React.ReactNode;
  type?: string;
}

export function Input({
  label,
  error,
  icon,
  className,
  disabled,
  type = "text",
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="block text-sm font-medium text-white">{label}</label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center justify-center text-slate-400">
            {icon}
          </div>
        )}
        <input
          disabled={disabled}
          type={type}
          className={`
            w-full px-4 py-3 rounded-xl
            bg-slate-800 border border-slate-700
            text-white placeholder-slate-500
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent
            hover:border-slate-600
            disabled:opacity-50 disabled:cursor-not-allowed
            ${icon ? "pl-12" : ""}
            ${error ? "border-red-500 focus:ring-red-500" : ""}
            ${className || ""}
          `}
          {...props}
        />
      </div>
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
}
