import { axiosInstanceGET, axiosInstanceCUD } from "./axiosInstance";

const staffApi = {

  getDataStaffs: async (filter) => {
    const res = await axiosInstanceGET.get("/staffs", {
      params: {
        ...filter,
      }
    });
    return res.data;
  },

  getAllStaff: async () => {
    const res = await axiosInstanceGET.get("/staffs");
    return res.data.data;
  },

  getStaffById: async (id) => {
    const res = await axiosInstanceGET.get(`/staffs/${id}`);
    return res.data.data;
  },

  createStaff: async (staff) => {
    const res = await axiosInstanceCUD.post("/staffs/add", staff);
    return res.data.data;
  },

  updateStaff: async (id, requestData) => {
    const res = await axiosInstanceCUD.put(`/staffs/update/${id}`, requestData);
    return res.data.data;
  },

  deleteStaff: async (id) => {
    const res = await axiosInstanceCUD.delete(`/staffs/delete/${id}`);
    return res.data.data;
  },
};

export default staffApi;
