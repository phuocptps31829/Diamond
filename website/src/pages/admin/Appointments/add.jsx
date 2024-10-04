import AppointmentsAdd from "@/components/admin/appointments/AppointmentsAdd";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

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
  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <AppointmentsAdd />
    </div>
  );
};

export default AppointmentsAddPage;