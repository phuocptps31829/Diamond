import { z } from "zod";

export const serviceAdminSchema = z.object({
  name: z.string().nonempty("Tên dịch vụ không được để trống !"),
  specialtyID: z.string().nonempty("Chuyên khoa không được để trống !"),
  content: z.string().nonempty("Nội dung không được để trống !"),
  duration: z
    .string()
    .min(1, "Thời lượng không được để trống !")
    .regex(/^\d+$/, "Thời lượng chỉ được chứa các chữ số !"),
  price: z
    .string()
    .min(1, "Giá không được để trống !")
    .regex(/^\d+$/, "Giá chỉ được chứa các chữ số !"),
  discountPrice: z
    .string()
    .min(1, "Giá giảm không được để trống !")
    .regex(/^\d+$/, "Giá giảm chỉ được chứa các chữ số !"),
  shortDescription: z.string().nonempty("Mô tả ngắn không được để trống !"),
  isHidden: z.boolean(),
});
