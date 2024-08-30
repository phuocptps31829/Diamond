import { API_DISTRICTS, API_PROVINCES, API_WARDS } from '@/configs/varibles';
import axios from 'axios';

export const getProvinces = async () => {
  try {
    const res = await axios.get(API_PROVINCES);
    console.log("Provinces data: ", res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDistricts = async (provinceId) => {
  try {
    const res = await axios.get(`${API_DISTRICTS}/${provinceId}`);
    console.log("Districts data: ", res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getWards = async (districtId) => {
  try {
    const res = await axios.get(`${API_WARDS}/${districtId}`);
    console.log("Wards data: ", res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

