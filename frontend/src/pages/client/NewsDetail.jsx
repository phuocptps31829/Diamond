import ContentNews from "../../components/client/newsDetail/Content";
import useScrollToTop from "@/hooks/useScrollToTop";
export default function NewsDetail() {
  useScrollToTop();
  return (
    <div className="bg-[#E8F2F7] py-5">
      <ContentNews />
    </div>
  );
}
