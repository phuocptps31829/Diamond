import ServicesList from "@/components/admin/services/ServicesList";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const breadcrumbData = [
  {
    title: "Sản phẩm",
  },
  {
    href: "/admin/services/list",
    title: "Danh sách dịch vụ",
  },
];

const ServicesListPage = () => {
  useAuthRedirect(["SUPER_ADMIN", "ADMIN"], "/admin/dashboard");

  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <ServicesList />
    </div>
  );
};

export default ServicesListPage;
