import NewsEdit from "@/components/admin/news/NewsEdit";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const breadcrumbData = [
  {
    title: "Tin tức",
  },
  {
    href: "/admin/news/edit",
    title: "Chỉnh sửa tin tức",
  },
];

const NewsEditPage = () => {
  return (
    <div>
      <BreadcrumbCustom data={breadcrumbData} />
      <NewsEdit />
    </div>
  );
};

export default NewsEditPage;
