import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import StaffsFormFix from "@/components/admin/staff/StaffFormFix";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import NotFound from "@/components/ui/NotFound";
import { useQuery } from "@tanstack/react-query";
import staffApi from "@/services/staffApi.js";
import Loading from "@/components/ui/Loading";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const initialBreadcrumbData = [
  {
    title: "Nhân viên",
  },
  {
    href: "/admin/staffs/create",
    title: "Chỉnh sửa nhân viên",
  },
  {
    title: "",
  },
];

const StaffsFormPageFix = () => {
  useAuthRedirect(["SUPER_ADMIN", "ADMIN"]);

  const { id } = useParams();
  const [breadcrumbData, setBreadcrumbData] = useState(initialBreadcrumbData);

  const {
    data: staffDetail,
    isLoading: isLoadingStaff,
    error: errorStaff,
  } = useQuery({
    queryKey: ["staff", id],
    queryFn: () => staffApi.getStaffById(id),
  });

  useEffect(() => {
    if (!isLoadingStaff && staffDetail) {
      setBreadcrumbData((prevBreadcrumbData) => {
        const updatedData = [...prevBreadcrumbData];
        updatedData[2].title = staffDetail.fullName || "NaN";
        return updatedData;
      });
    }
  }, [isLoadingStaff, staffDetail]);

  if (errorStaff) return <NotFound message={ errorStaff.message } />;

  return (
    <>
      { isLoadingStaff ? (
        <Loading ScaleMini={ true } />
      ) : (
        <>
          <BreadcrumbCustom data={ breadcrumbData } />
          <StaffsFormFix staffDetail={ staffDetail } />
        </>
      ) }
    </>
  );
};

export default StaffsFormPageFix;
