import PackagesList from "@/components/admin/packages/PackagesList";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

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
  useAuthRedirect(["SUPER_ADMIN", "ADMIN"]);

  return (
    <>
      <BreadcrumbCustom data={ breadcrumbData } />
      <PackagesList />
    </>
  );
};

export default PackagesListPage;
