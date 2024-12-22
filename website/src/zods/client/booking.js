import { z } from "zod";

export const otherBookingSchema = z.object({
  fullName: z
    .string()
    .min(1, "Tên không được để trống!")
    .regex(/^[\p{L} ]+$/u, "Tên chỉ được chứa các ký tự chữ và khoảng trắng"),

  email: z
    .string()
    .email("Email không hợp lệ")
    .optional()
    .or(z.literal('')),

  phoneNumber: z
    .string()
    .regex(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, "Số điện thoại không hợp lệ"),

  gender: z.string().min(1, "Giới tính không được để trống!"),

  dateOfBirth: z.string().min(1, "Ngày sinh không được để trống!"),

  occupation: z.string().optional(),

  ethnic: z.string().optional(),

  insuranceCode: z.string().optional(),

  citizenIdentificationNumber: z
    .string()
    .min(1, "Số CCCD không được để trống!")
    .regex(/^\d{12}$/, "Số CCCD phải là số có 12 chữ số"),

  department: z.string().min(1, "Chi nhánh không được để trống!"),

  doctor: z.string().min(1, "Bác sĩ không được để trống!"),

  time: z.string().min(1, "Thời gian khám không được để trống!"),

  date: z.string().min(1, "Ngày khám không được để trống!"),
  address: z.string().min(1, "Địa chỉ không được để trống!"),
});

export const selfBookingSchema = z.object({
  department: z.string().min(1, "Chi nhánh không được để trống!"),
  date: z.string().min(1, "Ngày khám không được để trống!"),

  doctor: z.string().min(1, "Bác sĩ không được để trống!"),

  time: z.string().min(1, "Thời gian khám không được để trống!"),
});
