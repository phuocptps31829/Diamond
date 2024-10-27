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
import { medicalPackageApi } from "@/services/medicalPackagesApi";
import { Skeleton } from "@/components/ui/Skeleton";
import { useQuery } from "@tanstack/react-query";

export default function SelectMedicalPackage({
  control,
  name,
  errors,
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const { data, error, isLoading } = useQuery({
    queryKey: ["medicalPackages"],
    queryFn: () => medicalPackageApi.getAllMedicalPackages({ limit: 9999 }),
    keepPreviousData: true,
  });

  if (isLoading) {
    return <Skeleton className="h-11 w-full" />;
  }

  if (error) {
    return <div>Đã xảy ra lỗi</div>;
  }
  const medicalPackages = data?.data || [];

  return (
    <div className="">
      <Controller
        control={control}
        name={name}
        rules={{ required: "Vui lòng chọn một gói khám." }}
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
                  medicalPackages.find(
                    (medicalPackage) => medicalPackage._id === field.value
                  )?.name
                ) : (
                  <span className="text-gray-600">Chọn gói khám</span>
                )}
                <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
              <Command>
                <CommandInput placeholder="Nhập tên gói khám" />
                <CommandList className="">
                  <CommandEmpty>Không tìm thấy!</CommandEmpty>
                  <CommandGroup>
                    {medicalPackages.map((medicalPackage) => (
                      <CommandItem
                        key={medicalPackage._id}
                        value={medicalPackage._id}
                        onSelect={(currentValue) => {
                          field.onChange(
                            currentValue === field.value ? "" : currentValue
                          );
                          onChange(
                            currentValue,
                            medicalPackage.specialty._id,
                            medicalPackage.services
                          );
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value === medicalPackage._id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {medicalPackage.name}
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
