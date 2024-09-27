import StaffsForm from "@/components/admin/staff/StaffsForm";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const breadcrumbData = [
  {
    title: 'Nhân viên'
  },
  {
    href: '/admin/staffs/create',
    title: 'Thêm nhân viên'
  },
];

const StaffsFormPage = () => {
  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <StaffsForm/>
    </div>
  );
};

export default StaffsFormPage;