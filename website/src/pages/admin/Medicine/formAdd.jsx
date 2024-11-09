import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import MedicinesFormAdd from "@/components/admin/medicine/MedicinesFormAdd";

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
  return (
    <>
      <BreadcrumbCustom data={breadcrumbData} />
      <MedicinesFormAdd />
    </>
  );
};

export default MedicinesFormAddPage;
