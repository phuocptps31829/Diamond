import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { takeItAllNews } from "@/services/newsApi";
import { getAllPatients } from "@/services/patientsApi";
import {
  getAllAppointments,
  get5UpcomingAppointments,
} from "@/services/appointmentsApi";
import { getAllInvoices } from "@/services/invoicesApi";
import TopStats from "../../components/admin/dashboard/TopStats";
import MiddleCharts from "../../components/admin/dashboard/MiddleCharts";
import BottomLists from "../../components/admin/dashboard/BottomLists";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import NotFound from "@/components/client/notFound";
import Loading from "@/components/ui/Loading";
import { getTotalPatientsBySpecialty } from "@/services/appointmentsApi";
import { takeItAllSpecialties } from "@/services/specialtiesApi";
import { appointmentApi } from "@/services/appointmentsApi";

const breadcrumbData = [
  {
    title: "Thống kê",
  },
  {
    href: "/admin/dashboard",
    title: "Thống kê quản trị",
  },
];

export default function Dashboard() {
  const {
    data: upcomingAppointments,
    error: errorUpcomingAppointments,
    isLoadingNews: isLoadingUpcomingAppointments,
  } = useQuery({
    queryKey: ["upcomingAppointments"],
    queryFn: get5UpcomingAppointments,
  });

  const {
    data: appointmentsByAges,
    error: errorAppointmentsByAges,
    isLoading: isLoadingAppointmentsByAges,
  } = useQuery({
    queryKey: ["appointmentsByAges"],
    queryFn: appointmentApi.getAppointmentByAges,
  });

  const {
    data: allNews,
    error: errorAllNews,
    isLoadingNews: isLoadingNews,
  } = useQuery({
    queryKey: ["news"],
    queryFn: takeItAllNews,
  });

  const {
    data: allSpecialties,
    error: errorSpecialties,
    isLoading: isLoadingSpecialties,
  } = useQuery({
    queryKey: ["specialties"],
    queryFn: takeItAllSpecialties,
  });

  const {
    data: allPatients,
    error: errorPatients,
    isLoading: isLoadingPatients,
  } = useQuery({
    queryKey: ["patients"],
    queryFn: getAllPatients,
  });

  const {
    data: allAppointments,
    error: errorAppointments,
    isLoading: isLoadingAppointments,
  } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAllAppointments,
  });

  const {
    data: allInvoices,
    error: errorInvoices,
    isLoading: isLoadingInvoices,
  } = useQuery({
    queryKey: ["invoices"],
    queryFn: getAllInvoices,
  });

  const {
    data: totalPatientsBySpecialty,
    error: errorTotalPatientsBySpecialty,
    isLoading: isLoadingTotalPatientsBySpecialty,
  } = useQuery({
    queryKey: ["totalAppointmentsBySpecialty"],
    queryFn: getTotalPatientsBySpecialty,
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
    return <NotFound />;
  }

  return (
    <>
      { isLoadingNews ||
        isLoadingPatients ||
        isLoadingAppointments ||
        isLoadingInvoices ||
        isLoadingTotalPatientsBySpecialty ||
        isLoadingSpecialties ||
        isLoadingUpcomingAppointments ||
        isLoadingAppointmentsByAges ? (
        <Loading />
      ) : (
        <>
          <BreadcrumbCustom data={ breadcrumbData } />
          <TopStats
            allNews={ allNews }
            allPatients={ allPatients?.data }
            allAppointments={ allAppointments?.data }
            allInvoices={ allInvoices?.data }
          />
          <MiddleCharts
            dataTotalPatients={ totalPatientsBySpecialty }
            dataAllSpecialties={ allSpecialties }
            dataPatientsByAges={ appointmentsByAges }
          />
          <BottomLists dataUpcomingAppointments={ upcomingAppointments } />
        </>
      ) }
    </>
  );
}
