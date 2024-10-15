/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { Controller } from 'react-hook-form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/Command';
import { Check, ChevronsUpDown } from 'lucide-react';
import { locationApi } from '@/services/provincesApi';

export function SelectProvince({
    control,
    name,
    errors,
    onProvinceChange,
    disabled,
    defaultValue,
}) {
    const [open, setOpen] = React.useState(false);
    const [provinces, setProvinces] = useState([]);
    const [selectedValue, setSelectedValue] = useState(defaultValue);

    useEffect(() => {
        fetchProvinces();
    }, []);

    const fetchProvinces = async () => {
        try {
            const response = await locationApi.getProvinces();
            setProvinces(response);
        } catch (error) {
            console.error('Error fetching provinces:', error);
        }
    };

    useEffect(() => {
        if (defaultValue) {
            console.log(222);
            const selectedProvince = provinces.find((province) => province.name === defaultValue);
            if (selectedProvince) {
                setSelectedValue(selectedProvince._id);
                onProvinceChange(selectedProvince._id);
            }
        }
    }, [defaultValue, provinces, control, name, onProvinceChange]);

    return (
        <div className="">
            <Controller
                control={control}
                name={name}
                rules={{ required: 'Vui lòng chọn tỉnh/thành phố.' }}
                render={({ field }) => (
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                disabled={disabled}
                                aria-expanded={open}
                                className={cn(
                                    'w-full justify-between border py-[21px]',
                                    errors[name] && 'border-red-500'
                                )}
                            >
                                {field.value ? (
                                    <>
                                        {
                                            provinces.find(
                                                (province) => province.name === field.value
                                            )?.name
                                        }
                                    </>
                                ) : (
                                    'Chọn tỉnh/thành phố'
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
                                                        (province) => province.name === currentValue
                                                    );
                                                    if (selectedProvince) {
                                                        field.onChange(selectedProvince.name);
                                                        onProvinceChange(selectedProvince._id);
                                                    }
                                                    setOpen(false);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        'mr-2 h-4 w-4',
                                                        selectedValue === province._id
                                                            ? 'opacity-100'
                                                            : 'opacity-0'
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
            {errors[name] && <span className="text-sm text-red-500">{errors[name].message}</span>}
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
    defaultValue,
}) {
    const [open, setOpen] = React.useState(false);
    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        if (provinceId) {
            console.log('yes');
            fetchDistricts(provinceId);
            setValue(name, null);
            onDistrictChange(null);
        } else {
            setDistricts([]);
            setValue(name, null);
            onDistrictChange(null);
        }
    }, [provinceId, setValue, name]);

    const fetchDistricts = async (provinceId) => {
        try {
            const response = await locationApi.getDistricts(provinceId);

            setDistricts(response);
        } catch (error) {
            console.error('Error fetching districts:', error);
        }
    };

    return (
        <div className="">
            <Controller
                control={control}
                name={name}
                rules={{ required: 'Vui lòng chọn quận/huyện.' }}
                render={({ field }) => (
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                disabled={disabled}
                                aria-expanded={open}
                                className={cn(
                                    'w-full justify-between py-[21px]',
                                    errors[name] && 'border-red-500'
                                )}
                            >
                                {field.value && districts.length > 0 ? (
                                    districts.find((district) => district.name === field.value)
                                        ?.name
                                ) : (
                                    <span className="text-gray-600">
                                        {defaultValue ? defaultValue : 'Chọn quận/huyện'}
                                    </span>
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
                                                        (district) => district.name === currentValue
                                                    );
                                                    if (selectedDistrict) {
                                                        field.onChange(selectedDistrict.name);
                                                        onDistrictChange(selectedDistrict._id);
                                                    }
                                                    setOpen(false);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        'mr-2 h-4 w-4',
                                                        field.value === district._id
                                                            ? 'opacity-100'
                                                            : 'opacity-0'
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
            {errors[name] && <span className="text-sm text-red-500">{errors[name].message}</span>}
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
    defaultValue,
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
            const response = await locationApi.getWards(districtId);
            setWards(response);
        } catch (error) {
            console.error('Error fetching wards:', error);
        }
    };

    return (
        <div className="">
            <Controller
                control={control}
                name={name}
                rules={{ required: 'Vui lòng chọn phường/xã.' }}
                render={({ field }) => (
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                disabled={disabled}
                                aria-expanded={open}
                                className={cn(
                                    'w-full justify-between py-[21px]',
                                    errors[name] && 'border-red-500'
                                )}
                            >
                                {field.value && wards.length > 0 ? (
                                    wards.find((ward) => ward.name === field.value)?.name
                                ) : (
                                    <span className="text-gray-600">
                                        {defaultValue ? defaultValue : 'Chọn phường/xã'}
                                    </span>
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
                                                        (ward) => ward.name === currentValue
                                                    );
                                                    if (selectedWard) {
                                                        field.onChange(selectedWard.name);
                                                    }
                                                    setOpen(false);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        'mr-2 h-4 w-4',
                                                        field.value === ward._id
                                                            ? 'opacity-100'
                                                            : 'opacity-0'
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
            {errors[name] && <span className="text-sm text-red-500">{errors[name].message}</span>}
        </div>
    );
}
