import { useDispatch, useSelector } from "react-redux";
import PlaceTypeCard from "../../components/listingHouse/PlaceTypeCard";
import { createNewHouse } from "../../redux/actions/houseActions";
import { useState } from "react";

import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsFillCheckCircleFill } from "react-icons/bs";

const Visibility = () => {
  const [storedCardData, setStoredCardData] = useState("");
  const newHouseData = useSelector((state) => state.house.newHouse);
  const dispatch = useDispatch();

  const handleStoreCardData = (name) => {
    setStoredCardData(name);
    dispatch(
      createNewHouse(
        newHouseData?.houseType,
        newHouseData?.privacyType,
        newHouseData?.location,
        newHouseData?.floorPlan,
        newHouseData?.amenities,
        newHouseData?.photos,
        newHouseData?.title,
        newHouseData?.highlights,
        newHouseData?.description,
        name
      )
    );
  };

  return (
    <div className="flex flex-col gap-10 max-w-screen-md mx-auto my-6 min-h-[70vh]">
      <div>
        <h1 className="text-[#222222] dark:text-gray-300 mt-5 text-xl sm:text-2xl md:text-[32px] font-medium">
          Pick the perfect guest for your first reservation
        </h1>
        <p className="text-sm sm:text-base md:text-lg mt-2 mb-20 text-[#717171]">
          Once your first guest stays, your place will be open for bookings by anyone.
        </p>
      </div>
      <PlaceTypeCard
        desc={
          "Get reservations faster when you welcome anyone from the Motel community."
        }
        head={"Any Motel guest"}
        onClick={handleStoreCardData}
        storedCardData={storedCardData}
        CheckOutline={AiOutlineCheckCircle}
        // Only adjust the color of the checkbox without affecting size
        CheckFill={({ className }) => (
          <BsFillCheckCircleFill
            className={`${className} text-black dark:text-white`} // Black in light mode, white in dark mode
          />
        )}
      />
      <PlaceTypeCard
        desc="For your first guest, welcome someone with a good track record on Motel who can offer tips for how to be a great Host"
        head={"An Experienced guest"}
        onClick={handleStoreCardData}
        storedCardData={storedCardData}
        CheckOutline={AiOutlineCheckCircle}
        // Only adjust the color of the checkbox without affecting size
        CheckFill={({ className }) => (
          <BsFillCheckCircleFill
            className={`${className} text-black dark:text-white`} // Black in light mode, white in dark mode
          />
        )}
      />
    </div>
  );
};

export default Visibility;
