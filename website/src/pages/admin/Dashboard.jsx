import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { takeItAllNews } from "@/services/newsApi";
import { getAllPatients } from "@/services/patientsApi";
import { getAllAppointments } from "@/services/appointmentsApi";
import { getAllInvoices } from "@/services/invoicesApi";
import TopStats from "../../components/admin/dashboard/TopStats";
import MiddleCharts from "../../components/admin/dashboard/MiddleCharts";
import BottomLists from "../../components/admin/dashboard/BottomLists";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import NotFound from "@/components/client/notFound";
import Loading from "@/components/ui/Loading";

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
    data: allNews,
    error,
    isLoadingNews: isLoadingNews,
  } = useQuery({
    queryKey: ["news"],
    queryFn: takeItAllNews,
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

  useEffect(() => {
    if (
      isLoadingNews ||
      isLoadingPatients ||
      isLoadingAppointments ||
      isLoadingInvoices
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
  ]);

  if (error || errorPatients || errorAppointments || errorInvoices) {
    return <NotFound />;
  }

  return (
    <>
      {isLoadingNews ||
      isLoadingPatients ||
      isLoadingAppointments ||
      isLoadingInvoices ? (
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
          <MiddleCharts />
          <BottomLists />
        </>
      )}
    </>
  );
}
