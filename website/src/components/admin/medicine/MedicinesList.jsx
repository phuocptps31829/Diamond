import DataTable from "./table";
import { columnsSchedule } from "./table/columns";

const MedicinesList = ({ allMedicine }) => {
  return <DataTable columns={columnsSchedule} allMedicine={allMedicine} />;
};

export default MedicinesList;
