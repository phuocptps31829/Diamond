import { useParams } from "react-router-dom";
import { newsApi } from "@/services/newsApi";
import { useQuery } from "@tanstack/react-query";
import NotFound from "@/components/ui/NotFound";
import ContentNews from "./detail/ContentNews";

const NewsDetailAdmin = () => {
  const { id } = useParams();
  const {
    data: news,
    error: errorNews,
    isLoading: isLoadingNews,
  } = useQuery({
    queryKey: ["news", id],
    queryFn: () => newsApi.getNewsById(id),
    enabled: !!id,
  });
  if (errorNews) return <NotFound message={errorNews.message} />;
  return (
    <div className="rounded-xl border-2 border-dashed border-primary-500 bg-bg-gray py-5">
      <ContentNews news={news} isLoading={isLoadingNews} />
    </div>
  );
};

export default NewsDetailAdmin;
