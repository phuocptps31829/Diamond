import axios from "axios";

export const roleApi = {
    getAllRoles: async () => {
        const res = await axios.get('https://nodejs.diamond.id.vn/api/v1/roles');
        console.log("Provinces data: ", res.data.data);
        return res.data.data;
    },
    getRoleById: async (id) => {
        const res = await axios.get('https://nodejs.diamond.id.vn/api/v1/roles/' + id);
        console.log("Provinces data: ", res.data.data);
        return res.data.data;
    },
};