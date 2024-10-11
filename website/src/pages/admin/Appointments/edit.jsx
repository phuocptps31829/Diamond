import AppointmentsEdit from "@/components/admin/appointments/AppointmentsEdit";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

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
    
  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <AppointmentsEdit />
    </div>
  );
};

export default AppointmentsEditPage;