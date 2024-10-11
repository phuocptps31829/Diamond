/* eslint-disable react/prop-types */
import React from "react";
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
import { ethnicGroups } from '@/constants/ethnics';

export default function SelectEthnic({ control, name, errors }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Controller
        control={ control }
        name={ name }
        rules={ { required: "Bạn thuộc dân tộc nào" } }
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
                  ? ethnicGroups.find((ethnic) => ethnic.value === field.value)?.name
                  : <span className='text-[#838A94]'>Chọn dân tộc</span> }
                <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
              <Command>
                <CommandInput placeholder="Nhập tên dân tộc" />
                <CommandList>
                  <CommandEmpty>Không tìm thấy!</CommandEmpty>
                  <CommandGroup>
                    { ethnicGroups.map((ethnic) => (
                      <CommandItem
                        key={ ethnic.value }
                        value={ ethnic.value }
                        onSelect={ (currentValue) => {
                          field.onChange(currentValue);
                          setOpen(false);
                        } }
                      >
                        <Check
                          className={ cn(
                            "mr-2 h-4 w-4",
                            field.value === ethnic.value ? "opacity-100" : "opacity-0"
                          ) }
                        />
                        { ethnic.name }
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
