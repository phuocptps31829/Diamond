import HeaderTab from "../ui/HeaderTabScreen";
import ListSpecialty from "./ListSpecialty";
import ListService from "./ListService";

const Service = () => {
  return (
    <>
      <HeaderTab title="Dịch vụ" />
      <ListSpecialty />
      <ListService />
    </>
  );
};

export default Service;
