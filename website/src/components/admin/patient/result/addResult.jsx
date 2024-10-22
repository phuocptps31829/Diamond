import InputCustom from "@/components/ui/InputCustom";
import { invoicesPaymentAdminSchema } from "@/zods/admin/invoicesPaymentAdmin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectBirthDate from "../select/SelectBirthday";
import RadioGroupField from "@/components/ui/RadioGroupField";
import { Button } from "@/components/ui/Button";
import SelectEthnic from "@/components/client/checkout/select/SelectEthnicity";
import SelectTime from "../select/SelectTime";
import { toastUI as toast } from "@/components/ui/Toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SpinLoader from "@/components/ui/SpinLoader";
import SelectService from "../select/SelectServices";
import SelectMedicalPackage from "../select/SelectMedicalPackage";
import SelectLevelMedicalPackage from "../select/SelectLevelMedicalPackage";
import SelectDepartment from "../select/SelectDepartment";
import SelectDoctor from "../select/SelectDoctor";
import SelectDate from "../select/SelectDate";
import { appointmentApi } from "@/services/appointmentsApi";
import { useForm } from "react-hook-form";
import { Switch } from "@/components/ui/Switch";
import { useSelector } from "react-redux";
export default function PatientResult() {
  const queryClient = useQueryClient();
  const userProfile = useSelector((state) => state.auth.userProfile);
  const navigate = useNavigate();
  const combineDateTime = (date, time) => {
    return `${date}T${time}:00.000`;
  };
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(invoicesPaymentAdminSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      gender: "Nam",
      dateOfBirth: "",
      address: "",
      citizenIdentificationNumber: "",
      occupation: "",
      ethnic: "",
      insuranceCode: "",
      department: "",
      doctor: "",
      time: "",
      room: "",
      level: "",
      date: "",
      type: "",
      service: "",
      medicalPackage: "",
      isServiceSelected: true,
    },
  });
  const [selectedService, setSelectedService] = useState({
    serviceId: null,
    specialtyID: null,
  });
  const [selectedPackage, setSelectedPackage] = useState({
    medicalPackageId: null,
    specialtyID: null,
    services: [],
  });
  const [selectedLevel, setSelectedLevel] = useState({
    levelId: null,
    price: null,
  });
  const [selectedBranchId, setSelectedBranchId] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [clinic, setClinic] = useState("");
  const [workScheduleID, setWorkScheduleID] = useState("");
  const [isServiceSelected, setIsServiceSelected] = useState(true);

  const handleChangeService = (serviceId, specialtyID, price) => {
    setSelectedService({ serviceId, specialtyID, price });
    setSelectedBranchId("");
    setSelectedDoctorId("");
    setSelectedDate("");
    setSelectedTime("");
    setClinic("");
    setValue("department", "");
    setValue("doctor", "");
    setValue("time", "");
    setValue("date", "");
    setValue("room", "");
  };

  const handleChangeLevel = (levelId, price) => {
    setSelectedLevel({ levelId, price });
  };
  const handleChangeMedicalPackage = (
    medicalPackageId,
    specialtyID,
    services
  ) => {
    setSelectedPackage({ medicalPackageId, specialtyID, services });
    setSelectedLevel("");
    setSelectedBranchId("");
    setSelectedDoctorId("");
    setSelectedDate("");
    setSelectedLevel("");
    setSelectedTime("");
    setClinic("");
    setValue("department", "");
    setValue("level", "");
    setValue("doctor", "");
    setValue("time", "");
    setValue("date", "");
    setValue("room", "");
  };

  const handleChangeBranch = (branchId) => {
    setSelectedBranchId(branchId);
    setSelectedDoctorId("");
    setSelectedDate("");
    setSelectedTime("");
    setClinic("");
    setValue("doctor", "");
    setValue("time", "");
    setValue("date", "");
    setValue("room", "");
  };

  const handleChangeDoctor = (doctorId) => {
    setSelectedDoctorId(doctorId);
    setSelectedDate("");
    setSelectedTime("");
    setClinic("");
    setValue("time", "");
    setValue("date", "");
    setValue("room", "");
  };

  const handleChangeDate = (date) => {
    setSelectedDate(date);
    setSelectedTime("");
    setClinic("");
    setValue("time", "");
    setValue("room", "");
  };

  const handleChangeTime = (workScheduleID, clinic, time) => {
    setSelectedTime(time);
    setClinic(clinic?.name);
    setWorkScheduleID(workScheduleID);
  };

  const handleSwitchChange = (checked) => {
    const isServiceSelected = !checked;
    setIsServiceSelected(!checked);
    setSelectedService({ serviceId: null, specialtyID: null, price: null });
    setSelectedPackage({
      medicalPackageId: null,
      specialtyID: null,
      services: [],
    });
    setSelectedBranchId("");
    setSelectedDoctorId("");
    setSelectedDate("");
    setSelectedTime("");
    setClinic("");
    setSelectedLevel({ levelId: null, price: null });
    setValue("service", "");
    setValue("medicalPackage", "");
    setValue("department", "");
    setValue("doctor", "");
    setValue("level", "");
    setValue("time", "");
    setValue("type", "");
    setValue("date", "");
    setValue("room", "");
    setValue("isServiceSelected", isServiceSelected);
  };

  const { mutate: createAppointmentMutation, isPending } = useMutation({
    mutationFn: (appointmentData) =>
      appointmentApi.createAppointment(appointmentData, "cod"),
    onSuccess: () => {
      queryClient.invalidateQueries("appointments");
      toast("Đã thêm thành công lịch hẹn!", "success");
      reset();
      navigate("/admin/appointments/list");
    },
    onError: (error) => {
      toast("Đã xảy ra lỗi khi thêm lịch hẹn.", "error");
      console.error("Error creating appointment:", error);
    },
  });

  const onSubmit = async (data) => {
    const submissionData = {
      patientID: userProfile._id,
      appointmentHelpUser: {
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        address: data.address,
        citizenIdentificationNumber: data.citizenIdentificationNumber,
        otherInfo: {
          occupation: data.occupation,
          insuranceCode: data.insuranceCode,
          ethnic: data.ethnic,
        },
      },
      data: [
        {
          workScheduleID: workScheduleID,
          type: data.type,
          time: combineDateTime(selectedDate, selectedTime),
          status: "PENDING",
          price: selectedService?.price ?? selectedLevel.price,
          ...(isServiceSelected
            ? { serviceID: selectedService.serviceId }
            : { medicalPackageID: selectedLevel.levelId }),
        },
      ],
    };

    createAppointmentMutation(submissionData);
  };

  return (
    <div className="w-[100%] rounded-lg bg-white px-7 py-6">
      <form onSubmit={ handleSubmit(onSubmit) }>
        <h1 className="mb-4 mr-2 h-fit bg-white text-2xl font-bold">
          Thông tin đặt lịch hẹn
        </h1>
        <div className="grid-cols-1 gap-[10px] sm:grid md:flex">
          <div className="w-full">
            <div className="grid-cols-1 gap-[10px] sm:grid md:flex">
              <div className="w-full">
                {/* Line 1 */ }
                <div className="block">
                  <div className="flex w-full grid-cols-1 gap-[20px]">
                    <div className="relative md:mb-1 md:w-1/2 xl:mb-[4px] 2xl:mb-3">
                      <InputCustom
                        label={ "Họ và tên người dùng" }
                        required
                        className="col-span-1 sm:col-span-1"
                        name="fullName"
                        type="text"
                        id="fullName"
                        placeholder="Nhập họ và tên bệnh nhân"
                        control={ control }
                        errors={ errors }
                      />
                    </div>

                    <div className="relative md:mb-1 md:w-1/2 xl:mb-[4px] 2xl:mb-3">
                      <InputCustom
                        label={ "Số điện thoại" }
                        required
                        className="col-span-1 sm:col-span-1"
                        name="phoneNumber"
                        type="text"
                        id="phoneNumber"
                        placeholder="Nhập số điện thoại"
                        control={ control }
                        errors={ errors }
                      />
                    </div>

                    <div className="relative md:mb-1 md:w-1/2 xl:mb-[4px] 2xl:mb-3">
                      <InputCustom
                        label={ "Email" }
                        className="col-span-1 sm:col-span-1"
                        name="email"
                        type="text"
                        id="email"
                        placeholder="Nhập email"
                        control={ control }
                        errors={ errors }
                      />
                    </div>
                  </div>
                </div>

                {/* Line 2 */ }
                <div className="my-2 flex w-full gap-5">
                  <div className="w-1/6">
                    <RadioGroupField
                      name="gender"
                      label="Giới tính:"
                      options={ [
                        { value: "Nam", label: "Nam" },
                        { value: "Nữ", label: "Nữ" },
                      ] }
                      control={ control }
                    />
                  </div>
                  <div className="flex w-1/3">
                    <div className="relative w-full xl:mb-[4px] 2xl:mb-3">
                      <label
                        htmlFor="ngaysinh"
                        className="left-[15px] mb-2 block bg-white px-1 text-sm"
                      >
                        Ngày sinh <span className="text-red-500">*</span>
                      </label>
                      <SelectBirthDate
                        control={ control }
                        name="dateOfBirth"
                        errors={ errors }
                      />
                    </div>
                  </div>
                  <div className="relative mb-3 md:w-1/3">
                    <label
                      htmlFor="hoten"
                      className="left-[15px] mb-2 block bg-white px-1 text-[14px]"
                    >
                      Dân tộc
                    </label>
                    <SelectEthnic
                      control={ control }
                      name="ethnic"
                      errors={ errors }
                    />
                  </div>
                  <div className="relative md:mb-1 md:w-1/2 xl:mb-[4px] 2xl:mb-3">
                    <InputCustom
                      label={ "Nghề nghiệp" }
                      className="col-span-1 sm:col-span-1"
                      name="occupation"
                      type="text"
                      id="occupation"
                      placeholder="Nhập nghề nghiệp"
                      control={ control }
                      errors={ errors }
                    />
                  </div>
                </div>

                {/* Line 4 */ }
                <div className="block">
                  <div className="w-full gap-[20px] md:flex">
                    <div className="relative w-1/4 md:mb-1">
                      <InputCustom
                        label={ "CCCD/CMND " }
                        required
                        className="col-span-1 sm:col-span-1"
                        name="citizenIdentificationNumber"
                        type="text"
                        id="citizenIdentificationNumber"
                        placeholder="Nhập mã căn cước công dân"
                        control={ control }
                        errors={ errors }
                      />
                    </div>
                    <div className="relative md:mb-1 md:w-1/3 xl:mb-[4px] 2xl:mb-3">
                      <InputCustom
                        label={ "Mã bảo hiểm y tế" }
                        className="col-span-1 sm:col-span-1"
                        name="insuranceCode"
                        type="text"
                        id="insuranceCode"
                        placeholder="Nhập mã bảo hiểm y tế"
                        control={ control }
                        errors={ errors }
                      />
                    </div>
                    <div className="relative flex-1 md:mb-1 xl:mb-[4px] 2xl:mb-3">
                      <InputCustom
                        label={ "Địa chỉ" }
                        required
                        className="col-span-1 sm:col-span-1"
                        name="address"
                        type="text"
                        id="address"
                        placeholder="Nhập địa chỉ"
                        control={ control }
                        errors={ errors }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Line 3 */ }
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span>Dịch vụ</span>
                <Switch
                  className="bg-primary-500"
                  checked={ !isServiceSelected }
                  onCheckedChange={ handleSwitchChange }
                />
                <span>Gói khám</span>
              </div>

              { isServiceSelected ? (
                <div className="flex-1">
                  <SelectService
                    control={ control }
                    name="service"
                    errors={ errors }
                    setValue={ setValue }
                    onChange={ handleChangeService }
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="flex-1">
                    <SelectMedicalPackage
                      control={ control }
                      name="medicalPackage"
                      errors={ errors }
                      setValue={ setValue }
                      onChange={ handleChangeMedicalPackage }
                    />
                  </div>

                  { selectedPackage && (
                    <div className="flex-1">
                      <SelectLevelMedicalPackage
                        control={ control }
                        name="level"
                        errors={ errors }
                        levels={ selectedPackage.services }
                        onChange={ handleChangeLevel }
                      />
                    </div>
                  ) }
                </div>
              ) }

              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1">
                  {/* Chi nhánh khám */ }
                  <SelectDepartment
                    control={ control }
                    name="department"
                    selectedServiceID={ selectedService.serviceId }
                    selectedMedicalPackageID={ selectedPackage.medicalPackageId }
                    errors={ errors }
                    specialtyID={
                      selectedService.specialtyID || selectedPackage.specialtyID
                    }
                    setValue={ setValue }
                    onChange={ handleChangeBranch }
                  />
                </div>
                <div className="flex-1">
                  <SelectDoctor
                    control={ control }
                    name="doctor"
                    errors={ errors }
                    branchId={ selectedBranchId }
                    setValue={ setValue }
                    specialtyID={
                      selectedService.specialtyID || selectedPackage.specialtyID
                    }
                    onChange={ handleChangeDoctor }
                    selectedServiceID={
                      selectedService.serviceId ||
                      selectedPackage.medicalPackageId
                    }
                  />
                </div>
              </div>

              {/* Selet time */ }
              <div className="flex flex-col gap-4 md:flex-row">
                {/* Date */ }
                <div className="flex-1">
                  <SelectDate
                    control={ control }
                    name="date"
                    doctorId={ selectedDoctorId }
                    branchId={ selectedBranchId }
                    errors={ errors }
                    setValue={ setValue }
                    onChange={ handleChangeDate }
                  />
                </div>
                <div className="flex-1">
                  <SelectTime
                    control={ control }
                    name="time"
                    doctorId={ selectedDoctorId }
                    branchId={ selectedBranchId }
                    errors={ errors }
                    setValue={ setValue }
                    onChange={ handleChangeTime }
                    date={ selectedDate }
                  />
                </div>
              </div>
              <div className="flex-1">
                <InputCustom
                  id="type"
                  name="type"
                  label="Loại hình khám"
                  type="text"
                  placeholder="Nhập loại hình khám"
                  control={ control }
                  errors={ errors }
                />
              </div>
              <div className="">
                <label htmlFor="room" className="mb-1 block text-sm">
                  Phòng khám:
                </label>

                <div className="flex items-center justify-center gap-2">
                  <input
                    value={ clinic ?? "" }
                    disabled={ true }
                    className="h-10 min-h-11 w-full appearance-none rounded-md border border-gray-200 bg-white py-2 pl-5 text-sm placeholder-gray-600 opacity-75 transition duration-200 ease-in-out focus:border-primary-600 focus:outline-none focus:ring-0 md:h-auto"
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 flex justify-end">
              <Button variant="custom" type="submit" disabled={ isPending }>
                { isPending ? <SpinLoader /> : "Đặt lịch" }
              </Button>
            </div>
            {/* Line 4 */ }
          </div>
        </div>

      </form>
    </div>
  );
}
