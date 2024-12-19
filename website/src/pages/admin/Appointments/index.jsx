import AppointmentsList from "@/components/admin/appointments/AppointmentsList";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const breadcrumbData = [
  {
    title: 'Lịch hẹn'
  },
  {
    href: '/admin/appointments/list',
    title: 'Danh sách lịch hẹn'
  },
];

const AppointmentsListPage = () => {
  useAuthRedirect([
    "SUPER_ADMIN",
    "ADMIN", "STAFF_RECEPTIONIST",
    "DOCTOR"
  ], "/admin/dashboard");

  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <AppointmentsList />
    </div>
  );
};

export default AppointmentsListPage;
