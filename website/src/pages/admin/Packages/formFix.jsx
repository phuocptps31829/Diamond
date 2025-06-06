import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import PackagesFormFix from "@/components/admin/packages/PackagesFormFix";
import { useQuery } from "@tanstack/react-query";
import NotFound from "@/components/ui/NotFound";
import Loading from "@/components/ui/Loading";
import { medicalPackageApi } from "@/services/medicalPackagesApi";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const initialBreadcrumbData = [
  {
    title: "Sản phẩm",
  },
  {
    href: "/admin/packages/create",
    title: "Chỉnh sửa gói",
  },
  {
    title: "",
  },
];

const PackagesFormFixPage = () => {
  useAuthRedirect(["SUPER_ADMIN", "ADMIN"]);

  const { id } = useParams();
  const [breadcrumbData, setBreadcrumbData] = useState(initialBreadcrumbData);
  const {
    data: packageDetail,
    isLoading: isLoadingPackage,
    error: errorPackage,
  } = useQuery({
    queryKey: ["package", id],
    queryFn: () => medicalPackageApi.getMedicalPackageById(id),
  });

  useEffect(() => {
    if (!isLoadingPackage && packageDetail) {
      setBreadcrumbData((prevBreadcrumbData) => {
        const updatedData = [...prevBreadcrumbData];
        updatedData[2].title = packageDetail.name || "NaN";
        return updatedData;
      });
    }
  }, [isLoadingPackage, packageDetail]);

  if (errorPackage) return <NotFound message={ errorPackage.message } />;

  return (
    <>
      { isLoadingPackage ? (
        <Loading ScaleMini={ true } />
      ) : (
        <>
          <BreadcrumbCustom data={ breadcrumbData } />
          <PackagesFormFix packageDetail={ packageDetail } />
        </>
      ) }
    </>
  );
};

export default PackagesFormFixPage;
