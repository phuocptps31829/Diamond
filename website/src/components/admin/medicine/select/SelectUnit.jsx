/* eslint-disable react/prop-types */
import React from "react";
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
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/Command";
import { Check, ChevronsUpDown } from "lucide-react";

export default function SelectUnit({ control, name, errors, disabled }) {
  const [open, setOpen] = React.useState(false);

  const unitsMedicines = [
    {
      id: 1,
      name: "Ống",
    },
    {
      id: 2,
      name: "Chai",
    },
    {
      id: 3,
      name: "Gói",
    },
    {
      id: 4,
      name: "Hộp",
    },
  ];

  return (
    <div>
      <Controller
        control={control}
        name={name}
        rules={{ required: "Chọn chuyên khoa" }}
        render={({ field }) => (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={cn(
                  "w-full justify-between border border-gray-300 py-[21px] shadow-none",
                  errors[name] && "",
                )}
                disabled={disabled}
              >
                {field.value ? (
                  unitsMedicines.find((item) => item.name === field.value)?.name
                ) : (
                  <span className="text-gray-600">Chọn đơn vị</span>
                )}
                <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
              <Command className="text-left">
                <CommandList>
                  <CommandGroup>
                    {unitsMedicines.map((item) => (
                      <CommandItem
                        key={item.id}
                        value={item.id}
                        onSelect={(currentValue) => {
                          if (!disabled) {
                            field.onChange(currentValue);
                            setOpen(false);
                          }
                        }}
                        disabled={disabled}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value === item.id
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {item.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      />
      {errors[name] && (
        <span className="text-sm text-red-500">{errors[name].message}</span>
      )}
    </div>
  );
}
