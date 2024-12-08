import { Link } from "react-router-dom";
import { HiCursorClick } from "react-icons/hi";
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
              src="https://img.ykhoadiamond.com/Uploads/Content/24102023/e53d8836-2510-4902-941f-e413e146cf8c.png" />
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
              src="https://img.ykhoadiamond.com/Uploads/Content/30032023/070e0c71-7e39-4b15-94f5-7575d61728da.png" />
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
              src="https://img.ykhoadiamond.com/Uploads/Content/30032023/cc88ee5b-520d-4e9d-a47c-abfc7f09abd3.png" />
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
              src="https://img.ykhoadiamond.com/Uploads/Content/22092023/3f1b2005-7741-4046-9146-13dd53def29c.png" />
          </Link>
        </div>
      </div>
    </div>
  );
}
