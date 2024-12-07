import { useEffect, useState } from "react";
import LineChart from "./chart/LineChart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Skeleton } from "@/components/ui/Skeleton";
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";

export default function MiddleCharts({ revenueData, loading }) {
  const [yearNow, setYearNow] = useState(new Date().getFullYear());
  const [percentageChange, setPercentageChange] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const handleYearChange = (value) => {
    setYearNow(Number(value));
  };

  useEffect(() => {
    if (loading || !revenueData) return;

    const currentYearRevenue = revenueData.byYear[yearNow] || {};
    const previousYearRevenue = revenueData.byYear[yearNow - 1] || {};

    const totalCurrentYear = Object.values(currentYearRevenue).reduce((acc, val) => acc + val, 0);
    const totalPreviousYear = Object.values(previousYearRevenue).reduce((acc, val) => acc + val, 0);

    setTotalRevenue(totalCurrentYear);
    if (totalPreviousYear === 0) {
      setPercentageChange(totalCurrentYear > 0 ? 100 : 0);
    }else {
      const change = ((totalCurrentYear - totalPreviousYear) / totalPreviousYear) * 100;
      setPercentageChange(change);
    }
  }, [revenueData, yearNow, loading]);

  return (
    <div className="mt-6 grid w-full grid-cols-1 justify-between">
      <div className="flex-1 rounded-md bg-white px-6 py-4 shadow-sm">
      {loading ? (
          <>
            <div className="mb-2 flex items-center justify-between">
              <Skeleton className="h-6 w-1/5 rounded-md" />
              <div className="flex flex-col items-center">
                <Skeleton className="h-6 w-24 rounded-md" />
                <Skeleton className="mt-1 h-4 w-32 rounded-md" />
              </div>
              <Skeleton className="h-6 w-[140px] rounded-md" />
            </div>
            <Skeleton className="h-[260px] mt-4 w-full rounded-md" />
          </>
        ) : (
          <>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-[18px] font-semibold">Thu nhập theo năm</h3>
              <div className="flex flex-col items-center">
                <div className="text-[17px] font-bold">
                  {totalRevenue.toLocaleString()} ₫
                </div>
                <div className="mt-1 text-[14px] text-[#B8B8B8] flex items-center gap-1">
                  {percentageChange !== null && (
                    <>
                      <span className={`${percentageChange >= 0 ? "text-[#00D3C7]" : "text-[#FF4D4D]"} flex items-center gap-1`}>
                      {percentageChange >= 0 ? (
                        <FaSortAmountUp />
                      ) : (
                        <FaSortAmountDown />
                      )}{" "}
                        {Math.abs(Math.round(percentageChange))} %
                      </span>{" "}
                      so với năm trước
                    </>
                  )}
                </div>
              </div>
              <Select
                onValueChange={handleYearChange}
                defaultValue={new Date().getFullYear()}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Chọn năm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={new Date().getFullYear()}>
                      {new Date().getFullYear()}
                    </SelectItem>
                    <SelectItem value={new Date().getFullYear() - 1}>
                      {new Date().getFullYear() - 1}
                    </SelectItem>
                    <SelectItem value={new Date().getFullYear() - 2}>
                      {new Date().getFullYear() - 2}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="h-[260px] w-full">
              <LineChart revenueData={revenueData.byYear[yearNow]} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
