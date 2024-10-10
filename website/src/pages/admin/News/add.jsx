import NewsAdd from "@/components/admin/news/NewsAdd";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const breadcrumbData = [
  {
    title: "Tin tức",
  },
  {
    href: "/admin/news/create",
    title: "Thêm tin tức",
  },
];

const NewsAddPage = () => {
  return (
    <div>
      <BreadcrumbCustom data={breadcrumbData} />
      <NewsAdd />
    </div>
  );
};

export default NewsAddPage;
