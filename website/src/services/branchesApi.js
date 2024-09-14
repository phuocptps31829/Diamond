import { API_URL_GET_ALL_BRANCHES , API_URL_GET_ALL_BRANCHES_BY_SPECIALTY} from "@/configs/varibles";
import axios from "axios";

export const getAllBranches = async () => {
  try {
    const res = await axios.get(API_URL_GET_ALL_BRANCHES);
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getAllBranchesBySpecialty = async (id) => {
  try {
    const res = await axios.get(`${API_URL_GET_ALL_BRANCHES_BY_SPECIALTY}/${id}`);
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};