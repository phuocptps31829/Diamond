import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PatientFormFix from '@/components/admin/patient/PatientsFormFix';
import BreadcrumbCustom from '@/components/ui/BreadcrumbCustom';
import NotFound from '@/components/ui/NotFound';
import { useQuery } from '@tanstack/react-query';
import { patientApi } from '@/services/patientsApi';
import Loading from '@/components/ui/Loading';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

const initialBreadcrumbData = [
    {
        title: 'Người dùng',
    },
    {
        href: '/admin/patients/create',
        title: 'Chỉnh sửa người dùng',
    },
    {
        title: '',
    },
];

const PatientsFormFixPage = () => {
    useAuthRedirect(["SUPER_ADMIN", "ADMIN", "STAFF_RECEPTIONIST"]);

    const { id } = useParams();
    const [breadcrumbData, setBreadcrumbData] = useState(initialBreadcrumbData);

    const {
        data: patientDetail,
        isLoading: isLoadingPatient,
        error: errorPatient,
    } = useQuery({
        queryKey: ['patient', id],
        queryFn: () => patientApi.getPatientsById(id),
    });

    useEffect(() => {
        if (!isLoadingPatient && patientDetail) {
            setBreadcrumbData((prevBreadcrumbData) => {
                const updatedData = [...prevBreadcrumbData];
                updatedData[2].title = patientDetail.fullName || 'NaN';
                return updatedData;
            });
        }
    }, [isLoadingPatient, patientDetail]);

    if (errorPatient) return <NotFound message={ errorPatient.message } />;

    return (
        <>
            { isLoadingPatient ? (
                <Loading ScaleMini={ true } />
            ) : (
                <>
                    <BreadcrumbCustom data={ breadcrumbData } />
                    <PatientFormFix patientDetail={ patientDetail } />
                </>
            ) }
        </>
    );
};

export default PatientsFormFixPage;
