import List from "@/components/admin/staff/List";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const breadcrumbData = [
    {
        title: 'Nhân viên'
    },
    {
        href: '/admin/staffs/list',
        title: 'Danh sách nhân viên'
    },
];

export default function StaffList() {
    return (
        <>
            <BreadcrumbCustom data={ breadcrumbData } />
            <List />
        </>
    );
}


