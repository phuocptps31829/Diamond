import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import MedicinesCategoriesFormAdd from "@/components/admin/medicineCategories/MedicinesCategoriesFormAdd";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const breadcrumbData = [
  {
    title: "Thuốc",
  },
  {
    href: "/admin/medicines-categories/create",
    title: "Thêm danh mục thuốc",
  },
];

const MedicinesCategoriesFormAddPage = () => {
  useAuthRedirect(["SUPER_ADMIN", "ADMIN"], "/admin/dashboard");

  return (
    <>
      <BreadcrumbCustom data={ breadcrumbData } />
      <MedicinesCategoriesFormAdd />
    </>
  );
};

export default MedicinesCategoriesFormAddPage;
