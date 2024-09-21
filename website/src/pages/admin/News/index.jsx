import NewsList from "@/components/admin/news/NewsList";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const breadcrumbData = [
  {
    title: 'Tin tức'
  },
  {
    href: '/admin/news/list',
    title: 'Danh sách tin tức'
  },
];

const NewsListPage = () => {
  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <NewsList />
    </div>
  );
};

export default NewsListPage;