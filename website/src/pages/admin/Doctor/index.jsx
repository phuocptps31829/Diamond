import DoctorsList from '@/components/admin/doctor/DoctorsList';
import BreadcrumbCustom from '@/components/ui/BreadcrumbCustom';

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
    return (
        <div>
            <BreadcrumbCustom data={breadcrumbData} />
            <DoctorsList />
        </div>
    );
};

export default DoctorsListPage;
