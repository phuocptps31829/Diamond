import DataTable from "./table";
import { columns} from "./table/columns";
import { clinicsData } from "./table/data";

const ClinicsList = () => {
  return <DataTable columns={columns} data={clinicsData} />;
};

export default ClinicsList;
