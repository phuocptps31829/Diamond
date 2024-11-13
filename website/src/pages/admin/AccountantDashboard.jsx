import TopStats from "@/components/admin/dashboardAccountant/TopStats";
import BottomLists from "@/components/admin/dashboardAccountant/BottomLists";
import MiddleCharts from "@/components/admin/dashboardAccountant/MiddleCharts";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

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
  return (
    <>
      <BreadcrumbCustom data={breadcrumbData} />
      <TopStats />
      <MiddleCharts />
      <BottomLists />
    </>
  );
}
