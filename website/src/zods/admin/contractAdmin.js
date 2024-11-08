import { z } from "zod";
 export const contractSchema = z.object({
    doctorID: z.string().nonempty("Vui lòng chọn bác sĩ"),
    hospitalID: z.string().nonempty("Vui lòng chọn chi nhánh"),
    startDate: z.string().nonempty("Vui lòng chọn ngày bắt đầu"),
    endDate: z.string().nonempty("Vui lòng chọn ngày kết thúc"),
    address: z.string().nonempty("Vui lòng nhập địa chỉ"),
    price: z.string()
    .nonempty("Lương bác sĩ không được để trống")
    .regex(/^\d+$/, "Giá phải là số và không được chứa ký tự khác"),
    isInternal: z.boolean(),
  }).refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "Ngày kết thúc phải sau ngày bắt đầu",
    path: ["endDate"], 
  });