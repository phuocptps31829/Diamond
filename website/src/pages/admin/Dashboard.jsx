import TopStats from "../../components/admin/dashboard/TopStats";
import MiddleCharts from "../../components/admin/dashboard/MiddleCharts";
import BottomLists from "../../components/admin/dashboard/BottomLists";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const breadcrumbData = [
  {
    title: 'Thống kê'
  },
  {
    href: '/admin/schedules/details',
    title: 'Thống kê quản trị'
  },
];

export default function Dashboard() {
  return (
    <>
      <BreadcrumbCustom data={ breadcrumbData } />
      <TopStats />
      <MiddleCharts />
      <BottomLists />
    </>
  );
}
