import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TopStats from "../../components/admin/dashboardDoctor/TopStats";
import MiddleCharts from "../../components/admin/dashboardDoctor/MiddleCharts";
import BottomLists from "../../components/admin/dashboardDoctor/BottomLists";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { appointmentApi } from "@/services/appointmentsApi";

const breadcrumbData = [
  {
    title: "Thống kê",
  },
  {
    href: "/admin/doctor-dashboard",
    title: "Bảng điều khiển bác sĩ",
  },
];

export default function DoctorDashboard() {
  const [dataAppointmentsByDoctor, setDataAppointmentsByDoctor] = useState([]);
  const { data: appointmentsByAges, isPending: isPendingAppointmentsByDoctor } =
    useQuery({
      queryKey: ["appointmentsDoctor"],
      queryFn: appointmentApi.getAppointmentByDoctor,
    });

  useEffect(() => {
    if (isPendingAppointmentsByDoctor) return;
    setDataAppointmentsByDoctor(appointmentsByAges);
  }, [isPendingAppointmentsByDoctor, appointmentsByAges]);

  return (
    <>
      <BreadcrumbCustom data={breadcrumbData} />
      <TopStats dataAppointmentsByDoctor={dataAppointmentsByDoctor} loading={isPendingAppointmentsByDoctor} />
      <MiddleCharts dataAppointmentsByDoctor={dataAppointmentsByDoctor} loading={isPendingAppointmentsByDoctor} />
      <BottomLists dataAppointmentsByDoctor={dataAppointmentsByDoctor} loading={isPendingAppointmentsByDoctor} />
    </>
  )
}
