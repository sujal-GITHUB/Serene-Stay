import { useState } from "react";
import { AiFillStar, AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const ListingTitle = ({ listingData }) => {
  // Local state to handle the save status
  const [isSaved, setIsSaved] = useState(false);

  // Toggle save status
  const handleWishlistToggle = () => {
    setIsSaved((prev) => !prev);
  };

  return (
    <div className="flex flex-col text-[#222222] dark:text-gray-300">
      {/* Title */}
      <p className="text-xl md:text-2xl font-semibold">{listingData?.title}</p>

      <div className="grid grid-cols-1 md:grid-cols-5 items-center justify-end">
        <div className="flex flex-row flex-wrap md:flex-nowrap items-center gap-2 col-span-4">
          {/* Ratings */}
          <p className="flex flex-row items-center gap-1">
            <AiFillStar size={16} />
            <span className="text-xs sm:text-sm">
              {listingData?.ratings || "New"}
            </span>
          </p>
          <span> · </span>
          <p className="text-xs sm:text-sm">
            {listingData?.reviews || "No reviews"}
          </p>
          <span> · </span>
          {/* Location */}
          <p className="text-xs sm:text-sm font-medium">
            {listingData?.location?.addressLineOne ||
              listingData?.location?.addressLineTwo ||
              listingData?.location?.country?.name}
          </p>
        </div>
        {/* Save to Wishlist */}
        <div className="col-span-1 md:flex justify-end w-full hidden">
          <button
            onClick={handleWishlistToggle}
            className="flex flex-row-reverse gap-2 items-center cursor-pointer p-2 rounded-md w-[80px] bg-white dark:bg-[#172252] hover:bg-[#f1f1f1] transition duration-200 ease-in"
          >
            <p className="text-sm underline-offset-1 font-medium">
              {isSaved ? "Saved" : "Save"}
            </p>
            {isSaved ? (
              <AiFillHeart size={18} className="text-red-500" />
            ) : (
              <AiOutlineHeart size={18} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingTitle;
