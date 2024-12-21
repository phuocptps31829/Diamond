import { z } from "zod";

export const branchesAdminSchema = z.object({
  branch_name: z
    .string()
    .nonempty("Tên chi nhánh không được để trống")
    .min(5, "Tên chi nhánh phải có ít nhất 5 ký tự"),
  working_hours: z
    .string()
    .nonempty("Giờ làm việc không được để trống")
    .regex(
      /Sáng:\s*\d{1,2}:\d{2}\s*-\s*\d{1,2}:\d{2},\s*Chiều:\s*\d{1,2}:\d{2}\s*-\s*\d{1,2}:\d{2}/,
      "Giờ làm việc phải bao gồm 'Sáng' và 'Chiều' với định dạng giờ hợp lệ (VD: Sáng: 8:00 - 12:00, Chiều: 13:00 - 17:00)"
    ),
  hotline: z
    .string()
    .nonempty("Vui lòng nhập số điện thoại")
    .regex(/^(\+84|0)\d{9}$/, "Số điện thoại không hợp lệ"),
});
