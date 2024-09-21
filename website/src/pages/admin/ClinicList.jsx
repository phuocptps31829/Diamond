import List from "@/components/admin/clinic/List";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const breadcrumbData = [
    {
        title: 'Phòng khám'
    },
    {
        href: '/admin/clinics/list',
        title: 'Danh sách phòng khám'
    },
];

export default function ClinicList() {
    return (
        <>
            <BreadcrumbCustom data={ breadcrumbData } />
            <List />
        </>

    );
}


