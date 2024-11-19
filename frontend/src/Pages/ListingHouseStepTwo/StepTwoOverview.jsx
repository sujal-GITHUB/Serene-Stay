import video from "../../assets/video/step_2.mp4";

const StepTwoOverview = () => {
  return (
    <section className=" h-[70vh] md:h-[80vh] flex flex-col lg:flex-row gap-5 lg:gap-10 items-center w-full my-8 sm:my-12 md:my-16 lg:my-0">
      <video
        src={video}
        autoPlay={true}
        muted
        type="video/mp4"
        className=" max-w-xs sm:max-w-md"
      />
      <div className="flex flex-col gap-2 md:gap-4 text-[#222222] sm:px-5 md:px-8 lg:px-10">
        <div className=" flex flex-col gap-2 font-medium">
          <h2 className=" text-2xl dark:text-white sm:text-3xl md:text-4xl lg:text-5xl">
             Make it stand out
          </h2>
        </div>
        <p className=" text-xs dark:text-[#717171] sm:text-sm md:text-base lg:text-lg">
        In this step, you’ll list the amenities your place provides, upload at least 5 photos, and craft an engaging title and description.
        </p>
      </div>
    </section>
  );
};

export default StepTwoOverview;
