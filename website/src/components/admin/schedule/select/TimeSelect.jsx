/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/Button";
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

const timesSchedule = [
    "08:00", "08:15", "08:30", "08:45",
    "09:00", "09:15", "09:30", "09:45",
    "10:00", "10:15", "10:30", "10:45",
    "11:00", "11:15", "11:30", "11:45",
    "12:00", "12:15", "12:30", "12:45",
    "13:00", "13:15", "13:30", "13:45",
    "14:00", "14:15", "14:30", "14:45",
    "15:00", "15:15", "15:30", "15:45",
    "16:00", "16:15", "16:30", "16:45",
    "17:00", "17:15", "17:30", "17:45",
    "18:00"
];

export default function TimeSelect({
    control,
    name,
    errors,
    label,
    type,
    onChange,
}) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        errors[name] = undefined;
    }, [errors, name]);

    return (
        <div>
            <label
                className="mb-2 block text-sm font-medium leading-none text-black"
                htmlFor=""
            >
                { label } <span className="text-red-500">*</span>
            </label>
            <Controller
                control={ control }
                name={ name }
                rules={ { required: "Vui lòng chọn " + type } }
                render={ ({ field }) => {
                    return (
                        <Popover open={ open } onOpenChange={ setOpen }>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={ open }
                                    className={ cn(
                                        "w-full justify-between py-[21px]",
                                        errors[name] && "border-red-500",
                                    ) }
                                >
                                    { field.value ? (
                                        timesSchedule.find((time) => time === field.value)
                                    ) : (
                                        <span className="text-gray-600">Chọn { type }</span>
                                    ) }
                                    <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
                                <Command>
                                    <CommandInput placeholder={ `Nhập ${type}` } />
                                    <CommandList>
                                        <CommandEmpty>Không tìm thấy!</CommandEmpty>
                                        <CommandGroup>
                                            { timesSchedule.map((time, index) => (
                                                <CommandItem
                                                    key={ index }
                                                    value={ time }
                                                    onSelect={ (currentValue) => {
                                                        field.onChange(currentValue);
                                                        onChange(currentValue);
                                                        setOpen(false);
                                                    } }
                                                >
                                                    <Check
                                                        className={ cn(
                                                            "mr-2 h-4 w-4",
                                                            field.value === time
                                                                ? "opacity-100"
                                                                : "opacity-0",
                                                        ) }
                                                    />
                                                    { time }
                                                </CommandItem>
                                            )) }
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    );
                } }
            />
            { errors[name] && (
                <span className="text-sm text-red-500">{ errors[name].message }</span>
            ) }
        </div>
    );
}