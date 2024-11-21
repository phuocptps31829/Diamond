import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
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
import { Skeleton } from "@/components/ui/Skeleton";
import SpinLoader from "@/components/ui/SpinLoader";

const URL_IMAGE = import.meta.env.VITE_IMAGE_API_URL;

export const CertificateInFixPage = ({
  data,
  onClickDeleteImage,
  isPending,
  handleClickDeleteImagesAll,
  locationSubmit,
}) => {
  const [selectedZoomImageIndex, setSelectedZoomImageIndex] = useState(null);
  const [selectedDeleteImageIndex, setSelectedDeleteImageIndex] =
    useState(null);
  const [isOpenDeleteAllConfirm, setIsOpenDeleteAllConfirm] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [loadingImages, setLoadingImages] = useState(
    new Array(data?.length || 0).fill(true)
  );
  const [deletingImageIndex, setDeletingImageIndex] = useState(null);

  const handleDeleteAllClick = () => {
    setIsOpenDeleteAllConfirm(true);
  };

  const handleZoomImage = (index) => {
    setSelectedZoomImageIndex(index);
    setIsZoomed(true);
  };

  const handleImageLoad = (index) => {
    const newLoadingImages = [...loadingImages];
    newLoadingImages[index] = false;
    setLoadingImages(newLoadingImages);
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
            Xem chứng chỉ <PiCertificate size={20} className="ml-2" />
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
        <AlertDialogDescription>
          <div className="scrollable-services grid max-h-[205px] grid-cols-4 gap-3 overflow-y-auto pr-2">
            {data &&
              data.length > 0 &&
              data.map((imageName, index) => (
                <div key={index} className="group relative w-full">
                  {loadingImages[index] && <Skeleton className="h-24 w-full" />}
                  <img
                    src={`${URL_IMAGE}/${imageName}`}
                    alt={`Certificate ${index + 1}`}
                    className={`h-24 w-full rounded-sm object-cover ${
                      loadingImages[index] ? "hidden" : ""
                    }`}
                    onLoad={() => handleImageLoad(index)}
                  />
                  {!isPending && !loadingImages[index] && (
                    <div className="absolute top-0 flex h-full w-full items-center justify-center gap-2 rounded-sm bg-[#000000aa] opacity-0 group-hover:opacity-100">
                      <IoTrashBin
                        size={25}
                        className="cursor-pointer text-white hover:text-red-500"
                        onClick={() => {
                          setSelectedDeleteImageIndex(index);
                          setDeletingImageIndex(index);
                        }}
                      />
                      <MdOutlineZoomOutMap
                        size={25}
                        className="cursor-pointer text-white hover:text-blue-400"
                        onClick={() => handleZoomImage(index)}
                      />
                    </div>
                  )}
                  {isPending && deletingImageIndex === index && (
                    <div className="absolute top-0 flex h-full w-full items-center justify-center gap-2 rounded-sm bg-[#000000aa]">
                      <div className="h-5 w-5 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>
                    </div>
                  )}
                </div>
              ))}
          </div>
          {data.length === 0 && (
            <div className="text-center">Không có ảnh chứng nhận nào.</div>
          )}
          {data.length > 0 && (
            <div className="mt-4 flex justify-end">
              <Button
                className="w-fit bg-red-500 text-[13px] hover:bg-red-700"
                onClick={handleDeleteAllClick}
                disabled={isPending}
              >
                {isPending && locationSubmit === 2 ? (
                  <SpinLoader />
                ) : (
                  <>
                    Xóa tất cả <IoTrashBin size={20} className="ml-2" />
                  </>
                )}
              </Button>
            </div>
          )}
        </AlertDialogDescription>
      </AlertDialogContent>

      {selectedDeleteImageIndex !== null && (
        <AlertDialog
          open={selectedDeleteImageIndex !== null}
          onOpenChange={() => setSelectedDeleteImageIndex(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Bạn có chắc muốn xóa ảnh này không?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Hành động này không thể hoàn tác. Vui lòng xác nhận nếu bạn muốn
                tiếp tục.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex justify-end gap-4">
              <AlertDialogCancel
                className="bg-gray-200 px-4 py-2 text-sm"
                onClick={() => setSelectedDeleteImageIndex(null)}
              >
                Hủy bỏ
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 px-4 py-2 text-sm text-white"
                onClick={() => {
                  onClickDeleteImage(selectedDeleteImageIndex);
                  setSelectedDeleteImageIndex(null);
                }}
              >
                Xác nhận
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      )}

      <AlertDialog
        open={isOpenDeleteAllConfirm}
        onOpenChange={() => setIsOpenDeleteAllConfirm(false)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Bạn có chắc muốn xóa tất cả ảnh này không?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể hoàn tác. Vui lòng xác nhận nếu bạn muốn
              tiếp tục.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-4">
            <AlertDialogCancel
              className="bg-gray-200 px-4 py-2 text-sm"
              onClick={() => setIsOpenDeleteAllConfirm(false)}
            >
              Hủy bỏ
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 px-4 py-2 text-sm text-white"
              onClick={() => {
                handleClickDeleteImagesAll();
                setIsOpenDeleteAllConfirm(false);
              }}
            >
              Xác nhận
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isZoomed} onOpenChange={() => setIsZoomed(false)}>
        <DialogContent className="max-w-[50vw]">
          <DialogHeader>
            <DialogTitle>Ảnh chứng chỉ</DialogTitle>
          </DialogHeader>
          <img
            src={`${URL_IMAGE}/${data[selectedZoomImageIndex]}`}
            alt={`Zoomed Certificate ${selectedZoomImageIndex + 1}`}
            className="h-full w-full object-cover"
          />
        </DialogContent>
      </Dialog>
    </AlertDialog>
  );
};
