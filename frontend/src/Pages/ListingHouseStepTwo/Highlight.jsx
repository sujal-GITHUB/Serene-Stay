import { useDispatch, useSelector } from "react-redux";
import StructureCard from "../../components/listingHouse/StructureCard";
import { useEffect, useState } from "react";
import { createNewHouse } from "../../redux/actions/houseActions";

import { LiaShoePrintsSolid } from "react-icons/lia";
import { PiComputerTower } from "react-icons/pi";
import { TbBuildingSkyscraper, TbBuilding } from "react-icons/tb";
import { CiLocationOn } from "react-icons/ci";
import { HiOutlineUserGroup } from "react-icons/hi";

const Highlight = () => {
  const newHouseData = useSelector((state) => state.house.newHouse);
  const [storedCardData, setStoredCardData] = useState([]);
  const dispatch = useDispatch();
  const svgSize = 24;

  const handleStoreCardData = (name) => {
    if (storedCardData.includes(name)) {
      storedCardData.pop(name);
      setStoredCardData([...storedCardData]);
    } else {
      setStoredCardData([...storedCardData, name]);
    }
  };

  useEffect(() => {
    dispatch(
      createNewHouse(
        newHouseData?.houseType,
        newHouseData?.privacyType,
        newHouseData?.location,
        newHouseData?.floorPlan,
        newHouseData?.amenities,
        newHouseData?.photos,
        newHouseData?.title,
        storedCardData
      )
    );
  }, [storedCardData, dispatch]);


  return (
    <div className=" flex flex-col gap-10 max-w-screen-md min-h-screen mx-auto py-10">
      <div className="flex flex-col gap-3 md:gap-0">
        <h1 className=" text-[#222222] dark:text-gray-300 text-xl sm:text-2xl md:text-[32px] font-medium">
        Now, let’s talk about your apartment!
        </h1>
        <p className="text-sm sm:text-base md:text-lg mt-2 text-[#717171]">
        Pick up to 2 highlights to kickstart your description.
        </p>
      </div>
      <div className=" flex flex-wrap justify-center mt-20 gap-5">
        <StructureCard
          style={descriptionCardStyle}
          Img={LiaShoePrintsSolid}
          name={"Peaceful"}
          onClick={handleStoreCardData}
          storedCardData={storedCardData}
          svgSize={svgSize}
          ptagStyle={descriptionPtagStyle}
        />
        <StructureCard
          style={descriptionCardStyle}
          Img={PiComputerTower}
          name={"Unique"}
          onClick={handleStoreCardData}
          storedCardData={storedCardData}
          svgSize={svgSize}
          ptagStyle={descriptionPtagStyle}
        />
        <StructureCard
          style={descriptionCardStyle}
          Img={TbBuildingSkyscraper}
          name={"Family-friendly"}
          onClick={handleStoreCardData}
          storedCardData={storedCardData}
          svgSize={svgSize}
          ptagStyle={descriptionPtagStyle}
        />
        <StructureCard
          style={descriptionCardStyle}
          Img={TbBuilding}
          name={"Stylish"}
          onClick={handleStoreCardData}
          storedCardData={storedCardData}
          svgSize={svgSize}
          ptagStyle={descriptionPtagStyle}
        />
        <StructureCard
          style={descriptionCardStyle}
          Img={CiLocationOn}
          name={"Central"}
          onClick={handleStoreCardData}
          storedCardData={storedCardData}
          svgSize={svgSize}
          ptagStyle={descriptionPtagStyle}
        />
        <StructureCard
          style={descriptionCardStyle}
          Img={HiOutlineUserGroup}
          name={"Spacious"}
          onClick={handleStoreCardData}
          storedCardData={storedCardData}
          svgSize={svgSize}
          ptagStyle={descriptionPtagStyle}
        />
      </div>
    </div>
  );
};

// styles for STructuredCard component
const descriptionCardStyle =
  "flex flex-row items-center gap-2 px-6 py-3 rounded-full transition duration-300 cursor-pointer justify-center";
const descriptionPtagStyle = "text-[#222222] dark:text-gray-300 text-base font-medium";

export default Highlight;
