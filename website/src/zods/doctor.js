import { z } from 'zod';

export const doctorSchema = z.object({
    fullName: z.string().min(1, 'Tên bác sĩ không được để trống'),
    phoneNumber: z.string().min(1, 'Số điện thoại không được để trống'),
    email: z.string().email('Email không hợp lệ'),
    // dateOfBirth: z.date().min(new Date(), "Ngày sinh không được để trống"),
    dateOfBirth: z.date('Ngày sinh không hợp lệ'),
    gender: z.string().min(1, 'Giới tính không được để trống'),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    confirmPassword: z.string().min(6, 'Nhập lại mật khẩu phải có ít nhất 6 ký tự'),
    practicingCertificate: z.string().min(1, 'Chứng chỉ làm việc không được để trống'),
    title: z.string().min(1, 'Trình độ chuyên môn không được để trống'),
    isActivated: z.boolean().refine((value) => value !== undefined, {
        message: 'Trạng thái tài khoản không được để trống',
    }),
    isInternal: z.boolean().refine((value) => value !== undefined, {
        message: 'Loại bác sĩ không được để trống',
    }),
    yearsExperience: z.string().min(1, 'Số năm kinh nghiệm không được để trống'),
    specialty: z.string().nonempty('Chuyên khoa không được để trống'),
    branch: z.string().nonempty('Chi nhánh làm việc không được để trống'),
    ethnicity: z.string().min(1, 'Dân tộc không được để trống'),
    address: z.string().min(1, 'Địa chỉ thường trú không được để trống'),
    detail: z.string().min(1, 'Chi tiết về bác sĩ không được để trống'),
});
