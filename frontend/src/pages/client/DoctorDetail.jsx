import AboveInformation from "../../components/client/doctorDetail/AboveInformation";
import BelowInformation from "../../components/client/doctorDetail/BelowInformation";
import OtherDoctor from "../../components/client/doctorDetail/OtherDoctor";

export default function DoctorDetail() {
  return (
    <div className="bg-[#E8F2F7] py-5">
      <AboveInformation />
      <BelowInformation />
      <OtherDoctor />
    </div>
  );
}
