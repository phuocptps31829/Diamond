import { Button } from "@/components/ui/Button";
import InputCustom from "@/components/ui/InputCustom";
import { otherBookingSchema, selfBookingSchema } from "@/zods/client/booking";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectTime from "./select/SelectTime";
import SelectDepartment from "./select/SelectDepartment";
import SelectDate from "./select/SelectDate";
import SelectBirthDate from "./select/SelectBirthday";
import SelectGender from "./select/SelectGender";
import SelectEthnic from "./select/SelectEthnicity";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "@/redux/cartSlice";
import SelectDoctor from "./select/SelectDoctor";
import { Switch } from "@/components/ui/Switch";
import {
  removeItemInfo,
  saveBookingInfo,
  changeBookingDetails,
  clearBookingDetails,
} from "@/redux/bookingSlice";
import { useLocation, useNavigate } from "react-router-dom";
import useNavigationPrompt from "@/hooks/useNavigationInterceptor";
import SelectRelatedPatient from "./select/SelectRelatedPatient";
import { useQuery } from "@tanstack/react-query";
import { patientApi } from "@/services/patientsApi";
import { checkRequiredBookingFields } from "@/utils/validate";
import Service from "./items/Service";
import Package from "./items/Package";
import GomapDistance from "./distance/GomapDistance";
import toast from "react-hot-toast";

const combineDateTime = (date, time) => {
  return `${date}T${time}:00.000`;
};

