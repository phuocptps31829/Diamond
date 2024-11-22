import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import CustomPagination from "@/components/ui/CustomPagination";
import { useQuery } from "@tanstack/react-query";
import { specialtyApi } from "@/services/specialtiesApi";
import DoctorItem from "@/components/client/product/Doctor";
import { Skeleton } from "@/components/ui/Skeleton";
import { doctorApi } from "@/services/doctorsApi";

export default function ListDoctors() {
  const containerRef = useRef(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page")) || 1;

  const {
    data: doctors,
    error: errorDoctors,
    isLoading: loadingDoctors,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: doctorApi.getAllDoctors,
  });

  const {
    data: specialties,
    error: errorSpecialties,
    isLoading: loadingSpecialties,
  } = useQuery({
    queryKey: ["specialtiesNoPaginated"],
    queryFn: specialtyApi.getNoPaginate,
  });

  useEffect(() => {
    if (doctors) {
      const filtered = doctors.filter((doctor) => {
        const matchesSpecialty =
          selectedSpecialty === "" ||
          doctor.otherInfo.specialty._id === selectedSpecialty;
        const matchesGender =
          selectedGender === "" || doctor.gender === selectedGender;
        return matchesSpecialty && matchesGender;
      });
      setFilteredDoctors(filtered);
    }
  }, [doctors, selectedSpecialty, selectedGender]);

  useEffect(() => {
    if (filteredDoctors) {
      const recordsPerPage = 12;
      const indexOfLastRecord = currentPage * recordsPerPage;
      const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
      const current = filteredDoctors.slice(
        indexOfFirstRecord,
        indexOfLastRecord
      );
      setCurrentRecords(current);
      setTotalPages(Math.ceil(filteredDoctors.length / recordsPerPage));
    }
  }, [filteredDoctors, currentPage]);

  if (errorDoctors || errorSpecialties) {
    return <div>Error loading doctors</div>;
  }

  if (loadingDoctors || loadingSpecialties) {
    return (
      <div className="mx-auto w-full max-w-screen-xl p-5 md:p-5">
        <div className="flex flex-col items-center justify-between space-y-3 md:flex-row lg:space-y-0">
          <h2 className="text-xl font-semibold">
            <Skeleton className="h-[24px] w-[250px]" />
          </h2>
          <div className="flex flex-row items-center justify-center gap-3">
            <div className="w-[170px] sm:w-[180px]">
              <Skeleton className="h-[36px]" />
            </div>
            <div className="w-[170px] sm:w-[180px]">
              <Skeleton className="h-[36px]" />
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 rounded-md bg-white p-6 shadow md:grid-cols-3 lg:grid-cols-4">
          { Array.from({ length: 4 }).map((_, index) => (
            <div
              className="flex flex-col overflow-hidden rounded-lg border"
              key={ index }
            >
              <div className="group flex w-full items-center justify-center !bg-white">
                <Skeleton className="ease h-[200px] w-full transform overflow-hidden p-2 transition-transform duration-500 sm:h-[300px] sm:p-4" />
              </div>
              <div className="flex h-full flex-col bg-white px-3 pb-3 pt-3">
                <Skeleton className="h-4 w-[80px] text-[9px] font-semibold text-[#7a7a7a] md:text-[13px]" />
                <Skeleton className="h-6 w-[120px] grow py-2 text-[12px] font-bold sm:text-[14px] md:my-1 md:text-xl" />
                <hr className="mb-1 md:mb-3" />
                <div className="flex h-4 w-[60px] items-center justify-between text-[10px] font-medium sm:text-[14px]">
                  <Skeleton className="h-4 w-[60px]" />
                </div>
                <div className="mt-3 flex items-center justify-center gap-1 rounded-md border border-[#827f7f] py-1 text-[10px] font-semibold text-primary-500 hover:cursor-pointer hover:text-white md:py-2 md:text-[13px]">
                  <Skeleton className="h-4 w-[80px]" />
                </div>
              </div>
            </div>
          )) }
        </div>
      </div>
    );
  }

  if (!doctors.length) {
    return <div>Error loading doctors</div>;
  }

  const handleSpecialtyChange = (value) => {
    setSelectedSpecialty(value);
    navigate(`/doctors?page=1`);
  };

  const handleDoctorChange = (value) => {
    setSelectedGender(value);
    navigate(`/doctors?page=1`);
  };

  const handlePageChange = (page) => {
    navigate(`/doctors?page=${page}`);

    if (containerRef.current) {
      window.scrollTo({
        top: containerRef.current.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      ref={ containerRef }
      className="mx-auto w-full max-w-screen-xl p-4 md:p-5"
    >
      <div className="mb-5 flex flex-col items-center justify-between space-y-3 md:flex-row lg:space-y-0">
        <h2 className="text-xl font-semibold">Tìm kiếm bác sĩ phù hợp:</h2>
        <div className="flex flex-row items-center justify-center gap-3">
          <Select
            value={ selectedSpecialty }
            onValueChange={ handleSpecialtyChange }
          >
            <SelectTrigger className="w-[170px] border border-black focus:ring-0 sm:w-[180px]">
              <SelectValue placeholder="Chọn chuyên khoa" />
            </SelectTrigger>
            <SelectContent>
              { specialties?.map((specialty) => (
                <SelectItem key={ specialty._id } value={ specialty._id }>
                  { specialty.name }
                </SelectItem>
              )) }
            </SelectContent>
          </Select>
          <Select value={ selectedGender } onValueChange={ handleDoctorChange }>
            <SelectTrigger className="w-[170px] border border-black focus:ring-0 sm:w-[180px]">
              <SelectValue placeholder="Chọn giới tính" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Nam">Nam</SelectItem>
              <SelectItem value="Nữ">Nữ</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 rounded-md bg-white p-6 md:grid-cols-3 lg:grid-cols-4">
        { currentRecords.length === 0 ? (
          <div className="col-span-full p-6 text-center">Không có dữ liệu.</div>
        ) : (
          <>
            { currentRecords.map((doctor) => {
              return <DoctorItem key={ doctor?._id } doctor={ doctor } />;
            }) }
          </>
        ) }
      </div>
      { totalPages > 1 && (
        <CustomPagination
          currentPage={ currentPage }
          totalPages={ totalPages }
          onPageChange={ handlePageChange }
        />
      ) }
    </div>
  );
}
