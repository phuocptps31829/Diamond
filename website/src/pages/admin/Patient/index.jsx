import PatientsList from "@/components/admin/patient/PatientsList";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useQuery } from "@tanstack/react-query";
import { getAllPatients } from "@/services/patientsApi";
import NotFound from "@/components/client/notFound";
import Loading from "@/components/ui/Loading";

const breadcrumbData = [
  {
    title: "Bệnh nhân",
  },
  {
    href: "/admin/patients/list",
    title: "Danh sách bệnh nhân",
  },
];

const PatientsListPage = () => {
  const {
    data: allPatients,
    error: errorPatients,
    isLoading: isLoadingPatients,
  } = useQuery({
    queryKey: ["patients"],
    queryFn: getAllPatients,
  });

  if (errorPatients) {
    return <NotFound />;
  }
  return (
    <>
      {isLoadingPatients ? (
        <Loading />
      ) : (
        <>
          <BreadcrumbCustom data={breadcrumbData} />
          <PatientsList allPatients={allPatients?.data} />
        </>
      )}
    </>
  );
};

export default PatientsListPage;
