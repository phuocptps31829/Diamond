import DataTable from "./table";
import { columnsSchedule } from "./table/columns";

const PatientsList = ({ allPatients }) => {
  return <DataTable columns={columnsSchedule} allPatients={allPatients} />;
};

export default PatientsList;