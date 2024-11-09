import DataTableSchedule from "@/components/admin/schedule/table";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

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


    return (
        <>
            <BreadcrumbCustom data={ breadcrumbData } />
            <DataTableSchedule />
        </>
    );
};

export default ScheduleTablePage;