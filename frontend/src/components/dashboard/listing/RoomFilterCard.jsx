import { MdKeyboardArrowDown } from "react-icons/md";
import FloorPlanCard from "../../listingHouse/FloorPlanCard";
import { useState, useEffect } from "react";

const RoomFilterCard = ({ onApplyFilters }) => {
  const [bedroomsNumber, setBedroomsNumber] = useState(0);
  const [bedsNumber, setBedsNumber] = useState(0);
  const [bathroomsNumber, setBathroomsNumber] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleClearData = () => {
    // Reset numbers to 0
    setBedroomsNumber(0);
    setBedsNumber(0);
    setBathroomsNumber(0);

    // Disable the "Clear" button
    setIsDisabled(true);
  };

  const handleApply = () => {
    // Handle applying the filters (send the filter data to parent or use it internally)
    const filterData = {
      bedrooms: bedroomsNumber,
      beds: bedsNumber,
      bathrooms: bathroomsNumber,
    };
    
    // If onApplyFilters prop is passed, call it with filterData
    if (onApplyFilters) {
      onApplyFilters(filterData);
    }
  };

  useEffect(() => {
    // Enable the "Clear" button if any filter is selected
    if (bedroomsNumber !== 0 || bedsNumber !== 0 || bathroomsNumber !== 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [bedroomsNumber, bedsNumber, bathroomsNumber]);

  return (
    <div className="dropdown dropdown-bottom">
      <label
        tabIndex={0}
        className="flex flex-row gap-1 items-center text-sm text-[#222222] cursor-pointer bg-white dark:bg-[#172252] dark:text-gray-300 
         hover:bg-[#f1f1f1] px-4 py-[6px] rounded-full border border-[#b0b0b0] hover:border-[#222222] transition duration-200 ease-in"
      >
        Rooms and beds
        <MdKeyboardArrowDown size={20} />
      </label>
      <div
        tabIndex={0}
        className="dropdown-content z-30 menu p-4 rounded-box min-w-[300px] flex flex-col gap-4 border bg-white dark:bg-[#172252] border-neutral-200 shadow-lg"
      >
        <FloorPlanCard
          name={"Bedrooms"}
          number={bedroomsNumber}
          setNumber={setBedroomsNumber}
          filter={true}
        />
        <FloorPlanCard
          name={"Beds"}
          number={bedsNumber}
          setNumber={setBedsNumber}
          filter={true}
        />
        <FloorPlanCard
          name={"Bathrooms"}
          number={bathroomsNumber}
          setNumber={setBathroomsNumber}
          filter={true}
        />
        <hr className="h-[1px] bg-[#dddddd] my-5" />
        {/* buttons */}
        <div className="flex flex-row justify-between items-center">
          <button
            className="text-sm disabled:cursor-not-allowed font-semibold hover:font-bold disabled:text-gray-300 cursor-pointer"
            disabled={isDisabled}
            onClick={handleClearData}
          >
            Clear
          </button>
          <button
            className="text-base w-[90px] py-3 rounded-lg bg-[#222222] dark:bg-blue-800 hover:bg-black transition duration-300 text-white"
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomFilterCard;
