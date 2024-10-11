import { Button } from "@/components/ui/Button";
import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ActionMenu = ({ row }) => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 rotate-90 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-fit min-w-0">
        <DropdownMenuItem
          className="flex w-full items-center gap-2"
          onClick={() => navigate(`/admin/packages/edit/${row.original._id}`)}
        >
          <FiEdit className="text-[15px]" />
          <span>Chỉnh sửa</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex w-full items-center gap-2">
          <RiDeleteBin6Line className="text-[15px]" />
          <span>Xóa</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionMenu;
