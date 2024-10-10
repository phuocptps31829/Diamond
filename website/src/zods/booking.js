import { z } from "zod";

export const otherBookingSchema = z.object({
  fullName: z
    .string()
    .min(1, "Tên không được để trống!")
    .regex(/^[\p{L} ]+$/u, "Tên chỉ được chứa các ký tự chữ và khoảng trắng"),

  email: z
    .string()
    .min(1, "Email không được để trống!")
    .email("Email không hợp lệ!"),

  phoneNumber: z
    .string()
    .min(10, "Số điện thoại phải có ít nhất 10 ký tự")
    .regex(/^\d+$/, "Số điện thoại chỉ được chứa các chữ số"),

  gender: z.string().min(1, "Giới tính không được để trống!"),

  dateOfBirth: z.string().min(1, "Ngày sinh không được để trống!"),

  occupation: z.string().min(1, "Nghề nghiệp không được để trống!"),

  ethnic: z.string().min(1, "Dân tộc không được để trống!"),

  citizenIdentificationNumber: z
    .string()
    .min(1, "Số CCCD không được để trống!")
    .regex(/^\d{9,12}$/, "Số CCCD phải là số có từ 9 đến 12 chữ số"),

  insuranceCode: z
    .string()
    .min(1, "Số BHYT không được để trống!")
    .regex(/^\d+$/, "Số BHYT chỉ được chứa các chữ số"),

  address: z.string().min(1, "Địa chỉ không được để trống!"),

  department: z.string().min(1, "Khoa khám không được để trống!"),

  doctor: z.string().min(1, "Bác sĩ không được để trống!"),

  time: z.string().min(1, "Thời gian khám không được để trống!"),

  date: z.string().min(1, "Ngày khám không được để trống!"),
  province: z.union([z.string().min(1, "Không được để trống!"), z.number()]),
  district: z.union([
    z.string().min(1, "Không được để trống!"),
    z.number(),
    z.null(),
  ]),
  ward: z.union([
    z.string().min(1, "Không được để trống!"),
    z.number(),
    z.null(),
  ]),
});

export const selfBookingSchema = z.object({
  department: z.string().min(1, "Khoa khám không được để trống!"),
  date: z.string().min(1, "Ngày khám không được để trống!"),

  doctor: z.string().min(1, "Bác sĩ không được để trống!"),

  time: z.string().min(1, "Thời gian khám không được để trống!"),
});
