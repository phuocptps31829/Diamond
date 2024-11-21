export const getStatusStyle = (status) => {
  switch (status) {
    case "PENDING":
      return { style: "bg-yellow-500/20 text-yellow-900", text: "Đang chờ" };
    case "CONFIRMED":
      return { style: "bg-blue-500/20 text-blue-900", text: "Đã xác nhận" };
    case "EXAMINED":
      return { style: "bg-green-500/20 text-green-900", text: "Đã khám" };
    case "CANCELLED":
      return { style: "bg-red-500/20 text-red-900", text: "Đã hủy" };
    default:
      return { style: "bg-gray-500/20 text-gray-900", text: "Không xác định" };
  }
};
export const getStatusPaymentStyle = (status) => {
  switch (status) {
    case "PENDING":
      return {
        stylePayment: "bg-yellow-500/20 text-yellow-900",
        textPayment: "Chưa thanh toán",
      };
    case "PAID":
      return { stylePayment: "bg-green-500/20 text-green-900", textPayment: "Đã thanh toán" };
    default:
      return { stylePayment: "bg-gray-500/20 text-gray-900", textPayment: "Không xác định" };
  }
};
