import MedicinesList from "@/components/admin/medicine/MedicinesList";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const breadcrumbData = [
  {
    title: "Thuốc",
  },
  {
    href: "/admin/medicines/list",
    title: "Danh sách thuốc",
  },
];

const MedicinesListPage = () => {
  useAuthRedirect(["SUPER_ADMIN", "ADMIN"]);

  return (
    <>
      <BreadcrumbCustom data={ breadcrumbData } />
      <MedicinesList />
    </>
  );
};

export default MedicinesListPage;
