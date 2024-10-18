import { axiosInstanceCUD } from "./axiosInstance";

export const createAppointment = async (data, provider) => {
  let endpoint = null;
  switch (provider) {
    case "vnpay":
      endpoint = "/invoices/payment/vnpay";
      break;
    case "momo":
      endpoint = "/invoices/payment/momo";
      break;
    case "cod":
      endpoint = "/invoices/payment/cod";
      break;
    default:
      break;
  }

  console.log(endpoint);

  try {
    const res = await axiosInstanceCUD.post(endpoint, data);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
