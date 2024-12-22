import ServicesDetailAdmin from "@/components/admin/services/ServicesDetailAdmin";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const ServicesDetailPage = () => {
  useAuthRedirect(["SUPER_ADMIN", "ADMIN"]);

  const breadcrumbData = [
    {
      title: "Dịch vụ",
    },
    {
      href: "/admin/services/detail",
      title: "Chi tiết dịch vụ",
    },
  ];
  return (
    <div className="">
      <BreadcrumbCustom data={ breadcrumbData } />
      <ServicesDetailAdmin />
    </div>
  );
};

export default ServicesDetailPage;
