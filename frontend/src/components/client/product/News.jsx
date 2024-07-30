import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";

export default function NewsProduct({ props }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-custom">
      <Link
        to="/news-detail"
        className="gap-4 overflow-hidden rounded-md md:row-span-3 md:grid-rows-subgrid"
      >
        <img
          src="https://img.ykhoadiamond.com/uploads/avatar/19072024/cd8b430b-d6b2-44f7-9ce5-7a132804c72f.png"
          alt=""
        />
        <div className="p-5">
          <div className="mb-[6px] flex gap-2 text-[12px]">
            <div className="font-bold text-primary-700">Tin Tức</div>
            <div className="font-semibold">19, Tháng 7, 2024</div>
            <div>|</div>
            <div className="font-semibold">Admin</div>
          </div>
          <h2 className="my-2 text-[14px] font-bold sm:text-[18px]">
            Trân Trọng Kính Mời Bác Sĩ Hợp Tác Cùng Hệ THống Y Khoa Diamond
          </h2>
          <div className="line-clamp-2 overflow-hidden text-ellipsis text-[12px] text-[#6D7280] sm:text-[14px]">
            Chúng tôi mang đến cơ hội hợp tác với chính sách hấp dẫn và môi
            trường làm việc chuyên nghiệp. Hãy cùng hợp tác với Hệ Thống Y Khoa
            Diamond để cùng phát triển - cùng thành công ngay hôm nay.
          </div>
          <div className="mt-3 flex items-center gap-2 text-[13px] font-semibold opacity-50">
            <FaRegEye />
            <div>100</div>
          </div>
        </div>
      </Link>
    </div>
  );
}

NewsProduct.propTypes = {
  props: PropTypes.object,
};
