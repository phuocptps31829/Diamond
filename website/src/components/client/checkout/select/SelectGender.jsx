/* eslint-disable react/prop-types */
import React from 'react';
import { Controller } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
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

const genders = [
    {
        name: "Nam",
        value: "Nam"
    },
    {
        name: "Nữ",
        value: "Nữ"
    },
];

export default function SelectGender({ control, name, errors, required }) {
    const [open, setOpen] = React.useState(false);
    return (
        <div>
            <Controller
                control={ control }
                name={ name }
                rules={ { required: "Chọn giới tính" } }
                render={ ({ field }) => (
                    <Popover open={ open } onOpenChange={ setOpen }>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={ open }
                                className={ cn("w-full justify-between py-[21px]",
                                    errors[name] && "") }
                            >
                                { field.value
                                    ? genders.find((gender) => gender.value === field.value)?.name
                                    : <span className='text-[#838A94]'>Chọn giới tính</span> }
                                <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50 " />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 popover-content-width-same-as-its-trigger">
                            <Command className='text-left '>
                                <CommandList>
                                    <CommandGroup >
                                        { genders.map((gender) => (
                                            <CommandItem
                                                key={ gender.value }
                                                value={ gender.value }
                                                onSelect={ (currentValue) => {
                                                    field.onChange(currentValue);
                                                    setOpen(false);
                                                } }
                                            >
                                                <Check
                                                    className={ cn(
                                                        "mr-2 h-4 w-4",
                                                        field.value === gender.value ? "opacity-100" : "opacity-0"
                                                    ) }
                                                />
                                                { gender.name }
                                            </CommandItem>
                                        )) }
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                ) }
            />
            { errors[name] && (<span className="text-red-500 text-sm">{ errors[name].message }</span>) }
        </div>
    );
}
