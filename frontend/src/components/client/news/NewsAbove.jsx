import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NewsAbove() {
  return (
    <div className="mx-auto max-w-screen-xl p-3 md:py-10">
      <div className="w-full text-center text-[23px] font-bold uppercase md:text-[35px]">
        Tin tức
      </div>
      <div className="my-3 flex items-center justify-center text-2xl text-[#797676]">
        <img src="https://benhviennamsaigon.com.vn/skins/default/images/line.png" />
      </div>
      <div className="mt-6 grid gap-4 px-2 md:grid-cols-2 md:grid-rows-1 lg:px-3">
        <Link
          to="/news-detail/1"
          className="gap-4 overflow-hidden rounded-md border bg-white md:row-span-3 md:grid-rows-subgrid"
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
              trường làm việc chuyên nghiệp. Hãy cùng hợp tác với Hệ Thống Y
              Khoa Diamond để cùng phát triển - cùng thành công ngay hôm nay.
            </div>
            <div className="mt-3 flex items-center gap-2 text-[13px] font-semibold opacity-50">
              <FaRegEye />
              <div>100</div>
            </div>
          </div>
        </Link>
        <Link
          to="/news-detail/1"
          className="flex flex-col overflow-hidden rounded-md bg-white sm:h-[200px] sm:flex-row"
        >
          <div className="h-full w-[500px] md:w-[40%]">
            <img
              className="h-full w-full object-cover"
              src="https://img.ykhoadiamond.com/uploads/avatar/12072024/b7e64860-6ce1-4909-bcb2-b564f4a15845_M.jpg"
            />
          </div>
          <div className="p-3">
            <div className="mb-[6px] flex gap-2 text-[12px]">
              <div className="font-bold text-primary-700">Tin Tức</div>
              <div className="font-semibold">19, Tháng 7, 2024</div>
              <div>|</div>
              <div className="font-semibold">Admin</div>
            </div>
            <h2 className="my-2 text-[14px] font-bold">
              Dùng chung 1 ứng dụng dữ liệu tiêm chủng vaccine
            </h2>
            <div className="line-clamp-2 overflow-hidden text-ellipsis text-[12px] text-[#6D7280] md:max-w-[340px]">
              Bộ Y tế, Bộ Công an, Bộ Thông tin và Truyền thông cùng thống nhất
              dùng chung một ứng dụng trong khai báo, nhập dữ liệu tiêm chủng
            </div>
            <div className="mt-3 flex items-center gap-2 text-[13px] font-semibold opacity-50">
              <FaRegEye />
              <div>100</div>
            </div>
          </div>
        </Link>
        <Link
          to="/news-detail/1"
          className="flex flex-col overflow-hidden rounded-md bg-white sm:h-[200px] sm:flex-row"
        >
          <div className="h-full w-[500px] md:w-[40%]">
            <img
              className="h-full w-full object-cover"
              src="https://img.ykhoadiamond.com/uploads/avatar/12072024/b7e64860-6ce1-4909-bcb2-b564f4a15845_M.jpg"
            />
          </div>
          <div className="p-3">
            <div className="mb-[6px] flex gap-2 text-[12px]">
              <div className="font-bold text-primary-700">Tin Tức</div>
              <div className="font-semibold">19, Tháng 7, 2024</div>
              <div>|</div>
              <div className="font-semibold">Admin</div>
            </div>
            <h2 className="my-2 text-[14px] font-bold">
              Dùng chung 1 ứng dụng dữ liệu tiêm chủng vaccine
            </h2>
            <div className="line-clamp-2 overflow-hidden text-ellipsis text-[12px] text-[#6D7280] md:max-w-[340px]">
              Bộ Y tế, Bộ Công an, Bộ Thông tin và Truyền thông cùng thống nhất
              dùng chung một ứng dụng trong khai báo, nhập dữ liệu tiêm chủng
            </div>
            <div className="mt-3 flex items-center gap-2 text-[13px] font-semibold opacity-50">
              <FaRegEye />
              <div>100</div>
            </div>
          </div>
        </Link>
        <Link
          to="/news-detail/1"
          className="flex flex-col overflow-hidden rounded-md bg-white sm:h-[200px] sm:flex-row"
        >
          <div className="h-full w-[500px] md:w-[40%]">
            <img
              className="h-full w-full object-cover"
              src="https://img.ykhoadiamond.com/uploads/avatar/12072024/b7e64860-6ce1-4909-bcb2-b564f4a15845_M.jpg"
            />
          </div>
          <div className="p-3">
            <div className="mb-[6px] flex gap-2 text-[12px]">
              <div className="font-bold text-primary-700">Tin Tức</div>
              <div className="font-semibold">19, Tháng 7, 2024</div>
              <div>|</div>
              <div className="font-semibold">Admin</div>
            </div>
            <h2 className="my-2 text-[14px] font-bold">
              Dùng chung 1 ứng dụng dữ liệu tiêm chủng vaccine
            </h2>
            <div className="line-clamp-2 overflow-hidden text-ellipsis text-[12px] text-[#6D7280] md:max-w-[340px]">
              Bộ Y tế, Bộ Công an, Bộ Thông tin và Truyền thông cùng thống nhất
              dùng chung một ứng dụng trong khai báo, nhập dữ liệu tiêm chủng
            </div>
            <div className="mt-3 flex items-center gap-2 text-[13px] font-semibold opacity-50">
              <FaRegEye />
              <div>100</div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
