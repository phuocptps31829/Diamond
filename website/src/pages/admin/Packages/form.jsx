import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const breadcrumbData = [
  {
    title: "Sản phẩm",
  },
  {
    href: "/admin/packages/create",
    title: "Thêm gói",
  },
];

const PackagesFormPage = () => {
  return (
    <>
      <BreadcrumbCustom data={breadcrumbData} />
      <h1>Form gói</h1>
    </>
  );
};

export default PackagesFormPage;
