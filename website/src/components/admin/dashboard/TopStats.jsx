import { FaCalendarAlt, FaHospitalUser, FaMoneyCheckAlt } from "react-icons/fa";
import { HiMiniArrowUpRight, HiMiniArrowDownRight } from "react-icons/hi2";
import { PiUsersThreeBold } from "react-icons/pi";
import AnimatedValue from "@/components/ui/AnimatedNumberCounter";

const statsData = [
  {
    id: 1,
    icon: <FaCalendarAlt color="#007BBB" size={22} />,
    title: "Cuộc hẹn",
    value: 250,
    percentage: "40%",
    arrowIcon: <HiMiniArrowUpRight color="#13D6CB" size={18} />,
    trendColor: "text-[#13D6CB]",
  },
  {
    id: 2,
    icon: <PiUsersThreeBold color="#007BBB" size={22} />,
    title: "Bệnh nhân mới",
    value: 140,
    percentage: "15%",
    arrowIcon: <HiMiniArrowDownRight color="red" size={18} />,
    trendColor: "text-red-500",
  },
  {
    id: 3,
    icon: <FaHospitalUser color="#007BBB" size={22} />,
    title: "Bệnh nhân cũ",
    value: 20,
    percentage: "25%",
    arrowIcon: <HiMiniArrowUpRight color="#13D6CB" size={18} />,
    trendColor: "text-[#13D6CB]",
  },
  {
    id: 4,
    icon: <FaMoneyCheckAlt color="#007BBB" size={22} />,
    title: "Thu nhập",
    value: 1500000,
    percentage: "10%",
    arrowIcon: <HiMiniArrowUpRight color="#13D6CB" size={18} />,
    trendColor: "text-[#13D6CB]",
  },
];

export default function TopStats() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-4 gap-6">
        {statsData.map((stat) => (
          <div key={stat.id} className="rounded-md bg-white p-4 shadow-sm">
            <div className="flex flex-col">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#CAEDFF]">
                {stat.icon}
              </div>
              <div className="mt-2 font-semibold">{stat.title}</div>
              <div className="my-2 text-[30px] text-primary-500">
                <AnimatedValue value={stat.value} isCurrency={stat.id === 4} />
              </div>
              <div className="flex gap-1 text-[14px]">
                <span className={`flex items-center gap-1 ${stat.trendColor}`}>
                  {stat.arrowIcon}
                  {stat.percentage}
                </span>
                <span className="text-[#808080]">với tháng trước</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
