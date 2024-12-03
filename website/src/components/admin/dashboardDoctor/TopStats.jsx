import { useState, useEffect } from "react";
import { FaCalendarAlt, FaCalendarCheck } from "react-icons/fa";
import { TbCalendarRepeat } from "react-icons/tb";
import AnimatedValue from "@/components/ui/AnimatedNumberCounter";
import { TbCalendarCancel } from "react-icons/tb";

export default function TopStats({ dataAppointmentsByDoctor }) {
  const [totals, setTotals] = useState({  
    totalAppointments: 0,
    totalExaminations: 0,
    totalConfirmed: 0,
    totalCanceled: 0,
  });

  useEffect(() => {
    if (!dataAppointmentsByDoctor || dataAppointmentsByDoctor.length === 0) return;

    const totalAppointments = dataAppointmentsByDoctor.data.length;
    const { EXAMINED, PENDING, CANCELLED } = dataAppointmentsByDoctor.data.reduce(
      (acc, item) => {
        if (item.status === "EXAMINED") acc.EXAMINED++;
        if (item.status === "PENDING") acc.PENDING++;
        if (item.status === "CANCELLED") acc.CANCELLED++;
        return acc;
      },
      { EXAMINED: 0, PENDING: 0, CANCELLED: 0 }
    );
    const totalExaminations = EXAMINED;
    const totalConfirmed = PENDING;
    const totalCanceled = CANCELLED;

    setTotals({
      totalAppointments,
      totalExaminations,
      totalConfirmed,
      totalCanceled
    });

  }, [dataAppointmentsByDoctor]);

  const stats = [
    {
      id: 1,
      icon: FaCalendarAlt,
      bgColor: "#007BBB",
      mainValue: totals.totalAppointments,
      title: "Tổng lịch hẹn",
      percentageBg: "#E5FBF9",
      percentageColor: "#00D3C7",
    },
    {
      id: 2,
      icon: FaCalendarCheck,
      bgColor: "#28A745",
      mainValue: totals.totalExaminations,
      title: "Đã hoàn thành",
      percentageBg: "#E5FBF9",
      percentageColor: "#00D3C7",
    },
    {
      id: 3,
      icon: TbCalendarRepeat,
      bgColor: "#FFC107",
      mainValue: totals.totalConfirmed,
      title: "Đang chờ xử lí",
      percentageBg: "#E5FBF9",
      percentageColor: "#00D3C7",
    },
    {
      id: 3,
      icon: TbCalendarCancel,
      bgColor: "#DC3545",
      mainValue: totals.totalCanceled,
      title: "Lịch hẹn hủy",
      percentageBg: "#E5FBF9",
      percentageColor: "#00D3C7",
    },
  ];

  return (
    <div className="h-full">
      <div className="relative flex w-full rounded-md bg-white items-center">
        {stats.map((stat, index) => (
          <>
            <div key={stat.id} className="flex flex-1 items-center p-5 px-8">
              <div
                className={`flex h-[60px] w-[60px] items-center justify-center rounded-lg p-3`}
                style={{ backgroundColor: stat.bgColor }}
              >
                <stat.icon color="white" size={30} />
              </div>
              <div className="ml-3 flex flex-col">
                <div className="flex items-center text-[26px] text-primary-700">
                  <AnimatedValue value={stat.mainValue} />
                </div>
                <h3 className="font-semibold">{stat.title}</h3>
              </div>
            </div>
            {index !== stats.length - 1 && (
              <span className="border-2 rounded-lg border-[#25b3ffb1] h-[45px] bg-red-500"></span>
            )}
          </>
        ))}
      </div>
    </div>
  );
}
