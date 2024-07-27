import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AiOutlineDoubleRight } from "react-icons/ai";

export default function DoctorProduct({ props }) {
  return (
    <div className="overflow-hidden rounded-sm shadow-sm">
      <Link
        to="/doctor-detail/1"
        className="group flex items-center justify-center overflow-hidden p-3"
      >
        <img
          src="https://benhviennamsaigon.com.vn/vnt_upload/doctor/01_2022/18_Vo_Van_Man.jpg"
          alt=""
          className="ease w-[250px] transform rounded-full border border-gray-400 transition-transform duration-500 group-hover:scale-[1.05]"
        />
      </Link>
      <div className="flex flex-col bg-white p-3 shadow-2xl md:p-5">
        <Link
          to="/doctor-detail/1"
          className="text-[9px] font-semibold text-[#7a7a7a] md:text-[13px]"
        >
          Chuyên khoa: Mắt
        </Link>
        <Link
          to="/doctor-detail/1"
          className="py-2 text-[12px] font-bold sm:text-[14px] md:my-1 md:text-xl"
        >
          NGUYỄN KIM CHUNG
        </Link>
        <hr className="mb-1 md:mb-3" />
        <div className="flex items-center justify-between text-[10px] font-medium sm:text-[14px]">
          <span>Kinh nghiệm:</span> 5 năm
        </div>
        <div className="mt-3 flex items-center justify-center gap-1 rounded-md border border-primary-500 py-1 text-[10px] font-semibold text-primary-500 hover:cursor-pointer hover:bg-primary-500 hover:text-white md:py-2 md:text-[13px]">
          Đặt ngay <AiOutlineDoubleRight />
        </div>
      </div>
    </div>
  );
}

DoctorProduct.propTypes = {
  props: PropTypes.object,
};
