import StaffsList from "@/components/admin/staff/StaffsList";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useQuery } from "@tanstack/react-query";
import staffApi from "@/services/staffApi.js";
import Loading from "@/components/ui/Loading";
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
  useAuthRedirect(["SUPER_ADMIN", "ADMIN"], "/admin/dashboard");

  const { data: allStaffs, isLoading: isLoadingStaffs } = useQuery({
    queryKey: ["staffs"],
    queryFn: staffApi.getAllStaff,
  });

  return (
    <>
      { isLoadingStaffs ? (
        <Loading />
      ) : (
        <>
          <BreadcrumbCustom data={ breadcrumbData } />
          <StaffsList data={ allStaffs } />
        </>
      ) }
    </>
  );
};

export default StaffsListPage;
