import MedicinesCategoriesList from "@/components/admin/medicineCategories/MedicinesCategoriesList";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useQuery } from "@tanstack/react-query";
import { medicineApi } from "@/services/medicineApi";
import NotFound from "@/components/ui/NotFound";
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
    queryFn: medicineApi.getAllMedicinesCategories,
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
