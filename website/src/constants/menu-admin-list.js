import { RxDashboard } from "react-icons/rx";
import { FaUserDoctor } from "react-icons/fa6";
import { IoPeopleSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaCalendarPlus } from "react-icons/fa";
import { FaClinicMedical } from "react-icons/fa";
import { LuNewspaper } from "react-icons/lu";
import { FcDepartment } from "react-icons/fc";
import { FaKitMedical } from "react-icons/fa6";
import { GiMedicines } from "react-icons/gi";

export const getMenuList = (pathname) => [
  {
    groupLabel: "",
    menus: [
      {
        href: "/admin/dashboard",
        label: "Thống kê",
        active: pathname.includes("/admin/dashboard"),
        icon: RxDashboard,
        submenus: [
          {
            href: "/admin/dashboard",
            label: "Bảng điều khiển quản trị",
            active: pathname.includes("/admin/dashboard"),
          },
          {
            href: "/admin/doctordashboard",
            label: "Bảng điều khiển bác sĩ",
            active: pathname.includes("/admin/doctordashboard"),
          },
        ],
      },
    ],
  },
  {
    groupLabel: "",
    menus: [
      {
        href: "",
        label: "Sản phẩm",
        active: pathname === "/admin/products/list",
        icon: FaKitMedical,
        submenus: [
          {
            href: "/admin/packages/list",
            label: "Danh sách gói",
            active: pathname === "/admin/packages/list",
          },
          {
            href: "/admin/services/list",
            label: "Danh sách dịch vụ",
            active: pathname === "/admin/services/list",
          },
          {
            href: "/admin/packages/create",
            label: "Thêm gói",
            active: pathname === "/admin/packages/create",
          },
          {
            href: "/admin/services/create",
            label: "Thêm dịch vụ",
            active: pathname === "/admin/services/create",
          },
        ],
      },
    ],
  },
  {
    groupLabel: "",
    menus: [
      {
        href: "",
        label: "Thuốc",
        active: pathname === "/admin/medicine/list",
        icon: GiMedicines,
        submenus: [
          {
            href: "/admin/medicinesCategories/list",
            label: "Danh mục thuốc",
            active: pathname === "/admin/medicinesCategories/list",
          },
          {
            href: "/admin/medicines/list",
            label: "Danh sách thuốc",
            active: pathname === "/admin/medicines/list",
          },
          {
            href: "/admin/medicinesCategories/create",
            label: "Thêm danh mục thuốc",
            active: pathname === "/admin/medicinesCategories/create",
          },
          {
            href: "/admin/medicines/create",
            label: "Thêm thuốc",
            active: pathname === "/admin/medicine/create",
          },
        ],
      },
    ],
  },
  {
    groupLabel: "",
    menus: [
      {
        href: "",
        label: "Bác sĩ",
        active: pathname === "/admin/doctors/list",
        icon: FaUserDoctor,
        submenus: [
          {
            href: "/admin/doctors/list",
            label: "Danh sách bác sĩ",
            active: pathname === "/admin/doctors/list",
          },
          {
            href: "/admin/doctors/create",
            label: "Thêm bác sĩ",
            active: pathname === "/admin/doctors/create",
          },
        ],
      },
    ],
  },
  {
    groupLabel: "",
    menus: [
      {
        href: "",
        label: "Người dùng",
        active: pathname === "/admin/patients/list",
        icon: IoPeopleSharp,
        submenus: [
          {
            href: "/admin/patients/list",
            label: "Danh sách người dùng",
            active: pathname === "/admin/patients/list",
          },
          {
            href: "/admin/patients/create",
            label: "Thêm người dùng",
            active: pathname === "/admin/patients/create",
          },
        ],
      },
    ],
  },
  {
    groupLabel: "",
    menus: [
      {
        href: "",
        label: "Nhân viên",
        active: pathname === "/admin/staffs/list",
        icon: FaUsers,
        submenus: [
          {
            href: "/admin/staffs/list",
            label: "Danh sách nhân viên",
            active: pathname === "/admin/staffs/list",
          },
          {
            href: "/admin/staffs/create",
            label: "Thêm nhân viên",
            active: pathname === "/admin/staffs/create",
          },
        ],
      },
    ],
  },
  {
    groupLabel: "",
    menus: [
      {
        href: "",
        label: "Lịch đặt khám",
        active:
          pathname === "/admin/appointments/list " ||
          pathname === "/admin/appointments/create",
        icon: FaCalendarAlt,
        submenus: [
          {
            href: "/admin/appointments/list",
            label: "Danh sách lịch đặt",
            active: pathname === "/admin/appointments/list",
          },
          {
            href: "/admin/appointments/create",
            label: "Thêm lịch đặt",
            active: pathname === "/admin/appointments/create",
          },
        ],
      },
    ],
  },
  {
    groupLabel: "",
    menus: [
      {
        href: "",
        label: "Lịch làm việc",
        active: pathname === "/admin/schedules/list",
        icon: FaCalendarPlus,
        submenus: [
          {
            href: "/admin/schedules/list",
            label: "Danh sách lịch làm việc",
            active: pathname === "/admin/schedules/list",
          },
          {
            href: "/admin/schedules/details",
            label: "Thêm lịch làm việc",
            active: pathname === "/admin/schedules/details",
          },
        ],
      },
    ],
  },
  {
    groupLabel: "",
    menus: [
      {
        href: "",
        label: "Chi nhánh",
        active:
          pathname === "/admin/branches/list" ||
          pathname === "/admin/branches/create",
        icon: FcDepartment,
        submenus: [
          {
            href: "/admin/branches/list",
            label: "Danh sách chi nhánh",
            active: pathname === "/admin/branches/list",
          },
          {
            href: "/admin/branches/create",
            label: "Thêm chi nhánh",
            active: pathname === "/admin/branches/create",
          },
        ],
      },
    ],
  },
  {
    groupLabel: "",
    menus: [
      {
        href: "",
        label: "Phòng khám",
        active: pathname === "/admin/clinics/list",
        icon: FaClinicMedical,
        submenus: [
          {
            href: "/admin/clinics/list",
            label: "Danh sách phòng khám",
            active: pathname === "/admin/clinics/list",
          },
          {
            href: "/admin/clinics/create",
            label: "Thêm phòng khám",
            active: pathname === "/admin/clinics/create",
          },
        ],
      },
    ],
  },
  {
    groupLabel: "",
    menus: [
      {
        href: "",
        label: "Tin tức",
        active:
          pathname === "/admin/news/list" || pathname === "/admin/news/create",
        icon: LuNewspaper,
        submenus: [
          {
            href: "/admin/news/list",
            label: "Danh sách tin tức",
            active: pathname === "/admin/news/list",
          },
          {
            href: "/admin/news/create",
            label: "Thêm tin tức",
            active: pathname === "/admin/news/create",
          },
        ],
      },
    ],
  },
];
