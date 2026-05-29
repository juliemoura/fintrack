import React from "react";
import { cn } from "@/lib/utils";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  children: React.ReactNode;
}

export function Label({ required, className, children, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        "text-white text-sm font-medium flex items-center gap-1",
        className,
      )}
      {...props}
    >
      {children}
      {required && <span className="text-red-500">*</span>}
    </label>
  );
}
