import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import PackagesFormAdd from "@/components/admin/packages/PackagesFormAdd";

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
  return (
    <>
      <BreadcrumbCustom data={breadcrumbData} />
      <PackagesFormAdd />
    </>
  );
};

export default PackagesFormAddPage;
