import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import SelectDepartment from "./select/SelectDepartment";
import SelectDoctor from "./select/SelectDoctor";
import SelectDate from "./select/SelectDate";
import SelectTime from "./select/SelectTime";
import { AppointmentAdminSchema } from "@/zods/admin/appointmentsAdmin";
import SelectService from "./select/SelectServices";
import SelectMedicalPackage from "./select/SelectMedicalPackage";
import { useNavigate, useParams } from "react-router-dom";
import InputCustom from "@/components/ui/InputCustom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toastUI } from "@/components/ui/Toastify";
import SelectLevelMedicalPackage from "./select/SelectLevelMedicalPackage";
import SpinLoader from "@/components/ui/SpinLoader";
import { appointmentApi } from "@/services/appointmentsApi";

const AppointmentsAdd = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
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
    resolver: zodResolver(AppointmentAdminSchema),
    defaultValues: {
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
  console.log("errors", errors);

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
  console.log(selectedLevel, "selectedLevel");

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
  console.log(selectedService, "selectedService");

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
  console.log(selectedPackage, "selectedPackage");

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

  const handleServiceButtonClick = () => {
    setIsServiceSelected(true);
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
    setValue("isServiceSelected", true);
  };
  const handlePackageButtonClick = () => {
    setIsServiceSelected(false);
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
    setValue("isServiceSelected", false);
  };

  const mutation = useMutation({
    mutationFn: (appointmentData) =>
      appointmentApi.createAppointment(appointmentData, "cod"),
    onSuccess: () => {
      queryClient.invalidateQueries("appointments");
      toastUI("Đã thêm thành công lịch hẹn!", "success");
      reset();
      navigate("/admin/appointments/list");
    },
    onError: (error) => {
      toastUI("Đã xảy ra lỗi khi thêm lịch hẹn.", "error");
      console.error("Error creating appointment:", error);
    },
  });
  const onSubmit = (data) => {
    const submissionData = {
      patientID: id,
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

    console.log("Submitted Data:", submissionData);
    mutation.mutate(submissionData);
  };

  return (
    <div className="w-full">
      <div className="rounded-xl bg-white px-6 py-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant={isServiceSelected ? "primary" : "outline"}
                onClick={handleServiceButtonClick}
              >
                Dịch vụ
              </Button>
              <Button
                variant={!isServiceSelected ? "primary" : "outline"}
                onClick={handlePackageButtonClick}
              >
                Gói khám
              </Button>
            </div>

            {isServiceSelected ? (
              <div className="flex-1">
                <SelectService
                  control={control}
                  name="service"
                  errors={errors}
                  setValue={setValue}
                  onChange={handleChangeService}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1">
                  <SelectMedicalPackage
                    control={control}
                    name="medicalPackage"
                    errors={errors}
                    setValue={setValue}
                    onChange={handleChangeMedicalPackage}
                  />
                </div>

                {selectedPackage && (
                  <div className="flex-1">
                    <SelectLevelMedicalPackage
                      control={control}
                      name="level"
                      setValue={setValue}
                      errors={errors}
                      levels={selectedPackage.services}
                      onChange={handleChangeLevel}
                    />
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1">
                {/* Chi nhánh khám */}
                <SelectDepartment
                  control={control}
                  name="department"
                  selectedServiceID={selectedService.serviceId}
                  selectedMedicalPackageID={selectedPackage.medicalPackageId}
                  errors={errors}
                  specialtyID={
                    selectedService.specialtyID || selectedPackage.specialtyID
                  }
                  setValue={setValue}
                  onChange={handleChangeBranch}
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
                    selectedService.specialtyID || selectedPackage.specialtyID
                  }
                  onChange={handleChangeDoctor}
                  selectedServiceID={
                    selectedService.serviceId ||
                    selectedPackage.medicalPackageId
                  }
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
                  onChange={handleChangeDate}
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
                  onChange={handleChangeTime}
                  date={selectedDate}
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
                control={control}
                errors={errors}
              />
            </div>
            <div className="">
              <label htmlFor="room" className="mb-1 block text-sm">
                Phòng khám:
              </label>

              <div className="flex items-center justify-center gap-2">
                <input
                  value={clinic ?? ""}
                  disabled={true}
                  className="h-10 min-h-11 w-full appearance-none rounded-md border border-gray-200 bg-white py-2 pl-5 text-sm placeholder-gray-600 opacity-75 transition duration-200 ease-in-out focus:border-primary-600 focus:outline-none focus:ring-0 md:h-auto"
                />
              </div>
            </div>

            <div className="w-full text-end">
              <Button
                type="submit"
                disabled={mutation.isPending}
                variant="custom"
              >
                {mutation.isPending ? (
                  <>
                    <SpinLoader />
                  </>
                ) : (
                  "Thêm lịch hẹn"
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentsAdd;
