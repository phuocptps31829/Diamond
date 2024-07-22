import Product from "../product/Product";
import { Link } from "react-router-dom";
import { AiOutlineDoubleRight } from "react-icons/ai";
export default function OutstandingProduct() {
  return (
    <div className="mx-auto my-5 max-w-screen-xl md:my-10">
      <div className="w-full text-center text-[23px] font-bold md:text-[35px]">
        Gói khám nổi bật
      </div>
      <span className="mx-auto block w-full max-w-[90%] my-2 text-center text-[14px] text-[#6D7280] md:max-w-[800px] md:text-[16px]">
        Danh sách gói khám nổi bật, được khách hàng yêu thích nhất.
      </span>
      <div className="mt-4 grid grid-cols-2 gap-4 px-2 md:grid-cols-3 lg:grid-cols-4 lg:px-3">
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
      <Link
        to="/none"
        className="mx-auto mt-10 my-5 flex font-semibold w-[50%] items-center justify-center gap-2 rounded-md border border-primary-500 py-2 text-[12px] uppercase text-primary-500 hover:bg-primary-500 hover:text-white md:w-[40%] md:text-[14px]"
      >
        Xem tất cả <AiOutlineDoubleRight />
      </Link>
    </div>
  );
}
