import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewHouse } from "../../redux/actions/houseActions";
import { City, Country, State } from "country-state-city";
import Select from "react-select";

const ListingHouseStepOneAddress = () => {
  const houseData = useSelector((state) => state.house);
  const dispatch = useDispatch();

  // State to manage dark mode
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // State to manage form data
  const [formData, setFormData] = useState({
    country: "",
    addressLineOne: "",
    addressLineTwo: "",
    city: "",
    state: "",
    postCode: "",
  });

  const handleStoreCardData = () => {
    if (formData.country) {
      dispatch(
        createNewHouse(
          houseData.newHouse?.houseType,
          houseData.newHouse?.privacyType,
          formData
        )
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <section className="flex flex-col gap-10 max-w-screen-md mx-auto my-6 min-h-[70vh] 2xl:h-[80vh]">
      <div className="flex flex-col gap-2">
        <h1 className="text-[#222222] dark:text-gray-300 text-xl sm:text-2xl md:text-[32px] font-medium">
          Confirm your address
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-[#717171]">
          Your address will only be shared with guests once they’ve completed a reservation.
        </p>
        <div className="flex flex-col gap-5 mt-20">
          <Select
            options={Country.getAllCountries()}
            getOptionLabel={(options) => options["name"]}
            getOptionValue={(options) => options["name"]}
            value={formData.country}
            onChange={(item) => {
              setFormData({ ...formData, country: item });
            }}
            onBlur={handleStoreCardData}
            placeholder="Country"
            styles={{
              control: (provided) => ({
                ...provided,
                padding: "8px",
                backgroundColor: isDarkMode ? "#172252" : "white",
                borderRadius: "8px",
              }),
              menu: (provided) => ({
                ...provided,
                backgroundColor: isDarkMode ? "#172252" : "white",
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isFocused
                  ? isDarkMode
                    ? "#1e3a8a"
                    : "#f0f0f0"
                  : isDarkMode
                  ? "#172252"
                  : "white",
                color: isDarkMode ? "white" : "black",
              }),
              singleValue: (provided) => ({
                ...provided,
                color: isDarkMode ? "white" : "black",
              }),
            }}
          />
          <Select
            options={State.getStatesOfCountry(formData?.country?.isoCode)}
            getOptionLabel={(options) => options["name"]}
            getOptionValue={(options) => options["name"]}
            value={formData.state}
            onChange={(item) => {
              setFormData({ ...formData, state: item });
            }}
            onBlur={handleStoreCardData}
            placeholder="State / Province / Territory"
            styles={{
              control: (provided) => ({
                ...provided,
                padding: "8px",
                backgroundColor: isDarkMode ? "#172252" : "white",
                borderRadius: "8px",
              }),
              menu: (provided) => ({
                ...provided,
                backgroundColor: isDarkMode ? "#172252" : "white",
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isFocused
                  ? isDarkMode
                    ? "#1e3a8a"
                    : "#f0f0f0"
                  : isDarkMode
                  ? "#172252"
                  : "white",
                color: isDarkMode ? "white" : "black",
              }),
              singleValue: (provided) => ({
                ...provided,
                color: isDarkMode ? "white" : "black",
              }),
            }}
          />
          <Select
            options={City.getCitiesOfState(
              formData?.state?.countryCode,
              formData?.state?.isoCode
            )}
            getOptionLabel={(options) => options["name"]}
            getOptionValue={(options) => options["name"]}
            value={formData.city}
            onChange={(item) => {
              setFormData({ ...formData, city: item });
            }}
            onBlur={handleStoreCardData}
            placeholder="City / Village"
            styles={{
              control: (provided) => ({
                ...provided,
                padding: "8px",
                backgroundColor: isDarkMode ? "#172252" : "white",
                borderRadius: "8px",
              }),
              menu: (provided) => ({
                ...provided,
                backgroundColor: isDarkMode ? "#172252" : "white",
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isFocused
                  ? isDarkMode
                    ? "#1e3a8a"
                    : "#f0f0f0"
                  : isDarkMode
                  ? "#172252"
                  : "white",
                color: isDarkMode ? "white" : "black",
              }),
              singleValue: (provided) => ({
                ...provided,
                color: isDarkMode ? "white" : "black",
              }),
            }}
          />
          <input
            type="text"
            name="addressLineOne"
            placeholder="Address line 1"
            className="input input-bordered w-full p-3 dark:bg-[#172252] bg-white rounded-md"
            value={formData.addressLineOne}
            onChange={handleInputChange}
            onBlur={handleStoreCardData}
          />
          <input
            type="text"
            name="addressLineTwo"
            placeholder="Address line 2 (if applicable)"
            className="input input-bordered w-full p-3 dark:bg-[#172252] bg-white rounded-md"
            value={formData.addressLineTwo}
            onChange={handleInputChange}
            onBlur={handleStoreCardData}
          />
          <input
            type="number"
            name="postCode"
            placeholder="Pin code"
            className="input input-bordered w-full p-3 dark:bg-[#172252] bg-white rounded-md"
            value={formData.postCode}
            onChange={handleInputChange}
            onBlur={handleStoreCardData}
          />
        </div>
      </div>
    </section>
  );
};

export default ListingHouseStepOneAddress;
