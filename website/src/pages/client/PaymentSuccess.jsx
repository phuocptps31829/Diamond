import { Link, useSearchParams } from "react-router-dom";
import successImage from "../../assets/images/credit.png";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/cartSlice";

export default function PaymentSuccess() {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    const getLink = () => {
        const ids = searchParams.getAll("id[]");
        return `/profile/appointments/detail/${ids[0]}`;
    };

    useEffect(() => {
        dispatch(clearCart());
    }, [dispatch]);

    return (
        <div className="flex items-center justify-center bg-[#E8F2F7]">
            <div className="px-10 py-5 text-center bg-white my-10 rounded-lg shadow-lg">
                <div className="flex items-center justify-center">
                    <img
                        src={ successImage }
                        alt="success"
                        className="w-8 h-8 md:w-36 md:h-36"
                    />
                </div>
                <div>
                    <h1 className="text-xl md:text-[22px] font-semibold">
                        Đặt lịch khám thành công
                    </h1>
                    <p className="text-[16px] mt-2 w-[60]% text-[#707982]">Chúng tôi sẽ sớm liên hệ tới bạn. <br /> Cảm ơn bạn đã tin tưởng và chọn lựa dịch vụ của Diamond!
                    </p>
                </div>
                <div className="mt-5 flex justify-center pb-4">
                    <Link className="border-primary-500 border px-5 py-2 rounded-lg mr-4 text-primary-500 block text-[15px]" to="/">
                        Quay về trang chủ
                    </Link>
                    <Link
                        className="bg-primary-500 px-5 py-2 rounded-lg text-white block text-[15px]"
                        to={ getLink() }
                    >
                        Xem lịch sử đặt
                    </Link>
                </div>
            </div>
        </div>
    );
}
