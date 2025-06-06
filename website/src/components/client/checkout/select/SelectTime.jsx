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
import toast from "react-hot-toast";
import { LuLoader2 } from "react-icons/lu";

export default function SelectTime({
  control,
  name,
  errors,
  date,
  onChange,
  doctorID,
}) {
  const [open, setOpen] = useState(false);
  const [times, setTimes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDates = async () => {
      if (!doctorID) return;

      setIsLoading(true);
      try {
        const data = await workScheduleApi.getWorkSchedulesByDoctors(doctorID);

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
      } finally {
        setIsLoading(false);
      }
    };

    fetchDates();
  }, [date, doctorID]);

  useEffect(() => {
    errors[name] = undefined;
  }, [date, doctorID, errors, name]);

  const handleClick = () => {
    if (!date) {
      toast.error("Vui lòng chọn ngày khám");
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
                  disabled={ isLoading }
                  className={ cn(
                    "w-full justify-between py-[21px] flex items-center",
                    errors[name] && "border-red-500",
                    date ? 'pointer-events-auto' : 'pointer-events-none'
                  ) }
                >
                  <div>
                    { field.value ? (
                      times.find((timeObj) => timeObj.time === field.value)?.time
                    ) : (
                      <span className="text-gray-600">Chọn giờ khám</span>
                    ) }
                  </div>
                  { isLoading
                    ? <LuLoader2 className="w-5 h-5 animate-spin text-primary-500" />
                    : <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" /> }
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