import { ScrollView } from "react-native";
import Content from "./Content";

const DetailNews = () => {
  return (
    <ScrollView className="bg-white" showsVerticalScrollIndicator={false}>
      <Content />
    </ScrollView>
  );
};

export default DetailNews;
