import step1 from "../../assets/video/step1_video.mp4";

const ListHouseStepOne = () => {
  return (
    <section className=" h-[80vh] flex flex-col lg:flex-row justify-around gap-5 lg:gap-10 items-center w-full my-8 sm:my-12 md:my-16 lg:my-0">
      <div className="flex flex-col gap-2 md:gap-4 text-[#222222] sm:px-5 md:px-8 lg:px-10">
        <div className=" flex flex-col gap-2 font-medium min-h-[130px]">
          <h2 className=" text-2xl dark:text-gray-300 sm:text-3xl md:text-4xl lg:text-5xl">
            Tell us about your Hotel
          </h2>
        </div>
        <p className=" text-xs text-[#717171] sm:text-sm md:text-base lg:text-lg">
        In this step, we'll inquire about the type of property you have, whether guests will book the whole place or just a room, and we'll also need the location and how many guests it can accommodate.
        </p>
      </div>
      <video
        src={step1}
        autoPlay={true}
        muted
        type="video/mp4"
        className=" max-w-xs sm:max-w-md"
      />
    </section>
  );
};

export default ListHouseStepOne;
