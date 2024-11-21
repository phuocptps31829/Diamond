import AnimatedValue from "@/components/ui/AnimatedNumberCounter";
import DoughnutChart from "./chart/DoughnutChart";
import { PiGenderIntersexBold } from "react-icons/pi";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

export default function RightColumnStats() {
  return (
    <div className="flex h-full flex-col">
      <div className="w-full flex-1 gap-6 rounded-md bg-white p-4 pt-2 shadow-sm">
        <h3 className="ml-2 mt-3 text-[18px] font-semibold">
          Bệnh nhân theo giới tính
        </h3>
        <div className="flex h-full w-full items-center justify-center">
          <div className="relative h-[250px] w-full flex items-center justify-center">
            <div className="z-10 w-full h-full">
              <DoughnutChart />
            </div>
            <div className="pointer-events-none absolute bottom-6 z-0 flex h-full w-full items-center justify-center">
              <PiGenderIntersexBold size={60} color="#ABAFDB" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex w-full gap-6">
        <div className="h-24 flex-1 rounded-md bg-white p-3">
          <h4 className="text-[15px] text-primary-500">Bệnh nhân mới</h4>
          <div className="flex items-center">
            <span className="text-[42px] font-bold">
              <AnimatedValue value={56} />
            </span>
            <div className="flex h-full flex-1 justify-center">
              <span className="flex h-fit items-center rounded-[99px] bg-[#E5FBF9] p-1 px-2 text-[10px] text-[#00D3C7]">
                <FaCaretUp size={16} /> 60%
              </span>
            </div>
          </div>
        </div>
        <div className="h-24 flex-1 rounded-md bg-white p-3">
          <h4 className="text-[15px] text-primary-500">Bệnh nhân cũ</h4>
          <div className="flex items-center">
            <span className="text-[42px] font-bold">
              <AnimatedValue value={10} />
            </span>
            <div className="flex h-full flex-1 justify-center">
              <span className="flex h-fit items-center rounded-[99px] bg-[#FFE5F6] p-1 px-2 text-[10px] text-[#FF0000]">
                <FaCaretDown size={16} /> 35%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
