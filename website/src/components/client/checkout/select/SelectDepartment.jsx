/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Controller } from "react-hook-form";
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
import { getAllBranchesBySpecialty } from "@/services/branchesApi";
import { useToast } from "@/hooks/useToast";
import { ToastAction } from "@/components/ui/Toast";

export default function SelectDepartment({
  control,
  name,
  errors,
  specialtyID,
  onChange,
  selectedServiceID
}) {
  const [open, setOpen] = useState(false);
  const [departments, setDepartments] = useState([]);
  console.log(selectedServiceID);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDepartments = async () => {
      if (!specialtyID) return;
      try {
        const data = await getAllBranchesBySpecialty(specialtyID);
        setDepartments(data);
      } catch (error) {
        console.error("Failed to fetch departments:", error);
      }
    };

    fetchDepartments();
  }, [specialtyID]);

  useEffect(() => {
    errors[name] = undefined;
  }, [specialtyID, selectedServiceID, errors, name]);

  const handleClick = () => {
    if (!selectedServiceID) {
      toast({
        variant: "warning",
        title: "Vui lòng chọn dịch vụ",
        status: "warning",
        action: <ToastAction altText="Đóng">Đóng</ToastAction>,
      });
      return;
    }
  };

  return (
    <div onClick={ handleClick }>
      <Controller
        control={ control }
        name={ name }
        rules={ { required: "Vui lòng chọn một chi nhánh." } }
        render={ ({ field }) => (
          <Popover open={ open } onOpenChange={ setOpen }>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={ open }
                className={ cn(
                  "w-full justify-between py-[21px]",
                  errors[name] && "border-red-500",
                  selectedServiceID ? 'pointer-events-auto' : 'pointer-events-none'
                ) }
              >
                { field.value ? (
                  departments.find(
                    (department) => department._id === field.value,
                  )?.name
                ) : (
                  <span className="text-gray-600">Chọn chi nhánh</span>
                ) }
                <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
              <Command>
                <CommandInput placeholder="Nhập tên chi nhánh" />
                <CommandList className="">
                  <CommandEmpty>Không tìm thấy!</CommandEmpty>
                  <CommandGroup>
                    { departments.map((department) => (
                      <CommandItem
                        key={ department._id }
                        value={ department._id }
                        onSelect={ (currentValue) => {
                          field.onChange(
                            currentValue === field.value ? "" : currentValue,
                          );
                          onChange(currentValue);
                          setOpen(false);
                        } }
                      >
                        <Check
                          className={ cn(
                            "mr-2 h-4 w-4",
                            field.value === department._id
                              ? "opacity-100"
                              : "opacity-0",
                          ) }
                        />
                        { department.name }
                      </CommandItem>
                    )) }
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        ) }
      />
      { errors[name] && (
        <p className="mt-2 text-sm text-red-600">{ errors[name].message }</p>
      ) }
    </div>
  );
}