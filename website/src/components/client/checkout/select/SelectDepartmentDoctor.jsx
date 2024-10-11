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

export default function SelectDepartment({
  control,
  name,
  errors,
  onChange,
}) {
  const [open, setOpen] = useState(false);

  // Dữ liệu tĩnh chứa hai giá trị "Nội khoa" và "Ngoại khoa"
  const departments = [
    { _id: true, name: "Nội khoa" },
    { _id: false, name: "Ngoại khoa" },
  ];

  return (
    <div>
      <Controller
        control={control}
        name={name}
        defaultValue={true} // Thiết lập giá trị mặc định là "Nội khoa" (true)
        rules={{ required: "Vui lòng chọn một khoa." }}
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
              {departments.find((department) => department._id === field.value)?.name || (
                <span className="text-gray-600">Chọn khoa làm việc</span>
              )}
              <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
            </Button>
            </PopoverTrigger>
            <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
              <Command>
                <CommandInput placeholder="Nhập tên khoa" />
                <CommandList>
                  <CommandEmpty>Không tìm thấy!</CommandEmpty>
                  <CommandGroup>
                    {departments.map((department) => (
                      <CommandItem
                        key={department._id}
                        value={department._id}
                        onSelect={() => {
                          const value = department._id;
                          field.onChange(value); // Cập nhật giá trị trong form
                          onChange(value); // Cập nhật khi có sự kiện chọn
                          setOpen(false); // Đóng Popover sau khi chọn
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value === department._id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {department.name}
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
