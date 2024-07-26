import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { AiOutlineDoubleRight } from "react-icons/ai";

export default function ServiceProduct({ props }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-custom">
      <Link
        to="/detail-service/1"
        className="group block h-[106px] overflow-hidden md:h-[206px]"
      >
        <img
          src="https://img.ykhoadiamond.com/uploads/package/28032023/00667e4b-3aca-4b5c-9b1f-d5b109ce3d26.jpg"
          alt=""
          className="ease h-full w-full transform object-cover transition-transform duration-500 group-hover:scale-[1.15]"
        />
      </Link>
      <div className="flex flex-col p-3 md:p-5">
        <Link
          to="/detail-service/1"
          className="text-[9px] font-bold uppercase text-[#7a7a7a] md:text-[11px]"
        >
          Toàn diện
        </Link>
        <Link
          to="/detail-service/1"
          className="text-sm font-bold md:my-1 md:text-xl"
        >
          GÓI KHÁM TỔNG QUÁT NAM
        </Link>
        <hr className="mb-1 md:mb-3" />
        <div className="flex items-center justify-between">
          <div className="flex gap-[3px] text-[8px] opacity-35 md:text-[10px]">
            <FaHeart />
            <FaHeart />
            <FaHeart />
            <FaHeart />
            <FaHeart />
          </div>
          <div className="flex items-center gap-1 text-[9px] font-semibold md:gap-2 md:text-[12px]">
            <SiTicktick /> 17
          </div>
        </div>
        <div className="mt-3 flex items-center justify-center gap-1 rounded-md border border-primary-500 py-1 text-[10px] font-semibold text-primary-500 hover:cursor-pointer hover:bg-primary-500 hover:text-white md:py-2 md:text-[13px]">
          Đặt ngay <AiOutlineDoubleRight />
        </div>
      </div>
    </div>
  );
}

ServiceProduct.propTypes = {
  props: PropTypes.object,
};
