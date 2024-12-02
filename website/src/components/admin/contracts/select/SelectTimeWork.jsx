/* eslint-disable react/prop-types */
import { useState } from "react";
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
import { toastUI } from "@/components/ui/Toastify";

const timeWorkOptions = [
  { id: 4, label: "Ca 4 tiếng" },
  { id: 6, label: "Ca 6 tiếng" },
  { id: 8, label: "Ca 8 tiếng" },
  { id: 12, label: "Ca 12 tiếng" },
];

export default function SelectTimeWork({ control, name, errors, onChange }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (!timeWorkOptions.length) {
      toastUI("Không có ca làm việc nào để chọn", "warning");
      return;
    }
  };

  return (
    <div onClick={handleClick}>
      <Controller
        control={control}
        name={name}
        rules={{ required: "Vui lòng chọn ca làm việc" }}
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
                    errors[name] && "border-red-500"
                  )}
                >
                  {field.value ? (
                    <span>
                      {timeWorkOptions.find(
                        (option) => option.label === field.value
                      )?.label || "Chọn ca làm việc"}
                    </span>
                  ) : (
                    <span className="text-gray-600">Chọn ca làm việc</span>
                  )}
                  <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
                <Command>
                  <CommandInput placeholder="Nhập ca làm việc" />
                  <CommandList>
                    <CommandEmpty>Không tìm thấy ca làm việc!</CommandEmpty>
                    <CommandGroup>
                      {timeWorkOptions.map((option) => (
                        <CommandItem
                          key={option.id}
                          value={option.id}
                          onSelect={(currentValue) => {
                            field.onChange(currentValue);
                            onChange(option.id);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value === option.id
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {option.label}
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
