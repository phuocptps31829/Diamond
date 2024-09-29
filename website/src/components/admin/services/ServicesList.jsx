import DataTable from "./table";
import { columnsSchedule } from "./table/columns";

const ServicesList = ({ allPatients }) => {
  return <DataTable columns={columnsSchedule} allPatients={allPatients} />;
};

export default ServicesList;
