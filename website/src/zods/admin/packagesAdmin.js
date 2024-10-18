import { z } from 'zod';

export const packageAdminSchema = z.object({
    specialtyID: z.string().nonempty('Chuyên khoa không được để trống'),
    name: z.string().nonempty('Tên gói không được để trống'),
    shortDescription: z.string().nonempty('Mô tả ngắn không được để trống'),
    details: z.string().nonempty('Mô tả gói không được để trống'),
    isHidden: z.boolean(),
    isFamily: z.boolean(),
    gender: z.string().nonempty('Giới tính không được để trống'),
    age: z
        .object({
            min: z.number().min(0, 'Tuổi tối thiểu phải lớn hơn hoặc bằng 0'),
            max: z.number().min(0, 'Tuổi tối đa phải lớn hơn hoặc bằng 0'),
        })
        .refine((data) => data.max > data.min, {
            message: 'Tuổi tối đa phải lớn hơn tuổi tối thiểu',
            path: ['max'],
        }),

    services: z
        .array(
            z.object({
                servicesID: z.array(z.string().nonempty()).min(1),
                levelName: z.string().nonempty(),
                price: z.number().min(0),
                discountPrice: z.number().min(0),
                duration: z.number().min(0),
                _id: z.string().optional(),
            })
        )
        .refine(
            (services) =>
                services.every(
                    (service) =>
                        service.servicesID.length > 0 &&
                        service.levelName !== '' &&
                        service.price >= 0 &&
                        service.discountPrice >= 0 &&
                        service.duration >= 0
                ),
            { message: 'Vui lòng nhập đầy đủ thông tin cho các dịch vụ' }
        ),
});
