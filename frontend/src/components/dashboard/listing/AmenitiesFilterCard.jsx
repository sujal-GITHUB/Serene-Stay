import { useState, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { amenititesData } from "./AmenitiesFilterData";

const AmenitiesFilterCard = ({ onAmenityChange }) => {
  const storedAmenities = JSON.parse(localStorage.getItem("selectedAmenities")) || [];
  const [isDisabled, setIsDisabled] = useState(storedAmenities.length === 0);
  const [selectedAmenities, setSelectedAmenities] = useState(storedAmenities);

  useEffect(() => {
    localStorage.setItem("selectedAmenities", JSON.stringify(selectedAmenities));
  }, [selectedAmenities]);

  const handleCheckboxChange = (amenityName, isChecked) => {
    setSelectedAmenities((prevSelectedAmenities) => {
      const updatedAmenities = isChecked
        ? [...prevSelectedAmenities, amenityName]
        : prevSelectedAmenities.filter((name) => name !== amenityName);

      setIsDisabled(updatedAmenities.length === 0); // Update button state
      return updatedAmenities;
    });
  };

  const handleClearData = () => {
    setSelectedAmenities([]);
    setIsDisabled(true); // Disable the "Apply" button
    localStorage.removeItem("selectedAmenities");
  };

  const handleApply = () => {
    onAmenityChange(selectedAmenities);
  };

  return (
    <div className="dropdown dropdown-bottom">
      <label
        tabIndex={0}
        className="flex flex-row gap-1 items-center text-sm text-[#222222] cursor-pointer bg-white dark:bg-[#172252] dark:text-gray-300  
         hover:bg-[#f1f1f1] px-4 py-[6px] rounded-full border border-[#b0b0b0] hover:border-[#222222] transition duration-200 ease-in mb-3"
      >
        Amenities
        <MdKeyboardArrowDown size={20} />
      </label>
      <div
        tabIndex={0}
        className="dropdown-content z-30 menu p-4 rounded-box min-w-[320px] sm:min-w-[450px] flex flex-col gap-4 border bg-white dark:bg-[#172252]  border-neutral-200 shadow-lg -left-20 md:left-0"
      >
        <div className="grid grid-cols-2 gap-y-4 gap-x-7 max-h-[200px] overflow-x-auto">
          {amenititesData?.map((data, i) => {
            const isChecked = selectedAmenities.includes(data.name);
            return (
              <div key={i} className="flex flex-row gap-2 items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded-md cursor-pointer"
                  checked={isChecked}
                  onChange={(e) => handleCheckboxChange(data.name, e.target.checked)}
                />
                <p className="text-sm dark:text-gray-300 text-[#717171]">{data.name}</p>
              </div>
            );
          })}
        </div>
        <div>
          <hr className="h-[1px] bg-[#dddddd] my-5" />
          <div className="flex flex-row justify-between items-center">
            <button
              className="text-sm disabled:cursor-not-allowed disabled:text-gray-300 font-semibold hover:font-bold cursor-pointer"
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
    </div>
  );
};

export default AmenitiesFilterCard;
