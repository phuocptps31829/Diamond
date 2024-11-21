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
import { useMutation, useQuery } from "@tanstack/react-query";
import { workScheduleApi } from "@/services/workSchedulesApi";
import SpinLoader from "@/components/ui/SpinLoader";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { timesSchedule } from "@/constants/schedule-times";
import { doctorApi } from "@/services/doctorsApi";

const CreateSchedule = ({ infoForm, setInfoForm }) => {
    const [payload, setPayload] = useState(null);
    const [doctorID, setDoctorID] = useState(null);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { doctorID: doctorIDParams } = useParams();

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

    useEffect(() => {
        if (doctorIDParams) {
            setDoctorID(doctorIDParams);
        }
    }, [doctorIDParams]);

    const { data: doctorDetail, isLoading } = useQuery({
        queryKey: ['doctor', doctorIDParams],
        queryFn: () => doctorApi.getDoctorById(doctorIDParams),
        enabled: !!doctorIDParams,
    });

    const { mutate: createWorkSchedule, isPending } = useMutation({
        mutationFn: (data) => workScheduleApi.createWorkSchedule(data),
        onSuccess: (data) => {
            console.log('Create work schedule success', data);
            toastUI('Thêm lịch làm việc thành công', 'success');
            navigate(`/admin/schedules/details/${doctorID}/?date=${infoForm.date}`);
            window.location.reload();
        },
        onError: (error) => {
            console.error('Create work schedule error: ', error);
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
        createWorkSchedule({
            ...payload,
            hour: {
                startTime: payload.startTime,
                endTime: payload.endTime
            },
            day: infoForm.date,
            doctorID: doctorID
        });
    };
    console.log(doctorDetail);
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
                                branchID={ doctorDetail?.otherInfo?.branch._id }
                                specialtyID={ doctorDetail?.otherInfo?.specialty._id }
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
                            { isPending ? <SpinLoader /> : "Thêm lịch" }
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateSchedule;