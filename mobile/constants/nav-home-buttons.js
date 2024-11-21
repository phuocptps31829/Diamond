import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export const buttons = [
  {
    id: 1,
    icon: <AntDesign name="calendar" size={ 15 } color="white" />,
    title: "Lịch hẹn",
    colorOne: "#0E7999",
    colorTwo: "#9789CD",
    navigateTo: "account/history-appointment",
  },
  {
    id: 2,
    icon: <FontAwesome6 name="hospital-user" size={ 15 } color="white" />,
    title: "Bệnh án điện tử",
    colorOne: "#93C4FC",
    colorTwo: "#D8C3FC",
    navigateTo: "account/medical-record",
  },
  {
    id: 3,
    icon: <FontAwesome5 name="hospital" size={ 15 } color="white" />,
    title: "Hệ thống PK",
    colorOne: "#009BAC",
    colorTwo: "#007A96",
    navigateTo: "clinic-system",
  },
  {
    id: 4,
    icon: <FontAwesome5 name="robot" size={ 15 } color="white" />,
    title: "Bác sĩ AI",
    colorOne: "#FCA381",
    colorTwo: "#F7CF67",
    navigateTo: "doctor-ai",
  },
];
