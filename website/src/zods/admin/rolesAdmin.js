import { z } from "zod";

export const rolesAdminSchema = z.object({
    name: z.string().nonempty("Tên vai trò không được để trống"),
    description: z.string().nonempty("Mô tả vai trò không được để trống"),
});