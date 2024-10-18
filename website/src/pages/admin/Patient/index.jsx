import PatientsList from '@/components/admin/patient/PatientsList';
import BreadcrumbCustom from '@/components/ui/BreadcrumbCustom';
import { useQuery } from '@tanstack/react-query';
import { patientApi } from '@/services/patientsApi';
import Loading from '@/components/ui/Loading';

const breadcrumbData = [
    {
        title: 'Bệnh nhân',
    },
    {
        href: '/admin/patients/list',
        title: 'Danh sách bệnh nhân',
    },
];

const PatientsListPage = () => {
    const { data: allPatients, isLoading: isLoadingPatients } = useQuery({
        queryKey: ['patients'],
        queryFn: patientApi.getAllPatients,
    });

    return (
        <>
            {isLoadingPatients ? (
                <Loading />
            ) : (
                <>
                    <BreadcrumbCustom data={breadcrumbData} />
                    <PatientsList allPatients={allPatients?.data} />
                </>
            )}
        </>
    );
};

export default PatientsListPage;
