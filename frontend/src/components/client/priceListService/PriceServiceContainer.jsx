import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/Table";
import { getAllServices } from "@/services/servicesApi";
import { useQuery } from "@tanstack/react-query";
import { getSpecialtyById } from "@/services/specialtiesApi";

const PriceServiceContainer = () => {
    const { data: medicalPackages, error, isLoading } = useQuery({
        queryKey: ["price-service"],
        queryFn: getAllServices,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading data</div>;
    }

    return (
        <div className="mx-auto max-w-screen-2xl p-10">
            {medicalPackages.map((service, index) => (
                <SpecialtyTable key={service._id} service={service} index={index} />
            ))}
        </div>
    );
};

const SpecialtyTable = ({ service, index }) => {
    const { data: specialty, isLoading, error } = useQuery({
        queryKey: ["specialty", service.specialtyID],
        queryFn: () => getSpecialtyById(service.specialtyID),
    });

    if (isLoading) {
        return <div>Loading specialty...</div>;
    }

    if (error) {
        return <div>Error loading specialty</div>;
    }

    return (
        <div className="mx-auto my-7 max-w-7xl">
            <div className="overflow-x-auto rounded-lg border bg-white">
                <Table className="min-w-full">
                    <TableHeader>
                        <TableRow>
                            <TableCell
                                colSpan={3}
                                className="bg-primary-500 text-center text-2xl font-semibold text-white"
                            >
                                {specialty.name}
                            </TableCell>
                        </TableRow>
                    </TableHeader>

                    {index === 0 && (
                        <TableHeader>
                            <TableRow>
                                <TableCell className="text-left font-semibold">
                                    STT
                                </TableCell>
                                <TableCell className="text-left font-semibold">
                                    Tên dịch vụ
                                </TableCell>
                                <TableCell className="text-center font-semibold">
                                    Giá
                                </TableCell>
                            </TableRow>
                        </TableHeader>
                    )}
                    <TableBody>
                        <TableRow className="last:border-0">
                            <TableCell
                                className="w-12 text-left font-normal"
                                component="th"
                                scope="row"
                            >
                                {index + 1}
                            </TableCell>
                            <TableCell className="min-w-[170px] max-w-[200px] text-left font-normal">
                                {service.name}
                            </TableCell>
                            <TableCell className="w-40 text-center font-normal">
                                {service.price.toLocaleString()} VNĐ
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default PriceServiceContainer;