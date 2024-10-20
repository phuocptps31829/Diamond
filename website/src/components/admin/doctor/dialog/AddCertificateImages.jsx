import { useState } from 'react';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/AlertDialog';
import { MdAddPhotoAlternate } from 'react-icons/md';
import { FcAddImage } from 'react-icons/fc';
import { Button } from '@/components/ui/Button';
import { toastUI as toast } from '@/components/ui/Toastify';
import { imageApi } from '@/services/imageApi';
import SpinLoader from '@/components/ui/SpinLoader';

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

    const handleUploadImages = async () => {
        if (fileImages.length === 0) {
            toast('Vui lòng chọn ảnh chứng chỉ để tải lên.', 'error');
            return;
        }

        setIsLoading(true);
        try {
            const uploadedImages = await Promise.all(
                fileImages.map(async (image) => {
                    const formData = new FormData();
                    formData.append('file', image);
                    const response = await imageApi.createImage(formData);
                    return response.data;
                })
            );

            otherInfo.verification.images = [...otherInfo.verification.images, ...uploadedImages];
            setArrayImages(otherInfo.verification.images);
            setFileImages([]);
            const newData = { otherInfo: otherInfo };

            updateDoctorMutation({ id, newData });
        } catch (error) {
            console.error('Lỗi khi tải ảnh hoặc tạo mới bác sĩ:', error);
            toast('Có lỗi xảy ra, vui lòng thử lại.', 'error');
            setIsLoading(false);
        }
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
                <div className="flex justify-center">
                    <input
                        id="file"
                        type="file"
                        multiple
                        onChange={(e) => {
                            const files = Array.from(e.target.files);
                            setFileImages(files);
                        }}
                        className="py-2"
                    />
                </div>
                <Button
                    className="mt-5 bg-primary-500 hover:bg-primary-800"
                    disabled={isLoading || isPending}
                    onClick={handleUploadImages}
                >
                    {isLoading || isPending ? <SpinLoader /> : 'Cập nhật'}
                </Button>
            </AlertDialogContent>
        </AlertDialog>
    );
};
