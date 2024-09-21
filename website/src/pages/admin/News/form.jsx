import NewsForm from "@/components/admin/news/NewsForm";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const breadcrumbData = [
  {
    title: 'Tin tức'
  },
  {
    href: '/admin/news/create',
    title: 'Thêm tin tức'
  },
];

const NewsFormPage = () => {
  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <NewsForm />
    </div>
  );
};

export default NewsFormPage;