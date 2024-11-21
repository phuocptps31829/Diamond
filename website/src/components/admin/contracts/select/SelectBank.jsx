/* eslint-disable react/prop-types */
import { useState } from "react";
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
import { toastUI } from "@/components/ui/Toastify";
import { optionsBank } from "@/constants/bank-name";

export default function SelectBank({ control, name, errors, onChange }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (!optionsBank.length) {
      toastUI("Không có ngân hàng nào để chọn", "warning");
      return;
    }
  };

  return (
    <div onClick={handleClick}>
      <Controller
        control={control}
        name={name}
        rules={{ required: "Vui lòng chọn ngân hàng" }}
        render={({ field }) => {
          console.log("Selected bank name:", field.value);

          return (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={cn(
                    "w-full justify-between py-[21px]",
                    errors[name] && "border-red-500"
                  )}
                >
                  {field.value ? (
                    <div className="flex items-center">
                      <img
                        src={
                          optionsBank.find(
                            (bank) => bank.shortName === field.value
                          )?.logo
                        }
                        alt="logo"
                        className="mr-2 h-6 w-fit object-cover"
                      />
                      <span>
                        {
                          optionsBank.find(
                            (bank) => bank.shortName === field.value
                          )?.shortName
                        }{" "}
                        -{" "}
                        {
                          optionsBank.find(
                            (bank) => bank.shortName === field.value
                          )?.name
                        }
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-600">Chọn ngân hàng</span>
                  )}
                  <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
                <Command>
                  <CommandInput placeholder="Nhập tên ngân hàng" />
                  <CommandList>
                    <CommandEmpty>Không tìm thấy!</CommandEmpty>
                    <CommandGroup>
                      {optionsBank.map((bank) => (
                        <CommandItem
                          key={bank.id}
                          value={bank.id}
                          onSelect={(currentValue) => {
                            field.onChange(currentValue);
                            onChange(currentValue);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value === bank.id
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          <img
                            src={bank.logo}
                            alt={bank.shortName}
                            className="mr-2 h-6 w-fit object-cover"
                          />
                          {bank.shortName}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          );
        }}
      />
      {errors[name] && (
        <span className="text-sm text-red-500">{errors[name].message}</span>
      )}
    </div>
  );
}
