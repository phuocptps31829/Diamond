import { useQuery } from "@tanstack/react-query";
import NewsBanner from "@/components/client/news/NewsBanner";
import NewsAbove from "@/components/client/news/NewsAbove";
import NewsBelow from "@/components/client/news/NewsBelow";
import useScrollToTop from "@/hooks/useScrollToTop";
import { newsApi } from "@/services/newsApi";
import NotFound from '@/components/ui/NotFound';
export default function News() {
  useScrollToTop();
  const { data, error, isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: newsApi.takeItAllNews,
  });

  if (error) {
    return <NotFound message={error.message} />;
  }

  return (
    <div className="bg-[#E8F2F7]">
      <NewsBanner />
      <NewsAbove news={data} isLoading={isLoading} />
      <NewsBelow news={data} isLoading={isLoading} />
    </div>
  );
}
