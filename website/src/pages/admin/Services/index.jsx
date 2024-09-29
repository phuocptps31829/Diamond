import ServicesList from "@/components/admin/services/ServicesList";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useQuery } from "@tanstack/react-query";
import { getAllPatients } from "@/services/patientsApi";
import NotFound from "@/components/client/notFound";
import Loading from "@/components/ui/Loading";

const breadcrumbData = [
  {
    title: "Sản phẩm",
  },
  {
    href: "/admin/services/list",
    title: "Danh sách dịch vụ",
  },
];

const SerivesListPage = () => {
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
          <ServicesList allPatients={allPatients?.data} />
        </>
      )}
    </>
  );
};

export default SerivesListPage;
