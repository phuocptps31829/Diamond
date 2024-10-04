import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Switch";
import SelectDepartment from "./select/SelectDepartment";
import SelectDoctor from "./select/SelectDoctor";
import SelectDate from "./select/SelectDate";
import SelectTime from "./select/SelectTime";
import SelectService from "./select/SelectServices";
import SelectMedicalPackage from "./select/SelectMedicalPackage";
import InputCustom from "@/components/ui/InputCustom";
import { AppointmentAdminSchema } from "@/zods/admin/appointmentsAdmin";

const AppointmentsEdit = () => {
  const { id } = useParams();

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
  const [selectedBranchId, setSelectedBranchId] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [clinic, setClinic] = useState("");
  const [workScheduleID, setWorkScheduleID] = useState("");
  const [isServiceSelected, setIsServiceSelected] = useState(true);

  useEffect(() => {
    const fetchAppointmentData = async () => {
      const response = await fetch(`/api/appointments/${id}`);
      const data = await response.json();

      setValue("department", data.department);
      setValue("doctor", data.doctor);
      setValue("time", data.time);
      setValue("room", data.room);
      setValue("date", data.date);
      setValue("type", data.type);
      setValue("service", data.service);
      setValue("medicalPackage", data.medicalPackage);
      setValue("isServiceSelected", data.isServiceSelected);

      setSelectedService({
        serviceId: data.service,
        specialtyID: data.specialtyID,
      });
      setSelectedBranchId(data.branchId);
      setSelectedDoctorId(data.doctorId);
      setSelectedDate(data.date);
      setSelectedTime(data.time);
      setClinic(data.clinic);
      setWorkScheduleID(data.workScheduleID);
      setIsServiceSelected(data.isServiceSelected);
    };

    fetchAppointmentData();
  }, [id, setValue]);

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

  const handleChangeMedicalPackage = (medicalPackageId, specialtyID) => {
    setSelectedService({ serviceId: medicalPackageId, specialtyID });
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
    setSelectedBranchId("");
    setSelectedDoctorId("");
    setSelectedDate("");
    setSelectedTime("");
    setClinic("");
    setValue("service", "");
    setValue("medicalPackage", "");
    setValue("department", "");
    setValue("doctor", "");
    setValue("time", "");
    setValue("date", "");
    setValue("room", "");
    setValue("isServiceSelected", isServiceSelected);
  };

  const onSubmit = (data) => {
    const submissionData = {
      patientID: id,
      workScheduleID: workScheduleID,
      serviceID: isServiceSelected ? selectedService.serviceId : "",
      medicalPackageID: !isServiceSelected ? selectedService.serviceId : "",
      type: data.type,
      time: selectedTime,
      price: isServiceSelected ? selectedService.price : null,
    };

    console.log("Submitted Data:", submissionData);
  };

  return (
    <div className="w-full">
      <div className="rounded-xl bg-white px-6 py-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span>Dịch vụ</span>
              <Switch
                checked={!isServiceSelected}
                onCheckedChange={handleSwitchChange}
              />
              <span>Gói khám</span>
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
              <div className="flex-1">
                <SelectMedicalPackage
                  control={control}
                  name="medicalPackage"
                  errors={errors}
                  setValue={setValue}
                  onChange={handleChangeMedicalPackage}
                />
              </div>
            )}

            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1">
                <SelectDepartment
                  control={control}
                  name="department"
                  selectedServiceID={selectedService.serviceId}
                  errors={errors}
                  specialtyID={selectedService.specialtyID || ""}
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
                  specialtyID={selectedService.specialtyID || ""}
                  onChange={handleChangeDoctor}
                  selectedServiceID={selectedService.serviceId}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 md:flex-row">
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
              <Button type="submit" variant="primary">
                Cập nhật lịch hẹn
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentsEdit;
