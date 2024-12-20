import { useQuery } from '@tanstack/react-query';
import { patientApi } from '@/services/patientsApi';
import { invoicesApi } from '@/services/invoicesApi';
import TopStats from '../../components/admin/dashboard/TopStats';
import MiddleCharts from '../../components/admin/dashboard/MiddleCharts';
import BottomLists from '../../components/admin/dashboard/BottomLists';
import BreadcrumbCustom from '@/components/ui/BreadcrumbCustom';
import NotFound from '@/components/ui/NotFound';
import { appointmentApi } from '@/services/appointmentsApi';
import { newsApi } from '@/services/newsApi';
import { specialtyApi } from '@/services/specialtiesApi';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

const breadcrumbData = [
    {
        title: 'Thống kê',
    },
    {
        href: '/admin/dashboard',
        title: 'Bảng điều khiển quản trị',
    },
];

export default function Dashboard() {
    useAuthRedirect(["ADMIN", "SUPER_ADMIN"]);

    const {
        data: upcomingAppointments,
        error: errorUpcomingAppointments,
        isLoading: isLoadingUpcomingAppointments,
    } = useQuery({
        queryKey: ['upcomingAppointments'],
        queryFn: appointmentApi.get5UpcomingAppointments,
    });

    const {
        data: appointmentsByAges,
        error: errorAppointmentsByAges,
        isLoading: isLoadingAppointmentsByAges,
    } = useQuery({
        queryKey: ['appointmentsByAges'],
        queryFn: appointmentApi.getAppointmentByAges,
    });

    const {
        data: allNews,
        error: errorAllNews,
        isLoading: isLoadingNews,
    } = useQuery({
        queryKey: ['news', "noPaginated"],
        queryFn: newsApi.takeItAllNews,
    });

    const {
        data: allSpecialties,
        error: errorSpecialties,
        isLoading: isLoadingSpecialties,
    } = useQuery({
        queryKey: ['specialties'],
        queryFn: specialtyApi.getAllSpecialties,
    });

    const {
        data: allPatients,
        error: errorPatients,
        isLoading: isLoadingPatients,
    } = useQuery({
        queryKey: ['patients'],
        queryFn: patientApi.getAllPatients,
    });

    const {
        data: allAppointments,
        error: errorAppointments,
        isLoading: isLoadingAppointments,
    } = useQuery({
        queryKey: ['appointments'],
        queryFn: appointmentApi.getAllAppointments,
    });

    const {
        data: allInvoices,
        error: errorInvoices,
        isLoading: isLoadingInvoices,
    } = useQuery({
        queryKey: ['invoices'],
        queryFn: invoicesApi.getAllInvoices,
    });

    const {
        data: totalPatientsBySpecialty,
        error: errorTotalPatientsBySpecialty,
        isLoading: isLoadingTotalPatientsBySpecialty,
    } = useQuery({
        queryKey: ['totalAppointmentsBySpecialty'],
        queryFn: appointmentApi.getTotalPatientsBySpecialty,
    });

    if (
        errorAllNews ||
        errorPatients ||
        errorAppointments ||
        errorInvoices ||
        errorTotalPatientsBySpecialty ||
        errorSpecialties ||
        errorUpcomingAppointments ||
        errorAppointmentsByAges
    ) {
        const error = errorAllNews || errorPatients || errorAppointments || errorInvoices || errorTotalPatientsBySpecialty || errorSpecialties || errorUpcomingAppointments || errorAppointmentsByAges;
        return <NotFound message={ error.message } />;
    }

    return (
        <>
            <BreadcrumbCustom data={ breadcrumbData } />
            <TopStats
                allData={ { allNews, allPatients: allPatients, allAppointments: allAppointments, allInvoices: allInvoices } }
                loading={ { isLoadingNews, isLoadingPatients, isLoadingAppointments, isLoadingInvoices } }
            />
            <MiddleCharts
                allData={ { dataTotalPatients: totalPatientsBySpecialty, dataAllSpecialties: allSpecialties?.data, dataPatientsByAges: appointmentsByAges } }
                loading={ { isLoadingTotalPatientsBySpecialty, isLoadingSpecialties, isLoadingAppointmentsByAges } }
            />
            <BottomLists dataUpcomingAppointments={ upcomingAppointments } loading={ isLoadingUpcomingAppointments } />
        </>
    );
}
