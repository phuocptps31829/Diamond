import LeftColumnStats from "../../components/admin/dashboardDoctor/LeftColumnStats";
import RightColumnStats from "../../components/admin/dashboardDoctor/RightColumnStats";
import BottomLists from "../../components/admin/dashboardDoctor/BottomLists";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const breadcrumbData = [
  {
    title: 'Thống kê'
  },
  {
    href: '/admin/doctor-dashboard',
    title: 'Bảng điều khiển bác sĩ'
  },
];

export default function DoctorDashboard() {
  return (
    <>
      <BreadcrumbCustom data={ breadcrumbData } />
      <div className="grid grid-cols-[70%_27.8%] justify-between">
        <LeftColumnStats />
        <RightColumnStats />
      </div>
      <BottomLists />
    </>
  );
}
