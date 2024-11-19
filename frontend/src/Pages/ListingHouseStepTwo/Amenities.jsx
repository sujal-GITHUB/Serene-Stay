import StructureCard from "../../components/listingHouse/StructureCard";
import { HiOutlineWifi } from "react-icons/hi";
import { PiTelevisionSimple } from "react-icons/pi";
import { MdOutlineKitchen, MdOutlinePool } from "react-icons/md";
import { BiSolidWasher, BiSolidFirstAid } from "react-icons/bi";
import { AiOutlineCar, AiOutlineAlert } from "react-icons/ai";
import { BsSnow, BsPersonWorkspace } from "react-icons/bs";
import { CiDumbbell } from "react-icons/ci";
import { GiTennisCourt } from "react-icons/gi";
import { MdDinnerDining } from "react-icons/md";
import { PiFireExtinguisher } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createNewHouse } from "../../redux/actions/houseActions";

const Amenities = () => {
  const newHouseData = useSelector((state) => state.house.newHouse);
  const [storedCardData, setStoredCardData] = useState([]);
  const dispatch = useDispatch();
  const svgSize = 40; // Uniform size for better layout

  const handleStoreCardData = (name) => {
    if (storedCardData.includes(name)) {
      setStoredCardData(storedCardData.filter((item) => item !== name));
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
        storedCardData
      )
    );
  }, [storedCardData, dispatch]);

  const amenitiesList = [
    { name: "High-speed Wifi", icon: HiOutlineWifi },
    { name: "Dedicated Workspace", icon: BsPersonWorkspace },
    { name: "TV", icon: PiTelevisionSimple },
    { name: "Kitchen", icon: MdOutlineKitchen },
    { name: "Free parking", icon: AiOutlineCar },
    { name: "Air conditioning", icon: BsSnow },
    { name: "Pool", icon: MdOutlinePool },
    { name: "Exercise equipment", icon: CiDumbbell },
    { name: "Outdoor Dining Area", icon: MdDinnerDining },
    { name: "First aid kit", icon: BiSolidFirstAid },
    { name: "Fire extinguisher", icon: PiFireExtinguisher },
    { name: "Safety alarm", icon: AiOutlineAlert },
  ];

  return (
    <div className="flex flex-col gap-10 max-w-screen-md mx-auto my-6">
      <div>
        <h1 className="text-[#222222] dark:text-gray-300 text-xl sm:text-2xl md:text-[32px] font-medium">
          Tell guests what your place has to offer
        </h1>
        <p className="text-sm sm:text-base mt-5 md:text-lg text-[#717171]">
          You can add additional amenities even after your Hotel is hosted.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {amenitiesList.map((amenity) => (
          <StructureCard
            key={amenity.name}
            style={amenitisCardStyle}
            Img={amenity.icon}
            name={amenity.name}
            onClick={handleStoreCardData}
            storedCardData={storedCardData}
            svgSize={svgSize}
            ptagStyle={amenitesPtagClass}
          />
        ))}
      </div>
    </div>
  );
};

// styles for StructuredCard component
const amenitisCardStyle =
  "flex flex-col items-center justify-center gap-2 px-6 rounded-xl transition duration-300 h-[140px] w-[150px] sm:w-[220px] cursor-pointer border dark:border-gray-white hover:shadow-md";
const amenitesPtagClass =
  "text-[#222222] dark:text-gray-300 text-base md:text-lg font-medium";

export default Amenities;
