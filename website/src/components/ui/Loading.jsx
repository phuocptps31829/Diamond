import { useEffect } from "react";

const Loading = ({ ScaleMini = false }) => {

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className={`${ScaleMini ? "scale-[0.65]" : "bg-[#000000a2]"} flex w-full flex-col items-center justify-center py-10 absolute top-0 z-50 left-0 h-full`}>
      <div className="pyramid-loader">
        <div className="wrapper">
          <span className="side side1"></span>
          <span className="side side2"></span>
          <span className="side side3"></span>
          <span className="side side4"></span>
          <span className="top"> </span>
          <span className="corner corner1"></span>
          <span className="corner corner2"></span>
          <span className="corner corner3"></span>
          <span className="corner corner4"></span>
          <span className="shadow"></span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
