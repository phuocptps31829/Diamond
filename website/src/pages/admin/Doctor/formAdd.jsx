import DoctorsFormAdd from '@/components/admin/doctor/DoctorsFormAdd';
import BreadcrumbCustom from '@/components/ui/BreadcrumbCustom';

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
    return (
        <div>
            <BreadcrumbCustom data={breadcrumbData} />
            <DoctorsFormAdd />
        </div>
    );
};

export default DoctorsFormAddPage;
