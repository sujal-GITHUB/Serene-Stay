import {
  PiHouseLine,
  PiTent,
  PiCampfireLight,
} from "react-icons/pi";
import {
  MdOutlineApartment,
  MdOutlineCabin,
  MdOutlineHotel,
  MdHome, // For Guesthouse
} from "react-icons/md";
import { TbSailboat2, TbCamper } from "react-icons/tb";
import {
  GiMountainCave,
  GiLightningDome,
  GiControlTower,
  GiTreehouse,
  GiCastle, // For Luxury Home
} from "react-icons/gi";
import { LiaHotelSolid } from "react-icons/lia";
import {
  MdOutlinePool,
  MdOutlineOutdoorGrill,
} from "react-icons/md";
import { FaHome } from "react-icons/fa"; // For Homestay
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewHouse } from "../../redux/actions/houseActions";
import StructureCard from "../../components/listingHouse/StructureCard";

// Define the new categoryApi with updated icons
export const categoryApi = [
  { id: 1, name: "House", svg: PiHouseLine },
  { id: 2, name: "Apartment", svg: MdOutlineApartment },
  { id: 3, name: "Villa", svg: MdOutlineCabin },
  { id: 4, name: "Guesthouse", svg: MdHome },  // For Guesthouse
  { id: 5, name: "Hotel", svg: LiaHotelSolid },
  { id: 6, name: "Resort", svg: MdOutlinePool },
  { id: 7, name: "Homestay", svg: FaHome },
  { id: 8, name: "Luxury Home", svg: GiCastle },
  { id: 9, name: "Motel", svg: MdOutlineHotel },  // For Motel
];

const ListHouseStepOneStructure = () => {
  const [storedCardData, setStoredCardData] = useState("");
  const [selectedCard, setSelectedCard] = useState(""); // State to track selected card
  const dispatch = useDispatch();
  const svgSize = window.innerWidth < 768 ? 28 : 40;

  const handleStoreCardData = (name) => {
    if (selectedCard === name) {
      // If the same card is clicked twice, reset the data
      setStoredCardData("");
      setSelectedCard(""); // Reset selected card state
    } else {
      setStoredCardData(name);
      setSelectedCard(name); // Set the selected card name
      dispatch(createNewHouse(name));
    }
  };

  return (
    <div className="flex flex-col gap-10 max-w-screen-md mx-auto my-6 min-h-screen">
      <h1 className="text-[#222222] dark:text-gray-300 text-xl sm:text-2xl md:text-[32px] font-medium">
        Best description for your Hotel?
      </h1>
      <div className="grid grid-cols-2 py-[110px] md:grid-cols-3 gap-5 mx-auto md:mx-0">
        {categoryApi.map((cat) => (
          <StructureCard
            key={cat.id}
            style={`
              ${structureCardStyle} 
              ${selectedCard === cat.name ? 'border-2 border-black-500 dark:border-white' : 'border-2 border-gray-300'}
            `}
            Img={cat.svg}
            name={cat.name}
            onClick={() => handleStoreCardData(cat.name)}
            storedCardData={storedCardData}
            svgSize={svgSize}
            ptagStyle={structurePtagClass} // Set the fixed color for the icons
          />
        ))}
      </div>
    </div>
  );
};

// styles for StructureCard component
const structureCardStyle =
  "flex flex-col gap-1 px-6 rounded-xl dark:bg-[#172252 ] transition duration-300 h-[120px] w-[150px] sm:w-[220px] cursor-pointer justify-center items-center";
const structurePtagClass = "text-[#222222] dark:text-gray-300 text-base md:text-lg font-medium";

export default ListHouseStepOneStructure;
