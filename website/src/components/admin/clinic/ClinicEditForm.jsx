import InputCustom from "@/components/ui/InputCustom";
import { clinicSchema } from "@/zods/client/clinic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import 'react-quill/dist/quill.snow.css';
import { Button } from "@/components/ui/Button";
import { clinicsApi } from "@/services/clinicApi";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toastUI } from "@/components/ui/Toastify";
import SelectBranch from "@/components/client/checkout/select/SelectBranch";
import SelectSpecialty from "@/components/client/checkout/select/SelectSpecialty";
import { useEffect } from "react";

export default function ClinicsForm() {
  const { id } = useParams();
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
      clinicID: "",
      branchID: "",
      address: "",
    },
  });
  const { data, error, isLoading } = useQuery({
    queryKey: ["clinics", id],
    queryFn: () => clinicsApi.getClinicsById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      console.log("Fetched data: ", data);
      console.log("specialtyID data: ", data._doc.specialtyID._id);
      setValue("name", data._doc.name);
      setValue("specialtyID", data._doc.specialtyID._id);
      setValue("branchID", data._doc.branchID._id);
      setValue("address", data._doc.branchID.address);
    }
  }, [data, setValue]);

  const { mutate: updateClinic, isLoading: isSubmitting } = useMutation({
    mutationFn: (newClinics) => clinicsApi.updateClinic(newClinics),
    onSuccess: () => {
      toastUI("Sửa phòng khám thành công", "success");
      navigate('/admin/clinics/list');
    },
    onError: (err) => {
      console.error(err);
      toastUI("Có lỗi xảy ra: " + err.message, "error");
    },
  });

  const onSubmit = (data) => {
    const newClinics = {
      updateClinic: {
        name: data.name,
        specialtyID: data.specialtyID,
        branchID: data.branchID,
        address: data.address,
      },
      id: id,
    };
    updateClinic(newClinics);
    console.log("update Data:", newClinics);
  };
  return (
    <div className="bg-white w-full px-7 py-6 rounded-lg shadow-gray">
      <h1 className="mr-2 bg-white h-fit mb-4 text-2xl font-bold">Thông tin phòng khám</h1>
      { error && <p className="text-red-500">Có lỗi xảy ra khi tải dữ liệu: { error.message }</p> }
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
                    id="specialtyID"
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
                    className="col-span-1 sm:col-span-1"
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
            disabled={ isSubmitting }
          >
            { isSubmitting ? "Đang xử lý..." : "Cập nhật" }
          </Button>
        </div>
      </form>
    </div>
  );
}
