import PreviewCard from "../../components/listingHouse/PreviewCard";
import PreviewCardsDescription from "../../components/listingHouse/PreviewCardsDescription";
import SuccessPupup from "../../components/popUp/houseListing/SuccessPupup";

const Reciept = () => {
  return (
    <div className=" flex flex-col gap-10 max-w-[900px] mx-auto my-6 min-h-screen">
      <div>
        <h1 className=" text-[#222222] text-2xl dark:text-gray-300 sm:text-3xl md:text-4xl lg:text-5xl font-medium">
        Examine your hosting details
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-[#717171] mt-2 mb-10">
        This is how guests will perceive your listing. Double-check to make sure it’s on point.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-5 mx-auto lg:mx-0">
        {/* preview Card */}
        <PreviewCard />
        {/* card details */}
        <PreviewCardsDescription />
      </div>
      <SuccessPupup />
    </div>
  );
};

export default Reciept;
