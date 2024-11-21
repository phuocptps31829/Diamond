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
import { useSearchParams } from "react-router-dom";
import { timesSchedule } from "@/constants/schedule-times";

export default function TimeSelect({
    control,
    name,
    errors,
    label,
    type,
    onChange,
}) {
    const [open, setOpen] = useState(false);
    const [searchParams] = useSearchParams();

    const defaultStartTime = searchParams.get("startTime");
    const foundStartTime = timesSchedule.find((time) => time.slice(0, 2) === defaultStartTime.slice(0, 2));

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
                                    ) : defaultStartTime ? foundStartTime : (
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