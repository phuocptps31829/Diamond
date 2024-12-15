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
import { branchApi } from "@/services/branchesApi";
import { toastUI } from "@/components/ui/Toastify";

export default function SelectBranch({ control, name, errors, onChange }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const data = await branchApi.getAllBranches({ limit: 999 });
        console.log(data);
        setOptions(data.data);
      } catch (error) {
        console.error("Failed to fetch branches:", error);
      }
    };

    fetchBranches();
  }, []);

  const handleClick = () => {
    if (!options.length) {
      toastUI("Không có chi nhánh nào để chọn", "warning");
      return;
    }
  };

  return (
    <div onClick={handleClick}>
      <Controller
        control={control}
        name={name}
        rules={{ required: "Vui lòng chọn chi nhánh" }}
        render={({ field }) => {
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
                    options.find((branch) => branch._id === field.value)?.name
                  ) : (
                    <span className="text-gray-600">Chọn chi nhánh</span>
                  )}
                  <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
                <Command
                  filter={(branchId, search) => {
                    const branch = options.find((b) => b._id === branchId);
                    if (!branch) return 0;
                    return branch.name.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
                  }}
                
                >
                  <CommandInput placeholder="Nhập tên chi nhánh" />
                  <CommandList>
                    <CommandEmpty>Không tìm thấy!</CommandEmpty>
                    <CommandGroup>
                      {options.map((branch) => (
                        <CommandItem
                          key={branch._id}
                          value={branch._id}
                          onSelect={(currentValue) => {
                            field.onChange(currentValue);
                            onChange(currentValue);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value === branch._id
                                ? "opacity-100"
                                : "opacity-0"
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
          );
        }}
      />
      {errors[name] && (
        <span className="text-sm text-red-500">{errors[name].message}</span>
      )}
    </div>
  );
}
