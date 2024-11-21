import { AlertDialogHeader } from "@/components/ui/AlertDialog";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/Dialog";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

const Uploader = ({ images, onChange }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    onChange([...images, ...files]);
    event.target.value = null;
  };

  const handleImageDelete = (index) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const handleImageClick = (image) => {
    const imageUrl = URL.createObjectURL(image);
    setSelectedImage(imageUrl);
    setOpen(true);
  };

  return (
    <div className="bg-white p-1">
      <div className="flex items-center justify-between">
        <p className="p-2 pl-0">Tải lên hình ảnh chuẩn đoán:</p>
        <div className="text-gray-400">
          <span>{images.length}</span>
        </div>
      </div>

      <div>
        <ul className="flex flex-wrap items-center justify-start gap-3">
          {images.map((image, index) => (
            <li
              key={index}
              className="relative h-28 w-28 cursor-pointer bg-cover bg-center"
              role="img"
              tabIndex="0"
              style={{ backgroundImage: `url(${URL.createObjectURL(image)})` }}
              onClick={() => handleImageClick(image)}
            >
              <button
                className="absolute -right-1 -top-1 rounded-full bg-red-500 p-0 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  handleImageDelete(index);
                }}
              >
                <IoIosClose className="text-2xl" />
              </button>
            </li>
          ))}

          <li className="relative flex h-28 w-28 cursor-pointer items-center justify-center border-2 border-dashed border-primary-500 bg-gray-100 hover:bg-gray-200">
            <input
              className="absolute inset-0 cursor-pointer opacity-0"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
            <FaPlus className="size-10 text-gray-400" />
          </li>
        </ul>
      </div>

      {selectedImage && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-[1000px]">
            <AlertDialogHeader>
              <DialogTitle>Hình ảnh lớn</DialogTitle>
            </AlertDialogHeader>
            <img
              src={selectedImage}
              alt="Hình ảnh lớn"
              className="large-thumbnail h-auto w-full"
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Uploader;
