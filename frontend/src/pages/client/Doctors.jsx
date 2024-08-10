import BannerDoctor from "../../components/client/doctors/Banner";
import ListDoctors from "../../components/client/doctors/ListDoctors";
export default function Doctors() {
  return (
    <div className="bg-[#E8F2F7]">
      <BannerDoctor />
      <ListDoctors />
    </div>
  );
}
