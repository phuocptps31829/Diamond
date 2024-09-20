import BarChart from "./chart/BarChart";
import DoughnutChart from "./chart/DoughnutChart";
import { FaHandHoldingMedical } from "react-icons/fa";

export default function MiddleCharts() {
  return (
    <div className="mt-6 grid w-full grid-cols-[70%_27.8%] justify-between">
      <div className="flex-1 rounded-md bg-white px-6 py-4 shadow-sm">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-[18px] font-semibold">
            Bệnh nhân theo giới tính
          </h3>
          <div className="flex gap-4 text-[13px]">
            <div className="flex items-center gap-2 font-semibold">
              <div className="h-4 w-4 rounded-[999px] bg-[#4bc0c0b6]"></div>
              <span>Nam 60%</span>
            </div>
            <div className="flex items-center gap-2 font-semibold">
              <div className="h-4 w-4 rounded-[999px] bg-[#36a3ebc4]"></div>
              <span>Nữ 40%</span>
            </div>
          </div>
          <select className="mt-2 rounded-md border border-gray-300 p-2 px-3 text-sm">
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div className="h-[300px] w-full">
          <BarChart />
        </div>
      </div>
      <div className="h-full flex-1 gap-6 rounded-md bg-white p-4 pt-2 shadow-sm">
        <h3 className="ml-2 mt-3 text-[18px] font-semibold">
          Bệnh nhân theo khoa
        </h3>
        <div className="relative flex h-full items-center justify-center">
          <div className="z-10">
            <DoughnutChart />
          </div>
          <div className="pointer-events-none absolute bottom-7 z-0 flex h-full w-full items-center justify-center">
            <FaHandHoldingMedical size={60} color="#ABAFDB" />
          </div>
        </div>
      </div>
    </div>
  );
}
