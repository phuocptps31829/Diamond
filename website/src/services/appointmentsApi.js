import { axiosInstanceCUD, axiosInstanceGET } from "./axiosInstance";

export const appointmentApi = {
  getAppointmentByAges: async () => {
    try {
      const res = await axiosInstanceGET.get("/appointments/ages-dashboard");
      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  get5UpcomingAppointments: async () => {
    try {
      const res = await axiosInstanceGET.get(
        "/appointments?limit=9999&sort=-time"
      );
      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getPatientsByGender: async () => {
    try {
      const res = await axiosInstanceGET.get("/appointments/gender-years");
      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getAllAppointments: async () => {
    try {
      const res = await axiosInstanceGET.get("/appointments?limit=9999");
      console.log(res.data.data);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getAppointmentByPatient: async (params) => {
    try {
      const res = await axiosInstanceGET.get(`/appointments/get-by-patient`, {
        params,
      });
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getAppointmentByDoctor: async () => {
    try {
      const res = await axiosInstanceGET.get(`/appointments/get-by-doctor`);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getAppointmentById: async (id) => {
    try {
      const res = await axiosInstanceGET.get(`/appointments/${id}`);
      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getTotalPatientsBySpecialty: async () => {
    try {
      const res = await axiosInstanceGET.get("/appointments/specialty");
      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  deleteAppointment: async (id) => {
    try {
      const res = await axiosInstanceCUD.delete(`/appointments/${id}`);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  updateAppointmentWorkShedule: async (id, data) => {
    try {
      const res = await axiosInstanceCUD.put(
        `/invoices/update/appointment-work-/${id}`,
        { workScheduleID: data },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  createAppointment: async (data, provider) => {
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
    const res = await axiosInstanceCUD.post(endpoint, data);
    console.log(res.data);
  },
};
