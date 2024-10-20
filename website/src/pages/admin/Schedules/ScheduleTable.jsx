import DataTableSchedule from "@/components/admin/schedule/table";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import Loading from "@/components/ui/Loading";
import { workScheduleApi } from "@/services/workSchedulesApi";
import { useQuery } from "@tanstack/react-query";

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
    const { data, isLoading, isError } = useQuery({
        queryKey: ['workSchedules'],
        queryFn: workScheduleApi.getAllWorkSchedules
    });

    console.log(data);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <BreadcrumbCustom data={ breadcrumbData } />
            <DataTableSchedule workSchedules={ data.data } />
        </>
    );
};

export default ScheduleTablePage;