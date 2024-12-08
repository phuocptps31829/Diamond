import NewsEdit from "@/components/admin/news/NewsEdit";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

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
  useAuthRedirect(["SUPER_ADMIN", "ADMIN"], "/admin/dashboard");

  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <NewsEdit />
    </div>
  );
};

export default NewsEditPage;
