import { ScrollView } from "react-native";
import AvatarOnTop from "../components/accountInfo/AvatarOnTop";
import OtherInfo from "../components/accountInfo/OtherInfo";

const AccountInformation = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="bg-white">
      <AvatarOnTop />
      <OtherInfo />
    </ScrollView>
  );
};

export default AccountInformation;
