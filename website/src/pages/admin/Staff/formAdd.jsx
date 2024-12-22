import StaffsFormAdd from "@/components/admin/staff/StaffFormAdd";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

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
  useAuthRedirect(["SUPER_ADMIN", "ADMIN"]);

  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <StaffsFormAdd />
    </div>
  );
};

export default StaffsFormPageAdd;