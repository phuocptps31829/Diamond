import { Link } from "react-router-dom";
import bannerNotFound from "@/assets/images/banner_error.png";
export default function NotFound() {
  return (
    <div className="flex justify-center mb-10">
      <div className="text-center">
        <img src={ bannerNotFound } alt="404 Not Found" />
        <p className="my-8 text-2xl text-primary-500">
          Đã có lỗi đã xảy ra hoặc trang không tồn tại
        </p>
        <Link
          to="/"
          className="rounded-full border-2 border-primary-400 p-2 px-5 text-primary-500 block hover:bg-primary-400 hover:text-white transition-all"
        >
          Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
}
