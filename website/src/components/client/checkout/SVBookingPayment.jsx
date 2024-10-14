import { Button } from "@/components/ui/Button";
import { createAppointment } from "@/services/appointmentApi";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";

import VNPAYICON from "../../../assets/images/vnpay.webp";
import { useToast } from "@/hooks/useToast";
import { ToastAction } from "@/components/ui/Toast";
import { useReadNumber } from "@/hooks/useReadNumber";

export default function Form() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const bookingInfo = useSelector((state) => state.infoBooking);
  const cart = useSelector((state) => state.cart.cart);
  const personHelpInfo = useSelector(
    (state) => state.infoBooking.bookingInfoCheckout?.appointmentHelpUser,
  );
  const profileCustomer = useSelector((state) => state.auth.userProfile);
  const { toast } = useToast();
  const readNumber = useReadNumber();
  const { mutate } = useMutation({
    mutationFn: () =>
      createAppointment(bookingInfo.bookingInfoCheckout, paymentMethod),
    onSuccess: (data) => {
      console.log(data);
      if (paymentMethod === "momo") {
        location.href = data.data.payUrl;
      }
      if (paymentMethod === "vnpay") {
        location.href = data.data;
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmitCheckout = () => {
    if (!paymentMethod) {
      toast({
        variant: "warning",
        title: "Vui lòng chọn phương thức thanh toán",
        status: "warning",
        action: <ToastAction altText="Đóng">Đóng</ToastAction>,
      });
      return;
    }
    mutate();
  };
  const totalAmount = cart.reduce((acc, cur) => (acc += cur.price), 0);
  const totalAmountInWords = readNumber(totalAmount);
  return (
    <div className="mx-auto mt-5 max-w-screen-xl px-4 py-3 md:mt-10 md:px-5 md:py-5">
      <div className="container mx-auto gap-5 rounded-md border px-10 py-5 pb-10 shadow-gray">
        <div>
          <div className="my-6 flex flex-col items-center justify-between md:flex-row">
            <h1 className="text-[16px] font-bold md:text-[24px]">
              Thông tin đặt lịch khám
            </h1>
            <span className="mt-4 text-[16px] md:mt-0 md:text-[20px]">
              <strong>Tổng dịch vụ:</strong>{" "}
              {bookingInfo.bookingDetails?.length} dịch vụ
            </span>
          </div>
          <div className="mb-7 flex flex-col justify-between text-[16px] md:flex-row md:text-[18px]">
            <div className="mb-4 md:mb-0">
              <p className="mb-1 text-[16px] md:text-[20px]">
                <strong>Chi nhánh: </strong>ĐA KHOA DIAMOND
              </p>
              <p className="mb-1">
                <strong>Ngày khám: </strong>18/08/2024
              </p>
              <p className="mb-1">
                <strong>Giờ khám: </strong>08:30
              </p>
            </div>
            <div className="w-full md:w-[50%]">
              <p>Dịch vụ đã chọn:</p>
              {/* Services list */}
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="relative mb-3 mt-2 max-w-full rounded-lg border border-primary-500 px-2 py-2 md:px-3 md:py-2"
                >
                  <div className="flex flex-row items-center md:flex-row">
                    <img
                      src={item.image}
                      className="w-[60px] sm:w-[80px] md:w-[110px]"
                      alt={item.name}
                    />
                    <div className="ml-3 flex flex-col">
                      <a
                        href="/"
                        className="text-[12px] font-bold uppercase sm:text-[16px] md:text-[18px]"
                      >
                        {item.name}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr />
        <h1 className="my-6 text-[16px] font-bold md:text-[24px]">
          Thông tin người khám
        </h1>
        <div className="mb-7 flex flex-col justify-between md:flex-row">
          <div className="mb-0 w-full text-[14px] md:mb-4 md:w-[48%] md:text-[18px]">
            <p className="mb-2">
              <strong>Họ tên: </strong>
              {personHelpInfo
                ? personHelpInfo.fullName
                : profileCustomer.fullName}
            </p>
            <p className="mb-2">
              <strong>Email: </strong>
              {personHelpInfo ? personHelpInfo.email : profileCustomer.email}
            </p>
            <p className="mb-2">
              <strong>Số điện thoại: </strong>
              {personHelpInfo
                ? personHelpInfo.phoneNumber
                : profileCustomer.phoneNumber}
            </p>
            <p className="mb-2">
              <strong>Giới tính: </strong>
              {personHelpInfo ? personHelpInfo.gender : profileCustomer.gender}
            </p>
            <p className="mb-2">
              <strong>Ngày sinh: </strong>
              {new Intl.DateTimeFormat("vi-VN").format(
                new Date(
                  personHelpInfo
                    ? personHelpInfo.dateOfBirth
                    : profileCustomer.dateOfBirth,
                ),
              )}
            </p>
            <p className="mb-2">
              <strong>Địa chỉ: </strong>
              {personHelpInfo
                ? personHelpInfo.address.street
                : profileCustomer.address.street}
              ,{" "}
              {personHelpInfo
                ? personHelpInfo.address.ward
                : profileCustomer.address.ward}
              ,{" "}
              {personHelpInfo
                ? personHelpInfo.address.district
                : profileCustomer.address.district}
              ,{" "}
              {personHelpInfo
                ? personHelpInfo.address.province
                : profileCustomer.address.province}
            </p>
          </div>
          <div className="w-full text-[14px] md:w-[48%] md:text-[18px]">
            <p className="mb-2">
              <strong>Nghề nghiệp: </strong>
              {personHelpInfo
                ? personHelpInfo.occupation
                : profileCustomer.occupation}
            </p>
            <p className="mb-2">
              <strong>Dân tộc: </strong>
              {personHelpInfo ? personHelpInfo.ethnic : profileCustomer.ethnic}
            </p>
            <p className="mb-2">
              <strong>Số CCCD: </strong>
              {personHelpInfo
                ? personHelpInfo.citizenIdentificationNumber
                : profileCustomer.citizenIdentificationNumber}
            </p>
            <p className="mb-2">
              <strong>Số BHYT: </strong>
              {personHelpInfo
                ? personHelpInfo.insuranceCode
                : profileCustomer.insuranceCode}
            </p>
          </div>
        </div>
        <hr />
        {/* Thanh toán */}
        <div className="mt-6">
          <h1 className="mb-5 text-[16px] font-bold md:text-[24px]">
            Phương thức thanh toán
          </h1>
          <div className="flex flex-col justify-between gap-4 md:flex-row">
            <div className="flex w-full flex-col gap-4">
              <label
                onClick={() => setPaymentMethod("momo")}
                className={`flex cursor-pointer items-center rounded-md border-2 border-gray-500 p-4 ${paymentMethod === "momo" ? "border-2 border-primary-500" : ""}`}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
                  className="mr-4 w-[10%]"
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
                onClick={() => setPaymentMethod("banking")}
                className={`flex cursor-pointer items-center rounded-md border-2 border-gray-500 p-4 ${paymentMethod === "banking" ? "border-2 border-primary-500" : ""}`}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/6963/6963703.png"
                  className="mr-4 w-[10%]"
                />
                <span>Thanh toán ngân hàng</span>
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
                onClick={() => setPaymentMethod("vnpay")}
                className={`flex cursor-pointer items-center rounded-md border-2 border-gray-500 p-4 ${paymentMethod === "vnpay" ? "border-2 border-primary-500" : ""}`}
              >
                <img src={VNPAYICON} alt="VNPAYICON" className="mr-4 w-[10%]" />
                <span>Thanh toán qua VNPay</span>
                <input
                  type="radio"
                  name="payment"
                  value="zalopay"
                  className="ml-auto"
                />
              </label>

              <label
                className={`flex cursor-pointer items-center rounded-md border-2 border-gray-500 p-4 ${paymentMethod === "ccc" ? "border-2 border-primary-500" : ""}`}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1019/1019607.png"
                  className="mr-4 w-[10%]"
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
        {/* Nút tiếp tục */}
        <div className="mt-7 ">
          <div className="w-full flex justify-between">
          <p className=" flex justify-end text-base">
            Bằng chữ:
            <span className=" ml-1 font-bold text-red-500">{totalAmountInWords}</span>
          </p>
          <p className="flex justify-end text-xl md:text-2xl">
            Tổng tiền:
            <strong className="ml-3 text-red-500 font-medium">
              {totalAmount.toLocaleString()}₫
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
              onClick={handleSubmitCheckout}
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
