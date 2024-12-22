import PatientFormAdd from '@/components/admin/patient/PatientsFormAdd';
import BreadcrumbCustom from '@/components/ui/BreadcrumbCustom';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

const breadcrumbData = [
    {
        title: 'Người dùng',
    },
    {
        href: '/admin/patients/create',
        title: 'Thêm bệnh nhân',
    },
];

const PatientsFormAddPage = () => {
    useAuthRedirect(["SUPER_ADMIN", "ADMIN", "STAFF_RECEPTIONIST"]);

    return (
        <div>
            <BreadcrumbCustom data={ breadcrumbData } />
            <PatientFormAdd />
        </div>
    );
};

export default PatientsFormAddPage;
