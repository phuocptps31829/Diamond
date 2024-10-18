import { MdCloudUpload } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { useRef, useEffect } from "react";

const ImagePreview = ({ imagePreview, setFileImage, setImagePreview }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileImage(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setFileImage(null);
    setImagePreview(null);
  };

  useEffect(() => {
    if (!imagePreview) {
      fileInputRef.current.value = ""; 
    }
  }, [imagePreview]); 

  return (
    <div className="relative h-[230px] min-w-[300px] rounded-3xl border-2 border-dashed border-primary-500">
      <div className="absolute top-0 flex h-full w-full items-center justify-center rounded-3xl">
        <label className="flex h-full w-full cursor-pointer items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <MdCloudUpload size={45} color="#007BBB" />
            <p className="mt-2 text-sm">Chọn ảnh</p>
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </label>
        {imagePreview && (
          <>
            <img
              src={imagePreview}
              alt="Image Preview"
              className="absolute inset-0 h-full w-full rounded-3xl object-cover"
            />
            <button
              className="absolute -right-3 -top-3 rounded-full bg-red-500 p-1"
              onClick={handleRemoveImage}
            >
              <MdClose size={20} color="white" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ImagePreview;
