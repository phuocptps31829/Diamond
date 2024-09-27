import { getStatusStyle } from "../utils/StatusStyle";

const BookingInfo = () => {
  const bookingData = {
    doctor: "Dr. Nguyễn Văn B",
    serviceType: "Khám lần 1",
    serviceList: ["Khám tim", "Khám tai", "Khám mắt"],
    time: "13:30",
    status: "Chờ xác nhận",
    price: 9999,
    quantity: 1,
    appointmentDate: "2024-09-25",
    branch: "Phòng khám Đa khoa ABC, Quận 3, TP. HCM",
    paymentMethod: "Thanh toán qua Momo",
    statusPayment: "Thanh toán thành công",
    room: "Phòng 1",
    extraFees: 2000,
  };

  return (
    <div className="mt-8 w-full">
      <h1 className="mb-1 text-lg font-semibold text-gray-700">
        Thông tin lịch khám
      </h1>
      <div className="rounded-xl bg-white px-4 py-4 shadow-md sm:px-6 sm:py-6">
        <div className="grid grid-cols-1 items-start gap-8 sm:grid-cols-1 md:grid-cols-10">
          <div className="md:col-span-3 col-span-6">
            <strong className="font-medium text-black">
              Dịch vụ / gói khám:
            </strong>
            <ul className="ml-4 list-disc">
              {bookingData.serviceList.map((svc) => (
                <div className="relative py-3" key={svc}>
                  <label className="flex cursor-pointer select-none rounded-lg p-3 outline outline-black">
                    <div className="flex items-center gap-4">
                      <img
                        src="https://img.ykhoadiamond.com/uploads/package/12042023/57f12ac8-2eaf-4bbc-a9ed-2038d671f63a.jpg"
                        className="w-[60px] sm:w-[75px] md:w-[100px]"
                        alt={`Image of ${svc}`}
                      />
                      <div className="flex flex-col">
                        <p className="text-[13px] font-bold sm:text-[16px] md:text-[18px]">
                          {svc}
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              ))}
            </ul>
          </div>

          <div className="col-span-7 grid w-full grid-cols-1 gap-6 gap-x-4 sm:grid-cols-2 md:mt-7 mt-0">
            <p className=" text-gray-600">
              <strong className="font-medium text-black">Chi nhánh:</strong>{" "}
              {bookingData.branch}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium text-black">Bác sĩ:</strong>{" "}
              {bookingData.doctor}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium text-black">Loại khám:</strong>{" "}
              {bookingData.serviceType}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium text-black">Thời gian:</strong>{" "}
              {bookingData.time}
            </p>
            <p className="text-red-600">
              <strong className="font-medium text-black">Trạng thái:</strong>{" "}
              {bookingData.status}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium text-black">Tổng giá:</strong>{" "}
              {bookingData.price} VND
            </p>
            <p className="text-red-600">
              <strong className="font-medium text-black">Phí phát sinh:</strong>{" "}
              {bookingData.extraFees}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium text-black">Ngày khám:</strong>{" "}
              {bookingData.appointmentDate}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium text-black">Phòng:</strong>{" "}
              {bookingData.room}
            </p>
            <p className="text-primary-500">
              <strong className="font-medium text-black">
                Tổng số lượng dịch vụ / gói khám:
              </strong>{" "}
              {bookingData.quantity}
            </p>
            <p className="text-gray-600 sm:col-span-2">
              <strong className="font-medium text-black">
                Phương thức thanh toán:
              </strong>{" "}
              {bookingData.paymentMethod}
            </p>
            <div className="flex w-max items-center justify-center gap-2">
              <strong className="font-medium text-black">
                Trạng thái thanh toán:
              </strong>
              <div
                className={`relative grid select-none items-center whitespace-nowrap rounded-md px-2 py-1 font-sans text-xs font-bold uppercase ${getStatusStyle(
                  bookingData.statusPayment,
                )}`}
              >
                <span>{bookingData.statusPayment}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingInfo;
