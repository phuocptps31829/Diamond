import InputCustom from "@/components/ui/InputCustom";
import { clinicSchema } from "@/zods/client/clinic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import 'react-quill/dist/quill.snow.css';
import { Button } from "@/components/ui/Button";
import { clinicsApi } from "@/services/clinicApi";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toastUI } from "@/components/ui/Toastify";
import SelectBranch from "@/components/client/checkout/select/SelectBranch";
import SelectSpecialty from "@/components/client/checkout/select/SelectSpecialty";
export default function ClinicsForm() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: zodResolver(clinicSchema),
    defaultValues: {
      name: "",
      specialtyID: "",
      branchID: "",
      address: "",
    },
  });
  const { mutate: createClinics } = useMutation({
    mutationFn: (newClinics) => clinicsApi.createClinics(newClinics),
    onSuccess: () => {
      toastUI("Thêm phòng khám thành công", "success");
      navigate('/admin/clinics/list');
    },
    onError: (err) => {
      console.error(err);
      toastUI("Có lỗi xảy ra: " + err.message, "error");
    },
  });
  const onSubmit = (data) => {
    const newClinics = {
      name: data.name,
      specialtyID: data.specialtyID,
      branchID: data.branchID,
      address: data.address,
    };
    createClinics(data);
    console.log("Form Data:", newClinics);
  };
  return (
    <div className="bg-white w-full px-7 py-6 rounded-lg shadow-gray ">
      <h1 className="mr-2 bg-white h-fit mb-4 text-2xl font-bold">Thông tin phòng khám</h1>

      <form onSubmit={ handleSubmit(onSubmit) }>
        <div className="flex gap-2">
          <div className="w-full">
            {/* Line 1 */ }
            <div className="block">
              <div className="w-full md:flex gap-2">
                <div className="mb-3 md:w-1/2 w-full relative">
                  <label htmlFor="name" className="block px-1 left-2 bg-white">
                    Tên phòng khám <span className="text-red-500">*</span>
                  </label>
                  <InputCustom
                    className="col-span-1 sm:col-span-1"
                    name="name"
                    type="text"
                    id="name"
                    control={ control }
                    errors={ errors }
                  />
                </div>

                <div className="mb-3 md:w-1/2 relative">
                  <label htmlFor="specialty" className="block px-1 left-2 bg-white mb-2">
                    Chuyên khoa <span className="text-red-500">*</span>
                  </label>
                  <SelectSpecialty
                    control={ control }
                    name="specialtyID"
                    errors={ errors }
                  />
                </div>
              </div>
            </div>

            {/* Line 2 */ }
            <div className="w-full flex gap-2">
              <div className="w-full md:flex gap-2">
                <div className="mb-3 md:w-1/2 relative">
                  <label htmlFor="branch" className="block px-1 left-2 bg-white mb-2">
                    Chi nhánh làm việc <span className="text-red-500">*</span>
                  </label>
                  <SelectBranch
                    control={ control }
                    name="branchID"
                    errors={ errors }
                    setValue={ setValue }
                  />
                </div>

                <div className="mb-3 md:w-1/2 w-full relative">
                  <label htmlFor="address" className="block px-1 left-2 bg-white">
                    Địa chỉ cụ thể <span className="text-red-500">*</span>
                  </label>
                  <InputCustom
                    className="col-span-1 sm:col-span-1 "
                    name="address"
                    type="text"
                    id="address"
                    control={ control }
                    errors={ errors }
                    readOnly={ true }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Button */ }
        <div className="flex gap-2 justify-end">
          <Button
            variant="primary"
            className="border-none bg-gray-200 hover:bg-gray-400 text-primary-500 px-6"
            onClick={ () => navigate('/admin/clinics/list') }
          >
            Hủy
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="border-none bg-primary-500 hover:bg-primary-600 px-6"
          >
            Cập nhật
          </Button>
        </div>
      </form>
    </div>
  );
}
