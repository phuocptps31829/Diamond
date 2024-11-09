import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const breadcrumbData = [
  {
    title: "Sản phẩm",
  },
  {
    href: "/admin/services/create",
    title: "Thêm dịch vụ",
  },
];

const SerivesFormPage = () => {
  return (
    <>
      <BreadcrumbCustom data={breadcrumbData} />
      <h1>Form gói</h1>
    </>
  );
};

export default SerivesFormPage;
