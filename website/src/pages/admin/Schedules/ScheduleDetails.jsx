import CalendarSchedule from "@/components/admin/schedule/details";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { workScheduleApi } from "@/services/workSchedulesApi";
import Loading from "@/components/ui/Loading";
import { useSelector } from "react-redux";
import { useEffect } from "react";

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
    const { id } = useParams();
    const userProfile = useSelector((state) => state.auth.userProfile);

    useEffect(() => {
        const element = document.querySelector('.sx__view-container');
        if (userProfile?.role?._id !== import.meta.env.VITE_ROLE_ADMIN) {
            console.log('Disable pointer events', element);
            if (element) {
                element.style.pointerEvents = 'none';
            }
        }

        return () => {
            const cleanupElement = document.querySelector('.sx__view-container');
            if (cleanupElement) {
                cleanupElement.style.pointerEvents = 'auto';
            }
        };
    }, [userProfile]);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['schedule', id],
        queryFn: () => workScheduleApi.getWorkSchedulesByDoctorID(id),
        enabled: !!id
    });

    const breadcrumbData = getBreadcrumbData(id, data?.data?.[0]?.fullName);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <BreadcrumbCustom data={ breadcrumbData } />
            <CalendarSchedule
                doctorID={ id }
                defaultEvents={ data?.data?.[0]?.schedules }
            />
        </>
    );
};

export default ScheduleDetailsPage;