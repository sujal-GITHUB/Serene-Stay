import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createNewHouse } from "../../redux/actions/houseActions";

const HouseTitle = () => {
  const { register } = useForm();
  const [characterCount, setCharacterCount] = useState(0);
  const [title, setTitle] = useState(null);
  const newHouseData = useSelector((state) => state.house.newHouse);
  const dispatch = useDispatch();

  const handleChange = () => {
    dispatch(
      createNewHouse(
        newHouseData?.houseType,
        newHouseData?.privacyType,
        newHouseData?.location,
        newHouseData?.floorPlan,
        newHouseData?.amenities,
        newHouseData?.photos,
        title
      )
    );
  };
  // // console.log(title, "title");
  return (
    <div className=" flex flex-col gap-10 max-w-screen-sm mx-auto my-6 min-h-[80vh]">
      <div className=" flex flex-col gap-3 md:gap-0">
        <h1 className=" text-[#222222] text-[32px] dark:text-gray-300 font-medium">
          Now, give a title to your Hotel 
        </h1>
        <p className="text-sm sm:text-base md:text-lg mt-2 text-[#717171]">
        Keep it Short and Sweet! You Can Always Update It Later.
        </p>
      </div>
      <div className="mt-20">
        <textarea
          className=" w-full p-3 border-[#b0b0b0] bg-white dark:bg-[#172252] resize-none border-[1.3px] rounded-md"
          rows="6"
          autoComplete="off"
          {...register("profileDetailsAbout", { maxLength: 40 })}
          onChange={(event) => {
            setTitle(event.target.value);
            setCharacterCount(event.target.value.replace(/\s/g, " ").length);
            handleChange(event);
          }}
          onBlur={handleChange}
          placeholder="Add Title"
        ></textarea>
        <div className=" mt-2 mb-3">
          <p
            className={` text-xs font-semibold mt-1 flex flex-row-reverse ${
              characterCount > 40 ? " text-red-400" : "text-[#717171]"
            }`}
          >
            {characterCount}/40 characters
          </p>
        </div>
      </div>
    </div>
  );
};

export default HouseTitle;
