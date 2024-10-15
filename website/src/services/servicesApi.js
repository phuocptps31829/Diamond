import { axiosInstanceCUD, axiosInstanceGET } from "./axiosInstance";

export const serviceApi = {
  getAllServices: async (filter) => {
    const { page, limit, sort, gender, branch, specialtyID } = filter;
    const params = {
      ...(page !== undefined && page !== null && { page }),
      ...(limit !== undefined && limit !== null && { limit }),
      ...(sort !== undefined && sort !== null && sort !== "" && { sort }),
      ...(gender !== undefined &&
        gender !== null &&
        gender !== "" && { gender }),
      ...(branch !== undefined &&
        branch !== null &&
        branch.length > 0 && { branch }),
      ...(specialtyID !== undefined &&
        specialtyID !== null &&
        specialtyID.length > 0 && { specialtyID }),
    };

    const res = await axiosInstanceGET.get('/services', {
      params: Object.keys(params).length > 0 ? params : undefined,
    });

    console.log(res.data.data);
    return res.data;
  },
  takeItAllServices: async () => {
    const res = await axiosInstanceGET.get('/services?limit=9999');
    console.log(res.data.data);
    return res.data.data;
  },
  getServiceById: async (id) => {
    const res = await axiosInstanceGET.get(`/services/${id}`);
    console.log(res.data.data);
    return res.data.data;
  },
  getServiceBySlug: async (slug) => {
    const res = await axiosInstanceGET.get(`/services/slug/${slug}`);
    console.log(res.data.data);
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
    console.log(res.data.data);
    return res.data.data;
  },
  deleteService: async (id) => {
    const res = await axiosInstanceCUD.delete(`/services/delete/${id}`);
    console.log(res.data.data);
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
      },
    );
    console.log(res.data.data);
    return res.data.data;
  },
  createService: async (serviceData) => {
    const res = await axiosInstanceCUD.post('/services/add', serviceData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res.data.data);
    return res.data.data;
  },
};