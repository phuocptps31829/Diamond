import { RxDashboard } from "react-icons/rx";
import { FaUserDoctor } from "react-icons/fa6";
import { IoPeopleSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaCalendarPlus } from "react-icons/fa";
import { FaClinicMedical } from "react-icons/fa";
import { LuNewspaper } from "react-icons/lu";
import { FaHospital } from "react-icons/fa";

export const getMenuList = (pathname) => [
  {
    groupLabel: "",
    menus: [
      {
        href: "",
        label: "Thống kê",
        active: pathname === "/admin/dashboard",
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
        label: "Bệnh nhân",
        active: pathname === "/admin/doctors/list",
        icon: IoPeopleSharp,
        submenus: [
          {
            href: "/admin/doctors/list",
            label: "Danh sách bệnh nhân",
            active: pathname === "/admin/doctors/list",
          },
          {
            href: "/admin/doctors/create",
            label: "Thêm bệnh nhân",
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
        label: "Nhân viên",
        active: pathname === "/admin/doctors/list",
        icon: FaUsers,
        submenus: [
          {
            href: "/admin/doctors/list",
            label: "Danh sách nhân viên",
            active: pathname === "/admin/doctors/list",
          },
          {
            href: "/admin/doctors/create",
            label: "Thêm nhân viên",
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
        label: "Lịch đặt khám",
        active: pathname === "/admin/doctors/list",
        icon: FaCalendarAlt,
        submenus: [
          {
            href: "/admin/doctors/list",
            label: "Danh sách lịch đặt",
            active: pathname === "/admin/doctors/list",
          },
          {
            href: "/admin/doctors/create",
            label: "Thêm lịch đặt",
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
        label: "Lịch làm việc",
        active: pathname.includes("/admin/schedules/list"),
        icon: FaCalendarPlus,
        submenus: [
          {
            href: "/admin/schedules/list",
            label: "Danh sách lịch làm việc",
            active: pathname === "/admin/schedules/list",
          },
          {
            href: "/admin/schedules/create",
            label: "Thêm lịch làm việc",
            active: pathname === "/admin/schedules/create",
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
        active: pathname === "/admin/doctors/list",
        icon: FaHospital,
        submenus: [
          {
            href: "/admin/doctors/list",
            label: "Danh sách chi nhánh",
            active: pathname === "/admin/doctors/list",
          },
          {
            href: "/admin/doctors/create",
            label: "Thêm chi nhánh",
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
        label: "Phòng khám",
        active: pathname === "/admin/doctors/list",
        icon: FaClinicMedical,
        submenus: [
          {
            href: "/admin/doctors/list",
            label: "Danh sách phòng khám",
            active: pathname === "/admin/doctors/list",
          },
          {
            href: "/admin/doctors/create",
            label: "Thêm phòng khám",
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
        label: "Tin tức",
        active: pathname === "/admin/doctors/list",
        icon: LuNewspaper,
        submenus: [
          {
            href: "/admin/doctors/list",
            label: "Danh sách tin tức",
            active: pathname === "/admin/doctors/list",
          },
          {
            href: "/admin/doctors/create",
            label: "Thêm tin tức",
            active: pathname === "/admin/doctors/create",
          },
        ],
      },
    ],
  },
];
