import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { formatDateTimeLocale } from "@/utils/format";
import { useState } from "react";

const ResultDialog = ({ trigger, appointment }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  return (
    <Dialog>
      <DialogTrigger>
        { trigger }
      </DialogTrigger>
      <DialogContent className="!max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Chi tiết kết quả khám</DialogTitle>
          <DialogDescription>
            Thời gian: { formatDateTimeLocale(appointment?.time) }
          </DialogDescription>
        </DialogHeader>
        <div className="scrollbar-thin scrollbar-thumb-primary-500 scrollbar-track-gray-200 max-h-[600px] overflow-y-auto flex flex-col gap-4">
          { appointment?.results?.length ? appointment.results.map((result) => (
            <div
              key={ result._id }
              className="rounded-md border-2 border-dashed border-primary-200 px-4"
            >
              <div className="my-4">
                <strong>Dịch vụ:</strong>{ " " }
                <span className="text-primary-500">
                  { result.service.name || "Không có dịch vụ" }
                </span>
              </div>
              <div className="my-4">
                <strong>Chẩn đoán:</strong>{ " " }
                { result.diagnose || "Chưa có kết quả" }
              </div>
              <div className="my-4">
                <strong>Mô tả:</strong>{ " " }
                <p className="inline-block" dangerouslySetInnerHTML={ { __html: result.description } } />
              </div>
              <div className="my-4">
                <strong>Hình ảnh liên quan:</strong>
                <div className="mx-auto my-3 flex flex-wrap gap-4">
                  { Array.isArray(result.images) &&
                    result.images.length > 0 ? (
                    result.images.map((image, imgIndex) => (
                      <div key={ imgIndex }>
                        <img
                          src={ `${import.meta.env.VITE_IMAGE_API_URL}/${image}` }
                          alt={ `Kết quả khám bệnh ${imgIndex}` }
                          className="h-[100px] w-[100px] cursor-pointer rounded-md object-cover"
                          onClick={ () => handleOpen(image) }
                        />
                      </div>
                    ))
                  ) : (
                    <p>Không có hình ảnh</p>
                  ) }
                  { selectedImage && (
                    <Dialog open={ open } onOpenChange={ setOpen }>
                      <DialogContent className="max-w-[1000px]">
                        <DialogHeader>
                          <DialogTitle>
                            Hình ảnh lớn
                          </DialogTitle>
                        </DialogHeader>
                        <img
                          src={ `${import.meta.env.VITE_IMAGE_API_URL}/${selectedImage}` }
                          alt="Hình ảnh lớn"
                          className="large-thumbnail h-auto w-full"
                        />
                      </DialogContent>
                    </Dialog>
                  ) }
                </div>
              </div>
            </div>
          )) : <div>
            <p>Không có kết quả khám</p>
          </div> }
        </div>
        <DialogFooter>
          <DialogClose asChild>
            {/* <Button variant="custom" onClick={handleSave}>
            Lưu
          </Button> */}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResultDialog;