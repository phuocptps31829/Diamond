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
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/Command";
import { Check, ChevronsUpDown } from "lucide-react";

export default function SelectRelatedPatient({
    control,
    name,
    errors,
    patientList,
    onChange
}) {
    const [open, setOpen] = React.useState(false);
    console.log(patientList);
    return (
        <div className='w-52'>
            <Controller
                control={ control }
                name={ name }
                render={ ({ field }) => (
                    <Popover open={ open } onOpenChange={ setOpen }>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={ open }
                                className={ cn("w-full justify-between py-[21px]",
                                    errors[name] && "border-red-500") }
                            >
                                { field.value
                                    ? patientList.find((patient) => patient._id === field.value)?.fullName
                                    : <span className='text-[#838A94]'>Người liên quan</span> }
                                <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
                            <Command>
                                <CommandInput placeholder="Tên người liên quan" />
                                <CommandList>
                                    <CommandEmpty>Không tìm thấy!</CommandEmpty>
                                    <CommandGroup>
                                        { patientList.map((patient) => (
                                            <CommandItem
                                                key={ patient._id }
                                                value={ patient._id }
                                                onSelect={ (currentValue) => {
                                                    field.onChange(currentValue);
                                                    onChange(currentValue);
                                                    setOpen(false);
                                                } }
                                            >
                                                <Check
                                                    className={ cn(
                                                        "mr-2 h-4 w-4",
                                                        field._id === patient._id ? "opacity-100" : "opacity-0"
                                                    ) }
                                                />
                                                { patient.fullName }
                                            </CommandItem>
                                        )) }
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                ) }
            />
            { errors[name] && (<span className="text-red-500 text-sm ">{ errors[name].message }</span>) }
        </div>
    );
}
