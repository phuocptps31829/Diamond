import { z } from "zod";

export const branchesAdminSchema = z.object({
  branch_name: z.string().nonempty("Tên chi nhánh không được để trống"),
  working_hours: z.string().nonempty("Giờ làm việc không được để trống"),
  hotline: z.coerce.number().min(1, "Hotline không được để trống"),
  address: z.string().nonempty("Địa chỉ không được để trống"),
 
});