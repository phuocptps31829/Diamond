import MedicinesList from "@/components/admin/medicine/MedicinesList";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useQuery } from "@tanstack/react-query";
import { getAllMedicines } from "@/services/medicineApi";
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

const MedicinesListPage = () => {
  const {
    data: dataAllMedicines,
    error: errorAllMedicines,
    isLoading: isLoadingAllMedicines,
  } = useQuery({
    queryKey: ["allMedicines"],
    queryFn: getAllMedicines,
  });

  if (errorAllMedicines) {
    return <NotFound />;
  }

  return (
    <>
      {isLoadingAllMedicines ? (
        <Loading />
      ) : (
        <>
          <BreadcrumbCustom data={breadcrumbData} />
          <MedicinesList allMedicine={dataAllMedicines} />
        </>
      )}
    </>
  );
};

export default MedicinesListPage;
