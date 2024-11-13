import { FaCalendarAlt, FaCalendarCheck } from "react-icons/fa";
import { TbCalendarRepeat } from "react-icons/tb";
import AnimatedValue from "@/components/ui/AnimatedNumberCounter";
import LineChart from "./chart/LineChart";
export default function LeftColumnStats() {
  const stats = [
    {
      id: 1,
      icon: FaCalendarAlt,
      bgColor: "#007BBB",
      mainValue: 30,
      title: "Lịch hẹn",
      percentageBg: "#E5FBF9",
      percentageColor: "#00D3C7",
    },
    {
      id: 2,
      icon: FaCalendarCheck,
      bgColor: "#007BBB",
      mainValue: 10,
      title: "Đã hoàn thành",
      percentageBg: "#E5FBF9",
      percentageColor: "#00D3C7",
    },
    {
      id: 3,
      icon: TbCalendarRepeat,
      bgColor: "#007BBB",
      mainValue: 10,
      title: "Đang chờ",
      percentageBg: "#E5FBF9",
      percentageColor: "#00D3C7",
    },
  ];

  return (
    <div className="h-full">
      <div className="relative flex w-full rounded-md bg-white items-center">
        {stats.map((stat, idx) => (
          <>
            <div key={idx} className="flex flex-1 items-center p-5 px-8">
              <div
                className={`flex h-[60px] w-[60px] items-center justify-center rounded-lg p-3`}
                style={{ backgroundColor: stat.bgColor }}
              >
                <stat.icon color="white" size={30} />
              </div>
              <div className="ml-3 flex flex-col">
                <div className="flex items-center text-[26px] text-primary-500">
                  <AnimatedValue value={stat.mainValue} />
                </div>
                <h3 className="font-semibold">{stat.title}</h3>
              </div>
            </div>
            {idx !== stats.length - 1 && (
              <span className="border-2 rounded-lg border-[#25b3ffb1] h-[45px] bg-red-500"></span>
            )}
          </>
        ))}
      </div>
      <div className="mt-6 flex-1 rounded-md bg-white px-6 py-4 shadow-sm">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-[18px] font-semibold">Thu nhập</h3>
          <div className="flex flex-col items-center">
            <div className="text-[17px] font-bold">15.000.000 ₫</div>
            <div className="mt-1 text-[14px] text-[#B8B8B8]">
              <span className="text-[#00D3C7]">5%</span> so với tháng trước
            </div>
          </div>
          <select className="mt-2 rounded-md border border-gray-300 p-2 px-3 text-sm">
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div className="h-[230px] w-full">
          <LineChart />
        </div>
      </div>
    </div>
  );
}
