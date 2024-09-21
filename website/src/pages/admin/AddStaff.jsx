import Form from "@/components/admin/staff/AddStaff";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const breadcrumbData = [
    {
        title: 'Nhân viên'
    },
    {
        href: '/admin/staffs/list',
        title: 'Thêm nhân viên'
    },
];

export default function AddStaff() {
    return (
        <>
            <BreadcrumbCustom data={ breadcrumbData } />
            <Form />
        </>
    );
}


