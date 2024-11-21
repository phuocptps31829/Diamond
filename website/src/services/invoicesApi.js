import { axiosInstanceCUD, axiosInstanceGET } from "./axiosInstance";

export const invoicesApi = {
  getRevenueStatistics: async () => {
    const res = await axiosInstanceGET.get("/revenue");
    return res.data.data;
  },
  getAllInvoices: async () => {
    const res = await axiosInstanceGET.get("/invoices?noPaginated=true");
    return res.data;
  },
  updateStatus: async (id, status) => {
    try {
      const res = await axiosInstanceCUD.patch(
        `/invoices/update-status/${id}`,
        { status }
      );
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  updatePaymentStatus: async (id, status) => {
    try {
      const res = await axiosInstanceCUD.patch(
        `/invoices/payment/update-status/${id}`,
        { status }
      );
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  updateOrderNumber: async (id, priority) => {
    try {
      const res = await axiosInstanceCUD.patch(
        `/invoices/update-order-number/${id}`,
        { priority }
      );
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  deleteInvoice: async (id) => {
    try {
      const res = await axiosInstanceCUD.delete(`/invoices/delete/${id}`);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  deleteInvoiceMultiple: async (ids) => {
    try {
      const res = await axiosInstanceCUD.post(
        `/invoices/delete-in-id`,

        {
          ids: [...ids],
        }
      );
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