export default function Form() {
  const [isBookingForOthers, setIsBookingForOthers] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [relatedPatientID, setRelatedPatientID] = useState("");
  const [isBlocking, setIsBlocking] = useNavigationPrompt(
    "Bạn có chắc chắn muốn rời khỏi trang này? Dữ liệu của bạn sẽ bị mất."
  );

  const cartItems = useSelector((state) => state.cart.cart);
  const profile = useSelector((state) => state.auth.userProfile);
  const bookingDetails = useSelector(
    (state) => state.infoBooking.bookingDetails
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const {
    data: relatedInfo,
  } = useQuery({
    queryKey: ["relatedPatient", relatedPatientID],
    queryFn: () => patientApi.getRelatedPatient(relatedPatientID),
    enabled: !!relatedPatientID,
  });

  const isValidInfo = checkRequiredBookingFields(profile);

  const isFullInfoToCheckout = !bookingDetails.some((booking) => {
    const { bookingDetail } = booking;
    return Object.values(bookingDetail).some(
      (value) => value === "" || value === null || value === undefined
    );
  });

  useEffect(() => {
    if (bookingDetails?.length) {
      setSelectedProduct(bookingDetails[0]);
    }
  }, []);

  const handleRemoveItem = (id, isService) => {
    dispatch(
      removeFromCart({
        _id: id,
        isService: isService,
      })
    );
    dispatch(
      removeItemInfo({
        _id: id,
        isService: isService,
      })
    );
  };

  const getCurSelectedProduct = () => {
    return bookingDetails.find((product) =>
      product?.serviceID
        ? product.serviceID === selectedProduct?.serviceID
        : product.medicalPackageID === selectedProduct?.medicalPackageID
    );
  };

  const handleSelectProduct = async (productID) => {
    const product = bookingDetails.find((product) =>
      product?.serviceID
        ? product.serviceID === productID
        : product.medicalPackageID === productID
    );

    if (product) {
      setSelectedProduct(product);
      setValue("department", product.bookingDetail?.selectedBranchID);
      setValue("doctor", product.bookingDetail?.selectedDoctorID);
      setValue("time", product.bookingDetail?.selectedTime);
      setValue("date", product.bookingDetail?.selectedDate);
      setValue("room", product.bookingDetail?.clinic.name);
    }
  };

  const handleChangeBranch = (branchID, coordinates) => {
    dispatch(
      changeBookingDetails({
        ...(selectedProduct?.serviceID
          ? { serviceID: selectedProduct.serviceID }
          : { medicalPackageID: selectedProduct?.medicalPackageID }),
        price: selectedProduct?.price,
        newChange: {
          selectedBranchID: branchID,
          selectedDoctorID: "",
          selectedWorkScheduleID: "",
          selectedDate: "",
          selectedTime: "",
          clinic: "",
          coordinates: coordinates,
        },
      })
    );
    setValue("doctor", "");
    setValue("time", "");
    setValue("date", "");
    setValue("room", "");
  };

  const handleChangeDoctor = (doctorID) => {
    dispatch(
      changeBookingDetails({
        ...(selectedProduct?.serviceID
          ? { serviceID: selectedProduct.serviceID }
          : { medicalPackageID: selectedProduct?.medicalPackageID }),
        price: selectedProduct?.price,
        newChange: {
          selectedDoctorID: doctorID,
          selectedWorkScheduleID: "",
          selectedDate: "",
          selectedTime: "",
          clinic: "",
        },
      })
    );
    setValue("time", "");
    setValue("date", "");
    setValue("room", "");
  };

  const handleChangeDate = (date) => {
    dispatch(
      changeBookingDetails({
        ...(selectedProduct?.serviceID
          ? { serviceID: selectedProduct.serviceID }
          : { medicalPackageID: selectedProduct?.medicalPackageID }),
        price: selectedProduct?.price,
        newChange: {
          selectedDate: date,
          selectedWorkScheduleID: "",
          selectedTime: "",
          clinic: "",
        },
      })
    );
    setValue("time", "");
    setValue("room", "");
  };

  const handleChangeTime = (workScheduleID, clinic, time) => {
    dispatch(
      changeBookingDetails({
        ...(selectedProduct?.serviceID
          ? { serviceID: selectedProduct.serviceID }
          : { medicalPackageID: selectedProduct?.medicalPackageID }),
        price: selectedProduct?.price,
        newChange: {
          selectedWorkScheduleID: workScheduleID,
          selectedTime: time,
          clinic: clinic?.name,
        },
      })
    );
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(
      isBookingForOthers ? otherBookingSchema : selfBookingSchema
    ),
    defaultValues: {
      fullName: profile?.fullName || "",
      email: profile?.email || "",
      phoneNumber: profile?.phoneNumber || "",
      occupation: profile?.occupation || "",
      ethnic: profile?.ethnic || "",
      citizenIdentificationNumber: profile?.citizenIdentificationNumber || "",
      insuranceCode: profile?.insuranceCode || "",
      address: profile?.address || "",
      department: "",
      doctor: "",
      time: "",
      room: "",
      date: "",
      dateOfBirth: profile?.dateOfBirth || "",
      gender: profile?.gender || "",
    },
  });

  useEffect(() => {
    reset({
      fullName: "",
      email: "",
      phoneNumber: "",
      occupation: "",
      ethnic: "",
      citizenIdentificationNumber: "",
      insuranceCode: "",
      address: "",
      dateOfBirth: "",
      gender: "",
      department: "",
      doctor: "",
      time: "",
      room: "",
      date: "",
    });
  }, [pathname, reset]);

  // useEffect(() => {
  //   return () => {
  //     dispatch(clearBookingDetails());
  //   };
  // }, [dispatch]);

  const handleSwitchChange = (checked) => {
    setIsBookingForOthers(checked);
    setRelatedPatientID("");
    const currentValues = getValues();
    if (checked) {
      reset({
        fullName: "",
        email: "",
        phoneNumber: "",
        occupation: "",
        ethnic: "",
        citizenIdentificationNumber: "",
        insuranceCode: "",
        address: "",
        dateOfBirth: "",
        gender: "",
        department: currentValues.department,
        doctor: currentValues.doctor,
        time: currentValues.time,
        room: currentValues.room,
        date: currentValues.date,
      });
    }
  };

  useEffect(() => {
    const handleBeforeRemove = (event) => {
      event.preventDefault();

      const userConfirmed = window.confirm(
        "Bạn có chắc chắn muốn rời khỏi trang này? Dữ liệu của bạn sẽ bị mất."
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

  useEffect(() => {
    if (relatedInfo) {
      setValue("fullName", relatedInfo?.data?.fullName);
      setValue("email", relatedInfo?.data?.email);
      setValue("phoneNumber", relatedInfo?.data?.phoneNumber);
      setValue("occupation", relatedInfo?.data?.otherInfo?.occupation);
      setValue("ethnic", relatedInfo?.data?.otherInfo?.ethnic);
      setValue(
        "citizenIdentificationNumber",
        relatedInfo?.data?.citizenIdentificationNumber
      );
      setValue("insuranceCode", relatedInfo?.data?.otherInfo?.insuranceCode);
      setValue("address", relatedInfo?.data?.address);
      setValue("dateOfBirth", relatedInfo?.data?.dateOfBirth);
      setValue("gender", relatedInfo?.data?.gender);
      setValue("address", relatedInfo?.data?.address);
    }
  }, [relatedInfo, setValue]);

  useEffect(() => {
    if (!isBlocking && shouldNavigate) {
      navigate("/checkout");
    }
  }, [isBlocking, shouldNavigate, navigate]);

  const onSubmit = (data, event) => {
    event.preventDefault();

    if (!isValidInfo) {
      toast.error("Vui lòng hoàn thiện hồ sơ trước khi đặt lịch!");
      return;
    }

    if (!isFullInfoToCheckout) {
      toast.error("Vui lòng chọn đầy đủ thông tin trước khi đặt lịch!");
      return;
    }

    const bookingInfo = {
      patientID: profile._id,
      appointmentHelpUser: isBookingForOthers
        ? {
          fullName: data.fullName,
          phoneNumber: data.phoneNumber,
          email: data.email,
          gender: data.gender,
          dateOfBirth: data.dateOfBirth,
          insuranceCode: data.insuranceCode,
          address: data.address,
          citizenIdentificationNumber: data.citizenIdentificationNumber,
          occupation: data.occupation,
          ethnic: data.ethnic,
        }
        : undefined,
      data: bookingDetails.map((detail) => ({
        workScheduleID: detail.bookingDetail.selectedWorkScheduleID,
        ...(detail?.serviceID
          ? { serviceID: detail.serviceID }
          : {
            medicalPackageID: detail.bookingDetail?.levelID,
          }),
        type: "Khám lần 1",
        time: combineDateTime(
          getCurSelectedProduct()?.bookingDetail.selectedDate,
          getCurSelectedProduct()?.bookingDetail.selectedTime
        ),
        status: "PENDING",
        price: detail.bookingDetail.price,
      })),
    };
    setIsBlocking(false);

    dispatch(saveBookingInfo(bookingInfo));
    setShouldNavigate(true);

    navigate("/checkout");
  };

  return (
    <div className="mx-auto max-w-screen-xl px-0 pt-5 md:px-5 md:pt-10">
      <div className="container mx-auto flex flex-col gap-3 rounded-md bg-white px-5 py-5 md:flex-row">
        {/* Select */ }
        <div className="flex w-full flex-col gap-[20px] px-2 md:w-[44%]">
          <div className="flex justify-between">
            <p className="font-semibold">Chọn dịch vụ</p>
            <p className="font-light">Đã chọn { cartItems.length } dịch vụ</p>
          </div>

          <div className="scrollbar-thin scrollbar-thumb-primary-500 scrollbar-track-gray-200 overflow-y-auto px-2">
            { cartItems.length > 0 ? (
              cartItems.map((item) =>
                item?.serviceID ? (
                  <Service
                    key={ item.serviceID }
                    svc={ item }
                    bookingDetails={ bookingDetails }
                    selectedID={ selectedProduct?.serviceID }
                    onRemove={ handleRemoveItem }
                    onSelect={ handleSelectProduct }
                  />
                ) : (
                  <Package
                    key={ item.medicalPackageID }
                    pkg={ item }
                    bookingDetails={ bookingDetails }
                    selectedID={ selectedProduct?.medicalPackageID }
                    onRemove={ handleRemoveItem }
                    onSelect={ handleSelectProduct }
                  />
                )
              )
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-center text-gray-500">
                  Chưa có dịch vụ được chọn
                </p>
              </div>
            ) }
          </div>
        </div>

        {/* Form */ }
        <div className="w-full p-4 pt-0 md:ml-auto md:w-[60%]">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xl font-bold">Thông tin đặt lịch khám</p>
            { !isValidInfo && (
              <p className="text-sm text-red-500">
                { "(*)" } Vui lòng hoàn thiện hồ sơ trước khi đặt lịch!
              </p>
            ) }
          </div>
          <form onSubmit={ handleSubmit(onSubmit) }>
            <div className="flex flex-col gap-4">
              {/* Hàng đầu tiên */ }
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1">
                  {/* Chi nhánh khám */ }
                  <SelectDepartment
                    control={ control }
                    name="department"
                    selectedProductID={
                      selectedProduct?.serviceID ||
                      selectedProduct?.medicalPackageID
                    }
                    errors={ errors }
                    specialtyID={
                      selectedProduct?.bookingDetail?.specialtyID || ""
                    }
                    setValue={ setValue }
                    onChange={ (branchID, coordinates) => {
                      handleChangeBranch(branchID, coordinates);
                    } }
                  />
                </div>
                <div className="flex-1">
                  <SelectDoctor
                    control={ control }
                    name="doctor"
                    errors={ errors }
                    branchID={
                      getCurSelectedProduct()?.bookingDetail?.selectedBranchID
                    }
                    setValue={ setValue }
                    specialtyID={
                      selectedProduct?.bookingDetail?.specialtyID || ""
                    }
                    onChange={ (doctorID) => {
                      handleChangeDoctor(doctorID);
                    } }
                    selectedServiceID={
                      selectedProduct?.serviceID ||
                      selectedProduct?.medicalPackageID
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1">
                  <SelectDate
                    control={ control }
                    name="date"
                    doctorID={
                      getCurSelectedProduct()?.bookingDetail?.selectedDoctorID
                    }
                    errors={ errors }
                    setValue={ setValue }
                    onChange={ (date) => {
                      handleChangeDate(date);
                    } }
                  />
                </div>
                <div className="flex-1">
                  <SelectTime
                    control={ control }
                    name="time"
                    doctorID={
                      getCurSelectedProduct()?.bookingDetail?.selectedDoctorID
                    }
                    errors={ errors }
                    setValue={ setValue }
                    onChange={ handleChangeTime }
                    date={ getCurSelectedProduct()?.bookingDetail?.selectedDate }
                  />
                </div>
              </div>
              <div className="mb-2">
                <label htmlFor="room" className="mb-1 block">
                  Phòng khám:
                </label>

                <div className="flex items-center justify-center gap-2">
                  <div className="relative w-full">
                    { " " }
                    <input
                      value={
                        getCurSelectedProduct()?.bookingDetail?.clinic ?? ""
                      }
                      disabled={ true }
                      className={ `h-10 min-h-11 w-full appearance-none rounded-md border border-gray-200 bg-white py-2 pl-5 text-sm placeholder-gray-600 opacity-75 transition duration-200 ease-in-out focus:border-primary-600 focus:outline-none focus:ring-0 md:h-auto` }
                    />
                    <div className="absolute right-0 top-0 flex h-full items-center pr-3">
                      <GomapDistance
                        className="w-full"
                        room={ getCurSelectedProduct()?.bookingDetail?.clinic }
                        hospitalCoordinates={
                          getCurSelectedProduct()?.bookingDetail?.coordinates
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <label htmlFor="bookingForOthers" className="mr-2">
                  Đặt hộ người khác:
                </label>
                <Switch
                  id="bookingForOthers"
                  checked={ isBookingForOthers }
                  onCheckedChange={ handleSwitchChange }
                />
              </div>
              { isBookingForOthers && (
                <>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-xl font-bold">Thông tin người khám</p>
                    <div>
                      { profile?.otherInfo?.relatedPatients?.length ? (
                        <SelectRelatedPatient
                          control={ control }
                          errors={ errors }
                          name="relatedPatient"
                          patientList={ profile.otherInfo.relatedPatients }
                          onChange={ setRelatedPatientID }
                        />
                      ) : (
                        ""
                      ) }
                    </div>
                  </div>
                  <div
                    className={ `${relatedPatientID ? "pointer-events-none" : "pointer-events-auto"} rounded-md bg-gray-500/30 px-5 py-6 pt-2` }
                  >
                    {/* Hàng 1 */ }
                    <div className="mb-4">
                      <InputCustom
                        label="Họ và tên"
                        className="col-span-1 sm:col-span-1"
                        placeholder="Nhập tên"
                        name="fullName"
                        type="text"
                        id="fullName"
                        required
                        control={ control }
                        errors={ errors }
                      />
                    </div>

                    {/* Hàng 2 */ }
                    <div className="mb-4 flex flex-col gap-4 md:flex-row">
                      <div className="flex-1">
                        <InputCustom
                          label="Số điện thoại"
                          className="col-span-1 sm:col-span-1"
                          placeholder="Nhập số điện thoại"
                          name="phoneNumber"
                          type="text"
                          id="phoneNumber"
                          required
                          control={ control }
                          errors={ errors }
                        />
                      </div>
                      <div className="flex-1">
                        <InputCustom
                          label="Email"
                          className="col-span-1 sm:col-span-1"
                          placeholder="Nhập email"
                          name="email"
                          type="email"
                          id="email"
                          control={ control }
                          errors={ errors }
                        />
                      </div>
                    </div>

                    <div className="mb-4 flex flex-col gap-4 md:flex-row">
                      <div className="flex-1">
                        <label htmlFor="gioitinh" className="mb-1 block">
                          Giới tính
                          <span className="pl-1 text-sm text-red-500">*</span>
                        </label>
                        <SelectGender
                          control={ control }
                          name="gender"
                          errors={ errors }
                        />
                      </div>
                      <div className="flex-1">
                        <label htmlFor="ngaysinh" className="mb-1 block">
                          Ngày sinh
                          <span className="pl-1 text-sm text-red-500">*</span>
                        </label>
                        <SelectBirthDate
                          control={ control }
                          name="dateOfBirth"
                          errors={ errors }
                        />
                      </div>
                    </div>
                    {/* Hàng 3 */ }
                    <div className="mb-4 flex flex-col gap-4 md:flex-row">
                      <div className="flex-1">
                        <label htmlFor="occupation" className="mb-1 block">
                          Nghề nghiệp
                        </label>
                        <InputCustom
                          className="col-span-1 sm:col-span-1"
                          placeholder="Nhập nghề nghiệp"
                          name="occupation"
                          type="text"
                          id="occupation"
                          control={ control }
                          errors={ errors }
                        />
                      </div>
                      <div className="flex-1">
                        <label htmlFor="ethnic" className="mb-2 block">
                          Dân tộc
                        </label>
                        <SelectEthnic
                          control={ control }
                          name="ethnic"
                          errors={ errors }
                        />
                      </div>
                    </div>

                    {/* Hàng 4 */ }
                    <div className="mb-4 flex flex-col gap-4 md:flex-row">
                      <div className="flex-1">
                        <InputCustom
                          label="CCCD"
                          required
                          className="col-span-1 sm:col-span-1"
                          placeholder="Nhập CCCD"
                          name="citizenIdentificationNumber"
                          type="text"
                          id="citizenIdentificationNumber"
                          control={ control }
                          errors={ errors }
                        />
                      </div>
                      <div className="flex-1">
                        <InputCustom
                          label="Bảo hiểm y tế"
                          className="col-span-1 sm:col-span-1"
                          placeholder="Nhập BHYT"
                          name="insuranceCode"
                          type="text"
                          id="insuranceCode"
                          control={ control }
                          errors={ errors }
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="col-span-2 flex flex-col gap-1">
                        <InputCustom
                          label="Địa chỉ"
                          className="col-span-1 sm:col-span-1"
                          placeholder="Nhập địa chỉ cụ thể"
                          name="address"
                          type="text"
                          id="address"
                          required
                          control={ control }
                          errors={ errors }
                        />
                      </div>
                    </div>
                  </div>
                </>
              ) }
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
