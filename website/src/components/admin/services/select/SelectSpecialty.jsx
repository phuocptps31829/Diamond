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
import { useQuery } from "@tanstack/react-query";
import { specialtyApi } from "@/services/specialtiesApi";
import { Skeleton } from "@/components/ui/Skeleton";

export default function SelectSpecialty({ control, name, errors, disabled, onChange }) {
  const [open, setOpen] = React.useState(false);
  const {
    data: specialties,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["specialties"],
    queryFn: () => specialtyApi.getAllSpecialties(),
  });


  if (isLoading) {
    return <Skeleton className="w-full h-10" />;
  }

  if (error) {
    return <div>Lỗi khi tải chuyên khoa</div>;
  }
  return (
    <div>
      <Controller
        control={ control }
        name={ name }
        rules={ { required: "Chọn chuyên khoa" } }
        render={ ({ field }) => (
          <Popover open={ open } onOpenChange={ setOpen }>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={ open }
                className={ cn(
                  "w-full justify-between py-[21px]",
                  errors[name] && "",
                ) }
                disabled={ disabled }
              >
                { field.value ? (
                  specialties.find(
                    (specialty) => specialty._id === field.value,
                  )?.name
                ) : (
                  <span className="text-gray-600">Chọn chuyên khoa</span>
                ) }
                <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
              <Command className="text-left">
                <CommandList>
                  <CommandGroup>
                    { specialties.map((specialty) => (
                      <CommandItem
                        key={ specialty._id }
                        value={ specialty._id }
                        onSelect={ (currentValue) => {
                          if (!disabled) {
                            field.onChange(currentValue);
                            onChange(currentValue);
                            setOpen(false);
                          }
                        } }
                        disabled={ disabled }
                      >
                        <Check
                          className={ cn(
                            "mr-2 h-4 w-4",
                            field.value === specialty._id
                              ? "opacity-100"
                              : "opacity-0",
                          ) }
                        />
                        { specialty.name }
                      </CommandItem>
                    )) }
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        ) }
      />
      { errors[name] && (
        <span className="text-sm text-red-500">{ errors[name].message }</span>
      ) }
    </div>
  );
}
