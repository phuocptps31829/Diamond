import { Button } from "@/components/ui/Button";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";
import { appointmentApi } from "@/services/appointmentsApi";
import { useReadNumber } from "@/hooks/useReadNumber";
import VNPAY_ICON from "../../../assets/images/vnpay.png";
import { toast } from "react-toastify";

export default function Form() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const bookingInfo = useSelector((state) => state.infoBooking);
  const cart = useSelector((state) => state.cart.cart);
  const personHelpInfo = useSelector(
    (state) => state.infoBooking.bookingInfoCheckout?.appointmentHelpUser
  );
  const profileCustomer = useSelector((state) => state.auth.userProfile);
  const readNumber = useReadNumber();

  const { mutate } = useMutation({
    mutationFn: () =>
      appointmentApi.createAppointment(
        bookingInfo.bookingInfoCheckout,
        paymentMethod
      ),
    onSuccess: (data) => {
      console.log(data);
      if (paymentMethod === "momo") {
        location.href = data.data.payUrl;
      }
      if (paymentMethod === "vnpay") {
        console.log(data.payUrl);
        location.href = data.data.payUrl;
      }
      if (paymentMethod === "cod") {
        location.href = "/payment-success";
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmitCheckout = () => {
    if (!paymentMethod) {
      toast.error("Vui lòng chọn phương thức thanh toán");
      return;
    }
    mutate();
  };
  const totalAmount = cart.reduce((acc, cur) => (acc += cur.price), 0);
  const totalAmountInWords = readNumber(totalAmount);

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-3 md:px-5 md:py-10">
      <div className="container mx-auto gap-5 rounded-lg bg-white px-10 py-5 pb-10">
        {/* <div>
          <div className="my-3 flex flex-col items-center justify-between md:flex-row">
            <h1 className="text-[16px] font-bold md:text-[24px]">
              Thông tin đặt lịch khám
            </h1>
            <span className="mt-4 text-[16px] md:mt-0 md:text-[20px]">
              <strong>Tổng dịch vụ:</strong>{ " " }
              { bookingInfo.bookingDetails?.length } dịch vụ
            </span>
          </div>
          <div className="mb-6 flex flex-col justify-between text-[16px] md:flex-row md:text-[18px]">
            <div className="w-full md:w-[50%]">
              <p>Dịch vụ đã chọn:</p>
              { cart.map((item, index) => (
                <div
                  key={ index }
                  className="relative mb-3 mt-2 max-w-full rounded-lg border border-primary-500 px-2 py-2 md:px-3 md:py-2"
                >
                  <div className="flex flex-row items-center md:flex-row">
                    <img
                      src={ `${import.meta.env.VITE_IMAGE_API_URL}/${item.image}` }
                      className="w-[60px] sm:w-[80px] md:w-[110px]"
                      alt={ item.name }
                    />
                    <div className="ml-3 flex flex-col">
                      <a
                        href="/"
                        className="text-[12px] font-bold uppercase sm:text-[16px] md:text-[18px]"
                      >
                        { item.name }
                      </a>
                    </div>
                  </div>
                </div>
              )) }
            </div>
          </div>
        </div>
        <hr /> */}
        <h1 className="my-3 text-[16px] font-bold md:text-[24px]">
          Thông tin người khám
        </h1>
        <div className="mb-3 flex flex-col justify-between md:flex-row">
          <div className="mb-0 w-full text-[14px] md:mb-4 md:w-[48%] md:text-[18px]">
            <p className="mb-2">
              <strong>Họ tên: </strong>
              { personHelpInfo
                ? personHelpInfo.fullName
                : profileCustomer.fullName }
            </p>
            <p className="mb-2">
              <strong>Email: </strong>
              { (personHelpInfo ? personHelpInfo.email : profileCustomer.email)
                || "Không có" }
            </p>
            <p className="mb-2">
              <strong>Số điện thoại: </strong>
              { personHelpInfo
                ? personHelpInfo.phoneNumber
                : profileCustomer.phoneNumber }
            </p>
            <p className="mb-2">
              <strong>Giới tính: </strong>
              { personHelpInfo ? personHelpInfo.gender : profileCustomer.gender }
            </p>
            <p className="mb-2">
              <strong>Ngày sinh: </strong>
              { new Intl.DateTimeFormat("vi-VN").format(
                new Date(
                  personHelpInfo
                    ? personHelpInfo.dateOfBirth
                    : profileCustomer.dateOfBirth
                )
              ) }
            </p>
            <p className="mb-2">
              <strong>Địa chỉ: </strong>
              { personHelpInfo
                ? personHelpInfo.address
                : profileCustomer.address }
            </p>
          </div>
          <div className="w-full text-[14px] md:w-[48%] md:text-[18px]">
            <p className="mb-2">
              <strong>Nghề nghiệp: </strong>
              { (personHelpInfo
                ? personHelpInfo.occupation
                : profileCustomer.otherInfo.occupation)
                || "Không có" }
            </p>
            <p className="mb-2">
              <strong>Dân tộc: </strong>
              { (personHelpInfo
                ? personHelpInfo.ethnic
                : profileCustomer.otherInfo.ethnic)
                || "Không có" }
            </p>
            <p className="mb-2">
              <strong>Số CCCD: </strong>
              { personHelpInfo
                ? personHelpInfo.citizenIdentificationNumber
                : profileCustomer.citizenIdentificationNumber }
            </p>
            <p className="mb-2">
              <strong>Số BHYT: </strong>
              { (personHelpInfo
                ? personHelpInfo.insuranceCode
                : profileCustomer.otherInfo.insuranceCode)
                || "Không có" }
            </p>
          </div>
        </div>
        <hr />
        {/* Thanh toán */ }
        <div className="mt-3">
          <h1 className="mb-3 text-[16px] font-bold md:text-[24px]">
            Phương thức thanh toán
          </h1>
          <div className="flex flex-col justify-between gap-4 md:flex-row">
            <div className="flex w-full flex-col gap-4">
              <label
                onClick={ () => setPaymentMethod("momo") }
                className={ `flex cursor-pointer items-center rounded-md border-2 border-gray-200 p-4 ${paymentMethod === "momo" ? "border-primary-500" : ""
                  }` }
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
                  className="mr-4 w-[10%]"
                  alt="MOMO"
                />
                <span>Thanh toán qua MOMO</span>
                <input
                  type="radio"
                  name="payment"
                  value="momo"
                  className="ml-auto"
                />
              </label>
              <label
                onClick={ () => setPaymentMethod("zalopay") }
                className={ `flex cursor-pointer items-center rounded-md border-2 border-gray-200 p-4 ${paymentMethod === "zalopay" ? "border-primary-500" : ""
                  }` }
              >
                <img
                  src="../../../../src/assets/images/zalopay.png"
                  className="mr-4 w-[10%]"
                  alt="Ngân hàng"
                />
                <span>Thanh toán ZaloPay</span>
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  className="ml-auto"
                />
              </label>
            </div>
            <div className="flex w-full flex-col gap-4">
              <label
                onClick={ () => setPaymentMethod("vnpay") }
                className={ `flex cursor-pointer items-center rounded-md border-2 border-gray-200 p-4 ${paymentMethod === "vnpay" ? "border-primary-500" : ""
                  }` }
              >
                <img src={ VNPAY_ICON } alt="VNPAY_ICON" className="mr-4 w-[10%]" />
                <span>Thanh toán qua VNPay</span>
                <input
                  type="radio"
                  name="payment"
                  value="zalopay"
                  className="ml-auto"
                />
              </label>

              <label
                onClick={ () => setPaymentMethod("cod") }
                className={ `flex cursor-pointer items-center rounded-md border-2 border-gray-200 p-4 ${paymentMethod === "cod" ? "border-primary-500" : ""
                  }` }
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1019/1019607.png"
                  className="mr-4 w-[10%]"
                  alt="Phòng khám"
                />
                <span>Thanh toán tại phòng khám</span>
                <input
                  type="radio"
                  name="payment"
                  value="clinic"
                  className="ml-auto"
                />
              </label>
            </div>
          </div>
        </div>
        <p className="mt-4 text-[16px] italic text-red-600 md:text-lg">
          ! Trường hợp khách hàng hỗ trợ đặt lịch cho người thân, bệnh án sẽ
          được cập nhật tới tài khoản của người thân.
        </p>
        {/* Nút tiếp tục */ }
        <div className="mt-7">
          <div className="flex w-full justify-between">
            <p className="flex justify-end text-base">
              Bằng chữ:
              <span className="ml-1 font-bold text-red-500">
                { totalAmountInWords }
              </span>
            </p>
            <p className="flex justify-end text-xl md:text-2xl">
              Tổng tiền:
              <strong className="ml-3 font-medium text-red-500">
                { totalAmount.toLocaleString() }₫
              </strong>
            </p>
          </div>

          <div className="mt-6 flex flex-row justify-end gap-3">
            <Button
              className="rounded-md sm:h-10 sm:px-8"
              size="default"
              variant="outline"
            >
              Trở lại
            </Button>
            <Button
              onClick={ handleSubmitCheckout }
              className="rounded-md sm:h-10 sm:px-8"
              size="default"
              variant="primary"
            >
              Tiến hành thanh toán
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
