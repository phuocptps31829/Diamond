import { axiosInstanceCUD, axiosInstanceGET } from "./axiosInstance";

export const serviceApi = {
  getAllServices: async (filter) => {
    const { page, limit, sort, gender, branch, specialtyID, search } = filter;
    const params = {
      ...(page !== undefined && page !== null && { page }),
      ...(limit !== undefined && limit !== null && { limit }),
      ...(sort !== undefined && sort !== null && sort !== "" && { sort }),
      ...(search !== undefined &&
        search !== null &&
        search !== "" && { search }),
      ...(gender !== undefined &&
        gender !== null &&
        gender !== "" && { gender }),
      ...(branch !== undefined &&
        branch !== null &&
        branch.length > 0 && { branch }),
      ...(specialtyID !== undefined &&
        specialtyID !== null &&
        specialtyID.length > 0 && { specialtyID }),
      notHidden: true,
    };

    const res = await axiosInstanceGET.get("/services", {
      params: Object.keys(params).length > 0 ? params : undefined,
    });
    return res.data;
  },
  getAllServicesAdmin: async (filter) => {
    const { page, limit } = filter;
    const params = {
      ...(page !== undefined && page !== null && { page }),
      ...(limit !== undefined && limit !== null && { limit }),
    };

    const res = await axiosInstanceGET.get("/services", {
      params: Object.keys(params).length > 0 ? params : undefined,
    });
    return res.data;
  },
  takeItAllServices: async () => {
    const res = await axiosInstanceGET.get("/services?noPaginated=true");
    return res.data.data;
  },
  getServiceById: async (id) => {
    const res = await axiosInstanceGET.get(`/services/${id}`);
    return res.data.data;
  },
  getServiceBySlug: async (slug) => {
    const res = await axiosInstanceGET.get(`/services/slug/${slug}`);
    return res.data.data;
  },
  getServiceBySpecialty: async (id, page, limit, sort) => {
    const params = {
      ...(page !== undefined && page !== null && { page }),
      ...(limit !== undefined && limit !== null && { limit }),
      ...(sort !== undefined && sort !== null && sort !== "" && { sort }),
    };
    const res = await axiosInstanceGET.get(`/services/specialty/${id}`, {
      params: Object.keys(params).length > 0 ? params : undefined,
    });
    return res.data.data;
  },
  deleteService: async (id) => {
    const res = await axiosInstanceCUD.delete(`/services/delete/${id}`);
    return res.data.data;
  },
  updateService: async (id, serviceData) => {
    const res = await axiosInstanceCUD.put(
      `/services/update/${id}`,
      serviceData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data.data;
  },
  createService: async (serviceData) => {
    const res = await axiosInstanceCUD.post("/services/add", serviceData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data.data;
  },
};
