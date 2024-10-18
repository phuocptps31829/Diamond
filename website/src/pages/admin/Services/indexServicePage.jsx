import ServicesList from "@/components/admin/services/ServicesList";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

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
  return (
    <div>
      <BreadcrumbCustom data={breadcrumbData} />
      <ServicesList />
    </div>
  );
};

export default ServicesListPage;
