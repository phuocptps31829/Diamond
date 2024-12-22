import NewsList from "@/components/admin/news/NewsList";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

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
  useAuthRedirect(["SUPER_ADMIN", "ADMIN"]);

  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <NewsList />
    </div>
  );
};

export default NewsListPage;