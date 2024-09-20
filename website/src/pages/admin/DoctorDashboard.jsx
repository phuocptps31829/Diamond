import LeftColumnStats from "../../components/admin/dashboardDoctor/LeftColumnStats";
import RightColumnStats from "../../components/admin/dashboardDoctor/RightColumnStats";
import BottomLists from "../../components/admin/dashboardDoctor/BottomLists";

export default function DoctorDashboard() {
  return (
    <>
      <div className="grid grid-cols-[70%_27.8%] justify-between">
        <LeftColumnStats />
        <RightColumnStats />
      </div>
      <BottomLists />
    </>
  );
}
