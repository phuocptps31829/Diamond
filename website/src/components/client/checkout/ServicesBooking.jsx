import { Button } from "@/components/ui/Button";

import InputCustom from "@/components/ui/InputCustom";
import { otherBookingSchema, selfBookingSchema } from "@/zods/booking";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectTime from "./select/SelectTime";
import SelectDepartment from "./select/SelectDepartment";
import SelectDate from "./select/SelectDate";
import SelectBirthDate from "./select/SelectBirthday";
import SelectGender from "./select/SelectGender";
import SelectEthnic from "./select/SelectEthnicity";
import { useEffect, useState } from "react";
import {
  SelectDistrict,
  SelectProvince,
  SelectWard,
} from "./select/SelectLocation";

import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "@/redux/cartSlice";
import { useToast } from "@/hooks/useToast";
import { ToastAction } from "@radix-ui/react-toast";
import SelectDoctor from "./select/SelectDoctor";
import { IoMdRemove } from "react-icons/io";
import { Switch } from "@/components/ui/Switch";
import {
  clearBookingDetails,
  removeItemInfo,
  saveBookingInfo,
  setBookingDetails,
} from "@/redux/bookingSlice";
import { useNavigate } from "react-router-dom";
import useNavigationPrompt from "@/hooks/useNavigationInterceptor";
export default function Form() {
  const navigate = useNavigate();
  const [isBlocking, setIsBlocking] = useNavigationPrompt(
    "Bạn có chắc chắn muốn rời khỏi trang này? Dữ liệu của bạn sẽ bị mất.",
  );

  const services = useSelector((state) => state.cart.cart);
  const profile = useSelector((state) => state.auth.userProfile);

  const bookingDetails = useSelector(
    (state) => state.infoBooking.bookingDetails,
  );
  console.log("Booking details: ", bookingDetails);

  const dispatch = useDispatch();
  const { toast } = useToast();
  const [isBookingForOthers, setIsBookingForOthers] = useState(false);
  const [selectedProvinceId, setSelectedProvinceId] = useState(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedBranchId, setSelectedBranchId] = useState(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [selectedWorkScheduleId, setSelectedWorkScheduleId] = useState(null);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
    dispatch(removeItemInfo(id));
    toast({
      variant: "success",
      title: "Đã xóa dịch vụ khỏi giỏ hàng!",
      description: "Dịch vụ đã được xóa khỏi giỏ hàng của bạn.",
      action: <ToastAction altText="Đóng">Đóng</ToastAction>,
    });
  };

  const handleServiceSelect = async (serviceId, isChecked) => {
    if (isChecked) {
      setIsBlocking(true);
      const service = bookingDetails.find(
        (service) => service.serviceId === serviceId,
      );

      if (service) {
        setSelectedService(service);

        setValue("department", service.bookingDetail.selectedBranchId);
        setValue("doctor", service.bookingDetail.selectedDoctorId);
        setValue("time", service.bookingDetail.selectedTime);
        setValue("date", service.bookingDetail.selectedDate);
        setValue(
          "room",
          service.bookingDetail.clinic.name || "Hãy chọn giờ khám",
        );
      }
    } else {
      setSelectedService(null);
    }
  };
  console.log(selectedService);

  const handleSaveData = (e) => {
    e.preventDefault();
    handleSubmit((data) => {
      dispatch(
        setBookingDetails({
          serviceId: selectedService.serviceId,
          bookingDetail: {
            specialtyID: data.specialtyID,
            selectedBranchId: data.selectedBranchId,
            selectedDoctorId: data.selectedDoctorId,
            selectedWorkScheduleId: data.selectedWorkScheduleId,
            selectedDate: data.selectedDate,
            price: data.price,
            selectedTime: data.selectedTime,
            clinic: data.clinic,
          },
        }),
      );

      toast({
        variant: "success",
        title: "Lưu thành công!",
        description: "Thông tin đặt lịch đã được lưu thành công.",
        action: <ToastAction altText="Đóng">Đóng</ToastAction>,
      });
    })(e);
  };
  const handleTimeChange = (workScheduleID, clinic, time) => {
    console.log("Selected Work Schedule ID:", workScheduleID);
    setSelectedWorkScheduleId(workScheduleID);
    setSelectedClinic(clinic);
    setSelectedTime(time);
  };

  useEffect(() => {
    return () => {
      setIsBlocking(false);
      setSelectedService(null);
      setSelectedBranchId(null);
      setSelectedDoctorId(null);
      setSelectedWorkScheduleId(null);
      setSelectedClinic(null);
      setSelectedDate(null);
      setSelectedTime(null);
      dispatch(clearBookingDetails());
    };
  }, [setIsBlocking]);
  useEffect(() => {
    const handleBeforeRemove = (event) => {
      event.preventDefault();

      const userConfirmed = window.confirm(
        "Bạn có chắc chắn muốn rời khỏi trang này? Dữ liệu của bạn sẽ bị mất.",
      );

      if (userConfirmed) {
        navigate(event.detail.href);
      }
    };

    window.addEventListener("beforeRemove", handleBeforeRemove);

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue =
        "Bạn có chắc chắn muốn rời khỏi trang này? Dữ liệu của bạn sẽ bị mất.";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeRemove", handleBeforeRemove);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [navigate]);

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(
      isBookingForOthers ? otherBookingSchema : selfBookingSchema,
    ),
    defaultValues: {
      fullName: profile?.fullName || "",
      email: profile?.email || "",
      phoneNumber: profile?.phoneNumber || "",
      job: profile?.job || "",
      ethnicity: profile?.ethnicity || "",
      cccd: profile?.cccd || "",
      bhyt: profile?.bhyt || "",
      address: profile?.address || "",
      department: "",
      doctor: "",
      time: "",
      room: "",
      date: "",
      birthDate: profile?.birthDate || "",
      gender: profile?.gender || "",
      province: profile?.province || "",
      district: profile?.district || "",
      ward: profile?.ward || "",
    },
  });

  const handleSwitchChange = (checked) => {
    setIsBookingForOthers(checked);
    const currentValues = getValues();
    if (checked) {
      reset({
        fullName: "",
        email: "",
        phoneNumber: "",
        job: "",
        ethnicity: "",
        cccd: "",
        bhyt: "",
        address: "",
        birthDate: "",
        gender: "",
        province: "",
        district: "",
        ward: "",
        department: currentValues.department,
        doctor: currentValues.doctor,
        time: currentValues.time,
        room: currentValues.room,
        date: currentValues.date,
      });
    } else {
      reset({
        fullName: profile?.fullName || "",
        email: profile?.email || "",
        phoneNumber: profile?.phoneNumber || "",
        job: profile?.job || "",
        ethnicity: profile?.ethnicity || "",
        cccd: profile?.cccd || "",
        bhyt: profile?.bhyt || "",
        address: profile?.address || "",
        birthDate: profile?.birthDate || "",
        gender: profile?.gender || "",
        province: profile?.province || "",
        district: profile?.district || "",
        ward: profile?.ward || "",
        department: currentValues.department,
        doctor: currentValues.doctor,
        time: currentValues.time,
        room: currentValues.room,
        date: currentValues.date,
      });
    }
  };
  const onSubmit = (data, event) => {
    event.preventDefault();
    const combinedDateTime = `${selectedDate}T${selectedTime}:00.000Z`;

    const bookingInfo = {
      patientID: profile?.id || "66afa9556d138253c13a840b",
      appointmentHelpUser: isBookingForOthers
        ? {
            fullName: data.fullName,
            phoneNumber: data.phoneNumber,
            email: data.email,
            gender: data.gender,
            dateOfBirth: data.birthDate,
            address: {
              province: data.province,
              district: data.district,
              ward: data.ward,
              street: data.address,
            },
            citizenIdentificationNumber: data.cccd,
            occupation: data.job,
            ethnic: data.ethnicity,
            password: "string",
          }
        : undefined,
      data: bookingDetails.map((detail) => ({
        workScheduleID: detail.bookingDetail.selectedWorkScheduleId,
        serviceID: detail.serviceId,
        type: "Khám lần 1",
        time: combinedDateTime,
        status: "Chờ xác nhận",
        price: detail.bookingDetail.price,
      })),
    };
    setIsBlocking(false);
    dispatch(saveBookingInfo(bookingInfo));
    setShouldNavigate(true);
  };
  useEffect(() => {
    if (!isBlocking && shouldNavigate) {
      navigate("/services-booking-checkout");
    }
  }, [isBlocking, shouldNavigate, navigate]);

  return (
    <div className="mx-auto mt-5 max-w-screen-xl px-0 py-3 md:mt-10 md:px-5 md:py-5">
      <div className="container mx-auto flex flex-col gap-5 rounded-md border px-5 py-5 shadow-gray md:flex-row">
        {/* Select Services */}
        <div className="flex w-full flex-col gap-[20px] px-2">
          <div className="flex justify-between">
            <p className="font-semibold">Chọn dịch vụ</p>
            <p className="font-light">Đã chọn {services.length} dịch vụ</p>
          </div>

          <div className="scrollbar-thin scrollbar-thumb-primary-500 scrollbar-track-gray-200 h-[185px] overflow-y-auto px-2 pt-4 sm:h-[215px] md:h-[680px]">
            {services.length > 0 ? (
              services.map((svc) => {
                const bookingDetail = bookingDetails.find(
                  (detail) => detail.serviceId === svc.id,
                );
                const isServiceSelected = !!bookingDetail;
                const hasEmptyFields = bookingDetail
                  ? Object.values(bookingDetail.bookingDetail).some(
                      (value) => !value,
                    )
                  : false;

                return (
                  <div className="relative py-3" key={svc.id}>
                    <input
                      className="peer hidden"
                      id={`radio_${svc.id}`}
                      type="radio"
                      name="radio"
                      onChange={(e) =>
                        handleServiceSelect(svc.id, e.target.checked)
                      }
                    />
                    <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-4 border-gray-300 bg-white peer-checked:border-gray-700"></span>
                    <label
                      className="flex cursor-pointer select-none rounded-lg p-3 outline outline-gray-300 peer-checked:bg-gray-50 peer-checked:outline peer-checked:outline-gray-700"
                      htmlFor={`radio_${svc.id}`}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src="https://img.ykhoadiamond.com/uploads/package/12042023/57f12ac8-2eaf-4bbc-a9ed-2038d671f63a.jpg"
                          className="w-[60px] sm:w-[75px] md:w-[100px]"
                          alt={`Image of ${svc.name}`}
                        />
                        <div className="flex flex-col">
                          <p className="text-[13px] font-bold sm:text-[16px] md:text-[18px]">
                            {svc.name}
                          </p>
                          {isServiceSelected && (
                            <span
                              className={`text-sm ${hasEmptyFields ? "text-red-500" : "text-green-500"} font-semibold`}
                            >
                              {hasEmptyFields
                                ? "Xem lại thông tin (còn trống)"
                                : "Xem lại thông tin"}
                            </span>
                          )}
                        </div>
                      </div>
                    </label>

                    <div className="absolute -right-2 top-0 rounded-full bg-red-600 p-1 shadow-lg">
                      <IoMdRemove
                        onClick={() => handleRemoveItem(svc.id)}
                        className="transform cursor-pointer text-lg text-white transition-transform hover:scale-110"
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-center text-gray-500">
                  Chưa có dịch vụ được chọn
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Form */}
        <div className="w-full p-4 pt-0 md:ml-auto">
          <p className="mb-4 text-xl font-bold">Thông tin đặt lịch khám</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              {/* Hàng đầu tiên */}
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1">
                  {/* Khoa khám */}
                  <SelectDepartment
                    control={control}
                    name="department"
                    errors={errors}
                    specialtyID={
                      selectedService?.bookingDetail?.specialtyID || ""
                    }
                    setValue={setValue}
                    onChange={(branchID) => {
                      setSelectedBranchId(branchID);
                    }}
                  />
                </div>
                <div className="flex-1">
                  <SelectDoctor
                    control={control}
                    name="doctor"
                    errors={errors}
                    branchId={selectedBranchId}
                    setValue={setValue}
                    specialtyID={
                      selectedService?.bookingDetail?.specialtyID || ""
                    }
                    onChange={(doctorId, doctorName) => {
                      setSelectedDoctorId(doctorId, doctorName);
                    }}
                  />
                </div>
              </div>

              {/* Selet time */}
              <div className="flex flex-col gap-4 md:flex-row">
                {/* Date */}

                <div className="flex-1">
                  <SelectDate
                    control={control}
                    name="date"
                    doctorId={selectedDoctorId}
                    branchId={selectedBranchId}
                    errors={errors}
                    setValue={setValue}
                    onChange={(date) => {
                      setSelectedDate(date);
                    }}
                  />
                </div>
                <div className="flex-1">
                  <SelectTime
                    control={control}
                    name="time"
                    doctorId={selectedDoctorId}
                    branchId={selectedBranchId}
                    errors={errors}
                    setValue={setValue}
                    onChange={handleTimeChange}
                    date={selectedDate}
                  />
                </div>
              </div>
              <div className="mb-2">
                <label htmlFor="room" className="mb-1 block">
                  Phòng khám:
                </label>

                <div className="flex items-center justify-center gap-2">
                  {" "}
                  <InputCustom
                    className="col-span-1 sm:col-span-1"
                    name="room"
                    type="text"
                    id="room"
                    placeholder={"Hãy chọn giờ khám"}
                    control={control}
                    errors={errors}
                    disabled={true}
                  />
                  <Button
                    size="lg"
                    variant="custom"
                    className="mt-2"
                    onClick={handleSaveData}
                  >
                    Lưu
                  </Button>
                </div>
              </div>

              {/* Thông tin người khám */}
              <p className="mt-2 text-xl font-bold">Thông tin người khám</p>
              <div className="flex items-center">
                <label htmlFor="bookingForOthers" className="mr-2">
                  Đặt hộ người khác:
                </label>
                <Switch
                  id="bookingForOthers"
                  checked={isBookingForOthers}
                  onCheckedChange={handleSwitchChange}
                />
              </div>

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
                <button
                  type="submit"
                  className="h-10 rounded-md bg-primary-500 px-8 text-white hover:bg-primary-600"
                >
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
