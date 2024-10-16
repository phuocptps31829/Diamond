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
import { branchApi } from "@/services/branchesApi";

export default function SelectSpecialties({
  control,
  name,
  errors,
  specialtyID,
  onChange,

}) {
  const [open, setOpen] = useState(false);
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    const fetchSpecialties = async () => {
      if (!specialtyID) return;
      try {
        const data = await branchApi.getAllBranchesBySpecialty(specialtyID);
        setSpecialties(data);
      } catch (error) {
        console.error("Failed to fetch specialties:", error);
      }
    };

    fetchSpecialties();
  }, [specialtyID]);
  return (
    <div className="">
      <Controller
        control={ control }
        name={ name }
        rules={ { required: "Vui lòng chọn một chuyên khoa." } }
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
                ) }
              >
                { field.value ? (
                  specialties.find(
                    (department) => department._id === field.value,
                  )?.name
                ) : (
                  <span className="text-gray-600">Chọn chuyên khoa</span>
                ) }
                <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
              <Command>
                <CommandInput placeholder="Nhập tên chuyên khoa" />
                <CommandList className="">
                  <CommandEmpty>Không tìm thấy!</CommandEmpty>
                  <CommandGroup>
                    { specialties.map((department) => (
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