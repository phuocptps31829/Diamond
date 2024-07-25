import MainHeader from "./MainHeader";
import TopHeader from "./TopHeader";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 shadow-lg">
      <TopHeader />
      <MainHeader />
    </header>
  );
}
