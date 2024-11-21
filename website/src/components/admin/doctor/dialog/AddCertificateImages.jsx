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
import { MdAddPhotoAlternate } from "react-icons/md";
import { FcAddImage } from "react-icons/fc";
import { IoTrashBin } from "react-icons/io5";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { Button } from "@/components/ui/Button";
import { toastUI as toast } from "@/components/ui/Toastify";
import { imageApi } from "@/services/imageApi";
import SpinLoader from "@/components/ui/SpinLoader";
import { LuImagePlus } from "react-icons/lu";
import { GrDocumentUpdate } from "react-icons/gr";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

export const AddCertificateImages = ({
  isOpen,
  setIsOpen,
  id,
  otherInfo,
  setArrayImages,
  updateDoctorMutation,
  isPending,
  isLoading,
  setIsLoading,
}) => {
  const [fileImages, setFileImages] = useState([]);
  const [selectedZoomImageIndex, setSelectedZoomImageIndex] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleUploadImages = async () => {
    if (fileImages.length === 0) {
      toast("Vui lòng chọn ảnh chứng chỉ để tải lên.", "error");
      return;
    }

    setIsLoading(true);
    try {
      const uploadedImages = await Promise.all(
        fileImages.map(async (imageObj) => {
          const formData = new FormData();
          formData.append("file", imageObj.file);
          const response = await imageApi.createImage(formData);
          return response.data;
        })
      );

      otherInfo.verification.images = [
        ...otherInfo.verification.images,
        ...uploadedImages,
      ];
      setArrayImages(otherInfo.verification.images);
      setIsOpen(false);
      setFileImages([]);
      const newData = { otherInfo: otherInfo };

      updateDoctorMutation({ id, newData });
    } catch (error) {
      console.error("Lỗi khi tải ảnh hoặc tạo mới bác sĩ:", error);
      toast("Có lỗi xảy ra, vui lòng thử lại.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteImage = (index) => {
    const updatedImages = fileImages.filter((_, i) => i !== index);
    setFileImages(updatedImages);
  };

  const handleDeleteAllImages = () => {
    setFileImages([]);
  };

  const handleZoomImage = (index) => {
    setSelectedZoomImageIndex(index);
    setIsZoomed(true);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <div
          className="flex w-fit cursor-pointer items-center gap-2"
          onClick={() => setIsOpen(true)}
        >
          <div className="flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-sm bg-green-600 text-white duration-100">
            <FcAddImage size={30} className="duration-100 hover:scale-110" />
          </div>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="pt-3">
        <AlertDialogHeader className="mb-3 flex flex-row items-center justify-between">
          <AlertDialogTitle className="mt-2 flex gap-3">
            Thêm chứng chỉ bác sĩ <MdAddPhotoAlternate size={30} />
          </AlertDialogTitle>
          <AlertDialogCancel
            className="m-0 w-fit"
            onClick={() => (setIsOpen(false), setFileImages([]))}
          >
            Thoát
          </AlertDialogCancel>
        </AlertDialogHeader>
        <AlertDialogDescription asChild>
          <VisuallyHidden.Root>
            Quản lý ảnh chứng chỉ bác sĩ - bạn có thể xem, thêm hoặc xóa ảnh
            chứng chỉ tại đây
          </VisuallyHidden.Root>
        </AlertDialogDescription>
        <AlertDialogDescription>
          {fileImages.length === 0 && (
            <p className="py-3 text-center">Không có ảnh nào được tải lên.</p>
          )}
          <div className="scrollable-services grid max-h-[205px] grid-cols-4 gap-3 overflow-y-auto pr-2">
            {fileImages.length > 0 &&
              fileImages.map((imageObj, index) => (
                <div key={index} className="group relative w-full">
                  <img
                    src={imageObj?.imagePreview}
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
              ))}
          </div>
          <div className="mt-5 flex items-center gap-5">
            <input
              id="imagesCertificate"
              className="hidden"
              type="file"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files);
                const filesWithPreview = files.map((file) => ({
                  file,
                  imagePreview: URL.createObjectURL(file),
                }));
                setFileImages((prev) => [...prev, ...filesWithPreview]);
              }}
            />
            <label
              htmlFor="imagesCertificate"
              className={`${isPending || isLoading ? "pointer-events-none opacity-50" : ""}  flex w-full cursor-pointer justify-center rounded-sm bg-green-500 p-2 text-white hover:bg-green-600`}
              
            >
              Thêm ảnh <LuImagePlus size={20} className="ml-2" />
            </label>
            <Button
              className="w-fit bg-red-500 text-[13px] hover:bg-red-700"
              onClick={handleDeleteAllImages}
              disabled={fileImages.length === 0 || isLoading || isPending}
            >
              Xóa tất cả <IoTrashBin size={20} className="ml-2" />
            </Button>
            <Button
              className="w-full bg-primary-500 hover:bg-primary-800"
              disabled={isLoading || isPending || fileImages.length === 0}
              onClick={handleUploadImages}
            >
              {isLoading || isPending ? (
                <SpinLoader />
              ) : (
                <>
                  Cập nhật <GrDocumentUpdate size={20} className="ml-2" />
                </>
              )}
            </Button>
          </div>
        </AlertDialogDescription>
      </AlertDialogContent>

      {isZoomed && (
        <Dialog open={isZoomed} onOpenChange={() => setIsZoomed(false)}>
          <DialogContent className="max-w-[50vw]">
            <DialogHeader>
              <DialogTitle>Ảnh chứng chỉ</DialogTitle>
            </DialogHeader>
            <img
              src={fileImages[selectedZoomImageIndex]?.imagePreview}
              alt={`Zoomed Certificate ${selectedZoomImageIndex + 1}`}
              className="h-full w-full object-cover"
            />
          </DialogContent>
        </Dialog>
      )}
    </AlertDialog>
  );
};
