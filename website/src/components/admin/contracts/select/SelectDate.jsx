/* eslint-disable react/prop-types */
import { vi } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/Calendar";
import { Button } from "@/components/ui/Button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Controller } from "react-hook-form";

export default function SelectDate({
  control,
  name,
  errors,
  disabled,
  isEnd,
  onChange,
}) {
  const handleClick = () => {
    // No specific logic needed for handleClick in this case
  };

  return (
    <div onClick={handleClick}>
      <Controller
        control={control}
        name={name}
        rules={{ required: "Vui lòng chọn ngày khám" }}
        render={({ field }) => {
          return (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  disabled={disabled}
                  className={cn(
                    "w-full justify-start py-[21px] text-left font-normal",
                    !field.value && "text-muted-foreground",
                    errors[name] && "border-red-500"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value ? (
                    format(new Date(field.value), "dd/MM/yyyy", { locale: vi })
                  ) : (
                    <span>
                      {isEnd
                        ? "Chọn ngày kết thúc hợp đồng"
                        : "Chọn ngày bắt đầu hợp đồng"}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={field.value ? new Date(field.value) : null}
                  onSelect={(selectedDate) => {
                    if (selectedDate) {
                      const formattedDate = format(
                        selectedDate,
                        "yyyy-MM-dd'T'HH:mm:ss.SSS"
                      );
                      field.onChange(formattedDate);
                      onChange(formattedDate);
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          );
        }}
      />
      {errors[name] && (
        <span className="text-sm text-red-500">{errors[name].message}</span>
      )}
    </div>
  );
}
