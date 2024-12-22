import StaffsList from "@/components/admin/staff/StaffsList";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const breadcrumbData = [
  {
    title: "Nhân viên",
  },
  {
    href: "/admin/staffs/list",
    title: "Danh sách nhân viên",
  },
];

const StaffsListPage = () => {
  useAuthRedirect(["SUPER_ADMIN", "ADMIN"]);

  return (
    <>
      <BreadcrumbCustom data={ breadcrumbData } />
      <StaffsList />
    </>
  );
};

export default StaffsListPage;
