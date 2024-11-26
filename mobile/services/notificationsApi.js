import { axiosInstanceGET } from "./axiosInstance";

export const notificationsApi = {
  getNotifications: async () => {
    try{
      const res = await axiosInstanceGET.get(`/notifications/get-by-user`);
      console.log("res", res.data.data)
      return res.data.data;
    } catch (error) {
      return error;
    }
  },
};
