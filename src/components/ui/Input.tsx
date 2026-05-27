import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  icon?: React.ReactNode;
}

export function Input({
  label,
  hint,
  error,
  icon,
  className,
  disabled,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {(label || icon) && (
        <div className="flex items-center gap-2">
          {icon && (
            <div className="flex items-center justify-center text-text-muted">
              {icon}
            </div>
          )}
          {label && (
            <label className="block text-sm font-medium text-text-muted transition-colors">
              {label}
            </label>
          )}
        </div>
      )}

      <input
        disabled={disabled}
        className={`
          w-full px-4 py-3 rounded-lg
          bg-surface border-2 border-border
          text-text placeholder-text-muted
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
          hover:border-border
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-border
          ${error ? "border-danger focus:ring-danger focus:border-danger hover:border-danger" : ""}
          ${className || ""}
        `}
        {...props}
      />

      {error && (
        <span className="text-sm font-medium text-danger flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </span>
      )}

      {!error && hint && (
        <span className="text-sm text-text-muted">{hint}</span>
      )}
    </div>
  );
}
