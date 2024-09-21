import Form from "@/components/admin/clinic/AddClinic";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const breadcrumbData = [
    {
        title: 'Phòng khám'
    },
    {
        href: '/admin/clinics/list',
        title: 'Thêm phòng khám'
    },
];

export default function AddClinic() {
    return (
        <>
            <BreadcrumbCustom data={ breadcrumbData } />
            <Form />
        </>
    );
}


