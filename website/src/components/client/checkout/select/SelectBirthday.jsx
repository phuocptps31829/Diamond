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

export default function SelectBirthDate({ control, name, errors }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div>
      <Controller
        control={ control }
        name={ name }
        rules={ { required: "Vui lòng chọn ngày sinh" } }
        render={ ({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={ "outline" }
                className={ cn(
                  "w-full justify-start py-[21px] text-left font-normal",
                  !field.value && "text-muted-foreground",
                  errors[name] && "border-red-500"
                ) }
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                { field.value ? (
                  format(new Date(field.value), "dd/MM/yyyy", { locale: vi })
                ) : (
                  <span className="text-gray-600">Chọn ngày sinh</span>
                ) }
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={ field.value ? new Date(field.value) : null }
                onSelect={ (selectedDate) => {
                  if (selectedDate && selectedDate <= today) {
                    const formattedDate = format(selectedDate, "yyyy-MM-dd");
                    field.onChange(formattedDate);
                  } else {
                    console.error("Ngày sinh không thể là ngày trong tương lai");
                  }
                } }
                initialFocus
                maxDate={ today }
              />
            </PopoverContent>
          </Popover>
        ) }
      />
      { errors[name] && (
        <span className="text-sm text-red-500">{ errors[name].message }</span>
      ) }
    </div>
  );
}
