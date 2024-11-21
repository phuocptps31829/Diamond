import { z } from "zod";

export const signInSchema = z.object({
  phoneNumber: z.string().regex(/^\d{10}$/, "Số điện thoại không hợp lệ"),
  password: z.string().min(1, "Vui lòng nhập mật khẩu"),
});
