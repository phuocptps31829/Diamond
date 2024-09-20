import InputCustom from "@/components/ui/InputCustom";
import { FaSearch, FaPlus, FaSort, FaPen, FaTrash  } from "react-icons/fa";
import { FaArrowsRotate,FaEllipsisVertical } from "react-icons/fa6";
import { doctorSchema } from "@/zods/doctor";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table"
import ReactPaginate from "react-paginate"; 
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover"


// Doctor Data
const doctorsData = [
  {
    id: 1,
    name: "BS.Hà Anh Tuấn",
    specialty: "Răng hàm mặt",
    phone: "09.321.123.321",
    email: "haanhtuan123@gmail.com",
    birthDate: "01/01/1999",
    gender: "Nam",
    address: "SQR/312, CVPM Quang Trung, Q12",
    status: "Đang hoạt động",
  },
  {
    id: 1,
    name: "BS.Võ Đức Tài",
    specialty: "Tai chân miệng",
    phone: "09.321.123.321",
    email: "haanhtuan123@gmail.com",
    birthDate: "01/01/1999",
    gender: "Nam",
    address: "SQR/312, CVPM Quang Trung, Q12",
    status: "Đang hoạt động",
  },
  {
    id: 1,
    name: "BS.Hà Anh Tuấn",
    specialty: "Răng hàm mặt",
    phone: "09.321.123.321",
    email: "haanhtuan123@gmail.com",
    birthDate: "01/01/1999",
    gender: "Nam",
    address: "SQR/312, CVPM Quang Trung, Q12",
    status: "Đang hoạt động",
  },
  {
    id: 1,
    name: "BS.Hà Anh Tuấn",
    specialty: "Răng hàm mặt",
    phone: "09.321.123.321",
    email: "haanhtuan123@gmail.com",
    birthDate: "01/01/1999",
    gender: "Nam",
    address: "SQR/312, CVPM Quang Trung, Q12",
    status: "Đang hoạt động",
  },
  {
    id: 1,
    name: "BS.Hà Anh Tuấn",
    specialty: "Răng hàm mặt",
    phone: "09.321.123.321",
    email: "haanhtuan123@gmail.com",
    birthDate: "01/01/1999",
    gender: "Nam",
    address: "SQR/312, CVPM Quang Trung, Q12",
    status: "Đang hoạt động",
  },
  {
    id: 1,
    name: "BS.Hà Anh Tuấn",
    specialty: "Răng hàm mặt",
    phone: "09.321.123.321",
    email: "haanhtuan123@gmail.com",
    birthDate: "01/01/1999",
    gender: "Nam",
    address: "SQR/312, CVPM Quang Trung, Q12",
    status: "Đang hoạt động",
  },
  {
    id: 1,
    name: "BS.Hà Anh Tuấn",
    specialty: "Răng hàm mặt",
    phone: "09.321.123.321",
    email: "haanhtuan123@gmail.com",
    birthDate: "01/01/1999",
    gender: "Nam",
    address: "SQR/312, CVPM Quang Trung, Q12",
    status: "Đang hoạt động",
  },
  {
    id: 1,
    name: "BS.Hà Anh Tuấn",
    specialty: "Răng hàm mặt",
    phone: "09.321.123.321",
    email: "haanhtuan123@gmail.com",
    birthDate: "01/01/1999",
    gender: "Nam",
    address: "SQR/312, CVPM Quang Trung, Q12",
    status: "Đang hoạt động",
  },
  {
    id: 1,
    name: "BS.Hà Anh Tuấn",
    specialty: "Răng hàm mặt",
    phone: "09.321.123.321",
    email: "haanhtuan123@gmail.com",
    birthDate: "01/01/1999",
    gender: "Nam",
    address: "SQR/312, CVPM Quang Trung, Q12",
    status: "Đang hoạt động",
  },

];

