import ClinicSelect from "@/components/admin/schedule/select/ClinicSelect";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import InputCustom from "@/components/ui/InputCustom";
import { createWorkScheduleSchema } from "@/zods/admin/workScheduleAdmin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TimeSelect from "../select/TimeSelect";
import { toastUI } from "@/components/ui/Toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workScheduleApi } from "@/services/workSchedulesApi";
import SpinLoader from "@/components/ui/SpinLoader";
import { useNavigate, useSearchParams } from "react-router-dom";
import { timesSchedule } from "@/constants/schedule-times";

const UpdateSchedule = ({ schedules, infoForm, scheduleID, setInfoForm }) => {
    const [payload, setPayload] = useState(null);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const {
        handleSubmit,
        formState: { errors },
        setValue,
        control,
        reset
    } = useForm({
        resolver: zodResolver(createWorkScheduleSchema),
        defaultValues: {
            startTime: '',
            endTime: '',
            clinicID: ''
        },
    });

    const { mutate: updateWorkSchedule, isPending } = useMutation({
        mutationFn: workScheduleApi.updateWorkSchedule,
        onSuccess: () => {
            toastUI('Cập nhật lịch làm việc thành công', 'success');
            navigate(`/admin/schedules/details/${schedules._id}/?date=${infoForm.date}`);
            window.location.reload();
        },
        onError: (error) => {
            toastUI('Có lỗi xảy ra: ' + error.message, 'error');
        }
    });

    useEffect(() => {
        setValue('date', infoForm.date);
        if (searchParams.has("startTime")) {
            const defaultStartTime = searchParams.get("startTime");
            const foundStartTime = timesSchedule.find((time) => time.slice(0, 2) === defaultStartTime.slice(0, 2));
            setValue('startTime', foundStartTime);
            setValue('endTime', foundStartTime);
            setPayload(prevPayload => ({
                ...prevPayload,
                startTime: foundStartTime,
                endTime: foundStartTime
            }));
        }
    }, [infoForm.date, setValue, searchParams]);

    useEffect(() => {
        reset({
            startTime: '',
            endTime: '',
            clinicID: ''
        });
    }, [infoForm.isOpen, reset]);

    const handleChangePayload = (fieldObj) => {
        setPayload(prevPayload => ({
            ...prevPayload,
            ...fieldObj
        }));
    };

    const onSubmit = (_, event) => {
        event.preventDefault();
        updateWorkSchedule({
            data: {
                ...payload,
                hour: {
                    startTime: payload.startTime,
                    endTime: payload.endTime
                },
                day: infoForm.date,
                doctorID: schedules._id
            },
            id: scheduleID
        });
    };

    return (
        <Dialog
            open={ infoForm.isOpen }
            onOpenChange={ (isOpen) => setInfoForm({ isOpen: isOpen }) }
        >
            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={ handleSubmit(onSubmit) }>
                    <DialogHeader className="mb-4">
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
                                required
                            />
                        </div>
                        <div>
                            <ClinicSelect
                                branchID={ schedules.branch._id }
                                specialtyID={ schedules.specialty._id }
                                control={ control }
                                errors={ errors }
                                name="clinicID"
                                onChange={ (clinicID) => handleChangePayload({ clinicID }) }
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <TimeSelect
                                label="Giờ bắt đầu"
                                type="giờ bắt đầu"
                                errors={ errors }
                                control={ control }
                                name="startTime"
                                onChange={ (startTime) => handleChangePayload({ startTime }) }
                            />
                            <TimeSelect
                                label="Giờ kết thúc"
                                type="giờ kết thúc"
                                errors={ errors }
                                control={ control }
                                name="endTime"
                                onChange={ (endTime) => handleChangePayload({ endTime }) }
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            className="bg-primary-500 hover:bg-primary-600 mt-4 -mb-1"
                            onClick={ () => onSubmit() }
                        >
                            { isPending ? <SpinLoader /> : "Cập nhật" }
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateSchedule;