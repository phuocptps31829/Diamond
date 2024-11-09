import MedicinesCategoriesList from "@/components/admin/medicineCategories/MedicinesCategoriesList";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useQuery } from "@tanstack/react-query";
import { getAllMedicinesCategories } from "@/services/medicineApi";
import NotFound from "@/components/client/notFound";
import Loading from "@/components/ui/Loading";

const breadcrumbData = [
  {
    title: "Thuốc",
  },
  {
    href: "/admin/medicines/list",
    title: "Danh sách thuốc",
  },
];

const MedicinesCategoriesListPage = () => {
  const {
    data: dataAllMedicinesCategories,
    error: errorAllMedicinesCategories,
    isLoading: isLoadingAllMedicinesCategories,
  } = useQuery({
    queryKey: ["allMedicinesCategories"],
    queryFn: getAllMedicinesCategories,
  });

  if (errorAllMedicinesCategories) {
    return <NotFound />;
  }

  return (
    <>
      {isLoadingAllMedicinesCategories ? (
        <Loading />
      ) : (
        <>
          <BreadcrumbCustom data={breadcrumbData} />
          <MedicinesCategoriesList
            allMedicineCategories={dataAllMedicinesCategories}
          />
        </>
      )}
    </>
  );
};

export default MedicinesCategoriesListPage;
