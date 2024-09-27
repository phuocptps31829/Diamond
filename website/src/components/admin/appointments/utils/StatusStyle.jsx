export const getStatusStyle = (status) => {
    switch (status) {
      case "Chưa thanh toán":
        return "bg-yellow-500/20 text-yellow-900";
      case "Thanh toán thành công":
        return "bg-green-500/20 text-green-900";
      case "Thanh toán thất bại":
        return "bg-red-500/20 text-red-900";
      default:
        return "bg-gray-500/20 text-gray-900";
    }
  };