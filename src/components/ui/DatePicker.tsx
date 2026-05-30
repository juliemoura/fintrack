import { format, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "./Button/Button";
import { Calendar } from "./Calendar";
import { PopoverTrigger, Popover, PopoverContent } from "./Popover";

interface DatePickerProps {
  onChange?: (date: string) => void;
  value?: string;
}

export function DatePicker({ onChange, value }: DatePickerProps) {
  const selectedDate = value ? parseISO(value) : undefined;

  const handleSelect = (selected: Date | undefined) => {
    if (selected) {
      onChange?.(format(selected, "yyyy-MM-dd"));
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 hover:border-slate-600 rounded-full px-4 py-2 h-auto gap-2"
        >
          <CalendarIcon size={18} />

          {selectedDate
            ? format(selectedDate, "dd/MM/yyyy")
            : "Selecionar data"}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="bg-slate-900 border border-slate-700 text-white p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
        />
      </PopoverContent>
    </Popover>
  );
}
