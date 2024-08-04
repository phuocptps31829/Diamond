import { z } from "zod";

export const registerSchema = z.object({
    phoneNumber: z.string()
    .regex(/^\d+$/, "Số điện thoại chỉ được chứa các ký tự số")
    .min(10, "Số điện thoại phải có ít nhất 10 ký tự")
    .max(11, "Số điện thoại không được vượt quá 11 ký tự"),
    password: z.string().min(1, "Mật khẩu không được để trống!"),
    confirmPassword: z.string().min(1, "Nhập lại mật khẩu không được để trống!"),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp!",
    path: ["confirmPassword"],
});


