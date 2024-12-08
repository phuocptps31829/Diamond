import AppointmentsAdd from "@/components/admin/appointments/AppointmentsAdd";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const breadcrumbData = [
  {
    title: 'Lịch hẹn'
  },
  {
    href: '/admin/appointments/create',
    title: 'Thêm lịch hẹn'
  },
];

const AppointmentsAddPage = () => {
  useAuthRedirect(["SUPER_ADMIN", "ADMIN", "STAFF_RECEPTIONIST"], "/admin/dashboard");

  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <AppointmentsAdd />
    </div>
  );
};

export default AppointmentsAddPage;