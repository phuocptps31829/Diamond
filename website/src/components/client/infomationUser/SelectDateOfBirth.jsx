import { vi } from "date-fns/locale";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/Popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/Calendar";
import { Button } from "@/components/ui/Button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Controller } from "react-hook-form";

export default function SelectDateOfBirth({
    control,
    name,
    errors,
    disabled,
    onChange,
}) {
    return (
        <div>
            <Controller
                control={ control }
                name={ name }
                rules={ { required: "Vui lòng chọn ngày khám" } }
                render={ ({ field }) => {
                    return (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={ "outline" }
                                    disabled={ disabled }
                                    className={ cn(
                                        "w-full justify-start py-[21px] text-left font-normal",
                                        !field.value && "text-muted-foreground",
                                        errors[name] && "border-red-500",
                                    ) }
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    { field.value ? (
                                        format(new Date(field.value), "dd/MM/yyyy", { locale: vi })
                                    ) : (
                                        <span>Chọn ngày sinh</span>
                                    ) }
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={ field.value ? new Date(field.value) : null }
                                    onSelect={ (selectedDate) => {
                                        if (selectedDate) {
                                            if (selectedDate > new Date()) {
                                                return;
                                            }
                                            const formattedDate = format(selectedDate, "yyyy-MM-dd");
                                            field.onChange(formattedDate);
                                            onChange(formattedDate);
                                        }
                                    } }
                                    initialFocus
                                    disabled={ disabled }
                                />
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
