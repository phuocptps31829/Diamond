import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination";
import { useQuery } from "@tanstack/react-query";
import { getAllDoctors } from "@/services/doctors";
import { getAllSpecialties } from "@/services/specialties";
import Loading from "@/components/ui/Loading";
import DoctorProduct from "../product/Doctor";

export default function ListDoctors() {
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [specialtyMap, setSpecialtyMap] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const {
    data: doctors,
    error: errorDoctors,
    isLoading: loadingDoctors,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: getAllDoctors,
  });

  const {
    data: specialties,
    error: errorSpecialties,
    isLoading: loadingSpecialties,
  } = useQuery({
    queryKey: ["specialties"],
    queryFn: getAllSpecialties,
  });

  useEffect(() => {
    if (specialties) {
      const map = {};
      specialties.forEach((specialty) => {
        map[specialty._id] = specialty.name;
      });
      setSpecialtyMap(map);
    }
  }, [specialties]);

  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page")) || 1;
  const totalPages = 5;

  const handleSpecialtyChange = (value) => {
    setSelectedSpecialty(value);
    setSelectedDoctor("");
  };

  const handleDoctorChange = (value) => {
    setSelectedDoctor(value);
    setSelectedSpecialty("");
  };

  const handlePageChange = (page) => {
    navigate(`/doctors?page=${page}`);
  };

  if (loadingDoctors || loadingSpecialties) {
    return <Loading />;
  }

  if (errorDoctors || errorSpecialties) {
    return <div>Error loading doctors</div>;
  }

  return (
    <div className="mx-auto w-full max-w-screen-xl p-5 md:p-9">
      <div className="mb-7 flex flex-col items-center justify-between space-y-3 md:flex-row lg:space-y-0">
        <h2 className="text-xl font-semibold">Tìm kiếm bác sĩ phù hợp theo:</h2>
        <div className="flex flex-row items-center justify-center gap-3">
          <Select
            value={selectedSpecialty}
            onValueChange={handleSpecialtyChange}
          >
            <SelectTrigger className="w-[170px] border border-black focus:ring-0 sm:w-[180px]">
              <SelectValue placeholder="Chọn chuyên khoa" />
            </SelectTrigger>
            <SelectContent>
              {specialties?.map((specialty) => (
                <SelectItem key={specialty._id} value={specialty._id}>
                  {specialty.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedDoctor} onValueChange={handleDoctorChange}>
            <SelectTrigger className="w-[170px] border border-black focus:ring-0 sm:w-[180px]">
              <SelectValue placeholder="Chọn bác sĩ" />
            </SelectTrigger>
            <SelectContent>
              {doctors?.map((doctor) => (
                <SelectItem key={doctor._id} value={doctor._id}>
                  {doctor.userID.fullName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 rounded-md bg-white p-6 shadow md:grid-cols-3 lg:grid-cols-4">
        {doctors.map((doctor) => {
          return (
            <DoctorProduct
              key={doctor._id}
              {...doctor}
              specialtyName={specialtyMap[doctor.specialtyID]}
            />
          );
        })}
      </div>

      <Pagination className="py-5">
        <PaginationContent className="hover:cursor-pointer">
          <PaginationItem>
            <PaginationPrevious
              onClick={() =>
                handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
              }
              className={
                currentPage === 1 ? "opacity-50 hover:cursor-default" : ""
              }
            />
          </PaginationItem>
          {Array.from({ length: totalPages }).map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                onClick={() => handlePageChange(index + 1)}
                isActive={currentPage === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                handlePageChange(
                  currentPage + 1 > totalPages ? totalPages : currentPage + 1,
                )
              }
              className={
                currentPage === totalPages
                  ? "opacity-50 hover:cursor-default"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
