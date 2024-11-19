import { z } from "zod";

export const forgetSchema = z.object({
  phoneNumber: z.string().regex(/^\d{10}$/, "Số điện thoại không hợp lệ"),
});
