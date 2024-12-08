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
import { clinicsApi } from "@/services/clinicApi";
import { toastUI } from "@/components/ui/Toastify";
import { useSearchParams } from "react-router-dom";

export default function Selectclinic({
    control,
    name,
    errors,
    branchID,
    specialtyID,
    onChange,
}) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [isNotValidDate, setIsNotValidDate] = useState(false);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (!specialtyID || !branchID) return;

        const fetchClinics = async () => {
            try {
                const data = await clinicsApi.getClinicBySpecialtyAndBranch({ branchID, specialtyID });
                console.log(data);
                setOptions(data);
            } catch (error) {
                console.error("Failed to fetch clinics:", error);
            }
        };

        fetchClinics();
    }, [branchID, specialtyID]);

    useEffect(() => {
        errors[name] = undefined;
    }, [branchID, specialtyID, errors, name]);

    useEffect(() => {
        if (searchParams.get("date")) {
            if (new Date(searchParams.get("date")) < new Date()) {
                setIsNotValidDate(true);
                toastUI("Không thể thêm lịch cho ngày đã qua", "error");
            } else {
                setIsNotValidDate(false);
            }
        }
    }, [searchParams]);

    return (
        <div>
            <label
                className="mb-2 block text-sm font-medium leading-none text-black"
                htmlFor=""
            >
                Chọn phòng khám <span className="text-red-500">*</span>
            </label>
            <Controller
                control={ control }
                name={ name }
                rules={ { required: "Vui lòng chọn phòng khám" } }
                render={ ({ field }) => {
                    return (
                        <Popover open={ open } onOpenChange={ setOpen }>
                            <PopoverTrigger asChild>
                                <Button
                                    disabled={ isNotValidDate }
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={ open }
                                    className={ cn(
                                        "w-full justify-between py-[21px]",
                                        errors[name] && "border-red-500",
                                        branchID ? 'pointer-events-auto' : 'pointer-events-none'
                                    ) }
                                >
                                    { field.value ? (
                                        options.find((clinic) => clinic._id === field.value)?.name
                                    ) : (
                                        <span className="text-gray-600">Chọn phòng khám</span>
                                    ) }
                                    <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
                                <Command>
                                    <CommandInput placeholder="Nhập tên phòng khám" />
                                    <CommandList>
                                        <CommandEmpty>Không tìm thấy!</CommandEmpty>
                                        <CommandGroup>
                                            { options.map((clinic) => (
                                                <CommandItem
                                                    key={ clinic._id }
                                                    value={ clinic._id }
                                                    onSelect={ (currentValue) => {
                                                        field.onChange(currentValue);
                                                        onChange(currentValue);
                                                        setOpen(false);
                                                    } }
                                                >
                                                    <Check
                                                        className={ cn(
                                                            "mr-2 h-4 w-4",
                                                            field.value === clinic._id
                                                                ? "opacity-100"
                                                                : "opacity-0",
                                                        ) }
                                                    />
                                                    { clinic.name }
                                                </CommandItem>
                                            )) }
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    );
                } }
            />
            { errors[name] && (
                <span className="text-sm text-red-500">{ errors[name].message }</span>
            ) }
        </div>
    );
}