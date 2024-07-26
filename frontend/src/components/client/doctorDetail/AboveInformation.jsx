import { Link } from "react-router-dom";
import { FaMapLocationDot } from "react-icons/fa6";
export default function AboveInformation() {
  return (
    <div className="mx-auto max-w-screen-xl">
      <div className="flex flex-col items-center justify-center space-y-5 px-5 md:flex-row md:space-x-10 md:px-10">
        <div className="block overflow-hidden rounded-full">
          <img src="https://benhviennamsaigon.com.vn/vnt_upload/doctor/09_2022/NGUYEN_KIM_CHUNG_400X400.jpg" />
        </div>
        <div className="flex flex-col space-y-3">
          <div className="flex text-sm">
            <strong className="block whitespace-nowrap pr-2 md:w-[110px] md:pr-0">
              Chi nhánh:
            </strong>
            Hồ Chí Minh
          </div>
          <div className="text-3xl font-semibold">NGUYỄN KIM CHUNG</div>
          <div className="flex text-sm">
            <strong className="block whitespace-nowrap pr-2 md:w-[110px] md:pr-0">
              Chức vụ:
            </strong>
            Trưởng khoa Tai Mũi Họng
          </div>
          <div className="flex text-sm">
            <strong className="block whitespace-nowrap pr-2 md:w-[110px] md:pr-0">
              Kinh nghiệm:
            </strong>
            Hơn 30 năm kinh nghiệm
          </div>
          <button className="rounded-md bg-primary-500 p-3 text-white duration-500 hover:bg-orange-500">
            Đặt lịch hẹn
          </button>
          <div className="flex flex-col space-y-3 rounded-md bg-white p-5">
            <div className="flex text-[14px] md:text-[15px]">
              <strong className="block whitespace-nowrap pr-2 md:w-[80px] md:pr-0">
                Đặt lịch:
              </strong>
              02839307575
            </div>
            <div className="flex text-[14px] md:text-[15px]">
              <strong className="block whitespace-nowrap pr-2 md:w-[80px] md:pr-0">
                Địa chỉ:
              </strong>
              236/29/18 Điện Biên Phủ - Phường 17 - Quận Bình Thạnh - TPHCM
            </div>
            <Link
              to="/none"
              className="flex items-center justify-center gap-2 text-primary-500 underline"
            >
              Xem bản đồ <FaMapLocationDot />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
