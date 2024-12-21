import { z } from "zod";

export const newsAdminSchema = z.object({
  title: z
    .string()
    .nonempty("Tiêu đề không được để trống")
    .min(5, "Tiêu đề phải có ít nhất 5 ký tự"),
  category: z
    .string()
    .nonempty("Chuyên khoa không được để trống")
    .min(5, "Chuyên khoa phải có ít nhất 5 ký tự"),
  author: z
    .string()
    .nonempty("Tác giả không được để trống")
    .regex(/^[^\d]*$/, "Tác giả không được chứa các chữ số!")
    .min(5, "Tác giả phải có ít nhất 5 ký tự"),
  content: z
    .string()
    .nonempty("Nội dung không được để trống")
    .min(5, "Nội dung phải có ít nhất 5 ký tự"),
  status: z.enum(["Ẩn", "Hiện"]),
});
