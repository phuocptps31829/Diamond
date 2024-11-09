
import { Button } from "@/components/ui/Button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/Command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

const ClinicSelect = () => {
    const [isOpenSelect, setIsOpenSelect] = useState(false);

    return (
        <>
            <label
                className="mb-2 block text-sm font-medium leading-none text-black"
                htmlFor=""
            >
                Phòng khám
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
                                            options.find((doctor) => doctor._id === field.value)?.doctor
                                                .users[0].fullName
                                        ) : ( */}
                        <span className="text-gray-600">Chọn phòng khám</span>
                        {/* ) } */ }
                        <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
                    <Command>
                        <CommandInput placeholder="Nhập tên phòng khám" />
                        <CommandList>
                            <CommandEmpty>Không tìm thấy!</CommandEmpty>
                            <CommandGroup>
                                { ["A - Gò Vấp", "B -Tân Bình"].map((doctor) => (
                                    <CommandItem
                                        key={ doctor }
                                        value={ doctor }
                                    //   onSelect={ (currentValue) => {
                                    //     field.onChange(currentValue);
                                    //     onChange(currentValue);
                                    //     setOpen(false);
                                    //   } }
                                    >
                                        <Check
                                            className={ cn(
                                                "mr-2 h-4 w-4",
                                                //   field.value === doctor
                                                //     ? "opacity-100"
                                                //     : "opacity-0",
                                            ) }
                                        />
                                        { doctor }
                                    </CommandItem>
                                )) }
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </>
    );
};

export default ClinicSelect;