/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { branchApi } from '@/services/branchesApi';
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

export default function SelectBranch({ control, name, errors }) {
    const [open, setOpen] = useState(false);

    const { data: allBranches, isLoading } = useQuery({
        queryKey: ['branches'],
        queryFn: () => branchApi.getAllBranches({ page: 1, limit: 999 }),
    });

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="">
            <Controller
                control={control}
                name={name}
                rules={{ required: 'Vui lòng chọn một chi nhánh.' }}
                render={({ field }) => (
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className={cn(
                                    'w-full justify-between py-[21px]',
                                    errors[name] && 'border-red-500'
                                )}
                            >
                                {field.value ? (
                                    allBranches.data.find((branch) => branch._id === field.value)
                                        ?.name
                                ) : (
                                    <span className="text-gray-600">Chọn chi nhánh</span>
                                )}
                                <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
                            <Command>
                                <CommandInput placeholder="Nhập tên chi nhánh" />
                                <CommandList className="">
                                    <CommandEmpty>Không tìm thấy!</CommandEmpty>
                                    <CommandGroup>
                                        {allBranches.data.map((branch) => (
                                            <CommandItem
                                                key={branch._id}
                                                value={branch._id}
                                                onSelect={(currentValue) => {
                                                    field.onChange(
                                                        currentValue === field.value
                                                            ? ''
                                                            : currentValue
                                                    );
                                                    setOpen(false);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        'mr-2 h-4 w-4',
                                                        field.value === branch._id
                                                            ? 'opacity-100'
                                                            : 'opacity-0'
                                                    )}
                                                />
                                                {branch.name}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                )}
            />
            {errors[name] && <p className="mt-2 text-sm text-red-600">{errors[name].message}</p>}
        </div>
    );
}
