import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import PackagesFormAdd from "@/components/admin/packages/PackagesFormAdd";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const breadcrumbData = [
  {
    title: "Sản phẩm",
  },
  {
    href: "/admin/packages/create",
    title: "Thêm gói",
  },
];

const PackagesFormAddPage = () => {
  useAuthRedirect(["SUPER_ADMIN", "ADMIN"]);

  return (
    <>
      <BreadcrumbCustom data={ breadcrumbData } />
      <PackagesFormAdd />
    </>
  );
};

export default PackagesFormAddPage;
