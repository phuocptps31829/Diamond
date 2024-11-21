import ServicesAdd from "@/components/admin/services/ServicesAdd";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const ServicesAddPage = () => {
  const breadcrumbData = [
    {
      title: "Dịch vụ",
    },
    {
      href: "/admin/services/create",
      title: "Thêm dịch vụ",
    },
  ];

  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <ServicesAdd />
    </div>
  );
};

export default ServicesAddPage;
