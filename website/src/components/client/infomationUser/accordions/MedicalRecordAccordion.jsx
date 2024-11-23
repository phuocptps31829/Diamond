import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/Accordion";
import { appointmentApi } from "@/services/appointmentsApi";
import { formatDateTimeLocale } from "@/utils/format";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { GiMedicines } from "react-icons/gi";
import { IoBulbOutline } from "react-icons/io5";
import { FaKitMedical } from "react-icons/fa6";
import { PiFileTextBold } from "react-icons/pi";
import { RiMenuSearchLine } from "react-icons/ri";
import { IoImages } from "react-icons/io5";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/Dialog";

export function MedicalRecordAccordion() {
    const [hash, setHash] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [open, setOpen] = useState(false);

    React.useEffect(() => {
        setHash(window.location.hash);
    }, []);

    const handleOpen = (image) => {
        setSelectedImage(image);
        setOpen(true);
    };

    const { data: medicalRecords, isLoading } = useQuery({
        queryKey: ["patientMedicalRecords"],
        queryFn: () => appointmentApi.getAppointmentByPatient({ status: 'EXAMINED' })
    });

    console.log('medicalRecords', medicalRecords);

    return (
        !isLoading ?
            medicalRecords?.data?.length ? <Accordion
                defaultValue={ hash ? hash?.slice(1) : '' }
                type="single"
                collapsible
                className="w-full"
            >
                { medicalRecords?.data?.map((record) => {
                    const { results } = record;
                    return <AccordionItem key={ record._id } value={ record._id }>
                        <AccordionTrigger className="text-base">
                            { record.type + ' - ' + formatDateTimeLocale(record?.time) }
                        </AccordionTrigger>
                        <AccordionContent className="overflow-y-scroll scrollbar-thin scrollbar-thumb-primary-500 scrollbar-track-gray-200">
                            <div className="max-h-[500px]">
                                <div
                                    className="flex gap-4 pt-2 pb-0"
                                >
                                    <h2 className="flex-1 text-[17px] mb-2 font-semibold text-gray-700">Kết quả khám:</h2>
                                    <h2 className="flex-1 text-[17px] mb-2 font-semibold text-gray-700">Đơn thuốc:</h2>
                                </div>
                                { results?.length ? results.map((result) => (
                                    <div
                                        key={ result._id }
                                        className="flex flex-col md:flex-row mb-4 md:mb-0 gap-4 py-1 border-t border-dashed border-primary-300 pt-2"
                                    >
                                        <div className="flex-1">
                                            <div
                                                className="rounded-md"
                                            >
                                                <div className="py-2 flex w-fit md:items-center gap-1">
                                                    <FaKitMedical className="text-xl mr-1 text-primary-500" />
                                                    <p className="font-medium text-nowrap text-primary-900">
                                                        Dịch vụ:
                                                    </p>{ " " }
                                                    <span className="inline-block">
                                                        { result.service.name || "Không có dịch vụ" }
                                                    </span>
                                                </div>
                                                <div className="py-2 flex w-fit md:items-center gap-1">
                                                    <RiMenuSearchLine className="text-xl mr-1 text-rose-500" />
                                                    <p className="font-medium text-nowrap text-primary-900">
                                                        Chẩn đoán:
                                                    </p>{ " " }
                                                    <span className="inline-block">
                                                        { result.diagnose || "Chưa có kết quả" }
                                                    </span>
                                                </div>
                                                <div className="py-2 flex w-fit md:items-center gap-1">
                                                    <PiFileTextBold className="text-xl mr-1 text-yellow-700" />
                                                    <p className="font-medium text-nowrap text-primary-900">
                                                        Mô tả:
                                                    </p>{ " " }
                                                    <p dangerouslySetInnerHTML={ {
                                                        __html: result.description || "Không có mô tả"
                                                    } } />
                                                </div>
                                                <div>
                                                    <div className="pt-2 pb-1 flex w-fit items-center gap-1">
                                                        <IoImages className="text-xl mr-1 text-orange-800" />
                                                        <p className="font-medium text-nowrap text-primary-900">
                                                            Hình ảnh liên quan:
                                                        </p>
                                                    </div>
                                                    <div className="mx-auto my-2 flex flex-wrap gap-4">
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

                                        </div>
                                        { result?.prescription ? (
                                            <div className="flex-1">
                                                <div className="rounded-md bg-[#fafdffdd]">
                                                    <div className="flex w-fit gap-1 rounded-md py-1">
                                                        <IoBulbOutline className="text-xl text-yellow-500" />
                                                        <strong className="font-medium text-nowrap text-primary-900">
                                                            Lời khuyên :
                                                        </strong>{ " " }
                                                        <span className="ml-1 block text-gray-700">
                                                            { result.prescription?.advice }
                                                        </span>
                                                    </div>
                                                    <div className="my-2 flex items-center justify-start">
                                                        <div className="flex items-center gap-1 py-1">
                                                            <GiMedicines className="text-xl text-red-500" />
                                                            <strong className="font-medium text-primary-900">
                                                                Thuốc kê :
                                                            </strong>{ " " }
                                                        </div>
                                                    </div>
                                                    <ul className="ml-4">
                                                        { result.prescription.medicines.map((medicine, i) => (
                                                            <React.Fragment key={ medicine._id }>
                                                                { i !== 0 && (
                                                                    <div className="my-3"></div>
                                                                ) }
                                                                <li className="mt-2 flex flex-col gap-2">
                                                                    <ul className="ml-4 list-disc text-gray-600">
                                                                        <li>
                                                                            <strong className="font-medium text-black">
                                                                                Tên thuốc:
                                                                            </strong>{ " " }
                                                                            { medicine.name } - { medicine.unit }
                                                                        </li>
                                                                        <li>
                                                                            <strong className="font-medium text-black">
                                                                                Thành phần:
                                                                            </strong>{ " " }
                                                                            { medicine.ingredients }
                                                                        </li>
                                                                        <li>
                                                                            <strong className="font-medium text-black">
                                                                                Hướng dẫn:
                                                                            </strong>{ " " }
                                                                            { medicine.instruction }
                                                                        </li>
                                                                        <li>
                                                                            <strong className="font-medium text-black">
                                                                                Tác dụng phụ:
                                                                            </strong>{ " " }
                                                                            { medicine.sideEffects }
                                                                        </li>
                                                                        <li className="text-black">
                                                                            <strong className="font-medium text-black">
                                                                                Lưu ý:
                                                                            </strong>{ " " }
                                                                            <span className="text-red-500"> { medicine.note }</span>
                                                                        </li>
                                                                    </ul>
                                                                </li>
                                                            </React.Fragment>
                                                        )) }
                                                    </ul>
                                                </div>
                                            </div>
                                        ) : <div className="flex-1 py-2">
                                            <p>⛔ Không có đơn thuốc</p>
                                        </div> }
                                    </div>
                                )) : <div className="mt-2">
                                    <p>⛔ Không có kết quả</p>
                                </div>
                                }
                            </div>
                        </AccordionContent>
                    </AccordionItem>;
                }) }
            </Accordion> : <div className="mt-2">
                <p>⛔ Bạn chưa có bệnh án nào.</p>
            </div>
            : ''
    );
}
