import { z } from "zod";
export const patientSchema = z.object({
  patientName: z.string().min(1, "Tên bệnh nhân không được để trống"),
  phone: z
    .string()
    .min(10, "Số điện thoại không hợp lệ")
    .max(11, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ"),
  citizenIdentificationNumber: z.string().min(9, "Số CMND/CCCD không hợp lệ"),
  birthDate: z.string().min(1, "Ngày sinh không được để trống"),
  password: z.string().min(6, "Mật khẩu phải ít nhất 6 kí tự"),
  confirmPassword: z.string().min(6, "Nhập lại mật khẩu không hợp lệ"),
  bhyt: z.string().min(6, "Mã BHYT không được để trống"),
  job: z.string().min(6, "Nghề nghiệp không được để trống"),
  province: z.string().min(1, "Tỉnh/Thành phố không được để trống"),
  district: z.string().min(1, "Quận/Huyện không được để trống"),
  ward: z.string().min(1, "Phường/Xã không được để trống"),
  ethnicity: z.string().min(1, "Dân tộc không được để trống"),
  address: z.string().min(1, "Địa chỉ không được để trống"),
});
