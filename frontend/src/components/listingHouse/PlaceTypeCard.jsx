import { useState, useEffect } from "react";

const PlaceTypeCard = ({
  head,
  desc,
  Img,
  onClick,
  storedCardData,
  CheckOutline,
  CheckFill,
  iconColor = "#222222", // Default icon color (black) in light and dark mode
}) => {
  const [scale, setScale] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  const svgSize = window.innerWidth < 768 ? 28 : 40;

  useEffect(() => {
    const handleThemeChange = (e) => {
      setIsDarkMode(e.matches);
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
    };  
  }, []);

  // Dynamically set icon color based on dark or light mode
  const dynamicIconColor = isDarkMode ? "#ffffff" : iconColor;

  return (
    <div
      onClick={() => {
        onClick(head);
      }}
      onMouseDown={() => {
        setScale(true);
      }}
      onMouseUp={() => {
        setScale(false);
      }}
      className={`flex flex-row px-4 sm:px-8 items-center py-4 bg-white hover:bg-[#f7f7f7] hover:border-black hover:border-2 rounded-2xl cursor-pointer h-[120px] transition duration-300
      ${
        storedCardData === head
          ? "border-2 border-black dark:border-white bg-[#f7f7f7] dark:bg-[#11193b] dark:hover:bg-[#1e2855]"
          : "border-[1.3px] border-[#dddddd] dark:border-black bg-white dark:bg-[#172252]  hover:bg-[#a5a5a5] hover:border-black dark:hover:border-gray-300 hover:border-2"
      }
      ${CheckFill ? "gap-4" : "justify-between"}
      ${scale ? "scale-95" : "scale-100"}
      `}
    >
      {/* specific to Visibility section only */}
      {CheckFill && CheckOutline && (
        <>
          {storedCardData === head ? (
            <div>{CheckFill && <CheckFill size={28} style={{ fill: dynamicIconColor }} />}</div>
          ) : (
            <div>{CheckOutline && <CheckOutline size={28} style={{ fill: dynamicIconColor }} />}</div>
          )}
        </>
      )}
      <div className="flex flex-col gap-1 pr-2 items-start md:pr-0">
        <h4 className="text-[#222222] dark:text-gray-300 text-lg font-medium">{head}</h4>
        <p className="text-xs sm:text-sm text-[#717171]">{desc}</p>
      </div>
      <div>
        {Img && <Img size={svgSize} style={{ fill: dynamicIconColor }} />}
      </div>
    </div>
  );
};

export default PlaceTypeCard;
