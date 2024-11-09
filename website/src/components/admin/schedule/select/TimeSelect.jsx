import { Button } from "@/components/ui/Button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/Command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

const timesSchedule = [
    "8:00", "8:15", "8:30", "8:45",
    "9:00", "9:15", "9:30", "9:45",
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

const TimeSelect = ({ label, type }) => {
    const [isOpenSelect, setIsOpenSelect] = useState(false);

    return (
        <div>
            <label
                className="mb-2 block text-sm font-medium leading-none text-black"
                htmlFor=""
            >
                { label }
            </label>
            <Popover open={ isOpenSelect } onOpenChange={ setIsOpenSelect }>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={ open }
                        className={ cn(
                            "w-full justify-between py-[21px]",
                            // errors[name] && "border-red-500",
                        ) }
                    >
                        {/* { field.value ? (
                                            options.find((time) => time._id === field.value)?.time
                                                .users[0].fullName
                                        ) : ( */}
                        <span className="text-gray-600">Chọn { type }</span>
                        {/* ) } */ }
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
                                            // field.onChange(currentValue);
                                            // onChange(currentValue);
                                            setIsOpenSelect(false);
                                        } }
                                    >
                                        <Check
                                            className={ cn(
                                                "mr-2 h-4 w-4",
                                                // field.value === time
                                                //     ? "opacity-100"
                                                //     : "opacity-0",
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
        </div>
    );
};

export default TimeSelect;