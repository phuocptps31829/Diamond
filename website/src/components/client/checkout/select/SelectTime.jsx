/* eslint-disable react/prop-types */
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
import { getWorkSchedulesByDoctors } from "@/services/workSchedulesApi";

export default function SelectTime({
  control,
  name,
  errors,
  date,
  onChange,
  setValue,
  doctorId,
  branchId,
}) {
  const [open, setOpen] = useState(false);
  const [times, setTimes] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchDates = async () => {
      if (!doctorId || !branchId) return;

      try {
        const data = await getWorkSchedulesByDoctors(doctorId, branchId);
        setOptions(data);

        const selectedSchedule = data.find(
          (schedule) => schedule._id.day === date,
        );

        if (selectedSchedule) {
          const availableTimes = selectedSchedule.hour.flatMap((hourObj) =>
            hourObj.time.map((time) => ({
              time,
              workScheduleID: hourObj.workScheduleID,
              clinic: hourObj.clinicID[0],
            })),
          );
          setTimes(availableTimes);
        } else {
          setTimes([]);
        }
      } catch (error) {
        console.error("Failed to fetch available dates:", error);
      }
    };

    fetchDates();
  }, [date, doctorId, branchId]);

  useEffect(() => {
    onChange("");
    setValue(name, "");
  }, [branchId, doctorId, setValue, name]);
  return (
    <div>
      <Controller
        control={control}
        name={name}
        rules={{ required: "Vui lòng chọn thời gian!" }}
        render={({ field }) => {
          console.log("Field value:", field.value);
          console.log("Times:", times);

          return (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={cn(
                    "w-full justify-between py-[21px]",
                    errors[name] && "border-red-500",
                  )}
                >
                  {field.value ? (
                    times.find((timeObj) => timeObj.time === field.value)?.time
                  ) : (
                    <span className="text-gray-600">Chọn giờ khám</span>
                  )}
                  <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
                <Command>
                  <CommandInput placeholder="Nhập thời gian" />
                  <CommandList>
                    <CommandEmpty>Không tìm thấy!</CommandEmpty>
                    <CommandGroup>
                      {times.map(({ time, workScheduleID, clinic }) => (
                        <CommandItem
                          key={time}
                          value={time}
                          onSelect={(currentValue) => {
                            field.onChange(currentValue);
                            onChange(workScheduleID, clinic, time);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value === time
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {time}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
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
