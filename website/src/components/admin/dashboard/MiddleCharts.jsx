import { useState, useEffect } from "react";
import BarChart from "./chart/BarChart";
import DoughnutChart from "./chart/DoughnutChart";
import { FaHandHoldingMedical } from "react-icons/fa";
import AnimatedValue from "@/components/ui/AnimatedNumberCounter";

export default function MiddleCharts({
  dataTotalPatients,
  dataAllSpecialties,
  dataPatientsByGender,
}) {
  const [yearNow, setYearNow] = useState(new Date().getFullYear());
  const [dataPatientsByGenderAndByYear, setDataPatientsByGenderAndByYear] =
    useState([]);
  const [dataTotalPatientsByYear, setDataTotalPatientsByYear] = useState([]);
  const [malePercentage, setMalePercentage] = useState(0);
  const [femalePercentage, setFemalePercentage] = useState(0);

  useEffect(() => {
    const filteredPatients = dataPatientsByGender.filter(
      (item) => item._id.year === yearNow,
    );

    setDataTotalPatientsByYear(
      dataTotalPatients.filter(
        (item) => item._id.year === new Date().getFullYear(),
      ),
    );
    setDataPatientsByGenderAndByYear(filteredPatients);

    // Tính tổng số bệnh nhân nam và nữ
    let totalMale = 0;
    let totalFemale = 0;

    filteredPatients.forEach((yearData) => {
      yearData.details.forEach((monthData) => {
        monthData.details.forEach((patientData) => {
          const gender = patientData.user[0].gender;
          if (gender === "Nam") {
            totalMale += 1;
          } else if (gender === "Nữ") {
            totalFemale += 1;
          }
        });
      });
    });

    // Tính phần trăm
    const totalPatients = totalMale + totalFemale;
    setMalePercentage(
      totalPatients > 0 ? (totalMale / totalPatients) * 100 : 0,
    );
    setFemalePercentage(
      totalPatients > 0 ? (totalFemale / totalPatients) * 100 : 0,
    );
  }, [dataTotalPatients, dataPatientsByGender, yearNow]);

  const handleYearChange = (e) => {
    setYearNow(Number(e.target.value));
  };

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
              <span className="flex">
                <span className="mr-1"> Nam</span>{" "}
                <AnimatedValue value={Math.round(malePercentage)} />
                <span className="mr-1"> %</span>
              </span>
            </div>
            <div className="flex items-center gap-2 font-semibold">
              <div className="h-4 w-4 rounded-[999px] bg-[#36a3ebc4]"></div>
              <span className="flex">
                <span className="mr-1"> Nữ</span>{" "}
                <AnimatedValue value={Math.round(femalePercentage)} />
                <span className="mr-1"> %</span>
              </span>
            </div>
          </div>
          <select
            className="mt-2 rounded-md border border-gray-300 p-2 px-3 text-sm"
            onChange={handleYearChange}
          >
            <option value={new Date().getFullYear()}>
              {new Date().getFullYear()}
            </option>
            <option value={new Date().getFullYear() - 1}>
              {new Date().getFullYear() - 1}
            </option>
            <option value={new Date().getFullYear() - 2}>
              {new Date().getFullYear() - 2}
            </option>
          </select>
        </div>
        <div className="h-[300px] w-full">
          <BarChart
            dataPatientsByGenderAndByYear={dataPatientsByGenderAndByYear}
          />
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
