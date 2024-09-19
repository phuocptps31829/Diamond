import DataTableSchedule from "@/components/admin/schedule/table";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const ScheduleTablePage = () => {
    const breadcrumbData = [
        {
            href: '/admin/schedules/list',
            title: 'Danh sách lịch làm việc'
        },
    ];

    return (
        <>
            <BreadcrumbCustom data={ breadcrumbData } />
            <DataTableSchedule />
        </>
    );
};

export default ScheduleTablePage;