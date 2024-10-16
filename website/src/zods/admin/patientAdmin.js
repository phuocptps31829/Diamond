import { z } from "zod";

export const patientAdminSchema = z
  .object({
    fullName: z.string().min(1, "Tên bệnh nhân không được để trống"),
    phone: z
      .string()
      .min(10, "Số điện thoại không hợp lệ")
      .max(10, "Số điện thoại không hợp lệ"),
    email: z.string().email("Email không hợp lệ"),
    citizenIdentificationNumber: z.string().min(9, "Số CMND/CCCD không hợp lệ"),
    dateOfBirth: z.string().min(1, "Ngày sinh không được để trống"),
    roleID: z.string().min(1, "Vai trò không được để trống"),
    password: z.string().min(6, "Mật khẩu phải ít nhất 6 kí tự").optional(),
    gender: z.string().min(1, "Giới tính không được để trống"),
    confirmPassword: z
      .string()
      .min(6, "Nhập lại mật khẩu không hợp lệ")
      .optional(),
    insuranceCode: z.string().min(6, "Mã BHYT không được để trống"),
    occupation: z.string().min(6, "Nghề nghiệp không được để trống"),
    province: z.string().min(1, "Tỉnh/Thành phố không được để trống"),
    district: z.string().min(1, "Quận/Huyện không được để trống"),
    ward: z.string().min(1, "Phường/Xã không được để trống"),
    street: z.string().min(1, "Đường không được để trống"),
    ethnic: z.string().min(1, "Dân tộc không được để trống"),
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
    },
  );
