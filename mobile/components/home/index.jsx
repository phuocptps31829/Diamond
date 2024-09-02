import { ScrollView } from "react-native";
import { useState } from "react";
import Header from "./Header";
import News from "./News";
import OutstandingServices from "./OutstandingServices";
import OutstandingPackages from "./OutstandingPackages";
import HeaderScroll from "./HeaderScroll";
import Specialty from "./Specialty";

const Home = () => {
  const [showView, setShowView] = useState(false);

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    if (scrollY > 300) {
      setShowView(true);
    } else {
      setShowView(false);
    }
  };
  return (
    <>
      <HeaderScroll showView={showView} />
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        className="bg-[#E8F2F7] relative"
        showsVerticalScrollIndicator={false}
      >
        <Header />
        <OutstandingServices />
        <OutstandingPackages />
        <Specialty />
        <News />
      </ScrollView>
    </>
  );
};

export default Home;
