import { Link } from "react-router-dom";
import { IoChatbubbleEllipses } from "react-icons/io5";
const BalloonMessage = () => {
  return (
    <Link to="/services-booking">
      <div className="fixed bottom-10 right-5 flex space-x-4" >
        <div className="social-button relative">
          <button className="group relative h-16 w-16 rounded-full">
            <div className="floater absolute left-0 top-0 h-full w-full rounded-full bg-primary-800"></div>
            <div className="icon relative z-10 flex h-full w-full items-center justify-center rounded-full">
            <IoChatbubbleEllipses
            className="h-8 w-8 text-white duration-300 group-hover:scale-125" />
            </div>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default BalloonMessage;