import ServicesList from "@/components/admin/services/ServicesList";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const breadcrumbData = [
  {
    title: "Dịch vụ",
  },
  {
    href: "/admin/services/create",
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
