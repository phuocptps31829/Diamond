import { MdEmail } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
export default function TopHeader() {
  return (
    <div className="bg-primary-500">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-3 py-1 text-white sm:px-12">
        <div>Hệ thống phòng khám</div>
        <div className="flex items-center justify-between gap-10">
          <div className="flex items-center justify-center gap-x-1 text-center">
            <MdEmail className="size-5" />
            <span className="text-sm">Email: cskh@ykhoadiamond.com</span>
          </div>
          <div className="flex items-center justify-center gap-x-1 text-center">
            <IoIosCall className="size-5" />
            <span className="text-sm"> Đặt hẹn: 02839307575</span>
          </div>
        </div>
      </div>
    </div>
  );
}
