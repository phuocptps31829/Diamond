import { z } from "zod";

export const medicineAdminSchema = z.object({
  name: z.string().min(1, "Tên thuốc không được để trống"),
  medicineCode: z.string().min(1, "Mã thuốc không được để trống"),
  price: z.number().min(0, "Giá thuốc không được để trống"),
  medicineCategoryID: z.string().min(1, "Danh mục thuốc không được để trống"),
  ingredients: z.string().min(1, "Thành phần thuốc không được để trống"),
  type: z.string().min(1, "Loại thuốc không được để trống"),
  unit: z.string().min(1, "Đơn vị thuốc không được để trống"),
  instruction: z.string().min(1, "Hướng dẫn sử dụng không được để trống"),
  sideEffects: z.string().min(1, "Tác dụng phụ không được để trống"),
  note: z.string().min(1, "Lưu ý không được để trống"),
});
