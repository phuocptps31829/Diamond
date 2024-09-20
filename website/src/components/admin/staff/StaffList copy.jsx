import InputCustom from "@/components/ui/InputCustom";
import { FaSearch, FaPlus, FaSort, FaPen, FaTrash  } from "react-icons/fa";
import { FaArrowsRotate,FaEllipsisVertical } from "react-icons/fa6";
import { staffSchema } from "@/zods/staff";
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


// Staffs Data
const staffsData = [
  {
    id: 1,
    name: "NV.Hà Anh Tuấn",
    position: "#NV Y Tế",
    phoneNumber: "09.123.321.123",
    email: "haanhtuan123@gmail.com",
    birthDate: "01/01/1999",
    gender: "Nam",
    address: "SQR/312, CVPM Quang Trung, Q12",
    status: "Đang hoạt động",
  },

];

export default function StaffList (){
    const {
        handleSubmit,
        formState: { errors },
        control,
      } = useForm({
        resolver: zodResolver(staffSchema),
        defaultValues: {
          staffName: "",
        },
      });
      const [currentPage, setCurrentPage] = useState(0); // Quản lý trạng thái trang hiện tại
      const staffsPerPage = 8; // Số lượng mỗi trang
      const onSubmit = () => {
        
    };

    const displayedStaffs = staffsData.slice(
      currentPage * staffsPerPage,
      (currentPage + 1) * staffsPerPage
    );
  
    // Xử lý khi người dùng chuyển trang
    const handlePageClick = (event) => {
      setCurrentPage(event.selected);
    };
    return (
      <div className="bg-white w-[100%] px-5 py-2 rounded-lg shadow-gray ">
        {/* Search */}
        <div className="flex h-[80px]">
            <h1 className="mr-2 bg-white h-fit mt-4 text-lg">Danh sách bệnh nhân</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="mr-1 flex">
            <div className="mb-2 ">
                <div className="relative w-[300px] mr-1">
                  <InputCustom
                    className="col-span-1 sm:col-span-1"
                    placeholder="Tìm kiếm bệnh nhân"
                    name="staffName"
                    type="text"
                    id="staffName"
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
              Tên bệnh nhân
              <FaSort className="text-right absolute right-0 mr-1"/>  
            </div>
            </TableHead>

            <TableHead className="text-black text-base relative">
              <div className="flex items-center">
                Chức vụ
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
          {displayedStaffs.map((staff) => (
            <TableRow key={staff.id}>
              <TableCell className="font-medium flex items-center py-4 gap-3">
                <input type="checkbox" />
                <img
                  src="https://cdn.pixabay.com/photo/2024/03/25/18/35/ai-generated-8655320_640.png"
                  className="w-[35px] rounded-lg"
                  alt="staff"
                />
                <p className="text-base">{staff.name}</p>
              </TableCell>
              <TableCell>{staff.position}</TableCell>
              <TableCell className="">{staff.phoneNumber}</TableCell>
              <TableCell className="pl-5">{staff.email}</TableCell>
              <TableCell>{staff.birthDate}</TableCell>
              <TableCell className="text-left">{staff.gender}</TableCell>
              <TableCell className="pl-5">{staff.address}</TableCell>
              <TableCell className="text-green-600 flex items-center justify-between">
                {staff.status}
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
        pageCount={Math.ceil(staffsData.length / staffsPerPage)}
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

