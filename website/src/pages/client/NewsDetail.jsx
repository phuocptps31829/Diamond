import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ContentNews from "../../components/client/newsDetail/Content";
import { newsApi } from "@/services/newsApi";
import useScrollToTop from "@/hooks/useScrollToTop";
import NotFound from "@/components/ui/NotFound";

export default function NewsDetail() {
  useScrollToTop();
  const { slug } = useParams();

  const {
    data: allNews,
    error: errorNews,
    isLoading: isLoadingNews,
  } = useQuery({
    queryKey: "news",
    queryFn: newsApi.takeItAllNews,
    enabled: !!slug,
  });

  const { data, error, isLoading } = useQuery({
    queryKey: ["news", slug],
    queryFn: () => newsApi.getNewsBySlug(slug),
  });

  if (error || errorNews) return <NotFound />;

  return (
    <div className="bg-[#E8F2F7] py-5">
      <ContentNews
        news={data}
        allNews={allNews}
        isLoading={isLoading}
        isLoadingAllNews={isLoadingNews}
      />
    </div>
  );
}
