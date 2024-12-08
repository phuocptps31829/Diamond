import CreateSchedule from "@/components/admin/schedule/dialogs/CreateSchedule";
import UpdateSchedule from "@/components/admin/schedule/dialogs/UpdateSchedule";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { workScheduleApi } from "@/services/workSchedulesApi";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const ScheduleFormPage = () => {
    useAuthRedirect(["SUPER_ADMIN", "ADMIN"], "/admin/dashboard");

    const { doctorID, scheduleID } = useParams();
    const [searchParams] = useSearchParams();
    const [infoForm, setInfoForm] = useState({
        isOpen: true,
        date: '',
        startTime: '',
        endTime: '',
    });

    const navigate = useNavigate();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['schedule', doctorID],
        queryFn: () => workScheduleApi.getWorkSchedulesByDoctorID(doctorID),
        enabled: !!doctorID
    });

    useEffect(() => {
        setInfoForm(prev => ({
            ...prev,
            startTime: searchParams.get('startTime'),
            date: searchParams.get('date')
        }));
    }, [searchParams]);

    useEffect(() => {
        if (!infoForm.isOpen) {
            navigate('/admin/schedules/details/' + doctorID);
        }
    }, [doctorID, infoForm.isOpen, navigate]);

    if (!searchParams.get('date')) {
        return;
    }

    return (
        scheduleID
            ? <UpdateSchedule
                infoForm={ infoForm }
                setInfoForm={ setInfoForm }
                scheduleID={ scheduleID }
                schedules={ data?.data[0] }
            /> : <CreateSchedule
                infoForm={ infoForm }
                setInfoForm={ setInfoForm }
                schedules={ data?.data[0] }
            />
    );
};

export default ScheduleFormPage;