import { z } from "zod";

export const staffSchema = z
  .object({
    staffName: z.string().min(1, "Tên nhân viên không được để trống"),
    role: z.string().nonempty("Vui lòng chọn vai trò"),
    phone: z
      .string()
      .min(10, "Số điện thoại không hợp lệ")
      .max(10, "Số điện thoại không hợp lệ"),
    email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
    birthDate: z
      .string()
      .min(1, "Ngày sinh không được để trống")
      .optional()
      .or(z.literal("")),
    citizenIdentificationNumber: z
      .string()
      .min(9, "Số CMND không hợp lệ")
      .max(12, "Số CMND không hợp lệ")
      .optional()
      .or(z.literal("")),
    gender: z
      .string()
      .min(1, "Giới tính không được để trống")
      .optional()
      .or(z.literal("")),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự").optional(),
    confirmPassword: z
      .string()
      .min(6, "Nhập lại mật khẩu không hợp lệ'").optional(),
    address: z
      .string()
      .min(1, "Địa chỉ không được để trống")
      .optional()
      .or(z.literal("")),
    isActivated: z.boolean(),
  })
  .refine(
    (data) => {
      if (data.password || data.confirmPassword) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Mật khẩu không khớp",
      path: ["confirmPassword"],
    }
  );
