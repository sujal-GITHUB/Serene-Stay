import highFive from "../../assets/basicIcon/highFive.png";

const Thankyou = () => {
  return (
    <div className="flex flex-col gap-10 max-w-screen-md mx-auto items-center sm:min-h-screen mt-20">
      <img src={highFive} alt="High five icon" width={250} />
      <div className="flex flex-col justify-center sm:w-[80%] mx-auto">
        <h1 className="text-[#222222] text-3xl dark:text-gray-300 mb-5 sm:text-3xl md:text-[32px] font-medium">
        We appreciate you for hosting your Hotel with us
        </h1>
        <p className="text-base sm:text-lg text-[#717171] py-2 sm:py-0">
        Your listed property is now visible on the dashboard's listing page.
        </p>
      </div>
    </div>
  );
};

export default Thankyou;
