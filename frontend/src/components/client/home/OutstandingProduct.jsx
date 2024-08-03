import ServiceProduct from "../product/Service";
import { Link } from "react-router-dom";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { getAllMedicalPackages } from "@/services/medicalPackagesApi";
import Loading from "@/components/ui/Loading";

export default function OutstandingProduct() {
  const {
    data: medicalPackages,
    error,
    isLoading: loadingMedicalPackages,
  } = useQuery({
    queryKey: ["medical-packages"],
    queryFn: getAllMedicalPackages,
  });

  return (
    <div className="mx-auto my-5 max-w-screen-xl md:my-10">
      <div className="w-full text-center text-[23px] font-bold md:text-[35px]">
        Gói khám nổi bật
      </div>
      <span className="mx-auto my-2 block w-full max-w-[90%] text-center text-[14px] text-[#6D7280] md:max-w-[800px] md:text-[16px]">
        Danh sách gói khám nổi bật, được khách hàng yêu thích nhất.
      </span>
      {loadingMedicalPackages ? (
        <div>
          <Loading />
        </div>
      ) : error ? (
        <div>Error loading specialties</div>
      ) : (
        <>
          <div className="mt-4 grid grid-cols-2 gap-4 px-5 md:grid-cols-3 lg:grid-cols-4">
            {medicalPackages.map((medicalPackage) => {
              return (
                <ServiceProduct key={medicalPackage._id} {...medicalPackage} />
              );
            })}
          </div>
          <Link
            to="/category-service"
            className="mx-auto my-5 mt-10 flex w-[50%] items-center justify-center gap-2 rounded-md border border-primary-500 py-2 text-[12px] font-semibold uppercase text-primary-500 hover:bg-primary-500 hover:text-white md:w-[40%] md:text-[14px]"
          >
            Xem tất cả <AiOutlineDoubleRight />
          </Link>
        </>
      )}
    </div>
  );
}
