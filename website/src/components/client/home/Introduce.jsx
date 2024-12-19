import { Link } from "react-router-dom";
import { HiCursorClick } from "react-icons/hi";

import img1 from "../../../assets/images/cơ sở vật chất-min.jpg";
import img2 from "../../../assets/images/đội ngũ bác sĩ-min.jpg";
import img3 from "../../../assets/images/bệnh án điện tử-min.jpg";
import img4 from "../../../assets/images/hệ thống phòng khám-min.jpg";

export default function Introduce() {
  return (
    <div className="mx-auto max-w-screen-xl md:my-4">
      <div className="mb-4 w-full text-center text-[23px] font-bold md:mb-2 md:text-[35px]">
        Giới thiệu y khoa Diamond
      </div>
      <span className="mx-auto -mt-2 block w-full max-w-[90%] text-center text-[14px] text-[#6D7280] md:max-w-[800px] md:text-[16px]">
        Hệ Thống Y Khoa Diamond tự hào mang đến cho khách hàng những dịch vụ tốt
        nhất, chất lượng cao, tận tâm nhằm gánh vác một phần trách nhiệm trong
        việc chăm sóc sức khỏe cho cộng đồng và xã hội.
      </span>
      <div className="my-5 grid gap-4 px-3 sm:px-5 md:grid-cols-2 ">
        <div className="flex items-center justify-center rounded-md bg-primary-100">
          <Link
            to="/doctors"
            className="flex flex-col items-center p-6 pb-8"
          >
            <h2 className="mb-0 text-[20px] font-bold sm:text-[27px]">
              Đội ngũ Y - Bác sĩ
            </h2>
            <span className="pb-2 flex items-center gap-2 text-primary-600">
              Xem chi tiết <HiCursorClick />
            </span>
            <img
              className="rounded-md"
              src={ img2 } />
          </Link>
        </div>
        <div className="flex items-center justify-center rounded-md bg-primary-100">
          <Link
            to="/facility"
            className="flex flex-col items-center p-6 pb-8"
          >
            <h2 className="mb-0 text-[20px] font-bold sm:text-[27px]">
              Cơ sở vật chất
            </h2>
            <span className="pb-2 flex items-center gap-2 text-primary-600">
              Xem chi tiết <HiCursorClick />
            </span>
            <img
              className="rounded-md"
              src={ img1 } />
          </Link>
        </div>
        <div className="flex items-center justify-center rounded-md bg-primary-100">
          <Link
            to="/profile/medical-records"
            className="flex flex-col items-center p-6 pb-8"
          >
            <h2 className="mb-0 text-[20px] font-bold sm:text-[27px]">
              Bệnh án điện tử
            </h2>
            <span className="pb-2 flex items-center gap-2 text-primary-600">
              Xem chi tiết <HiCursorClick />
            </span>
            <img
              className="rounded-md"
              src={ img3 } />
          </Link>
        </div>
        <div className="flex items-center justify-center rounded-md bg-primary-100">
          <Link
            to="/branch"
            className="flex flex-col items-center p-6 pb-8"
          >
            <h2 className="mb-0 text-[20px] font-bold sm:text-[27px]">
              Hệ thống phòng khám
            </h2>
            <span className="pb-2 flex items-center gap-2 text-primary-600">
              Xem chi tiết <HiCursorClick />
            </span>
            <img
              className="rounded-md"
              src={ img4 } />
          </Link>
        </div>
      </div>
    </div>
  );
}
