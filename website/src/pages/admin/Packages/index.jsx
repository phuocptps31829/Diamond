import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

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
  return (
    <>
      <BreadcrumbCustom data={breadcrumbData} />
      <h1>List gói</h1>
    </>
  );
};

export default PackagesListPage;
