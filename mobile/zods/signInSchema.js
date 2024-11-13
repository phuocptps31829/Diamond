import { z } from "zod";

export const signInSchema = z.object({
  phone: z.string().regex(/^\d{10}$/, "Số điện thoại không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});
