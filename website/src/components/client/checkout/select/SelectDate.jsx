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
import { workScheduleApi } from "@/services/workSchedulesApi";
import toast from "react-hot-toast";
import { LuLoader2 } from "react-icons/lu";

export default function SelectDate({
  control,
  name,
  errors,
  doctorID,
  branchID,
  disabled,
  onChange,
}) {
  const [availableDates, setAvailableDates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!doctorID) return;

    const fetchDates = async () => {
      setIsLoading(true);
      try {
        const data = await workScheduleApi.getWorkSchedulesByDoctors(doctorID);
        console.log(data);
        const dates = data.data.map((option) =>
          parse(option.day, "yyyy-MM-dd", new Date()),
        );
        setAvailableDates(dates);
      } catch (error) {
        console.error("Failed to fetch available dates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDates();
  }, [doctorID, branchID]);

  useEffect(() => {
    errors[name] = undefined;
  }, [doctorID, branchID, errors, name]);

  const isDateAvailable = (date) => {
    return availableDates.some(
      (availableDate) =>
        availableDate.getDate() === date.getDate() &&
        availableDate.getMonth() === date.getMonth() &&
        availableDate.getFullYear() === date.getFullYear(),
    );
  };

  const handleClick = () => {
    if (!doctorID) {
      toast.error("Vui lòng chọn bác sĩ !");
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
                  disabled={ disabled || isLoading }
                  className={ cn(
                    "w-full py-[21px] text-left font-normal flex items-center justify-between",
                    !field.value && "text-muted-foreground",
                    errors[name] && "border-red-500",
                    doctorID ? "pointer-events-auto" : "pointer-events-none",
                  ) }
                >
                  <div className="flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    { field.value && availableDates.length > 0 ? (
                      format(new Date(field.value), "dd/MM/yyyy", { locale: vi })
                    ) : (
                      <span>Chọn ngày khám</span>
                    ) }
                  </div>
                  { isLoading && <LuLoader2 className="w-5 h-5 animate-spin text-primary-500" /> }
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
