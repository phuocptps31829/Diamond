import { z } from "zod";

export const specialtySchema = z.object({
  name: z.string().min(1, "Tên chuyên khoa không được để trống"),
});
