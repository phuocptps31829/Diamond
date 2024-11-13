import AnimatedValue from "@/components/ui/AnimatedNumberCounter";
import { HiMiniArrowUpRight, HiMiniArrowDownRight } from "react-icons/hi2";
import { FaMoneyBillWave } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";

const data = [
  {
    id: 1,
    title: `Doanh thu theo ngày`,
    icon: <FaMoneyBillWave color="#007BBB" size={22} />,
    value: 5983344,
    percentage: "40%",
    percentageTitle: "với hôm qua",
    isIncrease: true,
  },
  {
    id: 2,
    title: `Doanh thu theo tháng`,
    icon: <GiMoneyStack color="#007BBB" size={22} />,
    value: 5983344,
    percentage: "36%",
    percentageTitle: "với tháng trước",
    isIncrease: true,
  },
  {
    id: 3,
    title: `Doanh thu theo quý`,
    icon: <GrMoney color="#007BBB" size={22} />,
    value: 5983344,
    percentage: "10%",
    percentageTitle: "với quý trước",
    isIncrease: false,
  },
];

export default function TopStats() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-6">
        {data.map((item, index) => (
          <div className="rounded-md bg-white p-4 shadow-sm" key={index}>
            <div className="flex flex-col">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#CAEDFF]">
                {item.icon}
              </div>
              <div className="mt-2 font-semibold">{item.title}</div>
              <div className="my-2 text-[30px] text-primary-500">
                <AnimatedValue value={item.value} isCurrency />
              </div>
              <div className="flex gap-1 text-[14px]">
                <span
                  className={`${item.isIncrease ? "text-[#13D6CB]" : "text-red-500"} flex items-center gap-1`}
                >
                  {item.isIncrease ? (
                    <HiMiniArrowUpRight color="#13D6CB" size={18} />
                  ) : (
                    <HiMiniArrowDownRight color="red" size={18} />
                  )}
                  {item.percentage}
                </span>
                <span className="text-[#808080]">{item.percentageTitle}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
