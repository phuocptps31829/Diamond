import DataTableSchedule from "@/components/admin/schedule/table";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import Loading from "@/components/ui/Loading";
import { workScheduleApi } from "@/services/workSchedulesApi";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const breadcrumbData = [
    {
        title: 'Lịch làm việc'
    },
    {
        href: '/admin/schedules/list',
        title: 'Danh sách lịch làm việc'
    },
];

const ScheduleTablePage = () => {
    const userProfile = useSelector((state) => state.auth.userProfile);

    const roleID = userProfile?.role?._id;

    let options = {};
    switch (roleID) {
        case import.meta.env.VITE_ROLE_DOCTOR:
            options = {
                queryKey: ['workSchedules', userProfile?._id],
                queryFn: () => workScheduleApi.getWorkSchedulesByDoctorID(userProfile?._id),
                enabled: !!userProfile
            };
            break;
        case import.meta.env.VITE_ROLE_SUPER_ADMIN:
            options = {
                queryKey: ['workSchedules'],
                queryFn: workScheduleApi.getAllWorkSchedules
            };
            break;
        default:
            options = {};
    }

    const { data, isLoading, isError } = useQuery(options);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <BreadcrumbCustom data={ breadcrumbData } />
            <DataTableSchedule workSchedules={ data?.data } />
        </>
    );
};

export default ScheduleTablePage;