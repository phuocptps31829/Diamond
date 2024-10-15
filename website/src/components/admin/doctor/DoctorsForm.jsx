import InputCustom from '@/components/ui/InputCustom';
import { doctorSchema } from '@/zods/doctor';
import { zodResolver } from '@hookform/resolvers/zod';
import SelectBirthDate from '@/components/client/checkout/select/SelectBirthday';
import SelectDepartment from '@/components/client/checkout/select/SelectDepartmentDoctor';
import 'react-quill/dist/quill.snow.css';
import { Button } from '@/components/ui/Button';
import DoctorEditor from './editor';
import SelectBranch from '@/components/client/checkout/select/SelectBranch';
import { useState } from 'react';
import SelectSpecialty from '@/components/client/checkout/select/SelectSpecialty';
import { MdCloudUpload } from 'react-icons/md';
import { useForm, Controller } from 'react-hook-form';
import { Label } from '@/components/ui/Label';
import ImagePreview from '@/components/ui/ImagePreview';
import RadioGroupField from '@/components/ui/RadioGroupField';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { doctorApi } from '@/services/doctorsApi';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toastUI } from '@/components/ui/Toastify';

export default function DoctorsForm() {
    const navigate = useNavigate();
    const [fileImage, setFileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isDegreeModalOpen, setIsDegreeModalOpen] = useState(false);
    const [Degrees, setDegrees] = useState([]);
    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        resolver: zodResolver(doctorSchema),
        defaultValues: {
            fullName: '',
            phoneNumber: '',
            email: '',
            dateOfBirth: '',
            gender: '',
            password: '',
            confirmPassword: '',
            practicingCertificate: '',
            title: '',
            isInternal: '',
            yearsExperience: '',
            specialty: '',
            branch: '',
            ethnicity: '',
            address: '',
            isActivated: '',
            detail: '',
        },
    });

    const handleRemoveDegree = (index) => {
        setDegrees((prev) => prev.filter((_, i) => i !== index));
    };
    const toggleDegreeModal = () => {
        setIsDegreeModalOpen(!isDegreeModalOpen);
    };

    const onSubmit = async (data) => {
        console.log(data);
    };
    console.log(errors);
    return (
        <div className="w-[100%] rounded-lg bg-white px-7 py-6 shadow-gray">
            <h1 className="mb-4 mr-2 h-fit bg-white text-2xl font-bold">Thông tin bác sĩ</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid-cols-1 gap-5 sm:grid md:flex">
                    <div className="mr-5">
                        <label htmlFor="fileImage" className="mb-4 block bg-white px-2">
                            Ảnh đại diện <span className="text-red-500">*</span>
                        </label>
                        <ImagePreview
                            imagePreview={imagePreview}
                            setFileImage={setFileImage}
                            setImagePreview={setImagePreview}
                        />
                        {!fileImage && (
                            <p className="mt-3 text-center text-sm text-red-500">
                                Vui lòng chọn ảnh
                            </p>
                        )}
                    </div>
                    <div className="w-full">
                        <div className="block">
                            <div className="w-full grid-cols-1 md:flex md:gap-5">
                                <div className="relative md:mb-4 md:w-1/2">
                                    <InputCustom
                                        label={'Họ và tên'}
                                        required
                                        className="col-span-1 sm:col-span-1"
                                        name="fullName"
                                        type="text"
                                        id="fullName"
                                        placeholder={'Nhập họ và tên'}
                                        control={control}
                                        errors={errors}
                                    />
                                </div>

                                <div className="relative md:mb-4 md:w-1/2">
                                    <InputCustom
                                        label={'Số điện thoại'}
                                        required
                                        className="col-span-1 sm:col-span-1"
                                        name="phoneNumber"
                                        type="text"
                                        id="phoneNumber"
                                        placeholder={'Nhập số điện thoại'}
                                        control={control}
                                        errors={errors}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Line 2 */}
                        <div className="flex w-full gap-5">
                            <div className="w-full gap-5 md:flex">
                                <div className="relative md:mb-4 md:w-1/2">
                                    <InputCustom
                                        label={'Email'}
                                        required
                                        className="col-span-1 sm:col-span-1"
                                        name="email"
                                        type="email"
                                        id="email"
                                        placeholder={'Nhập email'}
                                        control={control}
                                        errors={errors}
                                    />
                                </div>

                                <div className="relative flex w-1/2 gap-5">
                                    <div className="relative flex-1 md:mb-4">
                                        <label
                                            htmlFor="dateOfBirth"
                                            className="left-[15px] mb-2 block bg-white px-1 text-lg text-sm"
                                        >
                                            Ngày sinh <span className="text-red-500">*</span>
                                        </label>
                                        <SelectBirthDate
                                            control={control}
                                            name="dateOfBirth"
                                            errors={errors}
                                            onChange={(value) =>
                                                console.log('Giá trị khoa được chọn: ', value)
                                            }
                                        />
                                    </div>
                                    <div className="w-1/3">
                                        <RadioGroupField
                                            name="gender"
                                            label="Giới tính:"
                                            options={[
                                                { value: 'Nam', label: 'Nam' },
                                                { value: 'Nữ', label: 'Nữ' },
                                            ]}
                                            control={control}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Line 3 */}
                        <div className="block">
                            <div className="w-full gap-5 md:flex">
                                <div className="relative md:mb-4 md:w-1/2">
                                    <InputCustom
                                        label={'Mật khẩu'}
                                        required
                                        className="col-span-1 sm:col-span-1"
                                        name="password"
                                        type="password"
                                        id="Password"
                                        placeholder="Nhập mật khẩu"
                                        control={control}
                                        errors={errors}
                                    />
                                </div>
                                <div className="relative md:mb-4 md:w-1/2">
                                    <InputCustom
                                        label={'Xác nhận mật khẩu'}
                                        required
                                        className="col-span-1 sm:col-span-1"
                                        name="confirmPassword"
                                        type="password"
                                        id="confirmPassword"
                                        placeholder="Nhập lại mật khẩu"
                                        control={control}
                                        errors={errors}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Line 4 */}
                <div className="block">
                    <div className="relative md:mb-4">
                        <label
                            htmlFor="hoten"
                            className="left-[15px] block bg-white px-1 text-lg md:text-base"
                        >
                            Bằng cấp <span className="text-red-500">*</span>
                        </label>
                        <Button
                            variant="primary"
                            type="button"
                            onClick={toggleDegreeModal}
                            className="my-1 rounded-md bg-blue-500 p-5 px-4 py-2 text-xl text-white"
                        >
                            <MdCloudUpload className="mr-2" size={24} />
                            Tải ảnh lên
                        </Button>
                        <div className="relative">
                            <div className="flex flex-wrap gap-4">
                                {Degrees.map((cert, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={cert}
                                            alt={`Degree ${index + 1}`}
                                            className="h-[250px] w-[250px] rounded-lg object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveDegree(index)}
                                            className="absolute right-1 top-1 rounded-lg bg-red-500 p-2 text-sm text-white"
                                        >
                                            X
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="block">
                    <div className="w-full gap-5 md:flex">
                        <div className="relative md:mb-4 md:w-1/2">
                            <InputCustom
                                label={'Chứng chỉ hành nghề'}
                                required
                                className="col-span-1 sm:col-span-1"
                                name="practicingCertificate"
                                type="text"
                                id="practicingCertificate"
                                placeholder={'Nhập chứng chỉ hành nghề'}
                                control={control}
                                errors={errors}
                            />
                        </div>
                        <div className="relative md:mb-4 md:w-1/2">
                            <InputCustom
                                label={'Trình độ chuyên môn'}
                                className="col-span-1 sm:col-span-1"
                                required
                                placeholder={'Nhập trình độ chuyên môn'}
                                name="title"
                                type="text"
                                id="title"
                                control={control}
                                errors={errors}
                            />
                        </div>
                        <div className="relative md:mb-4 md:w-1/2">
                            <label
                                htmlFor="hoten"
                                className="left-[15px] mb-2 block bg-white px-1 text-lg md:text-sm"
                            >
                                Khoa <span className="text-red-500">*</span>
                            </label>
                            <SelectDepartment
                                control={control}
                                name="isInternal"
                                errors={errors}
                                onChange={(value) => console.log('Giá trị khoa được chọn: ', value)}
                            />
                        </div>
                        <div className="relative md:mb-4 md:w-1/2">
                            <InputCustom
                                label={'Số năm kinh nghiệm'}
                                required
                                className="col-span-1 sm:col-span-1"
                                name="yearsExperience"
                                type="number"
                                id="yearsExperience"
                                placeholder={'Nhập số năm kinh nghiệm'}
                                control={control}
                                errors={errors}
                            />
                        </div>
                    </div>
                </div>

                {/* Line 5 */}
                <div className="flex w-full gap-5">
                    <div className="w-full gap-5 md:flex">
                        <div className="relative mb-3 md:w-1/2">
                            <label
                                htmlFor="hoten"
                                className="left-[15px] mb-2 block bg-white px-1 text-sm"
                            >
                                Chuyên khoa <span className="text-red-500">*</span>
                            </label>
                            <SelectSpecialty control={control} name="specialty" errors={errors} />
                        </div>
                        <div className="relative mb-3 md:w-1/2">
                            <label
                                htmlFor="hoten"
                                className="left-[15px] mb-2 block bg-white px-1 text-sm"
                            >
                                Chi nhánh làm việc <span className="text-red-500">*</span>
                            </label>
                            <SelectBranch
                                control={control}
                                name="branch"
                                errors={errors}
                                setValue={(value) =>
                                    console.log('Giá trị branch được chọn: ', value)
                                }
                            />
                        </div>
                    </div>
                </div>

                {/* Line 7 */}
                <div className="flex w-full gap-5">
                    <div className="relative mb-3 w-full">
                        <InputCustom
                            label={'Địa chỉ'}
                            className="col-span-1 sm:col-span-1"
                            name="address"
                            type="text"
                            id="address"
                            placeholder={'Nhập địa chỉ'}
                            control={control}
                            errors={errors}
                        />
                    </div>
                </div>
                <div className="w-full">
                    <label htmlFor="hoten" className="left-[15px] mb-2 block bg-white px-1 text-sm">
                        Chi tiết về bác sĩ <span className="text-red-500">*</span>
                    </label>
                    <DoctorEditor name="detail" control={control} errors={errors} />
                </div>
                {/* isActivated */}
                <div className="mt-5">
                    <RadioGroupField
                        name="isActivated"
                        label="Trạng thái tài khoản:"
                        options={[
                            { value: true, label: 'Hoạt động' },
                            { value: false, label: 'Khóa tài khoản' },
                        ]}
                        control={control}
                    />
                </div>
                {/* Button */}
                <div className="flex justify-end gap-2">
                    <Button
                        size=""
                        variant="primary"
                        className="border-none bg-gray-200 px-6 text-primary-500 hover:bg-gray-400"
                    >
                        Hủy
                    </Button>
                    <Button
                        size=""
                        variant="primary"
                        type="submit"
                        className="hover:bg-primary-[250px]0 border-none bg-primary-500 px-6"
                    >
                        Cập nhật
                    </Button>
                </div>
            </form>
        </div>
    );
}
