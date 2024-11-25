import { axiosInstanceGET } from "./axiosInstance";

export const notificationsApi = {
  getNotificationsByUser: async () => {
    const res = await axiosInstanceGET.get("/notifications/get-by-user");
    console.log(res.data);
    return res.data;
  },
};
