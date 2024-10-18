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

export const Certificate = ({ data, button }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div className="flex w-full cursor-pointer items-center gap-2">{button}</div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader className="mb-3 flex flex-row items-center justify-between">
                    <AlertDialogTitle className="mt-2 flex gap-3">
                        Ảnh chứng chỉ bác sĩ <GrCertificate size={30} />
                    </AlertDialogTitle>
                    <AlertDialogCancel className="m-0 w-fit">Thoát</AlertDialogCancel>
                </AlertDialogHeader>
                <div className="scrollable-services grid max-h-[205px] grid-cols-4 gap-3 overflow-y-auto pr-2">
                    {data && data.length > 0 ? (
                        data.map((imageName, index) => (
                            <div key={index} className="group relative w-full">
                                <img
                                    src={`${URL_IMAGE}/${imageName}`}
                                    alt={`Certificate ${index + 1}`}
                                    className="h-24 w-full rounded-sm object-cover"
                                />
                                <div className="absolute top-0 flex h-full w-full items-center justify-center rounded-sm bg-[#0000004f] opacity-0 group-hover:opacity-100">
                                    <IoTrashBin
                                        size={20}
                                        className="cursor-pointer text-white duration-200 hover:scale-125 hover:text-red-300"
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Không có ảnh chứng nhận.</p>
                    )}
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
};
