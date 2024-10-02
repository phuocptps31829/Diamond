import axios from "axios";

export const roleApi = {
    getAllRoles: async () => {
        try {
            const res = await axios.get('https://nodejs.diamond.id.vn/api/v1/roles');
            console.log("Provinces data: ", res.data.data);
            return res.data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
};