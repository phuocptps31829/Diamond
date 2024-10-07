import DataTable from "./table";
import { columns } from "./table/columns";
import { useQuery } from "@tanstack/react-query";
import { getAllSpecialties } from "@/services/specialtiesApi";
import { doctorApi } from "@/services/doctorsApi";

const DoctorsList = () => {
  const {
    data: doctorsData,
    isLoading: loadingDoctors,
    isError: errorLoadingDoctors,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: doctorApi.getAllDoctors,
  });

  const {
    data: specialtyData,
    isLoading: loadingSpecialties,
    isError: errorLoadingSpecialties,
  } = useQuery({
    queryKey: ["specialties"],
    queryFn: getAllSpecialties,
  });
  if (loadingDoctors || loadingSpecialties) return <div>Loading...</div>;
  if (errorLoadingDoctors || errorLoadingSpecialties) return <div>Error loading data</div>;

  const specialtyMap = {};
  specialtyData.forEach((specialty) => {
    specialtyMap[specialty._id] = specialty.name;
  });
  const doctorsWithSpecialties = doctorsData.map((doctor) => ({
    ...doctor,
    specialtyName: specialtyMap[doctor.otherInfo.specialtyID] || "Error!",
  }));
  const specialtiesOnly = specialtyData.map((specialty) => ({
    specialtyName: specialty.name,
  }));
  return (
    <DataTable
      columns={ columns }
      specialtyData={ specialtiesOnly || [] }
      data={ doctorsWithSpecialties || [] }
    />
  );
};

export default DoctorsList;
