import {
  API_URL_CREATE_NEWS,
  API_URL_DELETE_NEWS,
  API_URL_GET_ALL_NEWS,
  API_URL_UPDATE_NEWS,
} from "@/configs/varibles";
import axios from "axios";

export const getAllNews = async ({ page, limit }) => {
  try {
    const res = await axios.get(API_URL_GET_ALL_NEWS, {
      params: {
        page,
        limit,
      },
    });
    console.log("res.data.data: ", res.data.data);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getNewsById = async (id) => {
  try {
    const res = await axios.get(`${API_URL_GET_ALL_NEWS}/${id}`);
    console.log("res.data.data: ", res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const createNews = async (data) => {
  try {
    const res = await axios.post(API_URL_CREATE_NEWS, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("res.data.data: ", res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const updateNews = async (id, data) => {
  try {
    const res = await axios.put(`${API_URL_UPDATE_NEWS}/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("res.data.data: ", res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const deleteNews = async (id) => {
  try {
    const res = await axios.delete(`${API_URL_DELETE_NEWS}/${id}`);
    console.log("res.data.data: ", res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
