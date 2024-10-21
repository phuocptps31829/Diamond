import CalendarSchedule from "@/components/admin/schedule/details";
import CreateSchedule from "@/components/admin/schedule/dialogs/CreateSchedule";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { workScheduleApi } from "@/services/workSchedulesApi";
import Loading from "@/components/ui/Loading";
import { createPortal } from "react-dom";

const getBreadcrumbData = (id, name) => [
    {
        title: 'Lịch làm việc'
    },
    {
        href: '/admin/schedules/details' + id,
        title: name
    },
];

const ScheduleDetailsPage = () => {
    const [infoForm, setInfoForm] = useState({
        isOpen: false,
        date: '',
        startTime: '',
        endTime: '',
    });
    const [newSchedule, setNewSchedule] = useState(null);

    const { id } = useParams();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['schedule', id],
        queryFn: () => workScheduleApi.getWorkSchedulesByDoctorID(id),
        enabled: !!id
    });

    // useEffect(() => {
    //     const calendarWrapper = document.querySelector('.sx-react-calendar-wrapper');

    //     if (infoForm.isOpen) {
    //         console.log('in');
    //         if (calendarWrapper) {
    //             calendarWrapper.style.display = 'none';
    //         }
    //     } else {
    //         if (calendarWrapper) {
    //             calendarWrapper.style.display = 'block';
    //         }
    //     }

    //     return () => {
    //         if (calendarWrapper) {
    //             calendarWrapper.style.display = 'block';
    //         }
    //     };
    // }, [infoForm.isOpen]);

    console.log(infoForm);
    const breadcrumbData = getBreadcrumbData(id, data?.data.fullName);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <BreadcrumbCustom data={ breadcrumbData } />
            <CalendarSchedule
                onSetInfoForm={ setInfoForm }
                newSchedule={ newSchedule }
                defaultEvents={ data?.data?.schedules }
            />
            <CreateSchedule
                infoForm={ infoForm }
                setInfoForm={ setInfoForm }
                setNewSchedule={ setNewSchedule }
                schedules={ data?.data }
            />
            {/* <PP infoForm={ infoForm } /> */ }
        </>
    );
};

function PP({ infoForm }) {
    return createPortal(infoForm.isOpen && <div className="absolute bg-slate-400 z-50 bg-opacity-20 top-0 left-0 w-full h-full">
        <h1>Details</h1>
        dialog
    </div>, document.body.querySelector('#root'));
}

export default ScheduleDetailsPage;