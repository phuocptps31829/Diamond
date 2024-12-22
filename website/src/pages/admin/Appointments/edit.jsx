import AppointmentsEdit from "@/components/admin/appointments/AppointmentsEdit";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const breadcrumbData = [
  {
    title: 'Lịch hẹn'
  },
  {
    href: '/admin/appointments/edit',
    title: 'Chỉnh sửa lịch hẹn'
  },
];

const AppointmentsEditPage = () => {
  useAuthRedirect(["SUPER_ADMIN", "ADMIN", "STAFF_RECEPTIONIST", "DOCTOR"]);

  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <AppointmentsEdit />
    </div>
  );
};

export default AppointmentsEditPage;