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
import { Skeleton } from "@/components/ui/Skeleton";
import { branchApi } from "@/services/branchesApi";

export default function SelectDepartment({
  control,
  name,
  errors,
  disabled,
  onChange,
}) {
  const [open, setOpen] = React.useState(false);
  const {
    data: departments,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["departments"],
    queryFn: () => branchApi.getAllBranches({ limit: 999 }),
  });
  console.log(departments, "branches");

  if (isLoading) {
    return <Skeleton className="h-10 w-full" />;
  }

  if (error) {
    return <div> Lỗi khi tải chi nhánh</div>;
  }
  return (
    <div>
      <Controller
        control={ control }
        name={ name }
        rules={ { required: "Chọn chi nhánh" } }
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
                  departments?.data.find(
                    (department) => department._id === field.value,
                  )?.name
                ) : (
                  <span className="text-gray-600">Chọn chi nhánh</span>
                ) }
                <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
              <Command className="text-left">
                <CommandList>
                  <CommandGroup>
                    { departments?.data.map((department) => (
                      <CommandItem
                        key={ department._id }
                        value={ department._id }
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
                            field.value === department._id
                              ? "opacity-100"
                              : "opacity-0",
                          ) }
                        />
                        { department.name }
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