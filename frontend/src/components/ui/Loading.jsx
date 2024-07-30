
const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <iframe
        src="https://lottie.host/embed/bd3b155d-70b1-4ac0-88bd-8ed66f3425c3/NVSIbUuxzq.json"
        className="w-1/2 h-1/2"
        title="Loading Animation"
      ></iframe>
      <div className="text-2xl font-bold animate-pulse uppercase">
        Y khoa Diamond
      </div>
    </div>
  );
};

export default Loading;