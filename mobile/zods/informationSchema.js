import { z } from "zod";

export const informationSchema = z.object({
  fullName: z.string().min(1, "Họ và tên không được để trống"),
  phoneNumber: z
    .string()
    .min(10, "Số điện thoại không hợp lệ")
    .max(10, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  occupation: z.string().optional(),
  dateOfBirth: z.string().min(1, "Ngày sinh không được để trống"),
  ethnic: z.string().min(1, "Dân tộc không được để trống"),
  citizenIdentificationNumber: z
    .string()
    .regex(/^\d{9,12}$/, "Số CMND/CCCD không hợp lệ")
    .optional()
    .or(z.literal("")),
  insuranceCode: z.string().optional().or(z.literal("")),
  address: z.string().min(1, "Địa chỉ không được để trống"),
  gender: z.string().min(1, "Giới tính không được để trống"),
});
