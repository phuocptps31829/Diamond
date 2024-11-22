import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { doctorApi } from "@/services/doctorsApi";
import AboveInformation from "../../components/client/doctorDetail/AboveInformation";
import BelowInformation from "../../components/client/doctorDetail/BelowInformation";
import OtherDoctor from "../../components/client/doctorDetail/OtherDoctor";
import NotFound from "@/components/ui/NotFound";
import useScrollToTop from "@/hooks/useScrollToTop";
import { workScheduleApi } from "@/services/workSchedulesApi";

export default function DoctorDetail() {
  useScrollToTop();
  const { id } = useParams();

  // gọi API để lấy thông tin bác sĩ theo id
  const {
    data: doctor,
    error: errorDoctor,
    isLoading: isLoadingDoctor,
  } = useQuery({
    queryKey: ["doctor", id],
    queryFn: () => doctorApi.getDoctorById(id),
  });

  // gọi API để lấy danh sách bác sĩ theo chuyên khoa
  const {
    data: doctors,
    error: errorDoctors,
    isLoading: isLoadingDoctors,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: doctorApi.getAllDoctors,
  });

  const { data } = useQuery({
    queryKey: ["schedule", doctor?._id],
    queryFn: () => workScheduleApi.getWorkSchedulesByDoctorID(doctor?._id),
    enabled: !!doctor?._id,
  });
  console.log(data);
  if (errorDoctor || errorDoctors) return <NotFound />;

  return (
    <div className="bg-[#E8F2F7] py-5">
      <AboveInformation doctor={ doctor } isLoading={ isLoadingDoctor } />
      <BelowInformation doctor={ doctor } isLoading={ isLoadingDoctor } schedule={ data?.data } />
      <OtherDoctor
        doctor={ doctor }
        doctors={ doctors }
        isLoading={ isLoadingDoctors }
      />
    </div>
  );
}
