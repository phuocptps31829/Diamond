import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import MedicinesCategoriesFormAdd from "@/components/admin/medicineCategories/MedicinesCategoriesFormAdd";

const breadcrumbData = [
  {
    title: "Thuốc",
  },
  {
    href: "/admin/medicinesCategories/create",
    title: "Thêm danh mục thuốc",
  },
];

const MedicinesCategoriesFormAddPage = () => {
  return (
    <>
      <BreadcrumbCustom data={breadcrumbData} />
      <MedicinesCategoriesFormAdd />
    </>
  );
};

export default MedicinesCategoriesFormAddPage;
