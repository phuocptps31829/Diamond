import InputCustom from "@/components/ui/InputCustom";
import { patientAdminSchema } from "@/zods/admin/patientAdmin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import SelectBirthDate from "@/components/client/checkout/select/SelectBirthday";
import RadioGroupField from "@/components/ui/RadioGroupField";

import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/Button";
import { patientApi } from "@/services/patientsApi";
import { toastUI as toast } from "@/components/ui/Toastify";
import SpinLoader from "@/components/ui/SpinLoader";
import DoctorEditor from "../../doctor/editor";
import SelectMedicineCategories from "../../medicine/select/SelectMedicineCategories";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useForm, Controller } from "react-hook-form";
import { SelectDoctorsOfServices, SelectServices } from "../select/getSevices";
export default function PatientResult() {
  const [medicines, setMedicines] = useState([{ id: Date.now() }]);
  const navigate = useNavigate();
  const [loadingImage, setLoadingImage] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(patientAdminSchema),
    medicines: [{ medicineCategoryID: "", quantity: "", usage: "" }],
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      dateOfBirth: "",
      password: "",
      confirmPassword: "",
      gender: "Nam",
      roleID: "1",
      insuranceCode: "",
      occupation: "",
      citizenIdentificationNumber: "",
      ethnic: "",
      isActivated: true,
    },
  });

  const { mutate: createPatientMutation, isPending } = useMutation({
    mutationFn: patientApi.createPatient,
    onSuccess: () => {
      reset();
      toast("Thêm mới thành công!", "success");
      navigate("/admin/patients/list");
    },
    onError: (error) => {
      console.log("error", error);
      toast(
        error ? error.response.data.message : "Thêm mới thất bại!",
        "error",
      );
    },
  });
  const onSubmit = async (data) => {
    const requestBody = {
      fullName: data.fullName,
      roleID: data.roleID,
      phoneNumber: data.phone,
      email: data.email,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      password: data.password,
      citizenIdentificationNumber: data.citizenIdentificationNumber,
      isActivated: data.isActivated,
      address: {
        province: data.province,
        district: data.district,
        ward: data.ward,
        street: data.street,
      },
      otherInfo: {
        occupation: data.occupation,
        insuranceCode: data.insuranceCode,
        ethnic: data.ethnic,
      },
    };
    createPatientMutation(requestBody);
  };
  const addMedicine = () => {
    setMedicines([...medicines, { id: Date.now() }]);
  };
  const removeMedicine = (index) => {
    const updatedMedicines = medicines.filter((_, i) => i !== index);
    setMedicines(updatedMedicines);
  };
  return (
    <div className="w-[100%] rounded-lg bg-white px-7 py-6 shadow-gray">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Image */}
        <div className="grid-cols-1 gap-[10px] sm:grid md:flex">
          <div className="w-full">
            {/* Line 1 */}
            <div className="block">
              <div className="flex w-full grid-cols-1 gap-[20px]">
                <div className="relative md:mb-1 md:w-1/2 xl:mb-[4px] 2xl:mb-3">
                  <InputCustom
                    label={"Họ và tên người dùng"}
                    required
                    className="col-span-1 sm:col-span-1"
                    name="fullName"
                    type="text"
                    id="fullName"
                    placeholder="Nhập họ và tên bệnh nhân"
                    control={control}
                    errors={errors}
                  />
                </div>
                <div className="relative md:mb-1 md:w-2/4 xl:mb-[4px] 2xl:mb-3">
                  <label
                    htmlFor="ngaysinh"
                    className="left-[15px] mb-2 block bg-white px-1 text-sm"
                  >
                    Ngày khám <span className="text-red-500">*</span>
                  </label>
                  <SelectBirthDate
                    control={control}
                    name="appointmentDate"
                    errors={errors}
                    placeholder="Chọn ngày khám"
                  />
                </div>
                <div className="relative md:mb-1 md:w-1/2 xl:mb-[4px] 2xl:mb-3">
                  <InputCustom
                    label={"Số điện thoại"}
                    required
                    className="col-span-1 sm:col-span-1"
                    name="phone"
                    type="text"
                    id="phone"
                    placeholder="Nhập số điện thoại"
                    control={control}
                    errors={errors}
                  />
                </div>
              </div>
            </div>

            {/* Line 2 */}
            <div className="flex w-full">
              <div className="flex w-full gap-[20px]">
                <div className="relative md:mb-1 md:w-1/3 xl:mb-[4px] 2xl:mb-3">
                  <label
                    htmlFor="ngaysinh"
                    className="left-[15px] mb-2 block bg-white px-1 text-sm"
                  >
                    Ngày sinh <span className="text-red-500">*</span>
                  </label>
                  <SelectBirthDate
                    control={control}
                    name="dateOfBirth"
                    errors={errors}
                    placeholder="Chọn ngày sinh"
                  />
                </div>

                <div className="relative md:mb-1 md:w-1/3 xl:mb-[4px] 2xl:mb-3">
                  <InputCustom
                    label={"Mã bảo hiểm y tế"}
                    required
                    className="col-span-1 sm:col-span-1"
                    name="insuranceCode"
                    type="text"
                    id="insuranceCode"
                    placeholder="Nhập mã bảo hiểm y tế"
                    control={control}
                    errors={errors}
                  />
                </div>
                <div className="relative md:mb-1 md:w-1/3 xl:mb-[4px] 2xl:mb-3">
                <div className="w-1/4">
            <RadioGroupField
              name="gender"
              label="Giới tính:"
              options={[
                { value: "Nam", label: "Nam" },
                { value: "Nữ", label: "Nữ" },
              ]}
              control={control}
            />
          </div>
                </div>
              </div>
            </div>
            <div className="block">
              <div className="relative md:mb-1 xl:mb-[4px] 2xl:mb-3">
                    <InputCustom
                      label={"Địa chỉ"}
                      required
                      className="col-span-1 sm:col-span-1"
                      name="address"
                      type="text"
                      id="address"
                      placeholder="Nhập địa chỉ"
                      control={control}
                      errors={errors}
                    />
              </div>
            </div>
            {/* Line 3 */}
            <div className="flex w-full">
              <div className="flex w-full gap-[20px]">
                <div className="relative md:mb-1 md:w-1/2 xl:mb-[4px] 2xl:mb-3 ">
                <label
                    htmlFor="ngaysinh"
                    className="left-[15px] mb-2 block bg-white px-1 text-sm"
                  >
                    Dịch vụ <span className="text-red-500">*</span>
                  </label>
                  <SelectServices
                    control={control}
                    name="services"
                    errors={errors}
                  />
                </div>
                <div className="relative md:mb-1 md:w-1/2 xl:mb-[4px] 2xl:mb-3">
                <label
                    htmlFor="doctors"
                    className="left-[15px] mb-2 block bg-white px-1 text-sm"
                  >
                    Bác sĩ tham khám <span className="text-red-500">*</span>
                  </label>
                    <SelectDoctorsOfServices
                      control={control}
                      name="doctors"
                      setValue={setValue}
                      errors={errors}
                    />
                </div>
              </div>
            </div>
            {/* Line 4 */}
            <div className="block">
              <div className="relative md:mb-1 xl:mb-[4px] 2xl:mb-3">
                  <InputCustom
                    label={"Chuẩn đoán"}
                    required
                    className="col-span-1 sm:col-span-1"
                    name="address"
                    type="text"
                    id="address"
                    placeholder="Nhập chẩn đoán kết quả sau khi khám..."
                    control={control}
                    errors={errors}
                  />
                </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="hoten" className="mb-2 block px-1 left-[15px] bg-white text-base">
          Nhập chi tiết chẩn đoán: <span className="text-red-500">*</span>
          </label>
          <DoctorEditor name="detail"
            control={ control }
            errors={ errors }
          />
        </div>
        <div className="my-3">
        <label className="">Thêm đơn thuốc (nếu có):</label>
        <div className="w-full rounded-lg border-2 border-dashed border-primary-200 p-6 mt-1">
          {medicines.map((medicine, index) => (
            <div key={medicine.id}>
              <h4 className="text-lg font-semibold mb-2">Thuốc <strong className="text-primary-500">{index + 1}</strong><span className="text-red-500"> *</span></h4> 
              <div className="flex w-full gap-[15px] ">
                <div className="md:w-2/5">
                  <Label className="mb-3 block text-sm font-medium leading-none text-black">
                    Danh mục: <span className="text-red-500">*</span>
                  </Label>
                  <SelectMedicineCategories
                    name={`medicines[${index}].medicineCategoryID`}
                    control={control}
                    errors={errors}
                  />
                </div>
                <div className="md:w-2/5">
                  <Label className="mb-3 block text-sm font-medium leading-none text-black">
                    Chọn thuốc: <span className="text-red-500">*</span>
                  </Label>
                  <SelectMedicineCategories
                    name={`medicines[${index}].medicineID`}
                    control={control}
                    errors={errors}
            />
          </div>
          <div className="w-1/5 md:mb-1 xl:mb-[4px] 2xl:mb-3">
            <InputCustom
              label={"Số lượng"}
              required
              className="col-span-1 sm:col-span-1"
              name={`medicines[${index}].quantity`}
              type="text"
              id={`quantity-${index}`}
              placeholder="Số lượng thuốc"
              control={control}
              errors={errors}
            />
          </div>
        </div>
        <div className="relative md:mb-1 xl:mb-[4px] 2xl:mb-3">
          <InputCustom
            label={"Hướng dẫn dùng thuốc"}
            required
            className="col-span-1 sm:col-span-1"
            name={`medicines[${index}].usage`}
            type="text"
            id={`usage-${index}`}
            placeholder="Nhập hướng dẫn"
            control={control}
            errors={errors}
          />
        </div>
        <div className="flex  justify-end mt-2 ">
            <Button
              className="bg-red-400 text-white hover:bg-red-600 hover:text-white " 
              variant="outline"
              type="button"
              onClick={() => removeMedicine(index)}
            >
              Xóa
            </Button>
          </div>
            </div>
          ))}
          <Button 
            className="bg-primary-500 text-white hover:bg-primary-600 hover:text-white"
            variant="outline" 
            type="button" 
            onClick={addMedicine}>
            Thêm thuốc
          </Button>
        </div>
      </div>

        <div className="flex justify-end">
          <Button
            variant="custom"
            type="submit"
            disabled={isPending || loadingImage}
          >
            {isPending || loadingImage ? <SpinLoader /> : "Thêm mới"}
          </Button>
        </div>
      </form>
    </div>
  );
}
