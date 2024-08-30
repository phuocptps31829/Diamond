import { Button } from "@/components/ui/Button";

import InputCustom from "@/components/ui/InputCustom";
import { bookingSchema } from "@/zods/booking";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectTime from "./select/SelectTime";
import SelectDepartment from "./select/SelectDepartment";
import SelectDate from "./select/SelectDate";
import SelectBirthDate from "./select/SelectBirthday";
import SelectGender from "./select/SelectGender";
import SelectEthnic from "./select/SelectEthnicity";
import { useState } from "react";
import {
  SelectDistrict,
  SelectProvince,
  SelectWard,
} from "./select/SelectLocation";
import { useDispatch, useSelector } from "react-redux";
import { IoTrashBinOutline } from "react-icons/io5";
import { removeFromCart } from "@/redux/cartSlice";
import { useToast } from "@/hooks/useToast";
import { ToastAction } from "@radix-ui/react-toast";

export default function Form() {
  const services = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [selectedProvinceId, setSelectedProvinceId] = useState(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState(null);
  const handleRemoveItem = (id)=> {
dispatch(removeFromCart(id));
toast({
  variant: "success",
  title: "Đã xóa dịch vụ khỏi giỏ hàng!",
  description: "Dịch vụ đã được xóa khỏi giỏ hàng của bạn.",
  action: <ToastAction altText="Đóng">Đóng</ToastAction>,
});
  }
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
      province: "",
      district: "",
      ward: "",
    },
  });
  return (
    <div className="mx-auto mt-5 max-w-screen-xl px-0 py-3 md:mt-10 md:px-5 md:py-5">
      <div className="container mx-auto flex flex-col gap-5 rounded-md border px-5 py-5 shadow-gray md:flex-row">
        {/* Select Services */}
        <div className="flex w-full flex-col gap-[20px] px-2">
          <div className="flex justify-between">
            <p className="font-semibold">Chọn dịch vụ</p>
            <p className="font-light">Đã chọn {services.length} dịch vụ</p>
          </div>

          <div className="scrollbar-thin scrollbar-thumb-primary-500 scrollbar-track-gray-200 h-[185px] overflow-y-auto px-2 sm:h-[215px] md:h-[680px]">
          {services.length > 0 ? (
            services.map((svc) => (
              <div
                key={svc.id}
                className="mb-3 flex items-center justify-between rounded-lg border border-primary-500 px-3 py-2 md:py-3"
              >
                <div className="flex items-center gap-4">
                  <img
                    src="https://img.ykhoadiamond.com/uploads/package/12042023/57f12ac8-2eaf-4bbc-a9ed-2038d671f63a.jpg"
                    className="w-[60px] sm:w-[75px] md:w-[100px]"
                    alt={`Image of ${svc.name}`}
                  />
                  <p className="text-[13px] font-bold sm:text-[16px] md:text-[18px]">
                    {svc.name}
                  </p>
                </div>
                <IoTrashBinOutline
                  onClick={() => handleRemoveItem(svc.id)}
                  className="mx-5 cursor-pointer text-2xl text-primary-500 duration-300 hover:text-red-600"
                />
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center h-full">
            <p className="text-center text-gray-500">Chưa có dịch vụ được chọn</p>
          </div>
          )}
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
                  <SelectDepartment
                    control={control}
                    name="department"
                    errors={errors}
                  />
                </div>
              </div>

              {/* Hàng thứ hai */}
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1">
                  <SelectDate control={control} name="date" errors={errors} />
                </div>
                <div className="flex-1">
                  <SelectTime control={control} name="time" errors={errors} />
                </div>
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
                    {/* <input type="email" id="email" className='w-full p-2 border rounded' /> */}
                    <InputCustom
                      className="col-span-1 sm:col-span-1"
                      placeholder="Nhập email của bạn"
                      name="email"
                      type="text"
                      id="email"
                      control={control}
                      errors={errors}
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="sdt" className="mb-1 block">
                      Số điện thoại
                    </label>
                    {/* <input type="tel" id="sdt" className='w-full p-2 border rounded' /> */}
                    <InputCustom
                      className="col-span-1 sm:col-span-1"
                      placeholder="Nhập số điện thoại"
                      name="phoneNumber"
                      type="text"
                      id="phoneNumber"
                      control={control}
                      errors={errors}
                    />
                  </div>
                </div>
                {/* Hàng 3 */}
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
                {/* Hàng 4 */}
                <div className="mb-4 flex flex-col gap-4 md:flex-row">
                  <div className="flex-1">
                    <label htmlFor="nghenghiep" className="mb-1 block">
                      Nghề nghiệp:
                    </label>
                    {/* <input type="text" id="nghenghiep" className='w-full p-2 border rounded' /> */}
                    <InputCustom
                      className="col-span-1 sm:col-span-1"
                      placeholder="Nghề nghiệp"
                      name="job"
                      type="text"
                      id="job"
                      control={control}
                      errors={errors}
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="dantoc" className="mb-2 block">
                      Dân tộc
                    </label>
                    {/* <input type="text" id="dantoc" className='w-full p-2 border rounded' /> */}
                    <SelectEthnic
                      control={control}
                      name="ethnicity"
                      errors={errors}
                    />
                  </div>
                </div>
                {/* Hàng 5 */}
                <div className="mb-4 flex flex-col gap-4 md:flex-row">
                  <div className="flex-1">
                    <label htmlFor="so-cccd" className="mb-1 block">
                      Số CCCD
                    </label>
                    {/* <input type="text" id="so-cccd" className='w-full p-2 border rounded' /> */}
                    <InputCustom
                      className="col-span-1 sm:col-span-1"
                      placeholder="Nhập số CCCD"
                      name="cccd"
                      type="text"
                      id="cccd"
                      control={control}
                      errors={errors}
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="so-bhyt" className="mb-1 block">
                      Số BHYT
                    </label>
                    {/* <input type="text" id="so-bhyt" className='w-full p-2 border rounded' /> */}
                    <InputCustom
                      className="col-span-1 sm:col-span-1"
                      placeholder="Nhập số BHYT"
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
                  <div className="mb-2 flex flex-col items-center justify-between gap-4 md:flex-row">
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

                  {/* Hàng 6 */}
                  <div className="mb-2">
                    {/* <input type="text" id="diachi" className='w-full p-2 border rounded' /> */}
                    <InputCustom
                      className="col-span-1 sm:col-span-1"
                      placeholder="Nhập địa chỉ"
                      name="address"
                      type="text"
                      id="address"
                      control={control}
                      errors={errors}
                    />
                  </div>
                </div>
              </div>

              {/* Nút tiếp tục */}
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
