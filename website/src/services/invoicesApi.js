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
    const res = await axiosInstanceCUD.patch(
      `/invoices/update-status/${id}`,
      { status }
    );
    return res.data;
  },
  updatePaymentStatus: async (id, status) => {
    const res = await axiosInstanceCUD.patch(
      `/invoices/payment/update-status/${id}`,
      { status }
    );
    return res.data;
  },
  updateOrderNumber: async (id, priority) => {
    const res = await axiosInstanceCUD.patch(
      `/invoices/update-order-number/${id}`,
      { priority }
    );
    return res.data;
  },
  deleteInvoice: async (id) => {
    const res = await axiosInstanceCUD.delete(`/invoices/delete/${id}`);
    return res.data;
  },
  deleteInvoiceMultiple: async (ids) => {
    const res = await axiosInstanceCUD.post(
      `/invoices/delete-in-id`,

      {
        ids: [...ids],
      }
    );
    return res.data;
  },
};
