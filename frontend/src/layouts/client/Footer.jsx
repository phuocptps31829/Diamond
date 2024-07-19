import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
    return <footer className="bg-primary-500">
        <div className="mx-auto max-w-screen-2xl px-3 py-5 sm:px-10 lg:py-10 text-white text-sm">
            <div className="border-b-[1px] border-slate-300 flex lg:flex-row flex-col justify-between gap-2 lg:gap-28 pb-4">
                <div className="flex-[2]">
                    <Link
                        to={ "/" }
                        className="relative h-14 w-50 inline-block items-center"
                    >
                        <img src="https://ykhoadiamond.com/images/icons/logo.png" className="w-full" alt="Logo" />
                    </Link>
                    <ul className="mt-6">
                        <li className="pb-3">
                            <p>
                                <strong className="font-medium">Hotline </strong>
                                <span>19001008</span>
                            </p>
                        </li>
                        <li className="pb-3">
                            <p>
                                <strong className="font-medium">Hỗ trợ </strong>
                                <span>diamond@contact.com</span>
                            </p>
                        </li>
                        <li className="pb-3">
                            <p>
                                <span>Copyright © 2017-2024 Rai and Rohl Technologies, Inc. All rights reserved.</span>
                            </p>
                        </li>
                    </ul>
                </div>
                <div className="flex-[3] flex flex-wrap gap-3 justify-between">
                    <div className="">
                        <h6 className="font-semibold text-lg pb-2">Dịch vụ</h6>
                        <ul>
                            <li className="pb-2">
                                <Link to="/">
                                    Đặt lịch khám chữa bệnh
                                </Link>
                            </li>
                            <li className="pb-2">
                                <Link to="/">
                                    Đặt lịch khám chữa bệnh
                                </Link>
                            </li>
                            <li className="pb-2">
                                <Link to="/">
                                    Đặt lịch khám chữa bệnh
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="">
                        <h6 className="font-semibold text-lg pb-2">Dịch vụ</h6>
                        <ul>
                            <li className="pb-2">
                                <Link to="/">
                                    Đặt lịch khám chữa bệnh
                                </Link>
                            </li>
                            <li className="pb-2">
                                <Link to="/">
                                    Đặt lịch khám chữa bệnh
                                </Link>
                            </li>
                            <li className="pb-2">
                                <Link to="/">
                                    Đặt lịch khám chữa bệnh
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="">
                        <h6 className="font-semibold text-lg pb-2">Dịch vụ</h6>
                        <ul>
                            <li className="pb-2">
                                <Link to="/">
                                    Đặt lịch khám chữa bệnh
                                </Link>
                            </li>
                            <li className="pb-2">
                                <Link to="/">
                                    Đặt lịch khám chữa bệnh
                                </Link>
                            </li>
                            <li className="pb-2">
                                <Link to="/">
                                    Đặt lịch khám chữa bệnh
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-3 justify-between lg:gap-28 pt-8">
                <div className="flex-[2]">
                    <h6 className="font-semibold pb-3">CÔNG TY TNHH PHÒNG KHÁM ĐA KHOA DIAMOND</h6>
                    <p>
                        Giấy CN ĐKDN số 0309145924, đăng ký lần đầu ngày 06/07/2009, đăng ký thay đổi lần thứ 9 ngày 06/07/2023, cấp bởi Sở KH&ĐT Thành phố Hồ Chí Minh.
                    </p>
                </div>
                <div className="flex-[3] flex lg:flex-row flex-col gap-3 justify-between">
                    <div className="flex-[2]">
                        <h6 className="font-semibold text-lg pb-2">Địa chỉ</h6>
                        <p className="pb-4">
                            Phòng khám Đa khoa Cao cấp Diamond - Diamond Healthcare 39 Lê Duẩn, Phường Bến Nghé, Quận 1, TP.HCM
                        </p>
                        <h6 className="font-semibold text-lg pb-2">Hãy theo dõi Diamond tại</h6>
                        <div className="flex gap-3">
                            <Link to="/">
                                <FaFacebookSquare className="text-2xl" />
                            </Link>
                            <Link to="/">
                                <FaInstagram className="text-2xl" />
                            </Link>
                        </div>
                    </div>
                    <div className="flex-1 flex mt-4 lg:mt-0 lg:justify-end">
                        <div>
                            <img src="https://dangkywebvoibocongthuong.com/wp-content/uploads/2021/11/logo-da-thong-bao-bo-cong-thuong.png" width={ 200 } alt="Notification" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>;
}