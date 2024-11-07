import InputCustom from "@/components/ui/InputCustom";
import { clinicSchema } from "@/zods/clinic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import SelectDepartment from "./select/SelectDepartment";
import SelectSpecialty from "./select/SelectSpecialty";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toastUI } from "@/components/ui/Toastify";
import { useNavigate, useParams } from "react-router-dom";
import SpinLoader from "@/components/ui/SpinLoader";
import { clinicsApi } from "@/services/clinicApi";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import NotFound from "@/components/ui/NotFound";

export default function ClinicEdit() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(clinicSchema),
    defaultValues: {
      clinicName: "",
      specialty: "",
      branch: "",
    },
  });

  const { data, error, isLoading } = useQuery({
    queryKey: ["clinics", id],
    queryFn: () => clinicsApi.getClinicsById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      const initialFormData = {
        clinicName: data.name,
        branch: data.branch?._id,
        specialty: data.specialty?._id,
      };
      setInitialData(initialFormData);
      setValue("clinicName", data.name);
      setValue("specialty", data.specialty?._id);
      setValue("branch", data.branch?._id);
    }
  }, [data, setValue]);

  const handleSpecialtyChange = (specialtyId) => {
    console.log(specialtyId);
  };

  const handleBranchChange = (branchId) => {
    console.log(branchId);
  };

  const mutation = useMutation({
    mutationFn: (clinicData) => clinicsApi.updateClinic(id, clinicData),
    onSuccess: () => {
      queryClient.invalidateQueries("clinics");
      toastUI("Cập nhật phòng khám thành công.", "success");
      reset();
      navigate("/admin/clinics/list");
    },
    onError: (error) => {
      toastUI("Cập nhật phòng khám thất bại.", "error");
      console.error("Error updating clinic:", error);
    },
  });

  const onSubmit = async (data) => {


    if (JSON.stringify(data) === JSON.stringify(initialData)) {
      console.log("No changes detected.");
      toastUI("Không có thay đổi nào được thực hiện.", "warning");
      return;
    }
    const clinicData = {
      name: data.clinicName,
      specialtyID: data.specialty,
      branchID: data.branch,
    };

    console.log(clinicData);

    mutation.mutate(clinicData);
  };

  if (isLoading) {
    return <Skeleton />;
  }
  if (error) return <NotFound message={error.message} />;
  return (
    <div className="rounded-xl bg-white px-6 py-6">
        <h1 className="mb-5 mr-2 h-fit bg-white text-2xl font-bold">
          Chỉnh sửa phòng khám
        </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full">
          <div className="block">
            <div className="w-full gap-[10px] md:flex">
              <InputCustom
                className="col-span-1 sm:col-span-1"
                name="clinicName"
                type="text"
                placeholder={"Tên phòng khám"}
                id="clinicName"
                label={"Tên phòng khám"}
                control={control}
                errors={errors}
              />
            </div>
            <div className="mt-3 grid w-full grid-cols-2 gap-4">
              <div className="">
                <Label
                  htmlFor=""
                  className="mb-2 block text-sm font-medium leading-none text-black"
                >
                  Chuyên khoa:
                </Label>
                <SelectSpecialty
                  name="specialty"
                  control={control}
                  errors={errors}
                  onChange={handleSpecialtyChange}
                />
              </div>
              <div className="">
                <Label
                  htmlFor=""
                  className="mb-2 block text-sm font-medium leading-none text-black"
                >
                  Chi nhánh:
                </Label>
                <SelectDepartment
                  name="branch"
                  control={control}
                  errors={errors}
                  onChange={handleBranchChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 w-full text-end">
          <Button type="submit" disabled={mutation.isPending} variant="custom">
            {mutation.isPending ? (
              <>
                <SpinLoader />
              </>
            ) : (
              "Cập nhật phòng khám"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
