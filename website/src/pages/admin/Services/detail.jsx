import ServicesDetailAdmin from "@/components/admin/services/ServicesDetailAdmin";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const ServicesDetailPage = () => {
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
