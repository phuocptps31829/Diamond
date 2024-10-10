import { axiosInstanceCUD } from "./axiosInstance";
import { axiosInstanceGET } from "./axiosInstance";

export const clinicsApi = {
  getAllClinics:  async () => {
    const res = await axiosInstanceGET.get('/clinics');
    console.log("clinics data: ", res.data.data);
    return res.data.data;
  },
  getClinicsById:  async (id) => {
    const res = await axiosInstanceGET.get(`/clinics/${id}`);
    console.log("clinic data by id: ", res.data.data);
    return res.data.data;
  },
  createClinics: async (newClinics) => {
    const res = await axiosInstanceCUD.post(
        '/clinics/add',
        newClinics,
        {
            headers: {
                "Content-Type": 'application/json'
            }
        }
    );
    console.log("clinics data: ", res.data);
    return res.data;
  },
  updateClinic: async ({ updateClinic, id }) => {
    console.log(updateClinic, id);
    const res = await axiosInstanceCUD.put(
        `/clinics/update/${id}`, 
        updateClinic, 
        {
            headers: {
                "Content-Type": 'application/json',
            },
        }
    );
    console.log("clinics data updated: ", res.data);
    return res.data;
},
  deleteClinics: async (id) => {
    const res = await axiosInstanceCUD.post(
        '/clinics/delete/' + id + '?_method=DELETE',
    );
    console.log("clinics data deleted: ", res.data.data);
    return res.data.data;
},
}
