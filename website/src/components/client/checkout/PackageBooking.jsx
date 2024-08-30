import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { FaSearch } from "react-icons/fa";
import { Input } from "@/components/ui/Input";
import InputCustom from "@/components/ui/InputCustom";
import { bookingSchema } from "@/zods/booking";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectDoctor from "./select/SelectDoctor";
import SelectTime from "./select/SelectTime";
import SelectDepartment from "./select/SelectDepartment";
import SelectDate from "./select/SelectDate";
import SelectBirthDate from "./select/SelectBirthday";
import SelectGender from "./select/SelectGender";
import SelectEthnic from "./select/SelectEthnicity";
import {
  SelectDistrict,
  SelectProvince,
  SelectWard,
} from "./select/SelectLocation";
import { useState } from "react";
const packages = [
  {
    title: "GÓI KHÁM TỔNG QUÁT NAM",
    image:
      "https://img.ykhoadiamond.com/Uploads/PackageBox/05082023/a96a507c-8fee-493b-b7c2-53a710af9135.jpg",
    price: "2.000.000VND",
    description:
      "Medpro trở thành công ty cung cấp giải pháp công nghệ hàng đầu tại Việt Nam giúp kết nối các dịch vụ y tế đến rộng...",
  },
  {
    title: "GÓI KHÁM TỔNG QUÁT NỮ",
    image:
      "https://img.ykhoadiamond.com/uploads/package/12042023/57f12ac8-2eaf-4bbc-a9ed-2038d671f63a.jpg",
    price: "2.000.000VND",
    description:
      "Medpro trở thành công ty cung cấp giải pháp công nghệ hàng đầu tại Việt Nam giúp kết nối các dịch vụ y tế đến rộng...",
  },
  {
    title: "GÓI TẦM SOÁT UNG THƯ",
    image:
      "https://img.ykhoadiamond.com/uploads/package/28032023/2f3b7bea-caeb-4e42-a3e8-fa85007a9408.jpg",
    price: "2.000.000VND",
    description:
      "Medpro trở thành công ty cung cấp giải pháp công nghệ hàng đầu tại Việt Nam giúp kết nối các dịch vụ y tế đến rộng...",
  },
  {
    title: "SỨC KHỎE HẬU COVID-19",
    image:
      "https://img.ykhoadiamond.com/uploads/package/12042023/57f12ac8-2eaf-4bbc-a9ed-2038d671f63a.jpg",
    price: "2.000.000VND",
    description:
      "Medpro trở thành công ty cung cấp giải pháp công nghệ hàng đầu tại Việt Nam giúp kết nối các dịch vụ y tế đến rộng...",
  },
  {
    title: "GÓI KHÁM TỔNG QUÁT NAM",
    image:
      "https://img.ykhoadiamond.com/uploads/package/12042023/57f12ac8-2eaf-4bbc-a9ed-2038d671f63a.jpg",
    price: "2.000.000VND",
    description:
      "Medpro trở thành công ty cung cấp giải pháp công nghệ hàng đầu tại Việt Nam giúp kết nối các dịch vụ y tế đến rộng...",
  },
];
export default function Form() {
  const [selectedProvinceId, setSelectedProvinceId] = useState(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState(null);
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      job: "",
      ethnicity: "",
      cccd: "",
      bhyt: "",
      address: "",
      department: "",
      doctor: "",
      time: "",
      room: "",
      date: "",
      birthDate: "",
      gender: "",
    },
  });
  return (
    <div className="mx-auto mt-5 flex max-w-screen-xl flex-col px-0 py-3 md:mt-10 md:px-5 md:py-5">
      <div className="container mx-auto flex flex-col gap-5 rounded-md border px-5 py-5 shadow-gray md:flex-row">
        {/* Select Services */}
        <div className="flex w-full flex-col gap-[20px] px-2">
          <div className="flex justify-between">
            <p className="font-semibold">Chọn gói khám</p>
            <p className="font-light">Đã chọn 1 gói khám</p>
          </div>
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500" />
            <Input className="pl-10" placeholder="Tìm kiếm gói khám..." />
          </div>

          {/* Package List with Scroll */}
          <div className="scrollbar-thin scrollbar-thumb-primary-500 scrollbar-track-gray-200 h-[340px] overflow-y-auto px-2 md:h-[750px]">
            {packages.map((pkg, index) => (
              <label key={index}>
                <div className="relative mb-3 rounded-lg border border-primary-500 px-4 py-3">
                  <Checkbox
                    id={`checkbox-gt-${index}`}
                    className="absolute right-5 top-1/2"
                  />
                  <div className="mb-2 flex">
                    <img
                      src={pkg.image}
                      className="h-[51px] w-[98px]"
                      alt={`Image of ${pkg.title}`}
                    />
                    <div className="ml-2">
                      <p className="text-[13px] font-bold md:text-[17px]">
                        {pkg.title}
                      </p>
                      <span className="text-[12px] md:text-sm">Tiêu chuẩn</span>
                    </div>
                  </div>
                  <div>
                    <p>
                      Giá: <span>{pkg.price}</span>
                    </p>
                    <p className="w-full max-w-[330px] text-justify text-[12px] font-light md:text-[15px]">
                      {pkg.description}
                    </p>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="w-full p-4 pt-0 md:ml-auto">
          <p className="mb-4 text-xl font-bold">Thông tin đặt lịch khám</p>
          <form onSubmit={handleSubmit()}>
            <div className="flex flex-col gap-4">
              {/* Hàng đầu tiên */}
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1">
                  {/* Khoa khám */}
                  <SelectDepartment
                    control={control}
                    name="department"
                    errors={errors}
                  />
                </div>
                <div className="flex-1">
                  <SelectDoctor
                    control={control}
                    name="doctor"
                    errors={errors}
                  />
                </div>
              </div>

              {/* Selet time */}
              <div className="flex flex-col gap-4 md:flex-row">
                {/* Date */}

                <div className="flex-1">
                  <SelectDate control={control} name="date" errors={errors} />
                </div>
                <div className="flex-1">
                  <SelectTime control={control} name="time" errors={errors} />
                </div>
              </div>
              <div className="mb-2">
                <label htmlFor="room" className="mb-1 block">
                  Phòng khám:
                </label>

                <InputCustom
                  className="col-span-1 sm:col-span-1"
                  placeholder="Phòng T803"
                  name="room"
                  type="text"
                  id="room"
                  disabled={true}
                  control={control}
                  errors={errors}
                />
              </div>

              {/* Thông tin người khám */}
              <p className="mt-2 text-xl font-bold">Thông tin người khám</p>
              <div className="rounded-md bg-gray-500/30 px-5 py-6 pt-2">
                {/* Hàng 1 */}
                <div className="mb-4">
                  <label htmlFor="hoten" className="mb-1 block">
                    Họ và tên:
                  </label>
                  <InputCustom
                    className="col-span-1 sm:col-span-1"
                    placeholder="Nhập tên của bạn"
                    name="fullName"
                    type="text"
                    id="fullName"
                    control={control}
                    errors={errors}
                  />
                </div>

                {/* Hàng 2 */}
                <div className="mb-4 flex flex-col gap-4 md:flex-row">
                  <div className="flex-1">
                    <label htmlFor="email" className="mb-1 block">
                      Email:
                    </label>
                    <InputCustom
                      className="col-span-1 sm:col-span-1"
                      placeholder="Nhập email của bạn"
                      name="email"
                      type="email"
                      id="email"
                      control={control}
                      errors={errors}
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="phone" className="mb-1 block">
                      Số điện thoại:
                    </label>
                    <InputCustom
                      className="col-span-1 sm:col-span-1"
                      placeholder="Nhập số điện thoại của bạn"
                      name="phoneNumber"
                      type="text"
                      id="phoneNumber"
                      control={control}
                      errors={errors}
                    />
                  </div>
                </div>

                <div className="mb-4 flex flex-col gap-4 md:flex-row">
                  <div className="flex-1">
                    <label htmlFor="gioitinh" className="mb-1 block">
                      Giới tính
                    </label>
                    <SelectGender
                      control={control}
                      name="gender"
                      errors={errors}
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="ngaysinh" className="mb-1 block">
                      Ngày sinh
                    </label>
                    <SelectBirthDate
                      control={control}
                      name="birthDate"
                      errors={errors}
                    />
                  </div>
                </div>
                {/* Hàng 3 */}
                <div className="mb-4 flex flex-col gap-4 md:flex-row">
                  <div className="flex-1">
                    <label htmlFor="job" className="mb-1 block">
                      Nghề nghiệp:
                    </label>
                    <InputCustom
                      className="col-span-1 sm:col-span-1"
                      placeholder="Nhập nghề nghiệp của bạn"
                      name="job"
                      type="text"
                      id="job"
                      control={control}
                      errors={errors}
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="ethnicity" className="mb-2 block">
                      Dân tộc:
                    </label>
                    <SelectEthnic
                      control={control}
                      name="ethnicity"
                      errors={errors}
                    />
                  </div>
                </div>

                {/* Hàng 4 */}
                <div className="mb-4 flex flex-col gap-4 md:flex-row">
                  <div className="flex-1">
                    <label htmlFor="cccd" className="mb-1 block">
                      CCCD/CMND:
                    </label>
                    <InputCustom
                      className="col-span-1 sm:col-span-1"
                      placeholder="Nhập CCCD/CMND của bạn"
                      name="cccd"
                      type="text"
                      id="cccd"
                      control={control}
                      errors={errors}
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="bhyt" className="mb-1 block">
                      Bảo hiểm y tế:
                    </label>
                    <InputCustom
                      className="col-span-1 sm:col-span-1"
                      placeholder="Nhập BHYT của bạn"
                      name="bhyt"
                      type="text"
                      id="bhyt"
                      control={control}
                      errors={errors}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="address" className="mb-1 block">
                    Địa chỉ:
                  </label>

                  <div className="mb-2 flex flex-col items-center justify-between gap-1 md:flex-row">
                    <div className="w-full flex-1 md:w-[200px]">
                      <SelectProvince
                        control={control}
                        name="province"
                        errors={errors}
                        onProvinceChange={(provinceId) => {
                          setSelectedProvinceId(provinceId);
                          setSelectedDistrictId(null);
                        }}
                      />
                    </div>
                    <div className="w-full flex-1 md:w-[200px]">
                      <SelectDistrict
                        control={control}
                        name="district"
                        errors={errors}
                        provinceId={selectedProvinceId}
                        onDistrictChange={setSelectedDistrictId}
                        setValue={setValue}
                      />
                    </div>
                    <div className="w-full flex-1 md:w-[200px]">
                      <SelectWard
                        control={control}
                        name="ward"
                        errors={errors}
                        setValue={setValue}
                        districtId={selectedDistrictId}
                      />
                    </div>
                  </div>
                  {/* Hàng 5 */}
                  <div className="mb-4">
                    <InputCustom
                      className="col-span-1 sm:col-span-1"
                      placeholder="Nhập địa chỉ cụ thể của bạn"
                      name="address"
                      type="text"
                      id="address"
                      control={control}
                      errors={errors}
                    />
                  </div>
                </div>

                {/* Button */}
              </div>
              <div className="mt-3 flex justify-end gap-3">
                <Button size="lg" variant="outline">
                  Trở lại
                </Button>
                <button className="h-10 rounded-md bg-primary-500 px-8 text-white hover:bg-primary-600">
                  Tiếp tục
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
