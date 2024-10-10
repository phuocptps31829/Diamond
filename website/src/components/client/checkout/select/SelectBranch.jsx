/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Controller } from "react-hook-form";
import React from "react";
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
import { getAllBranches } from "@/services/branchesApi";
import { useQuery } from "@tanstack/react-query";

export default function SelectBranch({
  control,
  name,
  errors,
  setValue,
}) {
  const [open, setOpen] = React.useState(false);
  const {
    data: response,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["branches"],
    queryFn: getAllBranches,
  });

  // Trích xuất mảng branches từ response.data
  const branches = response?.data || []; // Sử dụng optional chaining để đảm bảo không có lỗi khi truy cập

  console.log("BR DATA:", branches); // In ra giá trị branches

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading branches</div>;
  }

  return (
    <div className="">
      <Controller
        control={control}
        name={name}
        rules={{ required: "Vui lòng chọn một chi nhánh." }}
        render={({ field }) => (
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
                  branches.find(branch => branch._id === field.value)?.name || "Chọn chi nhánh"
                ) : (
                  <span className="text-gray-600">Chọn chi nhánh</span>
                )}
                <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
              <Command>
                <CommandInput placeholder="Nhập tên chi nhánh" />
                <CommandList>
                  <CommandEmpty>Không tìm thấy!</CommandEmpty>
                  <CommandGroup>
                    {branches.map(branch => (
                      <CommandItem
                        key={branch._id}
                        value={branch._id}
                        onSelect={(currentValue) => {
                          field.onChange(
                            currentValue === field.value ? "" : currentValue
                          );
                          // Cập nhật địa chỉ dựa trên chi nhánh đã chọn
                          setValue( branch._id);
                          setValue("address", branch.address);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value === branch._id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {branch.name}
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
        <p className="mt-2 text-sm text-red-600">{errors[name].message}</p>
      )}
    </div>
  );
}
