import { z } from 'zod';

export const doctorAdminSchema = z
    .object({
        fullName: z.string().min(1, 'Tên bác sĩ không được để trống'),
        phoneNumber: z
        .string()
        .min(1, 'Số điện thoại không được để trống')
        .regex(/^\d{10}$/, 'Số điện thoại phải gồm đúng 10 chữ số'),
        email: z.string().email('Email không hợp lệ'),
        dateOfBirth: z.string().min(1, 'Ngày sinh không được để trống'),
        gender: z.string().min(1, 'Giới tính không được để trống'),
        password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').optional(),
        confirmPassword: z.string().min(6, 'Nhập lại mật khẩu phải có ít nhất 6 ký tự').optional(),
        citizenIdentificationNumber: z.string().min(1, 'Số CMND không được để trống'),
        practicingCertificate: z.string().min(1, 'Chứng chỉ làm việc không được để trống'),
        imagesPracticingCertificate: z
            .array(z.any())
            .min(1, 'Ảnh chứng chỉ không được để trống')
            .optional(),
        title: z.string().min(1, 'Trình độ chuyên môn không được để trống'),
        isActivated: z.boolean().refine((value) => value !== undefined, {
            message: 'Trạng thái tài khoản không được để trống',
        }),
        isInternal: z.boolean(),
        yearsExperience: z.string().min(1, 'Số năm kinh nghiệm không được để trống'),
        specialty: z.string().nonempty('Chuyên khoa không được để trống'),
        branchID: z.string().nonempty('Chi nhánh làm việc không được để trống'),
        address: z.string().min(1, 'Địa chỉ thường trú không được để trống'),
        detail: z.string().min(1, 'Thông tin chi tiết không được để trống'),
    })
    .refine(
        (data) => {
            if (data.password || data.confirmPassword) {
                return data.password === data.confirmPassword;
            }
            return true;
        },
        {
            message: 'Mật khẩu không khớp',
            path: ['confirmPassword'],
        }
    );
