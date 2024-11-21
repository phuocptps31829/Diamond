import StaffsFormAdd from "@/components/admin/staff/StaffFormAdd";
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

const StaffsFormPageAdd = () => {
  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <StaffsFormAdd/>
    </div>
  );
};

export default StaffsFormPageAdd;