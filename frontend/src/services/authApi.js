import { API_GET_PROFILE_PATIENTS } from "@/configs/varibles";
import axios from "axios";

export const getProfilePatients = async (accessToken) => {
  try {
    const res = await axios.get(API_GET_PROFILE_PATIENTS, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};