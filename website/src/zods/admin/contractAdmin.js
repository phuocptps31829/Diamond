import { z } from "zod";
export const contractDoctorSchema = z
  .object({
    doctorID: z.string().nonempty("Vui lòng chọn bác sĩ"),
    hospitalID: z.string().nonempty("Vui lòng chọn chi nhánh"),
    startDate: z.string().nonempty("Vui lòng chọn ngày bắt đầu"),
    endDate: z.string().nonempty("Vui lòng chọn ngày kết thúc"),
    address: z.string().nonempty("Vui lòng nhập địa chỉ"),
    price: z
      .string()
      .nonempty("Lương bác sĩ không được để trống")
      .regex(/^\d+$/, "Giá phải là số và không được chứa ký tự khác"),
    isInternal: z.boolean(),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "Ngày kết thúc phải sau ngày bắt đầu",
    path: ["endDate"],
  });
export const contractServiceRentalSchema = z
  .object({
    accountNumber: z
      .string()
      .nonempty("Vui lòng nhập số tài khoản")
      .regex(/^\d{8,20}$/, "Số tài khoản phải là số từ 8 đến 20 chữ số"),
    bankName: z.string().nonempty("Vui lòng nhập tên ngân hàng"),
    accountName: z
      .string()
      .nonempty("Vui lòng nhập tên chủ tài khoản")
      .max(100, "Tên chủ tài khoản không được vượt quá 100 ký tự"),
    tin: z
      .string()
      .optional()
      .refine((val) => /^\d{9,12}$/.test(val), {
        message: "Mã số thuế phải là số từ 9 đến 12 chữ số",
      }),
    startDate: z.string().nonempty("Vui lòng chọn ngày bắt đầu"),
    endDate: z.string().nonempty("Vui lòng chọn ngày kết thúc"),
    phone: z
      .string()
      .nonempty("Vui lòng nhập số điện thoại")
      .regex(/^(\+84|0)\d{9}$/, "Số điện thoại không hợp lệ"),
    position: z
      .string()
      .nonempty("Vui lòng nhập chức vụ")
      .max(50, "Chức vụ không được vượt quá 50 ký tự"),
    agent: z
      .string()
      .nonempty("Vui lòng nhập tên đại diện")
      .max(100, "Tên đại diện không được vượt quá 100 ký tự"),
    price: z
      .string()
      .nonempty("Vui lòng nhập giá")
      .regex(/^\d+$/, "Giá phải là số và không được chứa ký tự khác"),
    address: z.string().nonempty("Vui lòng nhập địa chỉ"),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "Ngày kết thúc phải sau ngày bắt đầu",
    path: ["endDate"],
  });
