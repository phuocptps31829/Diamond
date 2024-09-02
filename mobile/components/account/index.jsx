import { ScrollView } from "react-native";
import UserProfileHeader from "./UserProfileHeader";
import MenuList from "./MenuList";

const Account = () => {
  return (
    <ScrollView className="bg-[#E8F2F7]" showsVerticalScrollIndicator={false}>
      <UserProfileHeader />
      <MenuList />
    </ScrollView>
  );
};

export default Account;
