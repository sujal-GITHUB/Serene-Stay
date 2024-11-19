import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import RoomFilterCard from "../../components/dashboard/listing/RoomFilterCard";
import AmenitiesFilterCard from "../../components/dashboard/listing/AmenitiesFilterCard";
import ListingStatus from "../../components/dashboard/listing/ListingStatus";
import ListingTable from "../../components/dashboard/listing/ListingTable";

const Listing = () => {
  const allListingsData = useSelector((state) => state.house.housesData);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [roomFilters, setRoomFilters] = useState({
    bedrooms: 0,
    beds: 0,
    bathrooms: 0,
  });
  const isSmallDevice = window.innerWidth < 640;
  const [filtersVisible, setFiltersVisible] = useState(false);

  // Handle amenities change from child component (AmenitiesFilterCard)
  const handleAmenityChange = (selectedAmenities) => {
    setSelectedAmenities(selectedAmenities);
  };

  // Handle room filter data from RoomFilterCard
  const handleRoomFilterChange = (filters) => {
    setRoomFilters(filters);
  };

  // Filter listings based on selected amenities and room filters
  const filteredListings = allListingsData.filter((listing) => {
    // If no amenities are selected, show all listings
    const amenitiesMatch = selectedAmenities.length === 0 || selectedAmenities.every((amenity) => listing.amenities.includes(amenity));

    // Apply room filter logic
    const roomsMatch = 
      (roomFilters.bedrooms === 0 || listing.bedrooms >= roomFilters.bedrooms) &&
      (roomFilters.beds === 0 || listing.beds >= roomFilters.beds) &&
      (roomFilters.bathrooms === 0 || listing.bathrooms >= roomFilters.bathrooms);

    return amenitiesMatch && roomsMatch;
  });

  const toggleFilters = () => setFiltersVisible(!filtersVisible);

  return (
    <main className="max-w-screen-xl mx-auto px-4 sm:px-8 md:px-10 xl:px-20 pb-10">
      <section className="pt-8 flex flex-col gap-5">
        {/* About Listings */}
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-xl text-[#222222] dark:text-gray-300 font-medium">
            {filteredListings.length} listings
          </h3>
          <Link
            to="/become-a-host"
            className="flex flex-row items-center gap-[6px] text-sm font-medium px-4 py-3 bg-white dark:bg-[#172252] hover:bg-[#f1f1f1] border-[#b0b0b0] border rounded-lg transition duration-200 ease-in"
          >
            <HiPlus size={16} />
            Create listing
          </Link>
        </div>

        {/* Filtering options */}
        <div className="flex flex-row gap-5">
          {(!isSmallDevice || filtersVisible) && (
            <>
              <RoomFilterCard onApplyFilters={handleRoomFilterChange} />
              <AmenitiesFilterCard onAmenityChange={handleAmenityChange} />
              <ListingStatus />
            </>
          )}
          {isSmallDevice && (
            <button
              onClick={toggleFilters}
              className="text-sm text-blue-500 mt-2"
            >
              {filtersVisible ? 'Hide Filters' : 'Show Filters'}
            </button>
          )}
        </div>

        {/* Table contents */}
        <ListingTable listings={filteredListings} />
      </section>
    </main>
  );
};

export default Listing;
