import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import MedicinesFormFix from "@/components/admin/medicine/MedicinesFormFix";
import { medicineApi } from "@/services/medicineApi";
import NotFound from "@/components/ui/NotFound";
import Loading from "@/components/ui/Loading";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const initialBreadcrumbData = [
  {
    href: "/admin/medicines/list",
    title: "Thuốc",
  },
  {
    title: "Chỉnh sửa thuốc",
  },
  {
    title: "",
  },
];

const MedicineFormFixPage = () => {
  useAuthRedirect(["SUPER_ADMIN", "ADMIN"], "/admin/dashboard");

  const { id } = useParams();
  const [breadcrumbData, setBreadcrumbData] = useState(initialBreadcrumbData);
  const {
    data: medicineDetail,
    isLoading: isLoadingMedicine,
    error: errorMedicine,
  } = useQuery({
    queryKey: ["medicine", id],
    queryFn: () => medicineApi.getMedicineById(id),
  });

  useEffect(() => {
    if (!isLoadingMedicine && medicineDetail) {
      setBreadcrumbData((prevBreadcrumbData) => {
        const updatedData = [...prevBreadcrumbData];
        updatedData[2].title = medicineDetail.name || "NaN";
        return updatedData;
      });
    }
  }, [isLoadingMedicine, medicineDetail]);

  if (errorMedicine) return <NotFound message={ errorMedicine.message } />;

  return (
    <>
      { isLoadingMedicine ? (
        <Loading ScaleMini={ true } />
      ) : (
        <>
          <BreadcrumbCustom data={ breadcrumbData } />
          <MedicinesFormFix medicineDetail={ medicineDetail } />
        </>
      ) }
    </>
  );
};

export default MedicineFormFixPage;
