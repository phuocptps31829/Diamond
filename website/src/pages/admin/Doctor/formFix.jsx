import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import DoctorsFormFix from '@/components/admin/doctor/DoctorsFormFix';
import BreadcrumbCustom from '@/components/ui/BreadcrumbCustom';
import { doctorApi } from '@/services/doctorsApi';
import NotFound from '@/components/ui/NotFound';
import Loading from '@/components/ui/Loading';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

const initialBreadcrumbData = [
    {
        title: 'Bác sĩ',
    },
    {
        href: '/admin/doctor/edit',
        title: 'Chỉnh sửa bác sĩ',
    },
    {
        title: '',
    },
];

const DoctorsFormFixPage = () => {
    useAuthRedirect(["SUPER_ADMIN", "ADMIN"]);

    const { id } = useParams();
    const [breadcrumbData, setBreadcrumbData] = useState(initialBreadcrumbData);
    const {
        data: doctorDetail,
        isLoading: isLoadingDoctor,
        error: errorDoctor,
    } = useQuery({
        queryKey: ['doctor', id],
        queryFn: () => doctorApi.getDoctorById(id),
    });

    useEffect(() => {
        if (!isLoadingDoctor && doctorDetail) {
            setBreadcrumbData((prevBreadcrumbData) => {
                const updatedData = [...prevBreadcrumbData];
                updatedData[2].title = doctorDetail.fullName || 'NaN';
                return updatedData;
            });
        }
    }, [isLoadingDoctor, doctorDetail]);

    if (errorDoctor) return <NotFound message={ errorDoctor.message } />;

    return (
        <>
            { isLoadingDoctor ? (
                <Loading ScaleMini={ true } />
            ) : (
                <>
                    <BreadcrumbCustom data={ breadcrumbData } />
                    <DoctorsFormFix dataDoctor={ doctorDetail } />
                </>
            ) }
        </>
    );
};

export default DoctorsFormFixPage;
