import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Controller } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/Command";
import { Check, ChevronsUpDown } from "lucide-react";
import { workScheduleApi } from "@/services/workSchedulesApi";
import { toastUI } from "@/components/ui/Toastify";

export default function SelectTime({
  control,
  name,
  errors,
  date,
  onChange,
  doctorId,
}) {
  const [open, setOpen] = useState(false);
  const [times, setTimes] = useState([]);

  useEffect(() => {
    const fetchDates = async () => {
      if (!doctorId) return;

      try {
        const data = await workScheduleApi.getWorkSchedulesByDoctors(doctorId);

        const selectedSchedule = data.data.find(
          (schedule) => schedule.day === date,
        );

        if (selectedSchedule) {
          const availableTimes = selectedSchedule.time.map((time) => ({
            time,
            workScheduleID: data.data[0]._id,
            clinic: data.data[0].clinic,
          }));
          setTimes(availableTimes);
        } else {
          setTimes([]);
        }
      } catch (error) {
        console.error("Failed to fetch available dates:", error);
      }
    };

    fetchDates();
  }, [date, doctorId]);

  useEffect(() => {
    errors[name] = undefined;
  }, [date, doctorId, errors, name]);

  const handleClick = () => {
    if (!date) {
      toastUI("Vui lòng chọn ngày", "warning");
      return;
    }
  };

  return (
    <div onClick={ handleClick }>
      <Controller
        control={ control }
        name={ name }
        rules={ { required: "Vui lòng chọn thời gian!" } }
        render={ ({ field }) => {
          console.log("Field value:", field.value);
          console.log("Times:", times);

          return (
            <Popover open={ open } onOpenChange={ setOpen }>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={ open }
                  className={ cn(
                    "w-full justify-between py-[21px]",
                    errors[name] && "border-red-500",
                    date ? 'pointer-events-auto' : 'pointer-events-none'
                  ) }
                >
                  { field.value ? (
                    times.find((timeObj) => timeObj.time === field.value)?.time
                  ) : (
                    <span className="text-gray-600">Chọn giờ khám</span>
                  ) }
                  <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
                <Command>
                  <CommandInput placeholder="Nhập thời gian" />
                  <CommandList>
                    <CommandEmpty>Không tìm thấy!</CommandEmpty>
                    <CommandGroup>
                      { times.map(({ time, workScheduleID, clinic }) => (
                        <CommandItem
                          key={ time }
                          value={ time }
                          onSelect={ (currentValue) => {
                            field.onChange(currentValue);
                            onChange(workScheduleID, clinic, time);
                            setOpen(false);
                          } }
                        >
                          <Check
                            className={ cn(
                              "mr-2 h-4 w-4",
                              field.value === time
                                ? "opacity-100"
                                : "opacity-0",
                            ) }
                          />
                          { time }
                        </CommandItem>
                      )) }
                    </CommandGroup>
                  </CommandList>
                </Command>
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