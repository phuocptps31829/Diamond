import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarImage } from "@/components/ui/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { BiDetail } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ArrowUpDown } from "lucide-react";
import { getStatusStyle } from "../utils/StatusStyle";
import { getPatientsById } from "@/services/patientsApi";
import { useQuery } from "@tanstack/react-query";
import { getDoctorById } from "@/services/doctorsApi";
import { getServiceById } from "@/services/servicesApi";
import { getMedicalPackageById } from "@/services/medicalPackagesApi";
import { Skeleton } from "@/components/ui/Skeleton";
const usePatientData = (patientID) => {
  return useQuery({
    queryKey: ["patient", patientID],
    queryFn: () => getPatientsById(patientID),
    keepPreviousData: true,
    enabled: !!patientID,
  });
};
const useDoctorData = (doctorID) => {
  return useQuery({
    queryKey: ["doctor", doctorID],
    queryFn: () => getDoctorById(doctorID),
    keepPreviousData: true,
    enabled: !!doctorID,
  });
};
const useServiceData = (serviceID) => {
  return useQuery({
    queryKey: ["service", serviceID],
    queryFn: () => getServiceById(serviceID),
    keepPreviousData: true,

    enabled: !!serviceID,
  });
};

const useMedicalPackageData = (medicalPackageID) => {
  return useQuery({
    queryKey: ["medicalPackage", medicalPackageID],
    queryFn: () => getMedicalPackageById(medicalPackageID),
    keepPreviousData: true,

    enabled: !!medicalPackageID,
  });
};
export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={ (value) => table.toggleAllPageRowsSelected(!!value) }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={ row.getIsSelected() }
        onCheckedChange={ (value) => row.toggleSelected(!!value) }
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "patient",
    header: ({ column }) => (
      <div className="ml-2 w-full text-left">
        <Button
          className="px-0 text-base"
          variant="ghost"
          onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
        >
          Bệnh nhân
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const {
        data: patient,
        isLoading,
        error,
      } = usePatientData(row.original.patientID);

      if (isLoading) return <Skeleton className="h-7 w-40" />;
      if (error) return <span>Không có bệnh nhân</span>;

      return (
        <div className="flex items-center gap-3 py-3 font-medium">
          <div className="ml-2 flex w-full items-center">
            <Avatar className="size-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            </Avatar>
            <span className="ml-2 w-full whitespace-nowrap">
              { patient?.fullName || "Không có bệnh nhân" }
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "doctor",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          className="px-0 text-base"
          variant="ghost"
          onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
        >
          Bác sĩ
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const {
        data: doctor,
        isLoading,
        error,
      } = useDoctorData(row.original.workSchedule[0]?.doctorID);

      console.log("doctor: ", doctor);

      if (isLoading) return <Skeleton className="h-7 w-40" />;
      if (error) return <span>Error loading doctor</span>;

      return (
        <div className="w-full">
          <span className="w-full whitespace-nowrap">
            { doctor?.userID?.fullName || "Không có bác sĩ" }
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "service",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          className="px-0 text-base"
          variant="ghost"
          onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
        >
          Dịch vụ/Gói khám
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const serviceID = row.original.serviceID;
      const medicalPackageID = row.original.medicalPackageID;

      const {
        data: service,
        isLoading: isLoadingService,
        error: errorService,
      } = useServiceData(serviceID);
      const {
        data: medicalPackage,
        isLoading: isLoadingMedicalPackage,
        error: errorMedicalPackage,
      } = useMedicalPackageData(medicalPackageID);

      if (isLoadingService || isLoadingMedicalPackage)
        return <Skeleton className="h-7 w-40" />;
      if (errorService || errorMedicalPackage)
        return <span>Error loading data</span>;

      const name = service?.name || medicalPackage?.name || "không có tên";
      const isMedicalPackage = !!medicalPackageID;

      return (
        <div className="w-fit p-2">
          <span
            className={ `flex items-center justify-center whitespace-nowrap rounded-md p-1 px-2 text-center text-xs font-bold uppercase ${isMedicalPackage ? "bg-primary-500/20 text-primary-900" : "bg-[#13D6CB]/20 text-cyan-950"}` }
          >
            { name }
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          className="px-0 text-base"
          variant="ghost"
          onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
        >
          Loại khám
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-full">
        <span className="w-full whitespace-nowrap">{ row.original.type }</span>
      </div>
    ),
  },
  {
    accessorKey: "time",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          className="px-0 text-base"
          variant="ghost"
          onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
        >
          Thời gian khám
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-full">
        <span className="w-full whitespace-nowrap">
          { new Date(row.original.time).toLocaleString() }
        </span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          className="px-0 text-base"
          variant="ghost"
          onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
        >
          Trạng thái
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-full">
        <span className="w-full whitespace-nowrap">{ row.original.status }</span>
      </div>
    ),
  },
  {
    accessorKey: "invoice",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          className="px-0 text-base"
          variant="ghost"
          onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
        >
          Thanh toán
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div
        className={ `flex items-center justify-center rounded-md py-1 text-center text-xs font-bold uppercase ${getStatusStyle(
          row.original.invoice[0]?.price ? "Đã thanh toán" : "Chưa thanh toán",
        )}` }
      >
        <span className="whitespace-nowrap">
          { row.original.invoice[0]?.price ? "Đã thanh toán" : "Chưa thanh toán" }
        </span>
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 rotate-90 p-0 text-base" variant="ghost">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-fit min-w-0">
            <DropdownMenuItem className="flex w-full items-center gap-2">
              <BiDetail className="text-[15px]" />
              <Link to="/admin/appointments/detail/123">Chi tiết</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex w-full items-center gap-2">
              <FiEdit className="text-[15px]" />
              <Link to="/admin/appointments/edit/123">Sửa</Link>
            </DropdownMenuItem>

            <DropdownMenuItem className="flex w-full items-center gap-2">
              <RiDeleteBin6Line className="text-[15px]" />
              <span>Xóa</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
