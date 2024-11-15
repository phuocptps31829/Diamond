import TopStats from "@/components/admin/dashboardAccountant/TopStats";
import BottomLists from "@/components/admin/dashboardAccountant/BottomLists";
import MiddleCharts from "@/components/admin/dashboardAccountant/MiddleCharts";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import NotFound from "@/components/ui/NotFound";
import Loading from "@/components/ui/Loading";
import { useQuery } from "@tanstack/react-query";
import { invoicesApi } from "@/services/invoicesApi";

const breadcrumbData = [
  {
    title: "Thống kê",
  },
  {
    href: "/admin/doctordashboard",
    title: "Bảng điều khiển kế toán",
  },
];

export default function AccountantDashboard() {
  const {
    data: revenueStatistics,
    error: errorRevenueStatistics,
    isLoading: isLoadingRevenueStatistics,
  } = useQuery({
    queryKey: ["revenueStatistics"],
    queryFn: invoicesApi.getRevenueStatistics,
  });

  const {
    data: allInvoices,
    error: errorallInvoices,
    isLoading: isLoadingallInvoices,
  } = useQuery({
    queryKey: ["allInvoices"],
    queryFn: invoicesApi.getAllInvoices,
  });

  if (errorRevenueStatistics || errorallInvoices) {
    const error = errorRevenueStatistics || errorallInvoices;
    return <NotFound message={error.message} />;
  }

  return (
    <>
      {isLoadingRevenueStatistics || isLoadingallInvoices ? (
        <Loading />
      ) : (
        <>
          <BreadcrumbCustom data={breadcrumbData} />
          <TopStats revenueData={revenueStatistics} />
          <MiddleCharts revenueData={revenueStatistics.byYear} />
          <BottomLists allInvoices={allInvoices.data} />
        </>
      )}
    </>
  );
}
