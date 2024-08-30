/* eslint-disable react/prop-types */
import React from 'react';
import { Controller } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { cn } from "@/lib/utils";
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
// Value
const ethnicGroups = [
    {
        name: "Kinh",
        value: "Kinh"
    },
    {
        name: "Tày",
        value: "Tay"
    },
    {
        name: "Thái",
        value: "Thai"
    },
    {
        name: "Mường",
        value: "Muong"
    },
    {
        name: "Hoa",
        value: "Hoa"
    },
    {
        name: "Khơ-me",
        value: "Khmer"
    },
    {
        name: "Nùng",
        value: "Nung"
    },
    {
        name: "H'Mông",
        value: "HMong"
    },
    {
        name: "Dao",
        value: "Dao"
    },
    {
        name: "Gia-rai",
        value: "Giarai"
    },
    {
        name: "Ê-đê",
        value: "Ede"
    },
    {
        name: "Ba-na",
        value: "Bana"
    },
    {
        name: "Xơ-đăng",
        value: "Xodang"
    },
    {
        name: "Sán Chay",
        value: "SanChay"
    },
    {
        name: "Cơ-ho",
        value: "Coho"
    },
    {
        name: "Chăm",
        value: "Cham"
    },
    {
        name: "Sán Dìu",
        value: "SanDiu"
    },
    {
        name: "Hrê",
        value: "Hre"
    },
    {
        name: "Ra-glai",
        value: "Raglai"
    },
    {
        name: "Mnông",
        value: "Mnong"
    },
    {
        name: "X'tiêng",
        value: "Xtieng"
    },
    {
        name: "Bru-Vân Kiều",
        value: "BruVanKieu"
    },
    {
        name: "Thổ",
        value: "Tho"
    },
    {
        name: "Giáy",
        value: "Giay"
    },
    {
        name: "Cơ-tu",
        value: "Cotu"
    },
    {
        name: "Gié-Triêng",
        value: "GieTrieng"
    },
    {
        name: "Mạ",
        value: "Ma"
    },
    {
        name: "Khơ-mú",
        value: "Khomu"
    },
    {
        name: "Co",
        value: "Co"
    },
    {
        name: "Ta-ôi",
        value: "Taoi"
    },
    {
        name: "Chơ-ro",
        value: "Choro"
    },
    {
        name: "Kháng",
        value: "Khang"
    },
    {
        name: "Xinh-mun",
        value: "XinhMun"
    },
    {
        name: "Hà Nhì",
        value: "HaNhi"
    },
    {
        name: "Chu-ru",
        value: "Churu"
    },
    {
        name: "Lào",
        value: "Lao"
    },
    {
        name: "La Chí",
        value: "LaChi"
    },
    {
        name: "La Ha",
        value: "LaHa"
    },
    {
        name: "Phù Lá",
        value: "PhuLa"
    },
    {
        name: "La Hủ",
        value: "LaHu"
    },
    {
        name: "Lự",
        value: "Lu"
    },
    {
        name: "Lô Lô",
        value: "LoLo"
    },
    {
        name: "Chứt",
        value: "Chut"
    },
    {
        name: "Mảng",
        value: "Mang"
    },
    {
        name: "Pà Thẻn",
        value: "PaThen"
    },
    {
        name: "Cơ Lao",
        value: "CoLao"
    },
    {
        name: "Cống",
        value: "Cong"
    },
    {
        name: "Bố Y",
        value: "BoY"
    },
    {
        name: "Si La",
        value: "SiLa"
    },
    {
        name: "Pu Péo",
        value: "PuPeo"
    },
    {
        name: "Rơ-măm",
        value: "Romam"
    },
    {
        name: "Brâu",
        value: "Brau"
    },
    {
        name: "Ơ Đu",
        value: "Odu"
    },
    {
        name: "Ngái",
        value: "Ngai"
    }
];

export default function SelectEthnic({ control, name, errors }) {
  const [open, setOpen] = React.useState(false);


    return (
        <div>
            <Controller
              control={control}
                name={name}
                rules={{ required: "Bân thuộc dân tộc nào" }}
                render={({ field }) => (
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className={cn("w-full justify-between py-[21px]", 
                                errors[name] && "")}
                            >
                                {field.value
                                    ? ethnicGroups.find((ethnic) => ethnic.value === field.value)?.name
                                    : <span className='text-gray-600'>Chọn dân tộc</span>}
                                <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 popover-content-width-same-as-its-trigger">
                            <Command>
                                <CommandInput placeholder="Nhập tên dân tộc" />
                                <CommandList>
                                    <CommandEmpty>Không tìm thấy!</CommandEmpty>
                                    <CommandGroup>
                                        {ethnicGroups.map((ethnic) => (
                                            <CommandItem
                                                key={ethnic.value}
                                                value={ethnic.value}
                                                onSelect={(currentValue) => {
                                                    field.onChange(currentValue);
                                                    setOpen(false);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        field.value === ethnic.value ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {ethnic.name}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                )}
            />
            {errors[name] && (<span className="text-red-500 text-sm">{errors[name].message}</span>)}
        </div>
    );
}