export default function DoctorList (){
    const {
        handleSubmit,
        formState: { errors },
        control,
      } = useForm({
        resolver: zodResolver(doctorSchema),
        defaultValues: {
            doctorName: "",
        },
      });
      const [currentPage, setCurrentPage] = useState(0); // Quản lý trạng thái trang hiện tại
  const doctorsPerPage = 8; // Số lượng bác sĩ mỗi trang
      const onSubmit = () => {
        
    };

    const displayedDoctors = doctorsData.slice(
      currentPage * doctorsPerPage,
      (currentPage + 1) * doctorsPerPage
    );
  
    // Xử lý khi người dùng chuyển trang
    const handlePageClick = (event) => {
      setCurrentPage(event.selected);
    };
    return (
      <div className="bg-white w-[100%] px-5 py-2 rounded-lg shadow-gray ">
        {/* Search */}
        <div className="flex h-[80px]">
            <h1 className="mr-2 bg-white h-fit mt-4 text-lg">Danh sách bác sĩ</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="mr-1 flex">
            <div className="mb-2 ">
                <div className="relative w-[300px] mr-1">
                  <InputCustom
                    className="col-span-1 sm:col-span-1"
                    placeholder="Tìm kiếm bác sĩ"
                    name="doctorName"
                    type="text"
                    id="doctorName"
                    icon={<FaSearch></FaSearch>}
                    control={control}
                    errors={errors}
                  />
                </div>
              </div>
              <Button size="icon" variant="outline" className="w-11 h-11 mr-1 mt-2">
                <FaPlus className="text-primary-500"></FaPlus>
            </Button>
            <Button size="icon" variant="outline" className="w-11 h-11 mr-1 mt-2">
                <FaArrowsRotate className="text-primary-500"/>
            </Button>
            </form>
        </div>
      <div>
      <Table>

        <TableHeader className="">
          <TableRow className="hover:bg-white">
            <TableHead className="text-black text-base relative">
            <div className="flex items-center">
              <input type="checkbox" className="mr-2"></input>
              Tên bác sĩ
              <FaSort className="text-right absolute right-0 mr-1"/>  
            </div>
            </TableHead>

            <TableHead className="text-black text-base relative">
              <div className="flex items-center">
                Chuyên khoa
                <FaSort className="text-right absolute right-0 mr-1 "/>  
              </div>
            </TableHead>

            <TableHead className="text-black text-base relative">
              <div className="flex items-center">
                Số điện thoại
                <FaSort className="text-right absolute right-0 mr-1 "/>  
              </div>
            </TableHead>

            <TableHead className="text-black text-base relative">
              <div className="flex items-center">
                Email
                <FaSort className="text-right absolute right-0 mr-1 "/>  
              </div>
            </TableHead>

            <TableHead className="text-black text-base relative">
              <div className="flex items-center">
                Ngày sinh
                <FaSort className="text-right absolute right-0 mr-1 "/>  
              </div>
            </TableHead>

            <TableHead className="text-black text-base relative">
              <div className="flex items-center">
                Giới tính
                <FaSort className="text-right absolute right-0 mr-1 "/>  
              </div>
            </TableHead>

            <TableHead className="text-black text-base relative">
              <div className="flex items-center">
                Địa chỉ
                <FaSort className="text-right absolute right-0 mr-1 "/>  
              </div>
            </TableHead>

            <TableHead className="text-black text-base relative">
              <div className="flex items-center">
                Trạng thái
                <FaSort className="text-right absolute right-0 mr-1 "/>  
              </div>
            </TableHead>


          </TableRow>
        </TableHeader>

        <TableBody>
          {displayedDoctors.map((doctor) => (
            <TableRow key={doctor.id}>
              <TableCell className="font-medium flex items-center py-4 gap-3">
                <input type="checkbox" />
                <img
                  src="https://cdn.pixabay.com/photo/2024/03/25/18/35/ai-generated-8655320_640.png"
                  className="w-[35px] rounded-lg"
                  alt="doctor"
                />
                <p className="text-base">{doctor.name}</p>
              </TableCell>
              <TableCell>{doctor.specialty}</TableCell>
              <TableCell className="text-primary-400">{doctor.phone}</TableCell>
              <TableCell>{doctor.email}</TableCell>
              <TableCell>{doctor.birthDate}</TableCell>
              <TableCell className="text-center">{doctor.gender}</TableCell>
              <TableCell>{doctor.address}</TableCell>
              <TableCell className="text-green-600 flex items-center justify-between">
                {doctor.status}
                    <Popover>
                      <PopoverTrigger>
                      <Button
                        size="icon"
                        variant="outline"
                        className="w-8 h-8 border-none bg-primary-100 hover:bg-primary-400"
                      >
                        <FaEllipsisVertical className="text-black"></FaEllipsisVertical>
                      </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-0">
                        <button className="flex items-center px-2 py-1 text-sm hover:bg-gray-100">
                          <FaPen className="mr-2 text-blue-500" />
                          Sửa
                        </button>
                        <button className="flex items-center px-2 py-1 text-sm hover:bg-gray-100">
                          <FaTrash className="mr-2 text-red-500" />
                          Xóa
                        </button>
                      </PopoverContent>
                    </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
        <div className="flex justify-between w-[100%]">
        <TableCaption className="text-left">Hiển thị 1 đến 8 trong danh sách bác sĩ</TableCaption>
        <ReactPaginate
        previousLabel={"<<"}
        nextLabel={">>"}
        pageCount={Math.ceil(doctorsData.length / doctorsPerPage)}
        onPageChange={handlePageClick}
        containerClassName={"pagination flex  mt-4"}
        pageClassName={"mx-2"}
        activeClassName={"font-bold text-primary-500"}
        previousLinkClassName={"mr-2"}
        nextLinkClassName={"ml-2"}
      />
        </div>
      </div>
      </div>
    );
}

