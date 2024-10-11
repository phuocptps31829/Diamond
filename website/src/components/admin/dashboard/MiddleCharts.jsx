import { useState, useEffect } from "react";
import LineChart from "./chart/LineChart";
import DoughnutChart from "./chart/DoughnutChart";
import { FaHandHoldingMedical } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

export default function MiddleCharts({
  dataTotalPatients,
  dataAllSpecialties,
  dataPatientsByAges,
}) {
  const [yearNow, setYearNow] = useState(new Date().getFullYear());
  const [dataTotalPatientsByAges, setDataTotalPatientsByAges] = useState([]);
  const [dataTotalPatientsByYear, setDataTotalPatientsByYear] = useState([]);

  useEffect(() => {
    setDataTotalPatientsByYear(
      dataTotalPatients.filter(
        (item) => Number(item.year) === new Date().getFullYear(),
      ),
    );

    setDataTotalPatientsByAges(
      dataPatientsByAges.map((item) => {
        return {
          age: item.age,
          years: item.years.filter(
            (yearItem) => Number(yearItem.year) === yearNow,
          ),
        };
      }),
    );
  }, [dataTotalPatients, dataPatientsByAges, yearNow]);

  const handleYearChange = (e) => {
    setYearNow(Number(e.target.value));
  };

  return (
    <div className="mt-6 grid w-full grid-cols-[70%_27.8%] justify-between">
      <div className="flex-1 rounded-md bg-white px-6 py-4 shadow-sm">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-[18px] font-semibold">Bệnh nhân theo độ tuổi</h3>
          <Select
            onValueChange={(value) => handleYearChange({ target: { value } })}
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
        <div className="h-[300px] w-full">
          <LineChart dataTotalPatientsByAges={dataTotalPatientsByAges} />
        </div>
      </div>
      <div className="h-full flex-1 gap-6 rounded-md bg-white p-4 pt-2 shadow-sm">
        <h3 className="ml-2 mt-3 text-[18px] font-semibold">
          Bệnh nhân theo khoa
        </h3>
        <div className="relative flex h-full items-center justify-center">
          <div className="z-10">
            <DoughnutChart
              dataTotalPatientsByYear={dataTotalPatientsByYear}
              dataAllSpecialties={dataAllSpecialties}
            />
          </div>
          <div className="pointer-events-none absolute bottom-[10%] z-0 flex h-full w-full items-center justify-center">
            <FaHandHoldingMedical size={60} color="#ABAFDB" />
          </div>
        </div>
      </div>
    </div>
  );
}
