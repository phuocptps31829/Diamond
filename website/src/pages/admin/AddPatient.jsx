import Form from "@/components/admin/patient/AddPatient";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const breadcrumbData = [
    {
        title: 'Bệnh nhân'
    },
    {
        href: '/admin/patients/list',
        title: 'Thêm bệnh nhân'
    },
];

export default function AddPatient() {
    return (
        <>
            <BreadcrumbCustom data={ breadcrumbData } />
            <Form />
        </>
    );
}


