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
import { serviceApi } from "@/services/servicesApi";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/Skeleton";

export default function SelectService({ control, name, errors, onChange }) {
  const [open, setOpen] = useState(false);
  const { data, error, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: () => serviceApi.getAllServices({ limit: 9999 }),
    keepPreviousData: true,
  });

  if (isLoading) {
    return <Skeleton className="h-11 w-full" />;
  }

  if (error) {
    return <div>Đã xảy ra lỗi</div>;
  }

  const services = data?.data || [];

  return (
    <div className="">
      <Controller
        control={control}
        name={name}
        rules={{ required: "Vui lòng chọn một dịch vụ." }}
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
                  services.find((service) => service._id === field.value)?.name
                ) : (
                  <span className="text-gray-600">Chọn dịch vụ</span>
                )}
                <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
              <Command
                filter={(serviceId, search) => {
                  const service = services.find((s) => s._id === serviceId);
                  if (!service) return 0;
                  return service.name
                    .toLowerCase()
                    .includes(search.toLowerCase())
                    ? 1
                    : 0;
                }}
              >
                <CommandInput placeholder="Nhập tên dịch vụ" />
                <CommandList className="">
                  <CommandEmpty>Không tìm thấy!</CommandEmpty>
                  <CommandGroup>
                    {services.map((service) => (
                      <CommandItem
                        key={service._id}
                        value={service._id}
                        onSelect={(currentValue) => {
                          field.onChange(
                            currentValue === field.value ? "" : currentValue
                          );
                          onChange(
                            currentValue,
                            service?.specialty._id,
                            service.discountPrice || service.price
                          );
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value === service._id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {service.name}
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
