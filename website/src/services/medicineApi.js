import axios from "axios";
import {
  API_URL_GET_ALL_MEDICINES,
  API_URL_GET_ALL_MEDICINES_CATEGORIES,
} from "../configs/varibles";

export const getAllMedicines = async () => {
  try {
    const res = await axios.get(API_URL_GET_ALL_MEDICINES);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllMedicinesCategories = async () => {
  try {
    const res = await axios.get(API_URL_GET_ALL_MEDICINES_CATEGORIES);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
