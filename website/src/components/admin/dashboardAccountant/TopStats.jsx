import { useEffect, useState } from "react";
import AnimatedValue from "@/components/ui/AnimatedNumberCounter";
import { HiMiniArrowUpRight, HiMiniArrowDownRight } from "react-icons/hi2";
import { FaMoneyBillWave } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";
import { Skeleton } from "@/components/ui/Skeleton";

export default function TopStats({ revenueData, loading }) {
  const [data, setData] = useState([
    {
      key: "byDay",
      title: `Doanh thu theo ngày`,
      icon: <FaMoneyBillWave color="#007BBB" size={ 22 } />,
      value: 0,
      percentage: "0",
      percentageTitle: "so với hôm qua",
      isIncrease: true,
    },
    {
      key: "byMonth",
      title: `Doanh thu theo tháng`,
      icon: <GiMoneyStack color="#007BBB" size={ 22 } />,
      value: 0,
      percentage: "0",
      percentageTitle: "so với tháng trước",
      isIncrease: true,
    },
    {
      key: "byQuarter",
      title: `Doanh thu theo quý`,
      icon: <GrMoney color="#007BBB" size={ 22 } />,
      value: 0,
      percentage: "0",
      percentageTitle: "so với quý trước",
      isIncrease: true,
    },
  ]);

  const calculateStats = (present, previous) => {
    const percentage = previous > 0 ? ((present - previous) / (previous || 1) * 100).toFixed(2) : present > 0 ? 100 : 0;
    return {
      value: present,
      percentage: `${Math.abs(Math.round(percentage))} %`,
      isIncrease: present >= previous,
    };
  };

  useEffect(() => {
    if (!loading && revenueData) {
      setData((prevData) =>
        prevData.map((item) => {
          const { presentRevenue, previousRevenue } = revenueData[item.key];
          const { value, percentage, isIncrease } = calculateStats(presentRevenue, previousRevenue);
          return {
            ...item,
            value,
            percentage,
            isIncrease,
          };
        })
      );
    }
  }, [revenueData, loading]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-6">
      {loading
          ? Array(3)
              .fill(0)
              .map((_, index) => (
                <div className="rounded-md bg-white p-4 shadow-sm" key={index}>
                  <div className="flex flex-col">
                    <Skeleton className="h-12 w-12 rounded-md bg-[#CAEDFF]" />
                    <Skeleton className="mt-2 h-5 w-3/4 rounded-md" />
                    <Skeleton className="my-2 h-10 w-2/3 rounded-md" />
                    <div className="flex gap-1">
                      <Skeleton className="h-4 w-16 rounded-md" />
                      <Skeleton className="h-4 w-20 rounded-md" />
                    </div>
                  </div>
                </div>
              ))
          :
        data.map((item, index) => (
          <div className="rounded-md bg-white p-4 shadow-sm" key={ index }>
            <div className="flex flex-col">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#CAEDFF]">
                { item.icon }
              </div>
              <div className="mt-2 font-semibold">{ item.title }</div>
              <div className="my-2 text-[30px] text-primary-500">
                <AnimatedValue value={ item.value } isCurrency />
              </div>
              <div className="flex gap-1 text-[14px]">
                <span
                  className={ `${item.isIncrease ? "text-[#13D6CB]" : "text-red-500"} flex items-center gap-1` }
                >
                  { item.isIncrease ? (
                    <HiMiniArrowUpRight color="#13D6CB" size={ 18 } />
                  ) : (
                    <HiMiniArrowDownRight color="red" size={ 18 } />
                  ) }
                  { item.percentage }
                </span>
                <span className="text-[#808080]">{ item.percentageTitle }</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
