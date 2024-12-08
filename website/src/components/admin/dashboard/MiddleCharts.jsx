import { useState, useEffect } from 'react';
import LineChart from './chart/LineChart';
import DoughnutChart from './chart/DoughnutChart';
import { FaHandHoldingMedical } from 'react-icons/fa';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/Select';
import { Skeleton } from "@/components/ui/Skeleton";

export default function MiddleCharts({ allData, loading }) {
    const { dataTotalPatients, dataAllSpecialties, dataPatientsByAges } = allData
    const { isLoadingTotalPatientsBySpecialty, isLoadingSpecialties, isLoadingAppointmentsByAges } = loading
    const [yearNow, setYearNow] = useState(new Date().getFullYear());
    const [dataTotalPatientsByAges, setDataTotalPatientsByAges] = useState([]);
    const [dataTotalPatientsByYear, setDataTotalPatientsByYear] = useState([]);

    useEffect(() => {
        if(isLoadingTotalPatientsBySpecialty || isLoadingSpecialties) return;
        setDataTotalPatientsByYear(
            dataTotalPatients.filter((item) => Number(item.year) === new Date().getFullYear())
        );

    }, [dataTotalPatients, dataAllSpecialties, isLoadingTotalPatientsBySpecialty, isLoadingSpecialties]);

    useEffect(() => {
        if(isLoadingAppointmentsByAges) return;
        setDataTotalPatientsByAges(
            dataPatientsByAges.map((item) => {
                return {
                    age: item.age,
                    years: item.years.filter((yearItem) => Number(yearItem.year) === yearNow),
                };
            })
        );
    }, [dataPatientsByAges, yearNow, isLoadingAppointmentsByAges]);

    const handleYearChange = (e) => {
        setYearNow(Number(e.target.value));
    };

    return (
        <div className="mt-6 grid w-full grid-cols-[70%_27.8%] justify-between">
            <div className="flex-1 rounded-md bg-white px-6 py-4 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-[18px] font-semibold">Bệnh nhân theo độ tuổi</h3>
                    {isLoadingAppointmentsByAges ? (
                        <Skeleton className="w-[140px] h-[36px]" />
                    ) : (
                        <Select
                            onValueChange={ (value) => handleYearChange({ target: { value } }) }
                            defaultValue={ new Date().getFullYear() }
                        >
                            <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Chọn năm" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value={ new Date().getFullYear() }>
                                        { new Date().getFullYear() }
                                    </SelectItem>
                                    <SelectItem value={ new Date().getFullYear() - 1 }>
                                        { new Date().getFullYear() - 1 }
                                    </SelectItem>
                                    <SelectItem value={ new Date().getFullYear() - 2 }>
                                        { new Date().getFullYear() - 2 }
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )}
                </div>
                {isLoadingAppointmentsByAges ? (
                    <Skeleton className="h-[288px] w-full mt-[20px]" />
                ) : (
                    <div className="h-[300px] w-full">
                        <LineChart dataTotalPatientsByAges={dataTotalPatientsByAges} />
                    </div>
                )}
            </div>
            <div className="h-full flex-1 gap-6 rounded-md bg-white p-4 pt-2 shadow-sm">
                <h3 className="ml-2 mt-3 text-[18px] font-semibold">Bệnh nhân theo khoa</h3>
                {isLoadingTotalPatientsBySpecialty || isLoadingSpecialties ? (
                    <div className="flex flex-col items-center justify-center">  
                        <Skeleton className="h-[237px] w-[237px] mt-3 rounded-full" />
                        <div className="grid grid-cols-3 gap-3 mt-3 w-full">
                            <Skeleton className="h-5 w-full rounded-md" />
                            <Skeleton className="h-5 w-full rounded-md" />
                            <Skeleton className="h-5 w-full rounded-md" />
                            <Skeleton className="h-5 w-full rounded-md" />
                            <Skeleton className="h-5 w-full rounded-md" />
                            <Skeleton className="h-5 w-full rounded-md" />
                        </div>
                    </div>
                ) : (
                    <div className="relative flex h-full items-center justify-center">
                        <div className="z-10">
                            <DoughnutChart
                                dataTotalPatientsByYear={ dataTotalPatientsByYear }
                                dataAllSpecialties={ dataAllSpecialties }
                            />
                        </div>
                        <div className="pointer-events-none absolute bottom-[10%] z-0 flex h-full w-full items-center justify-center">
                            <FaHandHoldingMedical size={ 60 } color="#ABAFDB" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
