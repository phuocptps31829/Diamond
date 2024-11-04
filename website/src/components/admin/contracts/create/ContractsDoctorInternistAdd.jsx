import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import InputCustom from "@/components/ui/InputCustom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { contractApi } from "@/services/contractApi";
import { toastUI } from "@/components/ui/Toastify";
import ImagePreview from "@/components/ui/ImagePreview";
import { axiosInstanceCUD } from "@/services/axiosInstance";
import { useNavigate } from "react-router-dom";
import SpinLoader from "@/components/ui/SpinLoader";

const ContractsDoctorInternistAdd = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [address, setAddress] = useState(null);
  const [fileImage, setFileImage] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  console.log(address);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(),
    defaultValues: {
      doctor_name: "",
      contract_date: "",
      contract_duration: "",
      specialization: "",
      contact_phone: "",
      address: "",
    },
  });

  const mutation = useMutation({
    // mutationFn: (contractData) => contractApi.addContract(contractData),
    onSuccess: () => {
      queryClient.invalidateQueries("contracts");
      toastUI("Thêm hợp đồng bác sĩ nội khoa thành công.", "success");
      reset();
      setImagePreview(null);
      setAddress(null);
      navigate("/admin/contracts/list");
    },
    onError: (error) => {
      toastUI("Thêm hợp đồng bác sĩ nội khoa thất bại.", "error");
      console.error("Error creating contract:", error);
    },
  });

  const onSubmit = async (data) => {
    if (!fileImage && !imagePreview) {
      toastUI("Vui lòng chọn ảnh!", "error");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileImage);
    setIsPending(true);

    try {
      const response = await axiosInstanceCUD.post("/images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data.data);
      const imageName = response.data.data;

      const contractData = {
        doctorName: data.doctor_name,
        imagesURL: [imageName],
        address: address?.name || null,
        contractDate: data.contract_date,
        contractDuration: data.contract_duration,
        specialization: data.specialization,
        contactPhone: data.contact_phone,
      };

      console.log(contractData);

      mutation.mutate(contractData);
    } catch (error) {
      toastUI("Lỗi hình ảnh vui lòng thử lại.", "error");
      console.error("Error uploading image:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="w-full">
      <div className="rounded-xl bg-white px-6 py-6">
        <h1 className="mb-5 mr-2 h-fit bg-white text-2xl font-bold">
          Thêm hợp đồng bác sĩ nội khoa
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2 grid-cols-1 gap-[10px] sm:grid md:flex">
            <div className="mr-2">
              <ImagePreview
                imagePreview={imagePreview}
                setFileImage={setFileImage}
                setImagePreview={setImagePreview}
              />
              {!fileImage && (
                <p className="mt-3 text-center text-sm text-red-500">
                  Vui lòng chọn ảnh
                </p>
              )}
            </div>
            <div className="w-full">
              <div className="grid grid-cols-1 items-center justify-center gap-5">
                <InputCustom
                  id="doctor_name"
                  type="text"
                  name="doctor_name"
                  label="Tên bác sĩ:"
                  placeholder="Nhập tên bác sĩ"
                  control={control}
                  errors={errors}
                />
                <InputCustom
                  id="contract_date"
                  type="date"
                  name="contract_date"
                  label="Ngày ký hợp đồng:"
                  placeholder="Chọn ngày ký hợp đồng"
                  control={control}
                  errors={errors}
                />
                <InputCustom
                  id="contract_duration"
                  type="text"
                  name="contract_duration"
                  label="Thời hạn hợp đồng:"
                  placeholder="Nhập thời hạn hợp đồng"
                  control={control}
                  errors={errors}
                />
                <InputCustom
                  id="specialization"
                  type="text"
                  name="specialization"
                  label="Chuyên khoa:"
                  placeholder="Nhập chuyên khoa"
                  control={control}
                  errors={errors}
                />
                <InputCustom
                  id="contact_phone"
                  type="text"
                  name="contact_phone"
                  label="Số điện thoại liên hệ:"
                  placeholder="Nhập số điện thoại liên hệ"
                  control={control}
                  errors={errors}
                />
              </div>
            </div>
          </div>

          <div className="mt-10 w-full text-end">
            <Button
              type="submit"
              disabled={isPending || mutation.isPending}
              variant="custom"
            >
              {isPending || mutation.isPending ? (
                <>
                  <SpinLoader />
                </>
              ) : (
                "Thêm hợp đồng bác sĩ nội khoa"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContractsDoctorInternistAdd;