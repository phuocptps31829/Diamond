import { z } from "zod";

export const medicineCategoriesAdminSchema = z.object({
  name: z.string().nonempty("Tên danh mục thuốc không được để trống"),
});
