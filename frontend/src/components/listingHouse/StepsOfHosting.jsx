import OverviewCard from "./OverviewCard";
import aboutPlace from "../../assets/aboutPlace.png";
import standOut from "../../assets/standOut.png";
import publish from "../../assets/publish.png";

const StepsOfHosting = () => {
  return (
    <section className="h-[90vh] overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10 justify-between items-center bg-lightLightBLue max-w-screen-xl xl:mx-auto mb-20 lg:mt-8 lg:pb-[200px]">
      <div className="flex flex-col gap-5">
        <OverviewCard
          num={1}
          head={"Tell us about your Hotel"}
          desc={
            "Provide some basic details, such as its location and the number of guests it can accommodate."
          }
          img={aboutPlace}
        />
        <hr className="my-5 bg-[#dddddd] h-[1.4 px]" />
        <OverviewCard
          num={2}
          head={"Make it stand out"}
          desc={
            "Upload at least 5 photos, along with a title and description—we’ll assist you with the details."
          }
          img={standOut}
        />
        <hr className="my-5 bg-[#dddddd] h-[1.4px]" />
        <OverviewCard
          num={3}
          head={"Finish up and host"}
          desc={
            "Select whether you'd like to begin with an experienced guest, set your starting price, and publish your listing."
          }
          img={publish}
        />
      </div>
      <h1 className="text-[#222222] dark:text-gray-300 text-3xl sm:text-5xl xl:text-[56px] font-medium leading-tight">
        Host your Hotel on <b>Serene Stay</b> in a few steps
      </h1>
    </section>
  );
};

export default StepsOfHosting;

