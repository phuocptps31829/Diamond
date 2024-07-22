import banner from "../../../assets/healthcare-workers-preventing-virus-quarantine-campaign-concept-smiling-asian-female-nurse-doctor-wi.jpg";

const serviceBanner = () => {
  return (
    <div className="mx-auto max-w-screen-2xl">
      <div className="relative w-full">
        <img
          className="h-48 w-full object-cover sm:h-64 lg:h-80"
          src={banner}
          alt="Doctor delivering great news"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="py-3 text-2xl font-bold sm:text-3xl lg:text-4xl">
              Chuyên khoa Diamond
            </h1>
            <span className="text-sm sm:text-base md:text-lg lg:text-xl">
              Diamond hãy sống theo cách của bạn
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default serviceBanner
