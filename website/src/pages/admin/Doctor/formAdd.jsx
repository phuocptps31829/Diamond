import DoctorsFormAdd from '@/components/admin/doctor/DoctorsFormAdd';
import BreadcrumbCustom from '@/components/ui/BreadcrumbCustom';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

const breadcrumbData = [
    {
        title: 'Bác sĩ',
    },
    {
        href: '/admin/doctors/create',
        title: 'Thêm bác sĩ',
    },
];

const DoctorsFormAddPage = () => {
    useAuthRedirect(["SUPER_ADMIN", "ADMIN"], "/admin/dashboard");

    return (
        <div>
            <BreadcrumbCustom data={ breadcrumbData } />
            <DoctorsFormAdd />
        </div>
    );
};

export default DoctorsFormAddPage;
