import { Link } from "react-router-dom";
import bannerNotFound from "@/assets/images/banner_error.png";
export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-64px)] justify-center">
      <div className="text-center">
        <img src={bannerNotFound} alt="404 Not Found" />
        <p className="my-8 text-2xl text-primary-500">
          Đã có lỗi đã xảy ra hoặc trang không tồn tại
        </p>
        <Link
          to="/"
          className="rounded-full border-2 border-[#EF8D32] p-2 px-5 text-[#EF8D32]"
        >
          Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
}
