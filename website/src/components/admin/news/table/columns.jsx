import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import {  DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { ArrowUpDown } from "lucide-react";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
const DetailsCell = ({ details }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Collapsible open={isExpanded} onOpenChange={toggleExpand}>
      <div className="w-[300px]">
        <span>
          {isExpanded
            ? details
            : details.length > maxLength
              ? `${details.substring(0, maxLength)}...`
              : details}
        </span>
        {details.length > maxLength && (
          <CollapsibleTrigger asChild>
            <button className="ml-2 text-blue-500">
              {isExpanded ? "Thu gọn" : "Xem thêm"}
            </button>
          </CollapsibleTrigger>
        )}
      </div>
    </Collapsible>
  );
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
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          variant="ghost"
          className="p-0 text-sm text-black"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tiêu đề
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="ml-2 w-full max-w-[270px]">
        <span className="block w-[300px]">{row.original.title}</span>
      </div>
    ),
  },
  {
    accessorKey: "special",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          variant="ghost"
          className="p-0 text-sm text-black"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Chuyên khoa
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="ml-2 w-full max-w-[270px]">
        <span className="block w-[90px]">{row.original.special}</span>
      </div>
    ),
  },
  {
    accessorKey: "image",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          variant="ghost"
          className="p-0 text-sm text-black"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Hình ảnh
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);

      return (
        <>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <img
                src={row.original.image}
                alt="thumbnail"
                width={60}
                height={60}
                className="cursor-pointer"
              />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Hình ảnh lớn</DialogTitle>
              </DialogHeader>
              <img
                src={row.original.image}
                alt="large-thumbnail w-full h-auto"
              />
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
  {
    accessorKey: "author",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          variant="ghost"
          className="p-0 text-sm text-black"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tác giả
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="ml-2 w-full max-w-[270px]">
        <span className="w-full whitespace-nowrap">{row.original.author}</span>
      </div>
    ),
  },
  {
    accessorKey: "views",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          variant="ghost"
          className="p-0 text-sm text-black"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Lượt xem
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-1/2 text-center text-primary-500">
        {row.original.views}
      </div>
    ),
  },
  {
    accessorKey: "details",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          variant="ghost"
          className="p-0 text-sm text-black"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nội dung
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => <DetailsCell details={row.original.details} />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          variant="ghost"
          className="p-0 text-sm text-black"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Trạng thái
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
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
            <Button variant="ghost" className="h-8 w-8 p-0 rotate-90">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-fit min-w-0">
            <DropdownMenuItem className="w-fit flex items-center gap-2">
              <FiEdit className="text-[15px]" />
              <Link to="/admin/news/edit/123">Sửa</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="w-fit flex items-center gap-2">
              <RiDeleteBin6Line className="text-[15px]" />
              <span>Xóa</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const mockData = [
  {
    title: "Dễ Bùng Phát Thành Dịch",
    special: "Da liễu",
    image:
      "https://vcdn1-suckhoe.vnecdn.net/2024/05/03/Screen-Shot-2024-05-03-at-10-3-1328-5066-1714707559.png?w=0&h=0&q=100&dpr=1&fit=crop&s=tqdKpDUrqWCFbWL4sT_DPg",
    author: "ThS.BS. Võ Thành Công",
    views: 5000,
    details:
      "Bệnh sởi là một bệnh truyền nhiễmBệnh mãn tính: là bệnh tiến triển kéo dài hoặc hay tái phát, thời gian bệnh từ 3 tháng trở lên. Bệnh mạn tính không thể ngừa bằng vắc-xin, không thể chữa khỏi hoàn toàn và cũng không tự biến mất. Bệnh mạn tính phần lớn là bệnh không lây nhiễm, không do vi khuẩn, virus, ký sinh trùng hoặc nấm gây nên.",
    status: "Hiện",
  },
  {
    title:
      "Bệnh Sởi: Diễn Biến Mạnh Vào Mùa Đông - Xuân, Dễ Bùng Phát Thành Dịch",
    special: "Da liễu",
    image:
      "https://vcdn1-suckhoe.vnecdn.net/2024/05/03/Screen-Shot-2024-05-03-at-10-3-1328-5066-1714707559.png?w=0&h=0&q=100&dpr=1&fit=crop&s=tqdKpDUrqWCFbWL4sT_DPg",
    author: "ThS.BS. Võ Thành Công",
    views: 3000,
    details: "Bệnh sởi là một bệnh truyền nhiễm",
    status: "Hiện",
  },
  {
    title:
      "Bệnh Sởi: Diễn Biến Mạnh Vào Mùa Đông - Xuân, Dễ Bùng Phát Thành Dịch",
    special: "Da liễu",
    image:
      "https://vcdn1-suckhoe.vnecdn.net/2024/05/03/Screen-Shot-2024-05-03-at-10-3-1328-5066-1714707559.png?w=0&h=0&q=100&dpr=1&fit=crop&s=tqdKpDUrqWCFbWL4sT_DPg",
    author: "ThS.BS. Võ Thành Công",
    views: 2000,
    details: "Bệnh sởi là một bệnh truyền nhiễm",
    status: "Hiện",
  },
  {
    title:
      "Bệnh Sởi: Diễn Biến Mạnh Vào Mùa Đông - Xuân, Dễ Bùng Phát Thành Dịch",
    special: "Da liễu",
    image:
      "https://vcdn1-suckhoe.vnecdn.net/2024/05/03/Screen-Shot-2024-05-03-at-10-3-1328-5066-1714707559.png?w=0&h=0&q=100&dpr=1&fit=crop&s=tqdKpDUrqWCFbWL4sT_DPg",
    author: "ThS.BS. Võ Thành Công",
    views: 1000,
    details: "Bệnh sởi là một bệnh truyền ",
    status: "Hiện",
  },
  {
    title:
      "Bệnh Sởi: Diễn Biến Mạnh Vào Mùa Đông - Xuân, Dễ Bùng Phát Thành Dịch",
    special: "Da liễu",
    image:
      "https://vcdn1-suckhoe.vnecdn.net/2024/05/03/Screen-Shot-2024-05-03-at-10-3-1328-5066-1714707559.png?w=0&h=0&q=100&dpr=1&fit=crop&s=tqdKpDUrqWCFbWL4sT_DPg",
    author: "ThS.BS. Võ Thành Công",
    views: 5000,
    details: "Bệnh sởi là một bệnh truyền nhiễm",
    status: "Hiện",
  },
  {
    title:
      "Bệnh Sởi: Diễn Biến Mạnh Vào Mùa Đông - Xuân, Dễ Bùng Phát Thành Dịch",
    special: "Da liễu",
    image:
      "https://vcdn1-suckhoe.vnecdn.net/2024/05/03/Screen-Shot-2024-05-03-at-10-3-1328-5066-1714707559.png?w=0&h=0&q=100&dpr=1&fit=crop&s=tqdKpDUrqWCFbWL4sT_DPg",
    author: "ThS.BS. Võ Thành Công",
    views: 5000,
    details: "Bệnh sởi là một bệnh truyền nhiễm",
    status: "Hiện",
  },
  {
    title:
      "Bệnh Sởi: Diễn Biến Mạnh Vào Mùa Đông - Xuân, Dễ Bùng Phát Thành Dịch",
    special: "Da liễu",
    image:
      "https://vcdn1-suckhoe.vnecdn.net/2024/05/03/Screen-Shot-2024-05-03-at-10-3-1328-5066-1714707559.png?w=0&h=0&q=100&dpr=1&fit=crop&s=tqdKpDUrqWCFbWL4sT_DPg",
    author: "ThS.BS. Võ Thành Công",
    views: 5000,
    details: "Bệnh sởi là một bệnh truyền nhiễm",
    status: "Hiện",
  },
  {
    title:
      "Bệnh Sởi: Diễn Biến Mạnh Vào Mùa Đông - Xuân, Dễ Bùng Phát Thành Dịch",
    special: "Da liễu",
    image:
      "https://vcdn1-suckhoe.vnecdn.net/2024/05/03/Screen-Shot-2024-05-03-at-10-3-1328-5066-1714707559.png?w=0&h=0&q=100&dpr=1&fit=crop&s=tqdKpDUrqWCFbWL4sT_DPg",
    author: "ThS.BS. Võ Thành Công",
    views: 5000,
    details: "Bệnh sởi là một bệnh truyền nhiễm",
    status: "Hiện",
  },
];
