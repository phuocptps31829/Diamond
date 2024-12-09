import { axiosInstanceGET } from "./axiosInstance";
import { axiosInstanceCUD } from "./axiosInstance";

export const doctorApi = {

  getDataDoctors: async (filter) => {
    const { page, limit } = filter;
    const params = {
      ...(page !== undefined && page !== null && { page }),
      ...(limit !== undefined && limit !== null && { limit }),
    };

    const res = await axiosInstanceGET.get("/doctors", {
      params: Object.keys(params).length > 0 ? params : undefined,
    });
    return res.data;
  },

  getAllDoctors: async (params) => {
    const res = await axiosInstanceGET.get("/doctors", {
      params
    });
    return res.data;
  },
  getDoctorById: async (id) => {
    const res = await axiosInstanceGET.get(`/doctors/${id}`);

    return res.data.data;
  },
  getDoctorByAvailable: async ({ specialtyID, branchID, day, hour }) => {
    const queryParams = new URLSearchParams({
      specialtyID,
      branchID,
      day,
      hour,
    }).toString();

    const res = await axiosInstanceGET.get(
      `/doctors/by-available-time?${queryParams}`
    );
    return res.data.data;
  },

  getDoctorsByBranch: async (branchId, specialtyId) => {
    const res = await axiosInstanceGET.get(
      `/doctors/get-by-branch-and-specialty?specialtyID=${specialtyId}&branchID=${branchId}`
    );

    return res.data.data;
  },
  createDoctors: async (newDoctors) => {
    console.log(newDoctors);
    const res = await axiosInstanceCUD.post("/doctors/add", newDoctors, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("doctors data: ", res.data);
    return res.data;
  },

  updateDoctors: async (id, updatedDoctors) => {
    const res = await axiosInstanceCUD.post(
      "/doctors/update/" + id + "?_method=PUT",
      updatedDoctors,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data.data;
  },

  deleteDoctors: async (id) => {
    const res = await axiosInstanceCUD.post(
      "/doctors/delete/" + id + "?_method=DELETE"
    );
    return res.data.data;
  },
};
