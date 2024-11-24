import MedicinesList from "@/components/admin/medicine/MedicinesList";
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

const MedicinesListPage = () => {
  const {
    data: dataAllMedicines,
    error: errorAllMedicines,
    isLoading: isLoadingAllMedicines,
  } = useQuery({
    queryKey: ["allMedicinesNoPaginated"],
    queryFn: () => medicineApi.getAllMedicines({
      noPaginated: true,
    }),
  });

  if (errorAllMedicines) {
    return <NotFound />;
  }

  return (
    <>
      { isLoadingAllMedicines ? (
        <Loading />
      ) : (
        <>
          <BreadcrumbCustom data={ breadcrumbData } />
          <MedicinesList allMedicine={ dataAllMedicines } />
        </>
      ) }
    </>
  );
};

export default MedicinesListPage;
