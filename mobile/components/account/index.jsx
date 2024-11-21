import { ScrollView } from "react-native";
import UserProfileHeader from "./UserProfileHeader";
import MenuList from "./MenuList";

const Account = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <UserProfileHeader />
      <MenuList />
    </ScrollView>
  );
};

export default Account;
