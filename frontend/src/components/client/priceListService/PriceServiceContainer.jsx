import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

function createData(stt, nameService, price) {
    return { stt, nameService, price };
}

const services = [
    {
        serviceName: "DA LIỄU",
        rows: [
            createData(1, "Điều trị u mềm lây bằng nạo thương tổn", "120.000 VND"),
            createData(2, "Điều trị u mềm lây bằng nạo thương tổn", "120.000 VND"),
            createData(3, "Điều trị u mềm lây bằng nạo thương tổn", "120.000 VND"),
            createData(4, "Điều trị u mềm lây bằng nạo thương tổn", "120.000 VND"),
            createData(5, "Điều trị u mềm lây bằng nạo thương tổn", "120.000 VND"),
            createData(6, "Điều trị u mềm lây bằng nạo thương tổn", "120.000 VND"),
            createData(7, "Điều trị u mềm lây bằng nạo thương tổn", "120.000 VND"),
            createData(8, "Điều trị u mềm lây bằng nạo thương tổn", "120.000 VND"),
            createData(9, "Điều trị u mềm lây bằng nạo thương tổn", "120.000 VND"),
            createData(10, "Điều trị u mềm lây bằng nạo thương tổn", "120.000 VND"),
        ],
    },
    {
        serviceName: "RĂNG HÀM MẶT",
        rows: [createData(1, "Nhổ răng số 8", "500.000 VND")],
    },
    {
        serviceName: "XƯƠNG KHỚP",
        rows: [createData(1, "Chụp X-quang khớp gối", "200.000 VND")],
    },
];

const PriceServiceContainer = () => {
    return (
        <div className="mx-auto max-w-screen-2xl p-10">
            { services.map((service, index) => (
                <div key={ service.serviceName } className="mx-auto my-7 max-w-7xl">
                    <div className="overflow-x-auto rounded-lg border bg-white">
                        <Table className="min-w-full">
                            <TableHeader>
                                <TableRow>
                                    <TableCell
                                        colSpan={ 3 }
                                        className="bg-primary-500 text-center text-2xl font-semibold text-white"
                                    >
                                        { service.serviceName }
                                    </TableCell>
                                </TableRow>
                            </TableHeader>

                            { index === 0 && (
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
                            ) }
                            <TableBody>
                                { service.rows.map((row) => (
                                    <TableRow key={ row.stt } className="last:border-0">
                                        <TableCell
                                            className="w-12 text-left font-normal"
                                            component="th"
                                            scope="row"
                                        >
                                            { row.stt }
                                        </TableCell>
                                        <TableCell className="min-w-[170px] max-w-[200px] text-left font-normal">
                                            { row.nameService }
                                        </TableCell>
                                        <TableCell className="w-40 text-center font-normal">
                                            { row.price }
                                        </TableCell>
                                    </TableRow>
                                )) }
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )) }
        </div>
    );
};

export default PriceServiceContainer;
