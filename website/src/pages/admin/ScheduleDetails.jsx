import CalendarSchedule from "@/components/admin/schedule/details";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { Button } from "@/components/ui/Button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/Command";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import InputCustom from "@/components/ui/InputCustom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const breadcrumbData = [
    {
        href: '/admin/schedules/list',
        title: 'Lịch làm việc'
    },
    {
        href: '/admin/schedules/details',
        title: 'Nguyễn Ngọc Chính'
    },
];

const ScheduleDetailsPage = () => {
    const [infoForm, setInfoForm] = useState({
        isOpen: false,
        date: '',
        startTime: '',
        endTime: '',
    });
    const [isOpenSelect, setIsOpenSelect] = useState(false);

    console.log(infoForm);

    const {
        handleSubmit,
        formState: { errors },
        setValue,
        control,
    } = useForm({
        // resolver: zodResolver(passwordSchema),
        defaultValues: {
            date: '',
            startTime: '',
            endTime: '',
        },
    });

    useEffect(() => {
        setValue('date', infoForm.date);
    }, [infoForm.date, setValue]);

    return (
        <>
            <BreadcrumbCustom data={ breadcrumbData } />
            <CalendarSchedule
                onSetInfoForm={ setInfoForm }
            />
            <Dialog
                open={ infoForm.isOpen }
                onOpenChange={ (isOpen) => setInfoForm({ isOpen: isOpen }) }
            >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Thêm lịch làm việc</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-3">
                        <div>
                            <InputCustom
                                name="date"
                                label="Ngày làm việc"
                                value={ infoForm.date }
                                control={ control }
                                type="text"
                                errors={ errors }
                                disabled={ true }
                            />
                        </div>
                        <div>
                            <label
                                className="mb-2 block text-sm font-medium leading-none text-black"
                                htmlFor=""
                            >
                                Phòng khám
                            </label>
                            <Popover open={ isOpenSelect } onOpenChange={ setIsOpenSelect }>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={ open }
                                        className={ cn(
                                            "w-full justify-between py-[21px]",
                                            // errors[name] && "border-red-500",
                                        ) }
                                    >
                                        {/* { field.value ? (
                                            options.find((doctor) => doctor._id === field.value)?.doctor
                                                .users[0].fullName
                                        ) : ( */}
                                        <span className="text-gray-600">Chọn phòng khám</span>
                                        {/* ) } */ }
                                        <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
                                    <Command>
                                        <CommandInput placeholder="Nhập tên phòng khám" />
                                        <CommandList>
                                            <CommandEmpty>Không tìm thấy!</CommandEmpty>
                                            <CommandGroup>
                                                { ["A", "B"].map((doctor) => (
                                                    <CommandItem
                                                        key={ doctor }
                                                        value={ doctor }
                                                    //   onSelect={ (currentValue) => {
                                                    //     field.onChange(currentValue);
                                                    //     onChange(currentValue);
                                                    //     setOpen(false);
                                                    //   } }
                                                    >
                                                        <Check
                                                            className={ cn(
                                                                "mr-2 h-4 w-4",
                                                                //   field.value === doctor
                                                                //     ? "opacity-100"
                                                                //     : "opacity-0",
                                                            ) }
                                                        />
                                                        {/* { doctor.doctor.users[0].fullName } */ }
                                                    </CommandItem>
                                                )) }
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-3">
                            <InputCustom
                                name="startTime"
                                label="Giờ bắt đầu"
                                value={ infoForm.startTime }
                                control={ control }
                                type="text"
                                errors={ errors }
                            />
                            <InputCustom
                                name="endTime"
                                label="Giờ kết thúc"
                                value={ infoForm.endTime }
                                control={ control }
                                type="text"
                                errors={ errors }
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button>Thêm lịch</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ScheduleDetailsPage;