import { useState, useEffect } from "react";
import { FaCalendarAlt, FaUserPlus, FaMoneyCheckAlt } from "react-icons/fa";
import { HiMiniArrowUpRight, HiMiniArrowDownRight } from "react-icons/hi2";
import AnimatedValue from "@/components/ui/AnimatedNumberCounter";
import { IoNewspaperSharp } from "react-icons/io5";

// Định nghĩa các biểu tượng và màu sắc
const ICONS = {
  calendar: <FaCalendarAlt color="#007BBB" size={ 22 } />,
  hospitalUser: <FaUserPlus color="#007BBB" size={ 22 } />,
  newspaper: <IoNewspaperSharp color="#007BBB" size={ 22 } />,
  moneyCheck: <FaMoneyCheckAlt color="#007BBB" size={ 22 } />,
};

const COLORS = {
  trendUp: "text-[#13D6CB]",
  trendDown: "text-red-500",
};

// Hàm tính toán giá trị và tỷ lệ thay đổi
const calculateStats = (data, dateField) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;

  const dataThisMonth = data.filter((item) => {
    const itemDate = new Date(item[dateField]);
    return (
      itemDate.getMonth() === currentMonth &&
      itemDate.getFullYear() === currentDate.getFullYear()
    );
  });

  const dataLastMonth = data.filter((item) => {
    const itemDate = new Date(item[dateField]);
    return (
      itemDate.getMonth() === previousMonth &&
      itemDate.getFullYear() === currentDate.getFullYear()
    );
  });

  const countThisMonth = dataThisMonth.length;
  const countLastMonth = dataLastMonth.length;

  const percentageChange =
    countLastMonth > 0
      ? ((countThisMonth - countLastMonth) / countLastMonth) * 100
      : countThisMonth > 0
        ? 100
        : 0;

  return {
    count: countThisMonth,
    percentageChange: Math.abs(Math.round(percentageChange)),
    isIncrease: percentageChange >= 0,
  };
};

// Hàm tính tổng hóa đơn
const calculateTotal = (data, dateField, valueField) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;

  const dataThisMonth = data.filter((item) => {
    const itemDate = new Date(item[dateField]);
    return (
      itemDate.getMonth() === currentMonth &&
      itemDate.getFullYear() === currentDate.getFullYear()
    );
  });

  const dataLastMonth = data.filter((item) => {
    const itemDate = new Date(item[dateField]);
    return (
      itemDate.getMonth() === previousMonth &&
      itemDate.getFullYear() === currentDate.getFullYear()
    );
  });

  const totalThisMonth = dataThisMonth.reduce(
    (total, item) => total + item[valueField],
    0,
  );

  const totalLastMonth = dataLastMonth.reduce(
    (total, item) => total + item[valueField],
    0,
  );

  const percentageChange =
    totalLastMonth > 0
      ? ((totalThisMonth - totalLastMonth) / totalLastMonth) * 100
      : totalThisMonth > 0
        ? 100
        : 0;

  return {
    total: totalThisMonth,
    percentageChange: Math.abs(Math.round(percentageChange)),
    isIncrease: percentageChange >= 0,
  };
};

export default function TopStats({
  allNews,
  allPatients,
  allAppointments,
  allInvoices,
}) {
  const [statsData, setStatsData] = useState([
    {
      id: 1,
      icon: ICONS.calendar,
      title: "Cuộc hẹn",
      value: 0,
      percentage: "0%",
      isIncrease: true,
    },
    {
      id: 2,
      icon: ICONS.hospitalUser,
      title: "Người dùng mới",
      value: 0,
      percentage: "0%",
      isIncrease: true,
    },
    {
      id: 3,
      icon: ICONS.newspaper,
      title: "Tin tức y tế",
      value: 0,
      percentage: "0%",
      isIncrease: true,
    },
    {
      id: 4,
      icon: ICONS.moneyCheck,
      title: "Thu nhập",
      value: 0,
      percentage: "0%",
      isIncrease: true,
    },
  ]);

  // Tính toán số liệu thống kê khi dữ liệu thay đổi
  useEffect(() => {
    if (allNews && allPatients && allAppointments && allInvoices) {
      const newsStats = calculateStats(allNews, "updatedAt");
      const patientStats = calculateStats(allPatients, "updatedAt");
      const appointmentStats = calculateStats(allAppointments, "time");
      const invoiceStats = calculateTotal(allInvoices, "createdAt", "price");

      setStatsData((prevStats) =>
        prevStats.map((stat) => {
          if (stat.id === 1) {
            return {
              ...stat,
              value: appointmentStats.count,
              percentage: `${appointmentStats.percentageChange}%`,
              isIncrease: appointmentStats.isIncrease,
            };
          } else if (stat.id === 2) {
            return {
              ...stat,
              value: patientStats.count,
              percentage: `${patientStats.percentageChange}%`,
              isIncrease: patientStats.isIncrease,
            };
          } else if (stat.id === 3) {
            return {
              ...stat,
              value: newsStats.count,
              percentage: `${newsStats.percentageChange}%`,
              isIncrease: newsStats.isIncrease,
            };
          } else if (stat.id === 4) {
            return {
              ...stat,
              value: invoiceStats.total,
              percentage: `${invoiceStats.percentageChange}%`,
              isIncrease: invoiceStats.isIncrease,
            };
          } else {
            return stat;
          }
        }),
      );
    }
  }, [allNews, allPatients, allAppointments, allInvoices]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-4 gap-6">
        { statsData.map((stat) => (
          <div key={ stat.id } className="rounded-md bg-white p-4 shadow-sm">
            <div className="flex flex-col">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#CAEDFF]">
                { stat.icon }
              </div>
              <div className="mt-2 font-semibold">{ stat.title }</div>
              <div className="my-2 text-[30px] text-primary-500">
                <AnimatedValue value={ stat.value } isCurrency={ stat.id === 4 } />
              </div>
              <div className="flex gap-1 text-[14px]">
                <span
                  className={ `flex items-center gap-1 ${stat.isIncrease ? COLORS.trendUp : COLORS.trendDown
                    }` }
                >
                  { stat.isIncrease ? (
                    <HiMiniArrowUpRight color="#13D6CB" size={ 18 } />
                  ) : (
                    <HiMiniArrowDownRight color="red" size={ 18 } />
                  ) }
                  { stat.percentage }
                </span>
                <span className="text-[#808080]">với tháng trước</span>
              </div>
            </div>
          </div>
        )) }
      </div>
    </div>
  );
}
