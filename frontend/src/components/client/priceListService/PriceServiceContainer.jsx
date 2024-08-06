import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { getServiceBySpecialty } from "@/services/servicesApi";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { Skeleton } from "@/components/ui/Skeleton";
import NotFound from "../notFound";

const PriceServiceContainer = ({ specialty, isLoading }) => {
  if (isLoading) {
    return (
      <div className="mx-auto max-w-screen-2xl p-10">
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-10 w-full mb-4" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-2xl p-10">
      {specialty.map((item, index) => (
        <SpecialtyTable specialty={item} key={item._id} index={index} />
      ))}
    </div>
  );
};

const SpecialtyTable = ({ index, specialty }) => {
  const {
    data: services = [],
    error: servicesError,
    isLoading: servicesLoading,
  } = useQuery({
    queryKey: ["price-service", specialty._id],
    queryFn: () => getServiceBySpecialty(specialty._id),
    enabled: !!specialty._id,
  });

  if (servicesLoading) {
    return (
      <div className="mx-auto my-7 max-w-7xl">
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-10 w-full mb-4" />
      </div>
    );
  }

  if (servicesError) {
    return <NotFound />;
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
                <TableCell className="text-left font-semibold">STT</TableCell>
                <TableCell className="text-left font-semibold">
                  Tên dịch vụ
                </TableCell>
                <TableCell className="text-center font-semibold">Giá</TableCell>
              </TableRow>
            </TableHeader>
          )}

          <TableBody>
            {services.map((service, idx) => (
              <TableRow key={service._id} className="last:border-0">
                <TableCell
                  className="w-12 text-left font-normal"
                  component="th"
                  scope="row"
                >
                  {idx + 1}
                </TableCell>
                <TableCell className="min-w-[170px] max-w-[200px] text-left font-normal">
                  {service.name}
                </TableCell>
                <TableCell className="w-40 text-center font-normal">
                  {service.price.toLocaleString()} VNĐ
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

PriceServiceContainer.propTypes = {
  isLoading: PropTypes.bool,
  specialty: PropTypes.array,
};

SpecialtyTable.propTypes = {
  index: PropTypes.number,
  specialty: PropTypes.object,
};

export default PriceServiceContainer;
