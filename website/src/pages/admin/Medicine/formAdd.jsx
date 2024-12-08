import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import MedicinesFormAdd from "@/components/admin/medicine/MedicinesFormAdd";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const breadcrumbData = [
  {
    title: "Thuốc",
  },
  {
    href: "/admin/medicines/create",
    title: "Thêm thuốc",
  },
];

const MedicinesFormAddPage = () => {
  useAuthRedirect(["SUPER_ADMIN", "ADMIN"], "/admin/dashboard");

  return (
    <>
      <BreadcrumbCustom data={ breadcrumbData } />
      <MedicinesFormAdd />
    </>
  );
};

export default MedicinesFormAddPage;
