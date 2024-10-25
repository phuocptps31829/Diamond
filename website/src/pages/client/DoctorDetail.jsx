import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { doctorApi } from "@/services/doctorsApi";
import AboveInformation from "../../components/client/doctorDetail/AboveInformation";
import BelowInformation from "../../components/client/doctorDetail/BelowInformation";
import OtherDoctor from "../../components/client/doctorDetail/OtherDoctor";
import NotFound from "@/components/client/notFound";
import useScrollToTop from "@/hooks/useScrollToTop";

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
    queryKey: "doctors",
    queryFn: doctorApi.getAllDoctors,
  });

  if (errorDoctor || errorDoctors) return <NotFound />;

  return (
    <div className="bg-[#E8F2F7] py-5">
      <AboveInformation doctor={doctor} isLoading={isLoadingDoctor} />
      <BelowInformation />
      <OtherDoctor
        doctor={doctor}
        doctors={doctors}
        isLoading={isLoadingDoctors}
      />
    </div>
  );
}
