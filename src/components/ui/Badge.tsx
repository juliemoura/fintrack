import React from "react";

interface BadgeProps {
  type: "success" | "error";
  children: React.ReactNode;
  className?: string;
}

export function Badge({ type, children, className = "" }: BadgeProps) {
  const baseStyles = "px-3 py-1 rounded-full font-medium text-sm w-max";

  const typeStyles = {
    success: "bg-emerald-500/20 text-emerald-400",
    error: "bg-red-500/20 text-red-400",
  };

  return (
    <span className={`${baseStyles} ${typeStyles[type]} ${className}`}>
      {children}
    </span>
  );
}
