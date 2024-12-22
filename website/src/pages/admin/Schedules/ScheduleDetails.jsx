import CalendarSchedule from "@/components/admin/schedule/details";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { workScheduleApi } from "@/services/workSchedulesApi";
import Loading from "@/components/ui/Loading";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

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
    useAuthRedirect(["SUPER_ADMIN", "ADMIN", "STAFF_RECEPTIONIST", "DOCTOR"]);

    const { id } = useParams();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['schedule', id],
        queryFn: () => workScheduleApi.getWorkSchedulesByDoctorID(id),
        enabled: !!id
    });

    const breadcrumbData = getBreadcrumbData(id, data?.data?.[0]?.fullName);

    if (isLoading) {
        return <Loading ScaleMini={ true } />;
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