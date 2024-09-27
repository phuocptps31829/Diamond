import { z } from "zod";

export const newsAdminSchema = z.object({
  title: z.string().nonempty("Tiêu đề không được để trống"),
  category: z.string().nonempty("Chuyên khoa không được để trống"),
  author: z.string().nonempty("Tác giả không được để trống"),
  content: z.string().nonempty("Nội dung không được để trống"),
  shortDescription: z.string().nonempty("Mô tả ngắn không được để trống"),
  status: z.enum(["Ẩn", "Hiện"]),
});
