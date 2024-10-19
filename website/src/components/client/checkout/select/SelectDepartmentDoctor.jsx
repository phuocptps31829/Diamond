/* eslint-disable react/prop-types */
import { useState } from 'react';
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

export default function SelectDepartment({ control, options, name }) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Controller
                control={control}
                name={name}
                defaultValue={true}
                rules={{ required: 'Vui lòng chọn một khoa.' }}
                render={({ field }) => (
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className={cn('w-full justify-between py-[21px]')}
                            >
                                {options.find((option) => option.value === field.value)?.label || (
                                    <span className="text-gray-600">Chọn khoa làm việc</span>
                                )}
                                <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
                            <Command>
                                <CommandInput placeholder="Nhập tên khoa" />
                                <CommandList>
                                    <CommandEmpty>Không tìm thấy!</CommandEmpty>
                                    <CommandGroup>
                                        {options.map((option, index) => (
                                            <CommandItem
                                                key={index}
                                                value={option.value}
                                                onSelect={() => {
                                                    const value = option.value;
                                                    field.onChange(value);
                                                    setOpen(false);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        'mr-2 h-4 w-4',
                                                        field.value === option.value
                                                            ? 'opacity-100'
                                                            : 'opacity-0'
                                                    )}
                                                />
                                                {option.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                )}
            />
        </div>
    );
}
