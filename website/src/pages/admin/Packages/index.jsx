import PackagesList from "@/components/admin/packages/PackagesList";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useQuery } from "@tanstack/react-query";
import NotFound from "@/components/ui/NotFound";
import Loading from "@/components/ui/Loading";
import { medicalPackageApi } from "@/services/medicalPackagesApi";

const breadcrumbData = [
  {
    title: "Sản phẩm",
  },
  {
    href: "/admin/packages/list",
    title: "Danh sách gói",
  },
];

const PackagesListPage = () => {
  const {
    data: dataTakeItAllPackages,
    error: errorTakeItAllPackages,
    isLoading: isLoadingTakeItAllPackages,
  } = useQuery({
    queryKey: ["takeItAllPackages"],
    queryFn: medicalPackageApi.takeItAllPackages,
  });

  if (errorTakeItAllPackages) {
    return <NotFound message={ errorTakeItAllPackages.message } />;
  }

  return (
    <>
      { isLoadingTakeItAllPackages ? (
        <Loading />
      ) : (
        <>
          <BreadcrumbCustom data={ breadcrumbData } />
          <PackagesList allPackages={ dataTakeItAllPackages } />
        </>
      ) }
    </>
  );
};

export default PackagesListPage;
