import { z } from "zod";

export const userInfoSchema = z.object({
  fullName: z.string().min(1, "Họ và tên không được để trống"),
  phoneNumber: z.string().regex(/^[0-9]{10}$/, "Số điện thoại không hợp lệ"),
  dateOfBirth: z.string().min(1, "Ngày sinh không được để trống"),
  citizenIdentificationNumber: z.string().min(1, "Số CMND/CCCD không được để trống"),
  address: z.string().min(1, "Địa chỉ không được để trống"),
  email: z.string().email("Email không hợp lệ").optional().or(z.literal('')),
  gender: z.string().optional(),
  ethnic: z.string().optional(),
  occupation: z.string().optional(),
});
