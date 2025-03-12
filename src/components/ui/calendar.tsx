
import React, { useState } from 'react';
import { Calendar as ReactDayPicker } from "react-day-picker";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";

interface DatePickerProps {
  selected?: Date | null;
  onSelect?: (date: Date) => void;
  disabled?: (date: Date) => boolean;
  className?: string;
}

export function DatePicker({
  selected,
  onSelect,
  disabled,
  className,
}: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(selected);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (day: Date | undefined) => {
    if (!day) return;
    setDate(day);
    if (onSelect) {
      onSelect(day);
    }
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <ReactDayPicker
          mode="single"
          selected={date}
          onSelect={handleSelect}
          disabled={disabled}
          className="border-none"
        />
      </PopoverContent>
    </Popover>
  );
}

export { ReactDayPicker as Calendar };
