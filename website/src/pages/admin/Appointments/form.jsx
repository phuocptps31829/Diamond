import AppointmentsForm from "@/components/admin/appointments/AppointmentsForm";
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

const AppointmentsFormPage = () => {
  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <AppointmentsForm />
    </div>
  );
};

export default AppointmentsFormPage;