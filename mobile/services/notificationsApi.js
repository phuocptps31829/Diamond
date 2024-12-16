import { axiosInstanceGET, axiosInstanceCUD } from "./axiosInstance";

export const notificationsApi = {
  getNotifications: async () => {
    try{
      const res = await axiosInstanceGET.get(`/notifications/get-by-user`);
      return res.data.data;
    } catch (error) {
      return error;
    }
  },
  IsReadNotification: async (id) => {
    const res = await axiosInstanceCUD.post(`/notifications/update/is-read/${id}`);
    return res.data;
  },
};
