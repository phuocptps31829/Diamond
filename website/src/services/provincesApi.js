import { API_DISTRICTS, API_PROVINCES, API_WARDS } from '@/configs/varibles';
import axios from 'axios';

export const getProvinces = async () => {
  try {
    const res = await axios.get(API_PROVINCES);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDistricts = async (provinceId) => {
  try {
    const res = await axios.get(`${API_DISTRICTS}/${provinceId}`);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getWards = async (districtId) => {
  try {
    const res = await axios.get(`${API_WARDS}/${districtId}`);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

