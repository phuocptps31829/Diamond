import { axiosInstanceCUD, axiosInstanceGET, axiosInstanceRED } from "./axiosInstance";

export const appointmentApi = {
  getAppointmentByAges: async () => {
    const res = await axiosInstanceGET.get("/appointments/ages-dashboard");
    return res.data.data;
  },
  get5UpcomingAppointments: async () => {
    const res = await axiosInstanceGET.get(
      "/appointments?noPaginated=true&sort=-time"
    );
    return res.data.data;
  },
  getPatientsByGender: async () => {
    const res = await axiosInstanceGET.get("/appointments/gender-years");
    return res.data.data;
  },
  getAllAppointments: async () => {
    const res = await axiosInstanceGET.get("/appointments?limit=9999");

    return res.data;
  },
  getAllAppointmentsAdmin: async (params) => {
    const res = await axiosInstanceGET.get("/appointments", {
      params: {
        ...params,
      },
    });
    return res.data;
  },

  getAppointmentByPatient: async (params) => {
    const res = await axiosInstanceGET.get(`/appointments/get-by-patient`, {
      params,
    });
    return res.data;
  },
  getAppointmentByDoctor: async (params) => {
    const res = await axiosInstanceGET.get(`/appointments/get-by-doctor`, {
      params,
    });
    return res.data;
  },
  getAppointmentById: async (id) => {
    const res = await axiosInstanceGET.get(`/appointments/${id}`);
    return res.data.data;
  },
  getTotalPatientsBySpecialty: async () => {
    const res = await axiosInstanceGET.get("/appointments/specialty");
    return res.data.data;
  },
  deleteAppointment: async (id) => {
    const res = await axiosInstanceCUD.delete(`/appointments/${id}`);
    return res.data;
  },
  updateAppointmentWorkShedule: async (id, data) => {
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
      case "zalopay":
        endpoint = "/invoices/payment/zalopay";
        break;
      default:
        break;
    }

    const res = await axiosInstanceRED.post(endpoint, data);
    return res.data;
  },

  cancelAppointment: async (id) => {
    const res = await axiosInstanceCUD.post(`/invoices/cancel/${id}`);
    return res.data;
  },
};
