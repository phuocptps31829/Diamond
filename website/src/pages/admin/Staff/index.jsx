import StaffsList from "@/components/admin/staff/StaffsList";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useQuery } from "@tanstack/react-query";
import staffApi from "@/services/staffApi.js";
import Loading from "@/components/ui/Loading";

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
  const { data: allStaffs, isLoading: isLoadingStaffs } = useQuery({
    queryKey: ["staffs"],
    queryFn: staffApi.getAllStaff,
  });

  return (
    <>
      {isLoadingStaffs ? (
        <Loading />
      ) : (
        <>
          <BreadcrumbCustom data={breadcrumbData} />
          <StaffsList data={allStaffs} />
        </>
      )}
    </>
  );
};

export default StaffsListPage;
