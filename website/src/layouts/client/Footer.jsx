import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import brandLogo from "@/assets/images/brandLogo.png";

export default function Footer() {
  return (
    <footer className="bg-primary-500">
      <div className="mx-auto max-w-screen-xl px-3 py-5 text-sm text-white sm:px-5 lg:py-10">
        <div className="flex flex-col justify-between gap-2 border-b-[1px] border-slate-300 pb-4 lg:flex-row lg:gap-28">
          <div className="flex-[2]">
            <Link
              to={"/"}
              className="relative inline-block h-14 w-72 items-center"
            >
              <img src={brandLogo} className="w-full" alt="Logo" />
            </Link>
            <ul className="mt-6">
              <li className="pb-3">
                <p>
                  <strong className="font-medium">Hotline </strong>
                  <span className="text-sm font-normal">19001008</span>
                </p>
              </li>
              <li className="pb-3">
                <p>
                  <strong className="font-medium">Hỗ trợ </strong>
                  <span className="text-sm font-normal">
                    diamond@contact.com
                  </span>
                </p>
              </li>
              <li className="pb-3">
                <p>
                  <span className="text-sm font-normal">
                    Copyright © 2017-2024 Rai and Rohl Technologies, Inc. All
                    rights reserved.
                  </span>
                </p>
              </li>
            </ul>
          </div>
          <div className="flex flex-[3] flex-wrap justify-between gap-3">
          
            <div className="">
              <h6 className="pb-2 text-lg font-semibold">Chính sách</h6>
              <ul>
                <li className="pb-2">
                  <Link to="/docs/privacy-policy" className="text-sm font-normal">
                   Chính sách bảo mật
                  </Link>
                </li>
                <li className="pb-2">
                  <Link to="/docs/payment-policy" className="text-sm font-normal">
                  Chính sách thanh toán
                  </Link>
                </li>
             
              </ul>
            </div>
            <div className="">
              <h6 className="pb-2 text-lg font-semibold">Liên hệ</h6>
              <ul>
                <li className="pb-2">
                  <Link to="/" className="text-sm font-normal">
                  Tổng đài đặt hẹn: 02839307575
                  </Link>
                </li>
                <li className="pb-2">
                  <Link to="/" className="text-sm font-normal">
                  Tư vấn y khoa: 0793840678
                  </Link>
                </li>
                <li className="pb-2">
                  <Link to="/" className="text-sm font-normal">
                  Chăm sóc KH: 0904720672
                  </Link>
                </li>
              </ul>
            </div>
          
            <div className="">
              <h6 className="pb-2 text-lg font-semibold">Kết nối</h6>
              <div className="">
                <iframe
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fdakhoadiamond&tabs=d%C3%B2ng%20th%E1%BB%9Di%20gian&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=298849536467243"
                  width="240"
                  height="130"
                  style={{ border: "none", overflow: "hidden" }}
                  scrolling="no"
                  frameBorder="0"
                  allowfullscreen="true"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-3 pt-8 lg:flex-row lg:gap-28">
          <div className="flex-[2]">
            <h6 className="pb-3 font-semibold">
              CÔNG TY TNHH PHÒNG KHÁM ĐA KHOA DIAMOND
            </h6>
            <p className="text-sm font-normal">
              Giấy CN ĐKDN số 0309145924, đăng ký lần đầu ngày 06/07/2009, đăng
              ký thay đổi lần thứ 9 ngày 06/07/2023, cấp bởi Sở KH&ĐT Thành phố
              Hồ Chí Minh.
            </p>
          </div>
          <div className="flex flex-[3] flex-col justify-between gap-3 lg:flex-row">
            <div className="flex-[2]">
              <h6 className="pb-2 text-lg font-semibold">Địa chỉ</h6>
              <p className="pb-4 text-sm font-normal">
                Phòng khám Đa khoa Cao cấp Diamond - Diamond Healthcare 39 Lê
                Duẩn, Phường Bến Nghé, Quận 1, TP.HCM
              </p>
              <h6 className="pb-2 text-lg font-semibold">
                Hãy theo dõi Diamond tại
              </h6>
              <div className="flex gap-3">
                <Link to="/" className="text-sm font-normal">
                  <FaFacebookSquare className="text-2xl" />
                </Link>
                <Link to="/" className="text-sm font-normal">
                  <FaInstagram className="text-2xl" />
                </Link>
              </div>
            </div>
            <div className="mt-4 flex flex-1 lg:mt-0 lg:justify-end">
              <div>
                <img
                  src="https://dangkywebvoibocongthuong.com/wp-content/uploads/2021/11/logo-da-thong-bao-bo-cong-thuong.png"
                  width={200}
                  alt="Notification"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
