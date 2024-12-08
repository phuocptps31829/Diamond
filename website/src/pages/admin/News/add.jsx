import NewsAdd from "@/components/admin/news/NewsAdd";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

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
  useAuthRedirect(["SUPER_ADMIN", "ADMIN"], "/admin/dashboard");

  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <NewsAdd />
    </div>
  );
};

export default NewsAddPage;
