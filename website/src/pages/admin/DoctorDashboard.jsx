import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LeftColumnStats from "../../components/admin/dashboardDoctor/LeftColumnStats";
import RightColumnStats from "../../components/admin/dashboardDoctor/RightColumnStats";
import BottomLists from "../../components/admin/dashboardDoctor/BottomLists";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { appointmentApi } from "@/services/appointmentsApi";
import Loading from "@/components/ui/Loading";

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

  return isPendingAppointmentsByDoctor ? (
    <Loading />
  ) : (
    <>
      <BreadcrumbCustom data={breadcrumbData} />
      <div className="grid grid-cols-[70%_27.8%] justify-between">
        <LeftColumnStats dataAppointmentsByDoctor={dataAppointmentsByDoctor} />
        <RightColumnStats dataAppointmentsByDoctor={dataAppointmentsByDoctor} />
      </div>
      <BottomLists dataAppointmentsByDoctor={dataAppointmentsByDoctor} />
    </>
  );
}
