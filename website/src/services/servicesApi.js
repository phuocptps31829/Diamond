import {
  API_URL_CREATE_SERVICE,
  API_URL_DELETE_SERVICE,
  API_URL_GET_ALL_SERVICES,
  API_URL_GET_SERVICE_BY_ID,
  API_URL_GET_SERVICE_BY_SPECIALTIES,
  API_URL_UPDATE_SERVICE,
} from "@/configs/varibles";
import axios from "axios";
export const getAllServices = async (filter) => {
  try {
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

    const res = await axios.get(API_URL_GET_ALL_SERVICES, {
      params: Object.keys(params).length > 0 ? params : undefined,
    });

    console.log(res.data.data);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getServiceById = async (id) => {
  try {
    const res = await axios.get(`${API_URL_GET_SERVICE_BY_ID}/${id}`);
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getServiceBySpecialty = async (id, page, limit, sort) => {
  try {
    const params = {
      ...(page !== undefined && page !== null && { page }),
      ...(limit !== undefined && limit !== null && { limit }),
      ...(sort !== undefined && sort !== null && sort !== "" && { sort }),
    };
    const res = await axios.get(`${API_URL_GET_SERVICE_BY_SPECIALTIES}/${id}`, {
      params: Object.keys(params).length > 0 ? params : undefined,
    });
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const deleteService = async (id) => {
  try {
    const res = await axios.delete(`${API_URL_DELETE_SERVICE}/${id}`);
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const updateService = async (id, serviceData) => {
  try {
    const res = await axios.put(
      `${API_URL_UPDATE_SERVICE}/${id}`,
      serviceData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createService = async (serviceData) => {
  try {
    const res = await axios.post(API_URL_CREATE_SERVICE, serviceData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
