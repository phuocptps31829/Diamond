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

// Value
const specialties = [
  {
    name: "Tim mạch",
    value: "cardiology",
  },
  {
    name: "Da liễu",
    value: "dermatology",
  },
  {
    name: "Thần kinh",
    value: "neurology",
  },
  {
    name: "Nhi khoa",
    value: "pediatrics",
  },
  {
    name: "Tâm thần",
    value: "psychiatry",
  },
];
export default function SelectSpecialty({ control, name, errors, disabled }) {
  const [open, setOpen] = React.useState(false);

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
                  "w-full justify-between py-[21px]",
                  errors[name] && "",
                )}
                disabled={disabled}
              >
                {field.value ? (
                  specialties.find(
                    (specialty) => specialty.value === field.value,
                  )?.name
                ) : (
                  <span className="text-gray-600">Chọn chuyên khoa</span>
                )}
                <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
              <Command className="text-left">
                <CommandList>
                  <CommandGroup>
                    {specialties.map((specialty) => (
                      <CommandItem
                        key={specialty.value}
                        value={specialty.value}
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
                            field.value === specialty.value
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {specialty.name}
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
