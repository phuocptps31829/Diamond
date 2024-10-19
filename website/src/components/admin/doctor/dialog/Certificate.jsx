import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogDescription,
} from '@/components/ui/AlertDialog';
import { IoTrashBin } from 'react-icons/io5';
import { GrCertificate } from 'react-icons/gr';
import { Button } from '@/components/ui/Button';
import { PiCertificate } from 'react-icons/pi';
import { useState } from 'react';
import SpinLoader from '@/components/ui/SpinLoader';
const URL_IMAGE = import.meta.env.VITE_IMAGE_API_URL;

export const Certificate = ({
    data,
    onClickDeleteImage,
    isPending,
    handleClickDeleteImagesAll,
}) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [isOpenDeleteAllConfirm, setIsOpenDeleteAllConfirm] = useState(false);

    const handleDeleteAllClick = () => {
        setIsOpenDeleteAllConfirm(true);
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
                                    <img
                                        src={`${URL_IMAGE}/${imageName}`}
                                        alt={`Certificate ${index + 1}`}
                                        className="h-24 w-full rounded-sm object-cover"
                                    />
                                    {!isPending && (
                                        <div
                                            className="absolute top-0 flex h-full w-full items-center justify-center rounded-sm bg-[#0000004f] opacity-0 group-hover:opacity-100"
                                            onClick={() => setSelectedImageIndex(index)}
                                        >
                                            <IoTrashBin
                                                size={20}
                                                className="cursor-pointer text-white hover:text-red-300"
                                            />
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
                                {isPending ? (
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

            {selectedImageIndex !== null && (
                <AlertDialog
                    open={selectedImageIndex !== null}
                    onOpenChange={() => setSelectedImageIndex(null)}
                >
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Bạn có chắc muốn xóa ảnh này không?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Hành động này không thể hoàn tác. Vui lòng xác nhận nếu bạn muốn
                                tiếp tục.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="flex justify-end gap-4">
                            <AlertDialogCancel
                                className="bg-gray-200 px-4 py-2 text-sm"
                                onClick={() => setSelectedImageIndex(null)}
                            >
                                Hủy bỏ
                            </AlertDialogCancel>
                            <AlertDialogAction
                                className="bg-red-500 px-4 py-2 text-sm text-white"
                                onClick={() => {
                                    onClickDeleteImage(selectedImageIndex);
                                    setSelectedImageIndex(null);
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
                            Hành động này không thể hoàn tác. Vui lòng xác nhận nếu bạn muốn tiếp
                            tục.
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
        </AlertDialog>
    );
};
