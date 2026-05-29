import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "./Button/Button";
import { Calendar } from "./Calendar";
import { PopoverTrigger, Popover, PopoverContent } from "./Popover";

interface DatePickerProps {
  onChange?: (date: string) => void;
}

export function DatePicker({ onChange }: DatePickerProps) {
  const [date, setDate] = useState<Date>();

  const handleSelect = (selected: Date | undefined) => {
    setDate(selected);
    if (selected) onChange?.(format(selected, "yyyy-MM-dd"));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 hover:border-slate-600 rounded-full px-4 py-2 h-auto gap-2"
        >
          <CalendarIcon size={18} />
          {date ? format(date, "dd/MM/yyyy") : "Selecionar data"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-slate-900 border border-slate-700 text-white p-0">
        <Calendar mode="single" selected={date} onSelect={handleSelect} />
      </PopoverContent>
    </Popover>
  );
}
