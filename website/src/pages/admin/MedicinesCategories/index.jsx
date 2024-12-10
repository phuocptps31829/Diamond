import MedicinesCategoriesList from "@/components/admin/medicineCategories/MedicinesCategoriesList";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const breadcrumbData = [
  {
    title: "Danh mục thuốc",
  },
  {
    title: "Danh sách danh mục thuốc",
  },
];

const MedicinesCategoriesListPage = () => {
  useAuthRedirect(["SUPER_ADMIN", "ADMIN"], "/admin/dashboard");

  return (
    <>
      <BreadcrumbCustom data={breadcrumbData} />
      <MedicinesCategoriesList />
    </>
  );
};

export default MedicinesCategoriesListPage;
