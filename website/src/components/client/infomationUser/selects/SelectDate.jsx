import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { vi } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/Calendar";
import { Button } from "@/components/ui/Button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Controller } from "react-hook-form";

export default function SelectDate({
  control,
  name,
  label,
  onChange
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div>
      <Controller
        control={ control }
        name={ name }
        render={ ({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={ "outline" }
                className={ cn(
                  "w-full justify-start py-[16px] text-left font-normal",
                  !field.value && "text-muted-foreground",
                ) }
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                { field.value ? (
                  format(new Date(field.value), "dd/MM/yyyy", { locale: vi })
                ) : (
                  <span className="text-gray-600">{ label }</span>
                ) }
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={ field.value ? new Date(field.value) : null }
                onSelect={ (selectedDate) => {
                  if (selectedDate) {
                    const formattedDate = format(selectedDate, "yyyy-MM-dd");
                    field.onChange(formattedDate);
                    onChange(formattedDate);
                  }
                } }
                initialFocus
                maxDate={ today }
              />
            </PopoverContent>
          </Popover>
        ) }
      />
    </div>
  );
}
