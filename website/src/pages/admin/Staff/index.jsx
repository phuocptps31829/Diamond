import StaffsList from "@/components/admin/staff/StaffsList";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const breadcrumbData = [
  {
    title: 'Nhân viên'
  },
  {
    href: '/admin/staffs/list',
    title: 'Danh sách nhân viên'
  },
];

const StaffsListPage = () => {
  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <StaffsList/>
    </div>
  );
};

export default StaffsListPage;
