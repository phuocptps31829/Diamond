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

export default function SelectRole({
  control,
  name,
  errors,
  disabled,
}) {
  const [open, setOpen] = React.useState(false);

  const roles = [
    { _id: "66fccab9682b8e25c2dc43a5", name: "Nhân viên Tiếp nhận" },
    // { _id: "66fcc996682b8e25c2dc43a2", name: "Nhân viên Editor" },
    { _id: "6721089fcb8947c1b985365f", name: "Nhân viên Kế toán" },
  ];

  return (
    <div>
      <Controller
        control={control}
        name={name}
        rules={{ required: "Chọn vai trò" }}
        render={({ field }) => (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={cn(
                  "w-full justify-between border border-gray-300 py-[21px] shadow-none",
                  errors[name] && ""
                )}
                disabled={disabled}
              >
                {field.value ? (
                  roles.find((item) => item._id === field.value)?.name
                ) : (
                  <span className="text-gray-600">Chọn vai trò</span>
                )}
                <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
              <Command className="text-left">
                <CommandList>
                  <CommandGroup>
                    {roles.map((item) => (
                      <CommandItem
                        key={item._id}
                        value={item._id}
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
                            field.value === item._id
                              ? "opacity-100"
                              : "opacity-0"
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
