import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PatientFormFix from "@/components/admin/patient/PatientsFormFix";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import NotFound from "@/components/ui/NotFound";
import { useQuery } from "@tanstack/react-query";
import { patientApi } from "@/services/patientsApi";
import { getProvinces, getDistricts } from "@/services/provincesApi";
import Loading from "@/components/ui/Loading";

const initialBreadcrumbData = [
  {
    title: "Người dùng",
  },
  {
    href: "/admin/patients/create",
    title: "Chỉnh sửa người dùng",
  },
  {
    title: "",
  },
];

const PatientsFormFixPage = () => {
  const { id } = useParams();
  const [breadcrumbData, setBreadcrumbData] = useState(initialBreadcrumbData);
  const [loading, setLoading] = useState(false);
  const [provinceId, setProvinceId] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  const {
    data: patientDetail,
    isLoading: isLoadingPatient,
    error: errorPatient,
  } = useQuery({
    queryKey: ["patient", id],
    queryFn: () => patientApi.getPatientsById(id),
  });

  const {
    data: provinces,
    isLoading: isLoadingProvinces,
    error: errorProvinces,
  } = useQuery({
    queryKey: "provinces",
    queryFn: getProvinces,
  });

  const {
    data: districts,
    isLoading: isLoadingDistricts,
    error: errorDistricts,
  } = useQuery({
    queryKey: ["districts", provinceId],
    queryFn: () => getDistricts(provinceId),
    enabled: !!provinceId,
  });

  useEffect(() => {
    if (
      !isLoadingProvinces &&
      !isLoadingPatient &&
      provinces &&
      patientDetail
    ) {
      setLoading(true);
      const province = provinces.find(
        (province) => province.name === patientDetail.address.province,
      );
      if (province) setProvinceId(province._id);
    }
  }, [provinces, patientDetail, isLoadingProvinces, isLoadingPatient]);

  useEffect(() => {
    if (!isLoadingDistricts && districts && patientDetail) {
      const district = districts.find(
        (district) => district.name === patientDetail.address.district,
      );
      if (district) setDistrictId(district._id);
      setLoading(false);
    }
  }, [districts, patientDetail, isLoadingDistricts]);

  useEffect(() => {
    if (!isLoadingPatient && patientDetail) {
      setBreadcrumbData((prevBreadcrumbData) => {
        const updatedData = [...prevBreadcrumbData];
        updatedData[2].title = patientDetail.fullName || "NaN";
        return updatedData;
      });
    }
  }, [isLoadingPatient, patientDetail]);

  if (errorPatient || errorProvinces || errorDistricts)
    return <NotFound message={errorPatient.message} />;

  return (
    <>
      {isLoadingPatient ||
      isLoadingProvinces ||
      isLoadingDistricts ||
      loading ? (
        <Loading />
      ) : (
        <>
          <BreadcrumbCustom data={breadcrumbData} />
          <PatientFormFix
            patientDetail={patientDetail}
            dataProvinceId={provinceId}
            dataDistrictId={districtId}
          />
        </>
      )}
    </>
  );
};

export default PatientsFormFixPage;
