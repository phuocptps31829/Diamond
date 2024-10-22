import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogDescription,
} from "@/components/ui/AlertDialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { IoTrashBin } from "react-icons/io5";
import { GrCertificate } from "react-icons/gr";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { Button } from "@/components/ui/Button";
import { PiCertificate } from "react-icons/pi";
import { LuImagePlus } from "react-icons/lu";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

export const CertificateInAddPage = ({
  data,
  setValue,
  handleUploadImages,
}) => {
  const [selectedZoomImageIndex, setSelectedZoomImageIndex] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleZoomImage = (index) => {
    setSelectedZoomImageIndex(index);
    setIsZoomed(true);
  };

  const handleDeleteImage = (index) => {
    const updatedImages = data.filter((_, i) => i !== index);
    setValue(updatedImages);
  };

  const handleDeleteAllImages = () => {
    setValue([]);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex w-fit cursor-pointer items-center gap-2">
          <Button
            variant="custom"
            type="button"
            className="w-fit bg-primary-400 text-[13px]"
          >
            Xem chứng chỉ tải lên <PiCertificate size={20} className="ml-2" />
          </Button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="pt-3">
        <AlertDialogHeader className="mb-3 flex flex-row items-center justify-between">
          <AlertDialogTitle className="mt-2 flex gap-3">
            Ảnh chứng chỉ bác sĩ <GrCertificate size={30} />
          </AlertDialogTitle>
          <AlertDialogCancel className="m-0 w-fit">Thoát</AlertDialogCancel>
        </AlertDialogHeader>

        <div className="text-gray-500">
          <AlertDialogDescription asChild>
            <VisuallyHidden.Root>
              Quản lý ảnh chứng chỉ bác sĩ - bạn có thể xem, thêm hoặc xóa ảnh
              chứng chỉ tại đây
            </VisuallyHidden.Root>
          </AlertDialogDescription>

          <div className="scrollable-services grid max-h-[205px] grid-cols-4 gap-3 overflow-y-auto pr-2">
            {data && data.length > 0 ? (
              data.map((imageName, index) => (
                <div key={index} className="group relative w-full">
                  <img
                    src={imageName?.imagePreview}
                    alt={`Certificate ${index + 1}`}
                    className={`h-24 w-full rounded-sm object-cover`}
                  />
                  <div className="absolute top-0 flex h-full w-full items-center justify-center gap-2 rounded-sm bg-[#000000aa] opacity-0 group-hover:opacity-100">
                    <IoTrashBin
                      size={25}
                      className="cursor-pointer text-white hover:text-red-500"
                      onClick={() => handleDeleteImage(index)}
                    />
                    <MdOutlineZoomOutMap
                      size={25}
                      className="cursor-pointer text-white hover:text-blue-400"
                      onClick={() => handleZoomImage(index)}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center">Không có ảnh chứng nhận nào.</div>
            )}
          </div>

          {data.length > 0 && (
            <div className="mt-4 flex justify-between">
              <Button
                className="w-fit bg-red-500 text-[13px] hover:bg-red-700"
                onClick={handleDeleteAllImages}
              >
                Xóa tất cả <IoTrashBin size={20} className="ml-2" />
              </Button>
              <input
                id="imagesPracticingCertificate2"
                className="hidden"
                type="file"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  const filesWithPreview = files.map((file) => ({
                    file,
                    imagePreview: URL.createObjectURL(file),
                  }));
                  handleUploadImages(filesWithPreview);
                }}
              />
              <label
                htmlFor="imagesPracticingCertificate2"
                className="flex w-fit cursor-pointer rounded-sm bg-primary-500 p-2 px-4 text-[13px] text-white hover:bg-primary-700"
              >
                Thêm ảnh <LuImagePlus size={20} className="ml-2" />
              </label>
            </div>
          )}
        </div>
      </AlertDialogContent>

      <Dialog open={isZoomed} onOpenChange={() => setIsZoomed(false)}>
        <DialogContent className="max-w-[50vw]">
          <DialogHeader>
            <DialogTitle>Ảnh chứng chỉ</DialogTitle>
          </DialogHeader>
          <img
            src={data[selectedZoomImageIndex]?.imagePreview}
            alt={`Zoomed Certificate ${selectedZoomImageIndex + 1}`}
            className="h-full w-full object-cover"
          />
        </DialogContent>
      </Dialog>
    </AlertDialog>
  );
};
