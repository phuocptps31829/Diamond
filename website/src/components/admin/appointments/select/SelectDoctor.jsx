/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
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
import { doctorApi } from "@/services/doctorsApi";
import { toastUI } from "@/components/ui/Toastify";

export default function SelectDoctor({
  control,
  name,
  errors,
  branchId,
  onChange,
  specialtyID,
}) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (!specialtyID || !branchId) return;
    const fetchDoctors = async () => {
      try {
        const data = await doctorApi.getDoctorsByBranch(branchId, specialtyID);
        console.log(data);
        setOptions(data);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
    };

    fetchDoctors();
  }, [branchId, specialtyID]);

  useEffect(() => {
    errors[name] = undefined;
  }, [branchId, specialtyID, errors, name]);

  const handleClick = () => {
    if (!branchId) {
      toastUI("Vui lòng chọn chi nhánh", "warning");
      return;
    }
  };

  return (
    <div onClick={handleClick}>
      <Controller
        control={control}
        name={name}
        rules={{ required: "Vui lòng chọn bác sĩ" }}
        render={({ field }) => {
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
                    branchId ? "pointer-events-auto" : "pointer-events-none"
                  )}
                >
                  {field.value ? (
                    options.find((doctor) => doctor._id === field.value)
                      ?.fullName
                  ) : (
                    <span className="text-gray-600">Chọn bác sĩ</span>
                  )}
                  <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
                <Command
                  filter={(doctorId, search) => {
                    const doctor = options.find((d) => d._id === doctorId);
                    if (!doctor) return 0;
                    return doctor.fullName
                      .toLowerCase()
                      .includes(search.toLowerCase())
                      ? 1
                      : 0;
                  }}
                >
                  <CommandInput placeholder="Nhập tên bác sĩ" />
                  <CommandList>
                    <CommandEmpty>Không tìm thấy!</CommandEmpty>
                    <CommandGroup>
                      {options.map((doctor) => (
                        <CommandItem
                          key={doctor._id}
                          value={doctor._id}
                          onSelect={(currentValue) => {
                            field.onChange(currentValue);
                            onChange(currentValue);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value === doctor._id
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {doctor.fullName}
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
