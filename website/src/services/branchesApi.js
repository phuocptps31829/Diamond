import {
  API_URL_ADD_BRANCH,
  API_URL_DELETE_BRANCH,
  API_URL_GET_ALL_BRANCHES,
  API_URL_GET_ALL_BRANCHES_BY_SPECIALTY,
  API_URL_UPDATE_BRANCH,
} from "@/configs/varibles";
import axios from "axios";

export const getAllBranches = async ({ page, limit }) => {
  try {
    const res = await axios.get(API_URL_GET_ALL_BRANCHES, {
      params: {
        page,
        limit,
      },
    });
    console.log(res.data.data);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getBranchesById = async (id) => {
  try {
    const res = await axios.get(`${API_URL_GET_ALL_BRANCHES}/${id}`);
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getAllBranchesBySpecialty = async (id) => {
  try {
    const res = await axios.get(
      `${API_URL_GET_ALL_BRANCHES_BY_SPECIALTY}/${id}`,
    );
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const addBranch = async (branchData) => {
  try {
    const res = await axios.post(API_URL_ADD_BRANCH, branchData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateBranch = async (id, branchData) => {
  try {
    const res = await axios.put(`${API_URL_UPDATE_BRANCH}/${id}`, branchData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteBranch = async (id) => {
  try {
    const res = await axios.delete(`${API_URL_DELETE_BRANCH}/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
