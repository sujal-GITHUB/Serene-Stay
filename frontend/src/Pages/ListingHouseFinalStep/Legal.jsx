import { AiOutlineQuestionCircle } from "react-icons/ai";
import ModalPopup from "../../components/popUp/houseListing/ModalPopup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewHouse } from "../../redux/actions/houseActions";

const Legal = () => {
  const newHouseData = useSelector((state) => state.house.newHouse);
  const [securityFeatures, setSecurityFeatures] = useState([]);
  const dispatch = useDispatch();

  // Handle checkbox change to capture the selected security features
  const handleCheckboxChange = (event) => {
    const label = event.target.parentElement.querySelector("label");
    const labelText = label.textContent;

    if (event.target.checked) {
      // Checkbox is checked, add the label to the selected array
      setSecurityFeatures((prevFeatures) => [...prevFeatures, labelText]);
    } else {
      // Checkbox is unchecked, remove the label from the selected array
      setSecurityFeatures((prevFeatures) =>
        prevFeatures.filter((item) => item !== labelText)
      );
    }
  };

  useEffect(() => {
    // Dispatch the action with updated securityFeatures
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
        newHouseData?.guestType,
        newHouseData?.priceBeforeTaxes,
        newHouseData?.authorEarnedPrice,
        newHouseData?.basePrice,
        securityFeatures // Pass the updated security features
      )
    );
  }, [securityFeatures, dispatch, newHouseData]);

  return (
    <>
      <div className="flex flex-col max-w-screen-sm mx-auto my-6 min-h-screen">
        <div>
          <h1 className="text-[#222222] dark:text-gray-300 text-3xl sm:text-[32px] font-semibold">
            Wohoo! Last step
          </h1>
          <div className="mt-5 flex flex-row justify-center items-center gap-2 mb-20">
            <p className="text-base sm:text-lg text-[#222222] dark:text-gray-300 font-medium">
              Does your Hotel have these security features?
            </p>
            <div
              className="cursor-pointer p-1 hover:bg-[#f1f1f1] rounded-full transition duration-300"
              onClick={() => window.my_modal_5.showModal()}
            >
              <AiOutlineQuestionCircle size={20} />
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-6 w-full sm:min-w-[400px]">
          <div className="flex flex-row justify-between items-center">
            <label htmlFor="checkbox1" className="cursor-pointer">
              Security camera(s)
            </label>
            <input
              type="checkbox"
              id="checkbox1"
              className="cursor-pointer w-6 h-6"
              onChange={handleCheckboxChange}
            />
          </div>
          <div className="flex flex-row justify-between items-center">
            <label htmlFor="checkbox2" className="cursor-pointer">
              Sensors
            </label>
            <input
              type="checkbox"
              id="checkbox2"
              className="cursor-pointer w-6 h-6"
              onChange={handleCheckboxChange}
            />
          </div>
          <div className="flex flex-row justify-between items-center">
            <label htmlFor="checkbox3" className="cursor-pointer">
              Emergency Exit
            </label>
            <input
              type="checkbox"
              id="checkbox3"
              className="cursor-pointer w-6 h-6"
              onChange={handleCheckboxChange}
            />
          </div>
        </div>

        <hr className="dark:h-[1px] bg-[#222222] h-[2px] my-12" />

        <div className="opacity-60 text-[#222222]">
          <h6 className="text-lg sm:text-xl dark:text-zinc-400 font-semibold">
            Important things to know
          </h6>
          <p className="text-xs sm:text-sm mt-2 dark:text-zinc-400">
          Ensure compliance with local laws and regulations, and review the accommodation provider's nondiscrimination policy, as well as any applicable guest and host fees.


          </p>
        </div>
      </div>

      {/* extra info popup about legal & security */}
      <ModalPopup />
    </>
  );
};

export default Legal;
