import axios from "axios";

const GET_API = import.meta.env.VITE_GET_API;
const CUD_API = import.meta.env.VITE_CUD_API;

console.log(GET_API);

export const roleApi = {
    getAllRoles: async () => {
        const res = await axios.get(GET_API + '/roles', { 'Cache-Control': 'no-cache' });
        console.log("All roles data: ", res.data);
        return res.data;
    },
    getRoleById: async (id) => {
        const res = await axios.get(GET_API + '/roles/' + id);
        console.log("Role data: ", res.data);
        return res.data;
    },
    createRole: async (newRole) => {
        const res = await axios.post(
            CUD_API + '/roles/add',
            newRole,
            {
                headers: {
                    "Content-Type": 'application/json'
                }
            }
        );
        console.log("Role data: ", res.data);
        return res.data;
    },
    updateRole: async ({ updatedRole, id }) => {
        console.log(updatedRole, id);
        const res = await axios.post(
            CUD_API + '/roles/update/' + id + '?_method=PUT',
            updatedRole,
            {
                headers: {
                    "Content-Type": 'application/json'
                }
            }
        );
        console.log("Role data: ", res.data);
        return res.data;
    },
    deleteRole: async (id) => {
        const res = await axios.post(
            CUD_API + '/roles/delete/' + id + '?_method=DELETE',
        );
        console.log("Role data: ", res.data);
        return res.data;
    },
};