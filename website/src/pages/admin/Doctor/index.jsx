import DoctorsList from '@/components/admin/doctor/DoctorsList';
import BreadcrumbCustom from '@/components/ui/BreadcrumbCustom';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

const breadcrumbData = [
    {
        title: 'Bác sĩ',
    },
    {
        href: '/admin/doctors/list',
        title: 'Danh sách bác sĩ',
    },
];

const DoctorsListPage = () => {
    useAuthRedirect(["SUPER_ADMIN", "ADMIN"], "/admin/dashboard");

    return (
        <div>
            <BreadcrumbCustom data={ breadcrumbData } />
            <DoctorsList />
        </div>
    );
};

export default DoctorsListPage;
