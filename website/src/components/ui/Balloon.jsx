import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { FaSuitcaseMedical } from "react-icons/fa6";
import { motion, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Balloon = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const userProfile = useSelector((state) => state.auth.userProfile);
  const [productCount, setProductCount] = useState(0);
  const prevCountRef = useRef(0);
  const controls = useAnimation();
  const navigate = useNavigate();

  useEffect(() => {
    const newCount = cartItems.length || 0;
    if (newCount > prevCountRef.current) {
      controls.start({
        y: [0, -7, 7, -7, 7, 0],
        transition: { duration: 0.6 },
      });
    }
    setProductCount(newCount);
    prevCountRef.current = newCount;
  }, [cartItems, controls]);

  const handleNavigate = () => {
    if (userProfile) {
      navigate("/booking");
    } else {
      toast.error("Vui lòng đăng nhập để đặt lịch.");
      return;
    }
  };

  return (
    <motion.div
      className="fixed bottom-32 right-5 z-30 flex space-x-4"
      id="shopping-cart"
      animate={ controls }
    >
      <div className="social-button relative" onClick={ handleNavigate }>
        <button className="group relative h-16 w-16 rounded-full">
          <div className="floater absolute left-0 top-0 h-full w-full rounded-full bg-primary-800"></div>
          <div
            className={ `${productCount > 0 ? "ring-bell" : ""} icon relative z-10 flex h-full w-full items-center justify-center rounded-full` }
          >
            <FaSuitcaseMedical className="h-7 w-7 text-white duration-300 group-hover:scale-110" />
          </div>
        </button>
        { productCount > 0 && (
          <motion.div
            className="absolute -right-0 -top-2 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white"
            initial={ { scale: 0 } }
            animate={ { scale: 1 } }
            transition={ { type: "spring", stiffness: 500, damping: 30 } }
          >
            { productCount > 99 ? "99+" : productCount }
          </motion.div>
        ) }
      </div>
    </motion.div>
  );
};
export default Balloon;
