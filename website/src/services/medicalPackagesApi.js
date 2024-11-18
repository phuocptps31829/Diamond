import { axiosInstanceCUD, axiosInstanceGET } from "./axiosInstance";

export const medicalPackageApi = {
  getAllMedicalPackages: async (filter) => {
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
      notHidden: true,
    };

    const res = await axiosInstanceGET.get("/medical-packages", {
      params: Object.keys(params).length > 0 ? params : undefined,
    });

    console.log("getAllMedicalPackages", res.data);
    return res.data;
  },
  takeItAllPackages: async () => {
    const res = await axiosInstanceGET.get("/medical-packages?limit=9999");
    return res.data.data;
  },
  getMedicalPackageById: async (id) => {
    const res = await axiosInstanceGET.get(`/medical-packages/${id}`);
    return res.data.data;
  },
  getMedicalPackageBySlug: async (slug) => {
    const res = await axiosInstanceGET.get(`/medical-packages/slug/${slug}`);
    return res.data.data;
  },
  getMedicalPackageBySpecialty: async (id, page, limit, sort) => {
    const params = {
      ...(page !== undefined && page !== null && { page }),
      ...(limit !== undefined && limit !== null && { limit }),
      ...(sort !== undefined && sort !== null && sort !== "" && { sort }),
    };
    const res = await axiosInstanceGET.get(
      `/medical-packages/specialty/${id}`,
      {
        params: Object.keys(params).length > 0 ? params : undefined,
      }
    );
    console.log(res.data.data);
    return res.data.data;
  },
};

export const packageApi = {
  createPackage: async (newPackage) => {
    const res = await axiosInstanceCUD.post(
      "/medical-packages/add",
      newPackage,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  },
  updatePackage: async (id, requestBody) => {
    const res = await axiosInstanceCUD.put(
      `/medical-packages/update/${id}`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data.data;
  },
  deletePackage: async (id) => {
    const res = await axiosInstanceCUD.post(
      `/medical-packages/delete/${id}?_method=DELETE`
    );
    return res.data;
  },
};
