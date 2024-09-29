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
import { getProvinces, getDistricts, getWards } from "@/services/provincesApi";

export function SelectProvince({
  control,
  name,
  errors,
  onProvinceChange,
  disabled,
}) {
  const [open, setOpen] = React.useState(false);
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    try {
      const response = await getProvinces();

      setProvinces(response);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  return (
    <div className="">
      <Controller
        control={control}
        name={name}
        rules={{ required: "Vui lòng chọn tỉnh/thành phố." }}
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
                  errors[name] && "border-red-500",
                )}
              >
                {field.value ? (
                  <>
                    {
                      provinces.find((province) => province._id === field.value)
                        ?.name
                    }
                  </>
                ) : (
                  "Chọn tỉnh/thành phố"
                )}
                <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
              <Command>
                <CommandInput placeholder="Tên tỉnh/thành phố" />
                <CommandList>
                  <CommandEmpty>Không tìm thấy!</CommandEmpty>
                  <CommandGroup>
                    {provinces.map((province) => (
                      <CommandItem
                        key={province._id}
                        value={province.name}
                        onSelect={(currentValue) => {
                          const selectedProvince = provinces.find(
                            (province) => province.name === currentValue,
                          );
                          if (selectedProvince) {
                            field.onChange(selectedProvince._id);
                            onProvinceChange(selectedProvince._id);
                          }
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value === province.name
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {province.name}
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

export function SelectDistrict({
  control,
  name,
  errors,
  provinceId,
  onDistrictChange,
  setValue,
  disabled,
}) {
  const [open, setOpen] = React.useState(false);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    if (provinceId) {
      fetchDistricts(provinceId);
      setValue(name, null);
      onDistrictChange(null);
    } else {
      setDistricts([]);
      setValue(name, null);
      onDistrictChange(null);
    }
  }, [provinceId, setValue, name, onDistrictChange]);

  const fetchDistricts = async (provinceId) => {
    try {
      const response = await getDistricts(provinceId);

      setDistricts(response);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  return (
    <div className="">
      <Controller
        control={control}
        name={name}
        rules={{ required: "Vui lòng chọn quận/huyện." }}
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
                  errors[name] && "border-red-500",
                )}
              >
                {field.value && districts.length > 0 ? (
                  districts.find((district) => district._id === field.value)
                    ?.name
                ) : (
                  <span className="text-gray-600">Chọn quận/huyện</span>
                )}
                <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
              <Command>
                <CommandInput placeholder="Tên quận/huyện" />
                <CommandList>
                  <CommandEmpty>Không tìm thấy!</CommandEmpty>
                  <CommandGroup>
                    {districts.map((district) => (
                      <CommandItem
                        key={district._id}
                        value={district.name}
                        onSelect={(currentValue) => {
                          const selectedDistrict = districts.find(
                            (district) => district.name === currentValue,
                          );
                          if (selectedDistrict) {
                            field.onChange(selectedDistrict._id);
                            onDistrictChange(selectedDistrict._id);
                          }
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value === district._id
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {district.name}
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

export function SelectWard({
  control,
  name,
  errors,
  districtId,
  setValue,
  disabled,
}) {
  const [open, setOpen] = React.useState(false);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    if (districtId) {
      fetchWards(districtId);
      setValue(name, null);
    } else {
      setWards([]);
      setValue(name, null);
    }
  }, [districtId, setValue, name]);

  const fetchWards = async (districtId) => {
    try {
      const response = await getWards(districtId);
      setWards(response);
    } catch (error) {
      console.error("Error fetching wards:", error);
    }
  };

  return (
    <div className="">
      <Controller
        control={control}
        name={name}
        rules={{ required: "Vui lòng chọn phường/xã." }}
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
                  errors[name] && "border-red-500",
                )}
              >
                {field.value && wards.length > 0 ? (
                  wards.find((ward) => ward._id === field.value)?.name
                ) : (
                  <span className="text-gray-600">Chọn phường/xã</span>
                )}
                <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
              <Command>
                <CommandInput placeholder="Tên phường/xã" />
                <CommandList>
                  <CommandEmpty>Không tìm thấy!</CommandEmpty>
                  <CommandGroup>
                    {wards.map((ward) => (
                      <CommandItem
                        key={ward._id}
                        value={ward.name}
                        onSelect={(currentValue) => {
                          const selectedWard = wards.find(
                            (ward) => ward.name === currentValue,
                          );
                          if (selectedWard) {
                            field.onChange(selectedWard._id);
                          }
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value === ward.name
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {ward.name}
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
