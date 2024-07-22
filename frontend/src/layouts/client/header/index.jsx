import MainHeader from "./MainHeader";
import TopHeader from "./TopHeader";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b-2 border-gray-300">
      <TopHeader />
      <MainHeader />
    </header>
  );
}
