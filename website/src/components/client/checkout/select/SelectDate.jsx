/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { vi } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/Calendar";
import { Button } from "@/components/ui/Button";
import { format, parse } from "date-fns";
import { cn } from "@/lib/utils";
import { Controller } from "react-hook-form";
import { getWorkSchedulesByDoctors } from "@/services/workSchedulesApi";
import { toast } from "@/hooks/useToast";
import { ToastAction } from "@/components/ui/Toast";
import { toastUI } from "@/components/ui/Toastify";

export default function SelectDate({
  control,
  name,
  errors,
  doctorId,
  branchId,
  disabled,
  onChange,
}) {
  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    if (!doctorId || !branchId) return;

    const fetchDates = async () => {
      try {
        const data = await getWorkSchedulesByDoctors(doctorId, branchId);
        const dates = data.map((option) =>
          parse(option._id.day, "yyyy-MM-dd", new Date()),
        );
        setAvailableDates(dates);
      } catch (error) {
        console.error("Failed to fetch available dates:", error);
      }
    };

    fetchDates();
  }, [doctorId, branchId]);

  useEffect(() => {
    errors[name] = undefined;
  }, [doctorId, branchId, errors, name]);

  const isDateAvailable = (date) => {
    return availableDates.some(
      (availableDate) =>
        availableDate.getDate() === date.getDate() &&
        availableDate.getMonth() === date.getMonth() &&
        availableDate.getFullYear() === date.getFullYear(),
    );
  };

  const handleClick = () => {
    if (!doctorId) {
      toastUI("Vui lòng chọn bác sĩ", "warning");
      return;
    }
  };

  return (
    <div onClick={ handleClick }>
      <Controller
        control={ control }
        name={ name }
        rules={ { required: "Vui lòng chọn ngày khám" } }
        render={ ({ field }) => {
          return (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={ "outline" }
                  disabled={ disabled }
                  className={ cn(
                    "w-full justify-start py-[21px] text-left font-normal",
                    !field.value && "text-muted-foreground",
                    errors[name] && "border-red-500",
                    doctorId ? 'pointer-events-auto' : 'pointer-events-none'
                  ) }
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  { field.value && availableDates.length > 0 ? (
                    format(new Date(field.value), "dd/MM/yyyy", { locale: vi })
                  ) : (
                    <span>Chọn ngày khám</span>
                  ) }
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={ field.value ? new Date(field.value) : null }
                  onSelect={ (selectedDate) => {
                    if (selectedDate && isDateAvailable(selectedDate)) {
                      const formattedDate = format(selectedDate, "yyyy-MM-dd");
                      field.onChange(formattedDate);
                      onChange(formattedDate);
                    }
                  } }
                  initialFocus
                  disabled={ (date) => !isDateAvailable(date) || disabled }
                  modifiers={ {
                    available: (date) => isDateAvailable(date),
                  } }
                />
              </PopoverContent>
            </Popover>
          );
        } }
      />
      { errors[name] && (
        <span className="text-sm text-red-500">{ errors[name].message }</span>
      ) }
    </div>
  );
}
