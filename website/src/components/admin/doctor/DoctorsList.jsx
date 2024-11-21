import DataTable from './table';
import { columnsSchedule } from './table/columns';
import { useQuery } from '@tanstack/react-query';
import { doctorApi } from '@/services/doctorsApi';
import Loading from '@/components/ui/Loading';

const DoctorsList = () => {
    const {
        data: doctorsData,
        isLoading: loadingDoctors,
        isError: errorLoadingDoctors,
    } = useQuery({
        queryKey: ['doctors'],
        queryFn: () => doctorApi.getAllDoctors({
            noPaginated: true,
        }),
    });
    if (loadingDoctors) return <Loading />;

    if (errorLoadingDoctors) return <div>Error loading data</div>;

    return <DataTable columns={ columnsSchedule } data={ doctorsData || [] } />;
};

export default DoctorsList;
