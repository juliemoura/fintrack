import { useEffect } from "react";
import { X } from "lucide-react";

interface ToastProps {
  message: string;
  onClose: () => void;
}

export function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-3 bg-red-50 border border-red-200 text-red-800 text-sm px-4 py-3 rounded-lg shadow-md">
      <span>{message}</span>
      <button onClick={onClose} className="opacity-60 hover:opacity-100">
        <X size={14} />
      </button>
    </div>
  );
}
