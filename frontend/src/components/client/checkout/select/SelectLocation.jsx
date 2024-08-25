/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Controller } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";

const token = "2355ce9f-0954-11ef-be92-2ad6ca7ca6ac";

export function SelectProvince({ control, name, errors, onProvinceChange }) {
  const [open, setOpen] = React.useState(false);
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    try {
      const response = await axios.get(
        "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
        { headers: { token } },
      );
      setProvinces(response.data.data);
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
                aria-expanded={open}
                className={cn(
                  "w-full justify-between py-[21px]",
                  errors[name] && "border-red-500",
                )}
              >
                {field.value ? (
                  <>
                    {
                      provinces.find(
                        (province) => province.ProvinceID === field.value,
                      )?.ProvinceName
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
                <CommandInput placeholder="Nhập tên tỉnh/thành phố" />
                <CommandList>
                  <CommandEmpty>Không tìm thấy!</CommandEmpty>
                  <CommandGroup>
                    {provinces.map((province) => (
                      <CommandItem
                        key={province.ProvinceID}
                        value={province.ProvinceName}
                        onSelect={(currentValue) => {
                          const selectedProvince = provinces.find(
                            (province) =>
                              province.ProvinceName === currentValue,
                          );
                          if (selectedProvince) {
                            field.onChange(selectedProvince.ProvinceID);
                            onProvinceChange(selectedProvince.ProvinceID);
                          }
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value === province.ProvinceID
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {province.ProvinceName}
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
      const response = await axios.get(
        `https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${provinceId}`,
        { headers: { token } },
      );
      setDistricts(response.data.data);
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
                aria-expanded={open}
                className={cn(
                  "w-full justify-between py-[21px]",
                  errors[name] && "border-red-500",
                )}
              >
                {field.value && districts.length > 0 ? (
                  districts.find(
                    (district) => district.DistrictID === field.value,
                  )?.DistrictName
                ) : (
                  <span className="text-gray-600">Chọn quận/huyện</span>
                )}
                <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
              <Command>
                <CommandInput placeholder="Nhập tên quận/huyện" />
                <CommandList>
                  <CommandEmpty>Không tìm thấy!</CommandEmpty>
                  <CommandGroup>
                    {districts.map((district) => (
                      <CommandItem
                        key={district.DistrictID}
                        value={district.DistrictName}
                        onSelect={(currentValue) => {
                          const selectedDistrict = districts.find(
                            (district) =>
                              district.DistrictName === currentValue,
                          );
                          if (selectedDistrict) {
                            field.onChange(selectedDistrict.DistrictID);
                            onDistrictChange(selectedDistrict.DistrictID);
                          }
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value === district.DistrictID
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {district.DistrictName}
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

export function SelectWard({ control, name, errors, districtId, setValue }) {
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
      const response = await axios.get(
        `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtId}`,
        { headers: { token } },
      );
      setWards(response.data.data);
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
                aria-expanded={open}
                className={cn(
                  "w-full justify-between py-[21px]",
                  errors[name] && "border-red-500",
                )}
              >
                {field.value && wards.length > 0 ? (
                  wards.find((ward) => ward.WardCode === field.value)?.WardName
                ) : (
                  <span className="text-gray-600">Chọn phường/xã</span>
                )}
                <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
              <Command>
                <CommandInput placeholder="Nhập tên phường/xã" />
                <CommandList>
                  <CommandEmpty>Không tìm thấy!</CommandEmpty>
                  <CommandGroup>
                    {wards.map((ward) => (
                      <CommandItem
                        key={ward.WardCode}
                        value={ward.WardName}
                        onSelect={(currentValue) => {
                          const selectedWard = wards.find(
                            (ward) => ward.WardName === currentValue,
                          );
                          if (selectedWard) {
                            field.onChange(selectedWard.WardCode);
                          }
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value === ward.WardCode
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {ward.WardName}
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
