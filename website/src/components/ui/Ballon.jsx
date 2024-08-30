import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";

const Balloon = () => {
  const cartItems = useSelector((state) => state.cart.cart);

  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    setProductCount(cartItems.length || 0);
  }, [cartItems]);
  return (
    <Link to="/services-booking">
    <div className="fixed bottom-5 right-5 flex space-x-4">
      <div className="social-button relative">
        <button className="group relative h-16 w-16 rounded-full">
          <div className="floater absolute left-0 top-0 h-full w-full rounded-full bg-primary-800"></div>
          <div className="icon relative z-10 flex h-full w-full items-center justify-center rounded-full  ">
            <MdAddShoppingCart  className="h-7 w-7 text-white duration-300 group-hover:scale-125" />
          </div>
        </button>
        {productCount > 0 && (
          <div className="absolute -right-0 -top-2 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
            {productCount > 99 ? "99+" : productCount}
          </div>
        )}
      </div>
    </div>
    </Link>
  );
};

export default Balloon;
