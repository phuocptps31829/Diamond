import HeaderTab from "../ui/HeaderTabScreen";
import ListSpecialty from "./ListSpecialty";
import ListPackage from "./ListPackage";

const Package = () => {
  return (
    <>
      <HeaderTab title="Gói dịch vụ" />
      <ListSpecialty />
      <ListPackage />
    </>
  );
};

export default Package;
