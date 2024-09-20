import TopStats from "../../components/admin/dashboard/TopStats";
import MiddleCharts from "../../components/admin/dashboard/MiddleCharts";
import BottomLists from "../../components/admin/dashboard/BottomLists";

export default function Dashboard() {
  return (
    <>
      <TopStats />
      <MiddleCharts />
      <BottomLists />
    </>
  );
}
