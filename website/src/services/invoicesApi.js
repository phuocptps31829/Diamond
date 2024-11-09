import { API_GET_ALL_INVOICES } from "@/configs/varibles";
import axios from "axios";

export const getAllInvoices = async () => {
  try {
    const res = await axios.get(API_GET_ALL_INVOICES);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
