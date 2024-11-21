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
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/Command";
import { Check, ChevronsUpDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { medicineApi } from "@/services/medicineApi";
import { Skeleton } from "@/components/ui/Skeleton";

export default function SelectMedicineCategories({
  control,
  name,
  errors,
  disabled,
  onChange,
}) {
  const [open, setOpen] = React.useState(false);
  const {
    data: allMedicineCategories,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["allMedicineCategories"],
    queryFn: () => medicineApi.getAllMedicinesCategories(),
  });

  if (isLoading) {
    return <Skeleton className="h-9 w-full" />;
  }

  if (error) {
    return <div>Lỗi khi tải </div>;
  }
  return (
    <div>
      <Controller
        control={control}
        name={name}
        rules={{ required: "Chọn một danh mục thuốc" }}
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
                  allMedicineCategories.find((item) => item._id === field.value)
                    ?.name
                ) : (
                  <span className="text-gray-600">Chọn danh mục thuốc</span>
                )}
                <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
              <Command >
              <CommandInput placeholder="Nhập tên danh mục thuốc" />
                <CommandList>
                <CommandEmpty>Không tìm thấy!</CommandEmpty>

                  <CommandGroup>
                    {allMedicineCategories.map((item) => (
                      <CommandItem
                        key={item._id}
                        value={item.name}
                        onSelect={(currentValue) => {
                          if (!disabled) {
                            const selectedItem = allMedicineCategories.find(
                              (category) => category.name === currentValue
                            );
                            field.onChange(selectedItem?._id);
                            setOpen(false);
                            onChange(selectedItem?._id);
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
