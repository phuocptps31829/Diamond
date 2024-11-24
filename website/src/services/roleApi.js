import { axiosInstanceGET } from "./axiosInstance";
import { axiosInstanceCUD } from "./axiosInstance";

export const roleApi = {
    getAllRoles: async () => {
        const res = await axiosInstanceGET.get('/roles');
        return res.data;
    },
    getRoleById: async (id) => {
        const res = await axiosInstanceGET.get('/roles/' + id);
        return res.data;
    },
    createRole: async (newRole) => {
        const res = await axiosInstanceCUD.post(
            '/roles/add',
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
        const res = await axiosInstanceCUD.post(
            '/roles/update/' + id + '?_method=PUT',
            updatedRole,
            {
                headers: {
                    "Content-Type": 'application/json'
                }
            }
        );
        return res.data;
    },
    deleteRole: async (id) => {
        const res = await axiosInstanceCUD.post(
            '/roles/delete/' + id + '?_method=DELETE',
        );
        return res.data;
    },
};