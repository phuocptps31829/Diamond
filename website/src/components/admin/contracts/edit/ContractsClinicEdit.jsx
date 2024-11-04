import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import InputCustom from "@/components/ui/InputCustom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toastUI } from "@/components/ui/Toastify";
import ImagePreview from "@/components/ui/ImagePreview";
import { axiosInstanceCUD } from "@/services/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import SpinLoader from "@/components/ui/SpinLoader";
// import { contractApi } from "@/services/appointmentsApi";

const ContractsClinicEdit = () => {
  const { id } = useParams();
  const [imagePreview, setImagePreview] = useState(null);
  const [address, setAddress] = useState(null);
  const [fileImage, setFileImage] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: contractData, isLoading } = useQuery({
    queryKey: ["contract", id],
    // queryFn: () => contractApi.getContractById(id),
  });

 
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(),
    defaultValues: {
      clinic_name: "",
      contract_date: "",
      contract_duration: "",
      contact_person: "",
      contact_phone: "",
      address: "",
    },
  });
  useEffect(() => {
    if (contractData) {
      reset({
        clinic_name: contractData.clinicName,
        contract_date: contractData.contractDate,
        contract_duration: contractData.contractDuration,
        contact_person: contractData.contactPerson,
        contact_phone: contractData.contactPhone,
        address: contractData.address,
      });
      setImagePreview(contractData.imagesURL[0]);
      setAddress(contractData.address);
    }
  }, [contractData, reset]);


  const mutation = useMutation({
    // mutationFn: (updatedData) => contractApi.updateContract(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries("contracts");
      toastUI("Cập nhật hợp đồng phòng khám thành công.", "success");
      navigate("/admin/contracts/list");
    },
    onError: (error) => {
      toastUI("Cập nhật hợp đồng phòng khám thất bại.", "error");
      console.error("Error updating contract:", error);
    },
  });

  const onSubmit = async (data) => {
    if (!fileImage && !imagePreview) {
      toastUI("Vui lòng chọn ảnh!", "error");
      return;
    }

    const formData = new FormData();
    if (fileImage) {
      formData.append("file", fileImage);
    }
    setIsPending(true);

    try {
      let imageName = imagePreview;
      if (fileImage) {
        const response = await axiosInstanceCUD.post(
          "/images/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        imageName = response.data.data;
      }

      const updatedData = {
        clinicName: data.clinic_name,
        imagesURL: [imageName],
        address: address?.name || null,
        contractDate: data.contract_date,
        contractDuration: data.contract_duration,
        contactPerson: data.contact_person,
        contactPhone: data.contact_phone,
      };

      console.log(updatedData);

      mutation.mutate(updatedData);
    } catch (error) {
      toastUI("Lỗi hình ảnh vui lòng thử lại.", "error");
      console.error("Error uploading image:", error);
    } finally {
      setIsPending(false);
    }
  };

  if (isLoading) {
    return <SpinLoader />;
  }

  return (
    <div className="w-full">
      <div className="rounded-xl bg-white px-6 py-6">
        <h1 className="mb-5 mr-2 h-fit bg-white text-2xl font-bold">
          Chỉnh sửa hợp đồng phòng khám
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2 grid-cols-1 gap-[10px] sm:grid md:flex">
            <div className="mr-2">
              <ImagePreview
                imagePreview={imagePreview}
                setFileImage={setFileImage}
                setImagePreview={setImagePreview}
              />
              {!fileImage && !imagePreview && (
                <p className="mt-3 text-center text-sm text-red-500">
                  Vui lòng chọn ảnh
                </p>
              )}
            </div>
            <div className="w-full">
              <div className="grid grid-cols-1 items-center justify-center gap-5">
                <InputCustom
                  id="clinic_name"
                  type="text"
                  name="clinic_name"
                  label="Tên phòng khám:"
                  placeholder="Nhập tên phòng khám"
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
                  id="contact_person"
                  type="text"
                  name="contact_person"
                  label="Người liên hệ:"
                  placeholder="Nhập tên người liên hệ"
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
                "Cập nhật hợp đồng phòng khám"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContractsClinicEdit;
