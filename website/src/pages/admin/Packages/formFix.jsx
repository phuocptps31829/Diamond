import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import PackagesFormFix from "@/components/admin/packages/PackagesFormFix";
import { useQuery } from "@tanstack/react-query";
import { getMedicalPackageById } from "@/services/medicalPackagesApi";
import NotFound from "@/components/ui/NotFound";
import Loading from "@/components/ui/Loading";

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
  const { id } = useParams();
  const [breadcrumbData, setBreadcrumbData] = useState(initialBreadcrumbData);
  const {
    data: packageDetail,
    isLoading: isLoadingPackage,
    error: errorPackage,
  } = useQuery({
    queryKey: ["package", id],
    queryFn: () => getMedicalPackageById(id),
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

  if (errorPackage) return <NotFound message={errorPackage.message} />;

  return (
    <>
      {isLoadingPackage ? (
        <Loading />
      ) : (
        <>
          <BreadcrumbCustom data={breadcrumbData} />
          <PackagesFormFix packageDetail={packageDetail} />
        </>
      )}
    </>
  );
};

export default PackagesFormFixPage;
