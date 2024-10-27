
import { useEffect } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "@/redux/cartSlice";

export default function PaymentSuccess() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearCart());
    }, [dispatch]);

    return (
        <div className="flex items-center justify-center bg-[#E8F2F7]">
            <div className="p-20 text-center">
                <div className="flex items-center justify-center mb-4">
                    <FaCircleCheck className="text-8xl text-primary-500" />
                </div>
                <div>
                    <h1 className="text-xl md:text-3xl">
                        Đặt lịch khám thành công
                    </h1>
                    <p className="text-lg md:text-xl mt-2 w-[60]%">Chúng tôi sẽ sớm liên hệ tới bạn. <br /> Cảm ơn bạn đã tin tưởng và chọn lựa dịch vụ của Diamond</p>
                </div>
                <div className="mt-8">
                    <Link className="border-primary-500 border px-10 py-3 rounded-lg mr-4 text-primary-500" to="/">
                        Quay về trang chủ
                    </Link>
                    <Link className="bg-primary-500 px-10 py-3 rounded-lg text-white" to="/profile/appointments">
                        Xem lịch sử đặt
                    </Link>
                </div>
            </div>
        </div>
    );
}
