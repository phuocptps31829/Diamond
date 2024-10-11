import { z } from "zod";

export const specialtySchema = z.object({
  name: z.string().min(1, "Tên chuyên khoa không được để trống"),
  image: z.instanceof(File).refine((file) => file.size > 0, {
    message: "Hình ảnh không được để trống",
  }),
});
