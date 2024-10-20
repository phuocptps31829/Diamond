/* eslint-disable react/prop-types */
import { useState } from "react";
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
import { toastUI } from "@/components/ui/Toastify";

export default function SelectLevelMedicalPackage({
  control,
  name,
  errors,
  levels,
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    if (levels.length === 0) {
      toastUI("Vui lòng chọn gói khám", "warning");
      return;
    }
  };
  console.log(levels, "levels");

  return (
    <div className="" onClick={handleClick}>
      <Controller
        control={control}
        name={name}
        rules={{ required: "Vui lòng chọn một cấp độ." }}
        render={({ field }) => (
          <>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={cn(
                    "w-full justify-between py-[21px]",
                    errors[name] && "border-red-500",
                    levels.length === 0
                      ? "pointer-events-none"
                      : "pointer-events-auto",
                  )}
                >
                  {field.value ? (
                    levels.find((level) => level._id === field.value)?.levelName
                  ) : (
                    <span className="text-gray-600">Chọn cấp độ</span>
                  )}
                  <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
                <Command>
                  <CommandInput placeholder="Nhập tên cấp độ" />
                  <CommandList className="">
                    <CommandEmpty>Không tìm thấy!</CommandEmpty>
                    <CommandGroup>
                      {levels.map((level) => (
                        <CommandItem
                          key={level._id}
                          value={level._id}
                          onSelect={(currentValue) => {
                            field.onChange(
                              currentValue === field.value ? "" : currentValue,
                            );
                            onChange(currentValue, level.discountPrice);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value?._id === level._id
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {level.levelName}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </>
        )}
      />
      {errors[name] && (
        <p className="mt-2 text-sm text-red-600">{errors[name].message}</p>
      )}
    </div>
  );
}
