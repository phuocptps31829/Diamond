import CalendarSchedule from "@/components/admin/schedule/details";
import ClinicSelect from "@/components/admin/schedule/select/ClinicSelect";
import TimeSelect from "@/components/admin/schedule/select/TimeSelect";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { Button } from "@/components/ui/Button";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import InputCustom from "@/components/ui/InputCustom";

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
                            <ClinicSelect />
                        </div>
                        <div className="grid grid-cols-2 items-center gap-3">
                            <TimeSelect label="Giờ bắt đầu" type="giờ bắt đầu" />
                            <TimeSelect label="Giờ kết thúc" type="giờ kết thúc" />
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