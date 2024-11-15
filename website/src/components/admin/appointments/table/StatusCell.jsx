import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { toastUI } from "@/components/ui/Toastify"; 

const StatusCell = ({ row, onChangeStatus }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(null);

  const statusOptions = [
    { value: "PENDING", label: "Chờ xác nhận" },
    {
      value: "CONFIRMED",
      label: row.original.status === "CONFIRMED" ? "Chờ khám" : "Đã xác nhận",
    },
    { value: "EXAMINED", label: "Đã khám" },
    { value: "CANCELLED", label: "Đã hủy" },
  ];

  const handleChangeStatus = (value) => {
    if (value === "EXAMINED" && row.original.result.diagnose === "") {
      toastUI(
        "Vui lòng xác nhận lịch khám và điền kết quả.",
        "error"
      );
      return;
    }

    if (value === "EXAMINED" || value === "CANCELLED") {
      setPendingStatus(value);
      setIsDialogOpen(true);
    } else {
      onChangeStatus(row.original._id, value);
    }
  };

  const handleConfirmChange = () => {
    onChangeStatus(row.original._id, pendingStatus);
    setIsDialogOpen(false);
  };

  return (
    <div className="w-full">
      <Select
        disabled={
          row.original.status === "CANCELLED" ||
          row.original.status === "EXAMINED"
        }
        value={row.original.status}
        onValueChange={handleChangeStatus}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Chọn trạng thái" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận thay đổi trạng thái</DialogTitle>
            <DialogDescription>
              <div className="my-2">
                Bạn có chắc chắn muốn thay đổi trạng thái thành &quot;
                {pendingStatus === "EXAMINED" ? "Đã khám" : "Đã hủy"}&quot;
                không?
              </div>
              <p className="text-red-500">
                Trạng thái sẽ không thể thay đổi sau khi xác nhận.
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose onClick={() => setIsDialogOpen(false)}>
              <Button variant="outline">Hủy</Button>
            </DialogClose>
            <Button variant="custom" onClick={handleConfirmChange}>
              Xác nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StatusCell;
