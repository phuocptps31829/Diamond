import NewsDetailAdmin from "@/components/admin/news/NewsDetailAdmin";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const NewsDetailPage = () => {
  const breadcrumbData = [
    {
      title: "Tin tức",
    },
    {
      href: "/admin/news/detail",
      title: "Chi tiết tin tức",
    },
  ];
  return (
    <div className="">
      <BreadcrumbCustom data={breadcrumbData} />
      <NewsDetailAdmin />
    </div>
  );
};

export default NewsDetailPage;
