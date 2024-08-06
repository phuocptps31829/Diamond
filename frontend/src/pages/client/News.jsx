import NewsBanner from "../../components/client/news/NewsBanner";
import NewsAbove from "../../components/client/news/NewsAbove";
import NewsBelow from "../../components/client/news/NewsBelow";
import useScrollToTop from "@/hooks/useScrollToTop";
export default function News() {
  useScrollToTop();
  return (
    <div className="bg-[#E8F2F7]">
      <NewsBanner />
      <NewsAbove />
      <NewsBelow />
    </div>
  );
}
