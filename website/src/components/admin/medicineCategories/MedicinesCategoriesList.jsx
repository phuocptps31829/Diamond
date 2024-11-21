import DataTable from "./table";
import { columnsSchedule } from "./table/columns";

const MedicinesCategoriesList = ({ allMedicineCategories }) => {
  return (
    <DataTable
      columns={columnsSchedule}
      allMedicineCategories={allMedicineCategories}
    />
  );
};

export default MedicinesCategoriesList;
