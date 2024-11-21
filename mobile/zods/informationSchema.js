import { z } from "zod";

export const informationSchema = z.object({
  fullName: z.string().min(1, "Họ và tên không được để trống"),
  phoneNumber: z
  .string()
  .min(10, "Số điện thoại không hợp lệ")
  .max(10, "Số điện thoại không hợp lệ"),
  email: z
    .string()
    .email("Email không hợp lệ")
    .optional().or(z.literal("")),
  job: z.string().optional(), 
  birthDate: z.string().optional().or(z.literal("")),
  ethnicity: z.string().optional().or(z.literal("")), 
  idNumber: z
    .string()
    .regex(/^\d{9,12}$/, "Số CMND/CCCD không hợp lệ")
    .optional().or(z.literal("")), 
  insuranceNumber: z.string().optional().or(z.literal("")), 
  address: z.string().optional().or(z.literal("")), 
  gender: z.enum(["Nam", "Nữ", "Khác"]).optional().or(z.literal("")), 
});
