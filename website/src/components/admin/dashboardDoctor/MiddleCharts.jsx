import { useState, useEffect } from "react";
import DoughnutChart from "./chart/DoughnutChart";
import { PiGenderIntersexBold } from "react-icons/pi";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import LineChart from "./chart/LineChart";
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";
import { Skeleton } from "@/components/ui/Skeleton";

export default function MiddleCharts({ dataAppointmentsByDoctor, loading }) {
  const [appointmentByAge, setAppointmentByAge] = useState({
    male: 0,
    female: 0,
  });
  const [yearNow, setYearNow] = useState(new Date().getFullYear());
  const [dataTotalAppointmentsByYear, setDataTotalAppointmentsByYear] =
    useState([]);
  const [growthRate, setGrowthRate] = useState(0);

  const handleYearChange = (e) => {
    setYearNow(Number(e.target.value));
  };

  useEffect(() => {
    if (loading || dataAppointmentsByDoctor.length === 0) return;

    const male = dataAppointmentsByDoctor.data.filter(
      (item) => item.patient.gender === "Nam"
    ).length;
    const female = dataAppointmentsByDoctor.data.filter(
      (item) => item.patient.gender === "Nữ"
    ).length;

    setAppointmentByAge({
      male,
      female,
    });
  }, [dataAppointmentsByDoctor, loading]);

  useEffect(() => {
    if (
      loading ||
      !dataAppointmentsByDoctor ||
      dataAppointmentsByDoctor.length === 0
    )
      return;
    const filteredDataByYear = dataAppointmentsByDoctor.data.filter((item) => {
      const itemYear = new Date(item.time).getFullYear();
      return itemYear === yearNow && item.status === "EXAMINED";
    });

    const filteredDataLastYear = dataAppointmentsByDoctor.data.filter(
      (item) => {
        const itemYear = new Date(item.time).getFullYear();
        return itemYear === yearNow - 1 && item.status === "EXAMINED";
      }
    );

    const currentYearCount = filteredDataByYear.length;
    const lastYearCount = filteredDataLastYear.length;

    if (lastYearCount === 0) {
      setGrowthRate(currentYearCount > 0 ? 100 : 0);
    } else {
      const change = ((currentYearCount - lastYearCount) / lastYearCount) * 100;
      setGrowthRate(change);
    }

    setDataTotalAppointmentsByYear(filteredDataByYear);
  }, [yearNow, dataAppointmentsByDoctor, loading]);

  return (
    <div className="grid grid-cols-[70%_27.8%] justify-between">
      {loading ? (
        <>
          {/* Skeleton Loader cho biểu đồ lịch hẹn */}
          <div className="mt-6 flex-1 rounded-md bg-white px-6 py-4 shadow-sm">
            <Skeleton className="mb-4 h-6 w-1/3" />
            <Skeleton className="mb-6 h-4 w-2/3" />
            <Skeleton className="h-[210px] w-full" />
          </div>

          {/* Skeleton Loader cho biểu đồ giới tính */}
          <div className="mt-6 w-full flex-1 gap-6 rounded-md bg-white p-4 shadow-sm">
            <Skeleton className="mb-4 h-6 w-1/2" />
            <Skeleton className="h-[250px] w-full" />
          </div>
        </>
      ) : (
        <>
          <div className="mt-6 flex-1 rounded-md bg-white px-6 py-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-[18px] font-semibold">Lịch hẹn</h3>
              <div className="flex flex-col items-center">
                <div className="text-[17px] font-bold">
                  {dataTotalAppointmentsByYear.length} lịch hẹn trong năm{" "}
                  {yearNow}
                </div>
                <div className="mt-1 flex gap-1 text-[14px] text-[#B8B8B8]">
                  <span
                    className={`${
                      growthRate >= 0 ? "text-[#00E396]" : "text-red-500"
                    } flex items-center gap-1`}
                  >
                    {growthRate >= 0 ? (
                      <FaSortAmountUp />
                    ) : (
                      <FaSortAmountDown />
                    )}{" "}
                    {Math.abs(Math.round(growthRate))} %
                  </span>
                  so với năm trước
                </div>
              </div>
              <Select
                onValueChange={(value) =>
                  handleYearChange({ target: { value } })
                }
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
            <div className="h-[230px] w-full">
              <LineChart
                dataTotalAppointmentsByYear={dataTotalAppointmentsByYear}
              />
            </div>
          </div>
          <div className="mt-6 w-full flex-1 gap-6 rounded-md bg-white p-4 pt-2 shadow-sm">
            <h3 className="ml-2 mt-3 text-[18px] font-semibold">
              Bệnh nhân theo giới tính
            </h3>
            <div className="flex h-full w-full items-center justify-center">
              <div className="relative flex h-[250px] w-full items-center justify-center">
                <div className="z-10 h-full w-full">
                  <DoughnutChart appointmentByAge={appointmentByAge} />
                </div>
                <div className="pointer-events-none absolute bottom-6 z-0 flex h-full w-full items-center justify-center">
                  <PiGenderIntersexBold size={60} color="#ABAFDB" />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
