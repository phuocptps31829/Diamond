import DataTable from "./table";
import { columns} from "./table/columns";
import { doctorsData } from "./table/data";

const DoctorsList = () => {
  return <DataTable columns={columns} data={doctorsData} />;
};

export default DoctorsList;
