import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { newsApi } from "@/services/newsApi";
import {  patientApi } from "@/services/patientsApi";
import { appointmentApi } from "@/services/appointmentsApi";
import { getAllInvoices } from "@/services/invoicesApi";
import TopStats from "../../components/admin/dashboard/TopStats";
import MiddleCharts from "../../components/admin/dashboard/MiddleCharts";
import BottomLists from "../../components/admin/dashboard/BottomLists";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import NotFound from "@/components/client/notFound";
import Loading from "@/components/ui/Loading";

import { takeItAllSpecialties } from "@/services/specialtiesApi";

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
    queryFn: appointmentApi.get5UpcomingAppointments,
  });

  const {
    data: allNews,
    error: errorAllNews,
    isLoadingNews: isLoadingNews,
  } = useQuery({
    queryKey: ["news"],
    queryFn: newsApi.takeItAllNews,
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
    queryFn: patientApi.getAllPatients,
  });

  const {
    data: allAppointments,
    error: errorAppointments,
    isLoading: isLoadingAppointments,
  } = useQuery({
    queryKey: ["appointments"],
    queryFn: appointmentApi.getAllAppointments,
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
    queryFn: appointmentApi.getTotalPatientsBySpecialty,
  });

  const {
    data: patientsByGender,
    error: errorPatientsByGender,
    isLoading: isLoadingPatientsByGender,
  } = useQuery({
    queryKey: ["patientsByGender"],
    queryFn: appointmentApi.getPatientsByGender,
  });

  useEffect(() => {
    if (
      isLoadingNews ||
      isLoadingPatients ||
      isLoadingAppointments ||
      isLoadingInvoices ||
      isLoadingTotalPatientsBySpecialty ||
      isLoadingSpecialties ||
      isLoadingPatientsByGender ||
      isLoadingUpcomingAppointments
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [
    isLoadingNews,
    isLoadingPatients,
    isLoadingAppointments,
    isLoadingInvoices,
    isLoadingTotalPatientsBySpecialty,
    isLoadingSpecialties,
    isLoadingPatientsByGender,
    isLoadingUpcomingAppointments,
  ]);

  if (
    errorAllNews ||
    errorPatients ||
    errorAppointments ||
    errorInvoices ||
    errorTotalPatientsBySpecialty ||
    errorSpecialties ||
    errorPatientsByGender ||
    errorUpcomingAppointments
  ) {
    return <NotFound />;
  }

  return (
    <>
      {isLoadingNews ||
      isLoadingPatients ||
      isLoadingAppointments ||
      isLoadingInvoices ||
      isLoadingTotalPatientsBySpecialty ||
      isLoadingSpecialties ||
      isLoadingPatientsByGender ||
      isLoadingUpcomingAppointments ? (
        <Loading />
      ) : (
        <>
          <BreadcrumbCustom data={breadcrumbData} />
          <TopStats
            allNews={allNews}
            allPatients={allPatients?.data}
            allAppointments={allAppointments?.data}
            allInvoices={allInvoices?.data}
          />
          {console.log("patientsByGender", patientsByGender)}
          <MiddleCharts
            dataTotalPatients={totalPatientsBySpecialty}
            dataAllSpecialties={allSpecialties}
            dataPatientsByGender={patientsByGender}
          />
          <BottomLists dataUpcomingAppointments={upcomingAppointments} />
        </>
      )}
    </>
  );
}
