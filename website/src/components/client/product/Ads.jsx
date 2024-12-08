import ads1 from "../../../assets/images/loginBanners/01.jpg";
import ads2 from "../../../assets/images/loginBanners/02.png";
import ads3 from "../../../assets/images/loginBanners/03.png";

const ads = [ads1, ads2, ads3];

export default function AdsProduct({ index, isLoginForm }) {
  return (
    <img
      src={ ads[index] }
      className={ `${isLoginForm ? 'h-[600px]' : 'h-[700px]'} w-full object-fill` }
      alt="Ad Banner"
    />
  );
}
