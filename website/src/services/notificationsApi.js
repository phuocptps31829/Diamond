import { axiosInstanceGET,axiosInstanceCUD } from "./axiosInstance";

export const notificationsApi = {
  getNotificationsByUser: async () => {
    const res = await axiosInstanceGET.get("/notifications/get-by-user");
    console.log(res.data);
    return res.data;
  },
  IsReadNotification: async (id) => {
    const res = await axiosInstanceCUD.post(`/notifications/update/is-read/${id}`);
    return res.data;
  },
};
