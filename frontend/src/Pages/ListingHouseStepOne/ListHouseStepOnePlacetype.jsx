import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewHouse } from "../../redux/actions/houseActions";
import PlaceTypeCard from "../../components/listingHouse/PlaceTypeCard";
import { PiHouseLine } from "react-icons/pi";
import { BsDoorOpen, BsHouseAdd } from "react-icons/bs";

const ListHouseStepOnePlacetype = () => {
  const [storedCardData, setStoredCardData] = useState("");
  const houseData = useSelector((state) => state.house);
  const dispatch = useDispatch();

  const handleStoreCardData = (name) => {
    setStoredCardData(name);
    dispatch(createNewHouse(houseData.newHouse?.houseType, name));
  };

  return (
    <div className="flex flex-col min-h-screen gap-10 max-w-screen-sm mx-auto my-6">
      <h1 className="text-[#222222] dark:text-gray-300 text-xl sm:text-2xl md:text-[32px] font-medium">
        What type of place do you offer?
      </h1>
      <div className="flex flex-col mt-20 gap-5">
        <PlaceTypeCard
          head={"Entire place"}
          desc={"Guests will have exclusive access to the entire place."}
          Img={PiHouseLine}
          onClick={handleStoreCardData}
          storedCardData={storedCardData}
        />
        <PlaceTypeCard
          head={"Single room"}
          desc={
            "Guests get a private room and shared spaces."
          }
          Img={BsDoorOpen}
          onClick={handleStoreCardData}
          storedCardData={storedCardData}
        />
        <PlaceTypeCard
          head={"Shared room"}
          desc={
            "Guests share a room or common area with others."
          }
          Img={BsHouseAdd}
          onClick={handleStoreCardData}
          storedCardData={storedCardData}
        />
      </div>
    </div>
  );
};

export default ListHouseStepOnePlacetype;
