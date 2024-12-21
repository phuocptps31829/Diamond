import { z } from "zod";

export const serviceAdminSchema = z.object({
  name: z
    .string()
    .nonempty("Tên dịch vụ không được để trống!")
    .min(5, "Tên dịch vụ phải có ít nhất 5 ký tự!"),
  specialtyID: z.string().nonempty("Chuyên khoa không được để trống!"),
  content: z
    .string()
    .nonempty("Nội dung không được để trống!")
    .min(5, "Nội dung phải có ít nhất 5 ký tự!"),
  duration: z.coerce
    .number()
    .gte(1, "Thời lượng phải lớn hơn hoặc bằng 1!")
    .refine((val) => Number.isInteger(val), "Thời lượng phải là số nguyên!")
    .refine(
      (val) => val !== null && val !== undefined,
      "Thời lượng không được để trống!"
    ),
  price: z.coerce
    .number()
    .refine((val) => val >= 1000, "Giá phải có ít nhất 4 chữ số!")
    .refine((val) => Number.isInteger(val), "Giá phải là số nguyên!")
    .refine(
      (val) => val !== null && val !== undefined,
      "Giá không được để trống!"
    ),
  discountPrice: z.coerce
    .number()
    .refine((val) => Number.isInteger(val), "Giá giảm phải là số nguyên!")
    .refine(
      (val) => val !== null && val !== undefined,
      "Giá giảm không được để trống!"
    ),
  shortDescription: z
    .string()
    .nonempty("Mô tả ngắn không được để trống !")
    .min(5, "Mô tả ngắn phải có ít nhất 5 ký tự!"),

  gender: z.enum(["Nam", "Nữ", "0"], "Giới tính không hợp lệ !"),
  isFamily: z
    .boolean()
    .refine(
      (val) => typeof val === "boolean",
      "Giá trị gia đình không hợp lệ !"
    ),
  isHidden: z
    .boolean()
    .refine((val) => typeof val === "boolean", "Trạng thái không hợp lệ !"),
  minAge: z.coerce
    .number()
    .gte(1, "Tuổi tối đa phải lớn hơn hoặc bằng 1")
    .max(120, "Tuổi tối đa phải nhỏ hơn hoặc bằng 120"),

  maxAge: z.coerce
    .number()

    .gte(1, "Tuổi tối đa phải lớn hơn hoặc bằng 1")
    .max(120, "Tuổi tối đa phải nhỏ hơn hoặc bằng 120"),
});
