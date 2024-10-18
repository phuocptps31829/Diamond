import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/AlertDialog';
const URL_IMAGE = import.meta.env.VITE_IMAGE_API_URL;
import { IoTrashBin } from 'react-icons/io5';
import { GrCertificate } from 'react-icons/gr';
import { Controller } from 'react-hook-form';
import { FcAddImage } from 'react-icons/fc';

export const Certificate = ({ data, button, onClickDeleteImage, name, control }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div className="flex w-fit cursor-pointer items-center gap-2">{button}</div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader className="mb-3 flex flex-row items-center justify-between">
                    <AlertDialogTitle className="mt-2 flex gap-3">
                        Ảnh chứng chỉ bác sĩ <GrCertificate size={30} />
                    </AlertDialogTitle>
                    <div className="flex gap-3">
                        <Controller
                            name={name}
                            control={control}
                            render={({ field }) => (
                                <>
                                    <input
                                        id="file"
                                        type="file"
                                        multiple
                                        onChange={(e) => {
                                            const files = Array.from(e.target.files);
                                            field.onChange(files);
                                        }}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="file"
                                        className="flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-sm bg-green-600 text-white duration-100"
                                    >
                                        <FcAddImage
                                            size={30}
                                            className="duration-100 hover:scale-110"
                                        />
                                    </label>
                                </>
                            )}
                        />
                        <AlertDialogCancel className="m-0 w-fit">Thoát</AlertDialogCancel>
                    </div>
                </AlertDialogHeader>
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
                                <div
                                    className="absolute top-0 flex h-full w-full items-center justify-center rounded-sm bg-[#0000004f] opacity-0 group-hover:opacity-100"
                                    onClick={() => onClickDeleteImage(index)}
                                >
                                    <IoTrashBin
                                        size={20}
                                        className="cursor-pointer text-white duration-200 hover:scale-125 hover:text-red-300"
                                    />
                                </div>
                            </div>
                        ))}
                </div>
                {data.length === 0 && <p className="text-center">Không có ảnh chứng nhận nào.</p>}
            </AlertDialogContent>
        </AlertDialog>
    );
};
