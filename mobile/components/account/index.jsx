import { ScrollView } from "react-native";
import UserProfileHeader from "./UserProfileHeader";
import MenuList from "./MenuList";

const Account = () => {
  return (
    <ScrollView>
      <UserProfileHeader />
      <MenuList />
    </ScrollView>
  );
};

export default Account;
