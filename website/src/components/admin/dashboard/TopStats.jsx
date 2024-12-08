import { useState, useEffect } from "react";
import { FaCalendarAlt, FaUserPlus, FaMoneyCheckAlt } from "react-icons/fa";
import { HiMiniArrowUpRight, HiMiniArrowDownRight } from "react-icons/hi2";
import AnimatedValue from "@/components/ui/AnimatedNumberCounter";
import { IoNewspaperSharp } from "react-icons/io5";
import { Skeleton } from "@/components/ui/Skeleton";

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

export default function TopStats({ allData, loading }) {
  const [isLoadingStats, setIsLoadingStats] = useState({
    news: true,
    patients: true,
    appointments: true,
    invoices: true,
  });
  const { allNews, allPatients, allAppointments, allInvoices } = allData;
  const { isLoadingNews, isLoadingPatients, isLoadingAppointments, isLoadingInvoices } = loading;
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

  const updateStatsData = (data, id, calculateFn, keyField) => {
    const stats = calculateFn(data, keyField);
    setStatsData((prevStats) =>
      prevStats.map((stat) => {
        if (stat.id === id) {
          return {
            ...stat,
            value: stats.count,
            percentage: `${stats.percentageChange}%`,
            isIncrease: stats.isIncrease,
          };
        }
        return stat;
      })
    );
  };

  useEffect(() => {
    if (!isLoadingNews && allNews) {
      updateStatsData(allNews, 3, calculateStats, "updatedAt");
      setIsLoadingStats((prev) => ({ ...prev, news: false }));
    }
  }, [allNews, isLoadingNews]);
  
  useEffect(() => {
    if (!isLoadingPatients && allPatients) {
      updateStatsData(allPatients.data, 2, calculateStats, "updatedAt");
      setIsLoadingStats((prev) => ({ ...prev, patients: false }));
    }
  }, [allPatients, isLoadingPatients]);
  
  useEffect(() => {
    if (!isLoadingAppointments && allAppointments) {
      updateStatsData(allAppointments.data, 1, calculateStats, "time");
      setIsLoadingStats((prev) => ({ ...prev, appointments: false }));
    }
  }, [allAppointments, isLoadingAppointments]);

  useEffect(() => {
    if (!isLoadingInvoices && allInvoices) {
      const invoiceStats = calculateTotal(allInvoices.data, "createdAt", "price");
      setStatsData((prevStats) =>
        prevStats.map((stat) => {
          if (stat.id === 4) {
            return {
              ...stat,
              value: invoiceStats.total,
              percentage: `${invoiceStats.percentageChange}%`,
              isIncrease: invoiceStats.isIncrease,
            };
          }
          return stat;
        })
      );
      setIsLoadingStats((prev) => ({ ...prev, invoices: false }));
    }
  }, [allInvoices, isLoadingInvoices]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-4 gap-6">
        {statsData.map((stat) => (
          <div key={ stat.id } className="rounded-md bg-white p-4 shadow-sm">
            <div className="flex flex-col">
              {isLoadingStats[stat.id === 1 ? 'appointments' : stat.id === 2 ? 'patients' : stat.id === 3 ? 'news' : 'invoices'] ? (
                  <>
                    <Skeleton className="h-12 w-12 rounded-md bg-[#CAEDFF]" />
                    <Skeleton className="mt-2 h-5 w-3/4 rounded-md" />
                    <Skeleton className="my-3 h-8 w-1/2 rounded-md" />
                    <Skeleton className="h-5 w-1/3 rounded-md" />
                  </>
                ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        )) }
      </div>
    </div>
  );
}
