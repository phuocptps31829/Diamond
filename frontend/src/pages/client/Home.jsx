import Banner from "../../components/client/home/Banner";
import OutstandingProduct from "../../components/client/home/OutstandingProduct";
import Specialty from "../../components/client/home/Specialty";
import Introduce from "../../components/client/home/Introduce";
import News from "../../components/client/home/News";
import Collaborate from "../../components/client/home/Collaborate";
export default function Home() {
  return (
    <div className="bg-[#E8F2F7]">
      <Banner />
      <OutstandingProduct />
      <Specialty />
      <Introduce />
      <News />
      <Collaborate />
    </div>
  );
}
