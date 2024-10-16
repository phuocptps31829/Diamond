/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
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
export function SelectServices({
  control,
  name,
  errors,
  onServiceChange,
  disabled,
  defaultValue = null,
}) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["services"],
    queryFn: () => serviceApi.getAllServices({ limit: 9999 }), 
  });
  const services = data?.data || []
  return (
    <div className="">
      <Controller
        control={control}
        name={name}
        rules={{ required: "Vui lòng chọn một dịch vụ!" }}
        render={({ field }) => (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                disabled={disabled}
                aria-expanded={open}
                className={cn(
                  "w-full justify-between border py-[21px]",
                  errors[name] && "border-red-500"
                )}
              >
                {field.value ? field.value : "Chọn dịch vụ"}
                <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
              <Command>
                <CommandInput placeholder="Tên dịch vụ" />
                <CommandList>
                  {isLoading ? (
                    <div>Loading...</div>
                  ) : isError ? (
                    <div>Error loading data</div>
                  ) : (
                    <>
                      <CommandEmpty>Không tìm thấy!</CommandEmpty>
                      <CommandGroup>
                        {services.map((service) => (
                          <CommandItem
                            key={service._id}
                            value={service.name}
                            onSelect={(currentValue) => {
                              const selectedService = services.find(
                                (service) => service.name === currentValue
                              );
                              if (selectedService) {
                                field.onChange(selectedService.name);
                                onServiceChange(selectedService._id);
                                setSelectedValue(selectedService._id);
                              }
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedValue === service._id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {service.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </>
                  )}
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

export function SelectDoctorsOfServices({
  control,
  name,
  errors,
  serviceId,
  onDoctorChange,
  setValue,
  disabled,
  defaultValue,
  initialRender = false,
}) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const { data: doctors = [], isLoading, isError } = useQuery({
    queryKey: ["doctors", serviceId],
    queryFn: () => serviceApi.getDoctorsByService(serviceId),
    enabled: !!serviceId, 
  });
  

  useEffect(() => {
    if (serviceId && !initialRender) {
      setValue(name, null);
      setSelectedValue(null);
      onDoctorChange(null);
    }
  }, [serviceId, setValue, name, onDoctorChange, initialRender]);

  return (
    <div className="">
      <Controller
        control={control}
        name={name}
        rules={{ required: "Vui lòng chọn bác sĩ." }}
        render={({ field }) => (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                disabled={disabled}
                aria-expanded={open}
                className={cn(
                  "w-full justify-between py-[21px]",
                  errors[name] && "border-red-500"
                )}
              >
                {field.value && doctors.length > 0 ? (
                  field.value
                ) : (
                  <span className="text-gray-600">Chọn bác sĩ</span>
                )}
                <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
              <Command>
                <CommandInput placeholder="Tên bác sĩ" />
                <CommandList>
                  {isLoading ? (
                    <div>Loading...</div>
                  ) : isError ? (
                    <div>Error loading data</div>
                  ) : (
                    <>
                      <CommandEmpty>Không tìm thấy!</CommandEmpty>
                      <CommandGroup>
                        {doctors.map((doctor) => (
                          <CommandItem
                            key={doctor._id}
                            value={doctor.name}
                            onSelect={(currentValue) => {
                              const selectedDoctor = doctors.find(
                                (doctor) => doctor.name === currentValue
                              );
                              if (selectedDoctor) {
                                field.onChange(selectedDoctor.name);
                                onDoctorChange(selectedDoctor._id);
                                setSelectedValue(selectedDoctor._id);
                              }
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedValue === doctor._id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {doctor.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </>
                  )}
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
