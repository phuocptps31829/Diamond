/* eslint-disable react/prop-types */
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
import { medicineApi } from "@/services/medicineApi";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/useToast";
import { ToastAction } from "@/components/ui/Toast";
export default function SelectMedicine({
  control,
  name,
  errors,
  disabled,
  medicineCategoryID,
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMedicines = async () => {
      if (!medicineCategoryID) return;
      try {
        const data =
          await medicineApi.getMedicineByCategory(medicineCategoryID);
        setMedicines(data);
      } catch (error) {
        console.error("Failed to fetch medicines:", error);
      }
    };

    fetchMedicines();
  }, [medicineCategoryID]);

  useEffect(() => {
    errors[name] = undefined;
  }, [medicineCategoryID, errors, name]);

  const handleClick = () => {
    if (!medicineCategoryID) {
      toast({
        variant: "warning",
        title: "Vui lòng chọn danh mục thuốc",
        status: "warning",
        action: <ToastAction altText="Đóng">Đóng</ToastAction>,
      });
      return;
    }
  };

  return (
    <div onClick={handleClick}>
      <Controller
        control={control}
        name={name}
        rules={{ required: "Chọn một thuốc" }}
        render={({ field }) => (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={cn(
                  "w-full justify-between py-[21px]",
                  errors[name] && "border-red-500",
                  medicineCategoryID
                    ? "pointer-events-auto"
                    : "pointer-events-none"
                )}
                disabled={disabled}
              >
                {field.value ? (
                  medicines.find((item) => item._id === field.value)?.name
                ) : (
                  <span className="text-gray-600">Chọn thuốc</span>
                )}
                <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
              <Command>
                <CommandInput placeholder="Nhập tên thuốc" />
                <CommandList>
                  <CommandEmpty>Không tìm thấy!</CommandEmpty>

                  <CommandGroup>
                    {medicines.map((item) => (
                      <CommandItem
                        key={item._id}
                        value={item.name}
                        onSelect={(currentValue) => {
                          if (!disabled) {
                            const selectedItem = medicines.find(
                              (medicine) => medicine.name === currentValue
                            );

                            field.onChange(selectedItem?._id);
                            setOpen(false);
                            onChange(selectedItem?._id, selectedItem?.price);
                          }
                        }}
                        disabled={disabled}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value === item._id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {item.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      />
      {errors[name] && (
        <span className="text-sm text-red-500">{errors[name].message}</span>
      )}
    </div>
  );
}
