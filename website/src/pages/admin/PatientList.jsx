import List from "@/components/admin/patient/List";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const breadcrumbData = [
    {
        title: 'Bệnh nhân'
    },
    {
        href: '/admin/patients/list',
        title: 'Danh sách bệnh nhân'
    },
];

export default function PatientList() {
    return (
        <>
            <BreadcrumbCustom data={ breadcrumbData } />
            <List />
        </>
    );
}


