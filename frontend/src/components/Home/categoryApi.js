import {
    PiHouseLine,
    PiTent,
    PiCampfireLight,
  } from "react-icons/pi";
  import {
    MdOutlineApartment,
    MdOutlineCabin,
    MdOutlineHotel,
    MdHome, // Corrected for Guesthouse
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
  
  export const categoryApi = [
    { id: 1, name: "House", svg: PiHouseLine },
    { id: 2, name: "Apartment", svg: MdOutlineApartment },
    { id: 3, name: "Villa", svg: MdOutlineCabin },
    { id: 4, name: "Guesthouse", svg: MdHome },  // Corrected for Guesthouse
    { id: 5, name: "Hotel", svg: LiaHotelSolid },
    { id: 6, name: "Resort", svg: MdOutlinePool },
    { id: 7, name: "Homestay", svg: FaHome },
    { id: 8, name: "Luxury Home", svg: GiCastle },
    { id: 9, name: "Motel", svg: MdOutlineHotel },  // Changed to MdOutlineHotel for Motel
  ];
  