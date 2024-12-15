import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import MedicinesCategoriesFormFix from "@/components/admin/medicineCategories/MedicinesCategoriesFormFix";
import { medicineApi } from "@/services/medicineApi";
import NotFound from "@/components/ui/NotFound";
import Loading from "@/components/ui/Loading";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const initialBreadcrumbData = [
  {
    href: "/admin/medicines-categories/list",
    title: "Danh mục thuốc",
  },
  {
    title: "Chỉnh sửa danh mục thuốc",
  },
  {
    title: "",
  },
];

const MedicinesCategoriesFormFixPage = () => {
  useAuthRedirect(["SUPER_ADMIN", "ADMIN"], "/admin/dashboard");

  const { id } = useParams();
  const [breadcrumbData, setBreadcrumbData] = useState(initialBreadcrumbData);
  const {
    data: medicineCategoriesDetail,
    isLoading: isLoadingMedicineCategories,
    error: errorMedicineCategories,
  } = useQuery({
    queryKey: ["medicineCategories", id],
    queryFn: () => medicineApi.getMedicineCategoriesById(id),
  });

  useEffect(() => {
    if (!isLoadingMedicineCategories && medicineCategoriesDetail) {
      setBreadcrumbData((prevBreadcrumbData) => {
        const updatedData = [...prevBreadcrumbData];
        updatedData[2].title = medicineCategoriesDetail.name || "NaN";
        return updatedData;
      });
    }
  }, [isLoadingMedicineCategories, medicineCategoriesDetail]);

  if (errorMedicineCategories)
    return <NotFound message={ errorMedicineCategories.message } />;

  return (
    <>
      { isLoadingMedicineCategories ? (
        <Loading ScaleMini={ true } />
      ) : (
        <>
          <BreadcrumbCustom data={ breadcrumbData } />
          <MedicinesCategoriesFormFix
            medicineCategoriesDetail={ medicineCategoriesDetail }
          />
        </>
      ) }
    </>
  );
};

export default MedicinesCategoriesFormFixPage;
