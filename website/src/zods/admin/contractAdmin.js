import { z } from "zod";
export const contractDoctorInternistSchema = z
  .object({
    doctorID: z.string().nonempty("Vui lòng chọn bác sĩ"),
    hospitalID: z.string().nonempty("Vui lòng chọn chi nhánh"),
    startDate: z.string().nonempty("Vui lòng chọn ngày bắt đầu"),
    endDate: z.string().nonempty("Vui lòng chọn ngày kết thúc"),
    address: z
      .string()
      .nonempty("Vui lòng nhập địa chỉ")
      .trim()
      .min(5, "Địa chỉ phải chứa ít nhất 5 ký tự"),
    price: z
      .string()
      .nonempty("Lương bác sĩ không được để trống")
      .regex(
        /^\d{4,10}$/,
        "Lương phải là số và có ít nhất 4 chữ số, tối đa 10 chữ số"
      )
      .refine((val) => Number(val) > 0, { message: "Lương phải lớn hơn 0" }),

    isInternal: z.boolean(),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "Ngày kết thúc phải sau ngày bắt đầu",
    path: ["endDate"],
  });
export const contractDoctorSurgeonSchema = z
  .object({
    doctorID: z.string().nonempty("Vui lòng chọn bác sĩ"),
    hospitalID: z.string().nonempty("Vui lòng chọn chi nhánh"),
    startDate: z.string().nonempty("Vui lòng chọn ngày bắt đầu"),
    timeWork: z.string().nonempty("Vui lòng chọn thời gian làm việc"),
    countDate: z
      .string()
      .nonempty("Vui lòng nhập tổng số ngày làm việc")
      .regex(
        /^\d+$/,
        "Tổng số ngày làm việc phải là số và không được chứa ký tự khác"
      )
      .refine((val) => Number(val) >= 27 && Number(val) <= 31, {
        message:
          "Tổng số ngày làm việc phải nằm trong khoảng từ 27 đến 31 ngày",
      }),

    endDate: z.string().nonempty("Vui lòng chọn ngày kết thúc"),
    address: z
      .string()
      .nonempty("Vui lòng nhập địa chỉ")
      .trim()
      .min(5, "Địa chỉ phải chứa ít nhất 5 ký tự"),
    price: z
      .string()
      .nonempty("Lương bác sĩ không được để trống")
      .regex(
        /^\d{4,10}$/,
        "Lương phải là số và có ít nhất 4 chữ số, tối đa 10 chữ số"
      )
      .refine((val) => Number(val) > 0, { message: "Lương phải lớn hơn 0" }),
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
      .min(5, "Chức vụ phải chứa ít nhất 5 ký tự")
      .max(50, "Chức vụ không được vượt quá 50 ký tự"),

    agent: z
      .string()
      .nonempty("Vui lòng nhập tên đại diện")
      .min(5, "Tên đại diện phải chứa ít nhất 5 ký tự")
      .max(100, "Tên đại diện không được vượt quá 100 ký tự"),

    price: z
      .string()
      .nonempty("Giá cho thuê không được để trống")
      .regex(
        /^\d{4,10}$/,
        "Giá phải là số và có ít nhất 4 chữ số, tối đa 10 chữ số"
      ),
    address: z
      .string()
      .nonempty("Vui lòng nhập địa chỉ")
      .trim()
      .min(5, "Địa chỉ phải chứa ít nhất 5 ký tự"),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "Ngày kết thúc phải sau ngày bắt đầu",
    path: ["endDate"],
  });
