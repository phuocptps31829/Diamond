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
    .min(10, "Số điện thoại phải có ít nhất 10 ký tự")
    .regex(/^\d+$/, "Số điện thoại chỉ được chứa các chữ số"),

  gender: z.string().min(1, "Giới tính không được để trống!"),

  dateOfBirth: z.string().min(1, "Ngày sinh không được để trống!"),

  citizenIdentificationNumber: z
    .string()
    .min(1, "Số CCCD không được để trống!")
    .regex(/^\d{9,12}$/, "Số CCCD phải là số có từ 9 đến 12 chữ số"),

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
