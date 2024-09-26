import DataTable from "./table";
import { columns} from "./table/columns";
import { patientsData } from "./table/data";

const PatientsList = () => {
  return <DataTable columns={columns} data={patientsData} />;
};

export default PatientsList;
