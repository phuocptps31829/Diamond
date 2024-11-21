import AppointmentsList from "@/components/admin/appointments/AppointmentsList";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

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
  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <AppointmentsList />
    </div>
  );
};

export default AppointmentsListPage;
