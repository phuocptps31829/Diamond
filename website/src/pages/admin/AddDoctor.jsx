import Form from "@/components/admin/doctor/AddDoctor";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const breadcrumbData = [
    {
        title: 'Bác sĩ'
    },
    {
        href: '/admin/doctors/create',
        title: 'Thêm bác sĩ'
    },
];

export default function AddDoctor() {
    return (
        <>
            <BreadcrumbCustom data={ breadcrumbData } />
            <Form />
        </>
    );
}


