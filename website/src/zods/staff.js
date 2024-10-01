import { z } from "zod";

export const staffSchema = z.object({
  staffName: z.string().min(1, "Tên nhân viên không được để trống"),
  fullName: z.string().min(1, "Tên nhân viên không được để trống"),
  chungchi: z.string().min(1, "Chứng chỉ hành nghề không được để trống"),
  phone: z.string().min(10, "Số điện thoại không hợp lệ").max(15, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ"),
  birthDate: z.date().min(new Date(), "Ngày sinh không được để trống"),
  gender: z.enum(["male", "female"], "Vui lòng chọn giới tính"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  confirmPassword: z.string().min(6, "Nhập lại mật khẩu phải có ít nhất 6 ký tự"),
  department: z.string().nonempty("Khoa không được để trống"),
  specialty: z.string().nonempty("Chuyên khoa không được để trống"),
  branch: z.string().nonempty("Chi nhánh không được để trống"),
  room: z.string().nonempty("Phòng không được để trống"),
  experienceYears: z.string().nonempty("Số năm kinh nghiệm không được để trống"),
  province: z.string().nonempty("Tỉnh/Thành phố không được để trống"),
  district: z.string().nonempty("Quận huyện không được để trống"),
  ward: z.string().nonempty("Phường/Xã không được để trống"),
  ethnicity: z.string().nonempty("Dân tộc không được để trống"),
  address: z.string().nonempty("Địa chỉ thường trú không được để trống"),
  status: z.enum(["active", "locked"], "Trạng thái tài khoản không hợp lệ"),
})
