import { useEffect, useRef, useState } from "react";
import { AiFillStar, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { useDispatch } from "react-redux";
import { newReservation } from "../../redux/actions/reservationsActions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../backend";
import { differenceInDays } from "date-fns";

const ReservationCard = ({ listingData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Refs
  const calendarRef = useRef();
  const dropdownRef = useRef();

  // Outside click handling
  const { state: showStartCalendar, setState: setShowStartCalendar } = useOutsideClick(calendarRef);
  const { state: showEndCalendar, setState: setShowEndCalendar } = useOutsideClick(calendarRef);
  const { state: showDropdown, setState: setShowDropdown } = useOutsideClick(dropdownRef);

  // State management
  const [guestsNumber, setGuestsNumber] = useState(1);
  const [childrenNumber, setChildrenNumber] = useState(0);
  const [totalGuest, setTotalGuest] = useState(guestsNumber + childrenNumber);
  const [reservations, setReservations] = useState([]);

  // Date states
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [nightsStaying, setNightsStaying] = useState(1);

  // Pricing states
  const [reservationBasePrice, setReservationBasePrice] = useState(listingData?.basePrice);
  const [tax, setTax] = useState(0);
  const [authorEarned, setAuthorEarned] = useState(0);

  // Fetch reservations
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await axios.post(`${API}reservations/get_reservations`, {
          id: listingData?._id,
        });
        if (res.status === 200) setReservations(res.data);
      } catch (error) {
        console.error("Failed to fetch reservations:", error);
      }
    };
    fetchReservations();
  }, [listingData?._id]);

  // Calculate nights and prices
  useEffect(() => {
    const calculatedNights = Math.max(differenceInDays(new Date(endDate), new Date(startDate)), 1);
    const calculatedBasePrice = listingData?.basePrice * calculatedNights;
    const calculatingTaxes = Math.round((calculatedBasePrice * 18) / 100);
    const calculateAuthorEarned = calculatedBasePrice - Math.round((calculatedBasePrice * 3) / 100);

    setNightsStaying(calculatedNights);
    setReservationBasePrice(calculatedBasePrice);
    setTax(calculatingTaxes);
    setAuthorEarned(calculateAuthorEarned);
  }, [startDate, endDate, listingData?.basePrice]);

  // Update total guests
  useEffect(() => {
    setTotalGuest(guestsNumber + childrenNumber);
  }, [guestsNumber, childrenNumber]);

  // Dispatch reservation data
  useEffect(() => {
    const data = {
      listingData,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      nightsStaying,
      totalGuest,
      reservationBasePrice,
      tax,
      authorEarned,
    };
    dispatch(newReservation(data));
  }, [dispatch, listingData, startDate, endDate, nightsStaying, totalGuest, reservationBasePrice, tax, authorEarned]);

  // Booking handler
  const handleBooking = () => {
    navigate(
      `/book/stays/${listingData._id}?numberOfGuests=${totalGuest}&nightStaying=${nightsStaying}&checkin=${startDate.toISOString()}&checkout=${endDate.toISOString()}`
    );
  };

  // Handle increment and decrement
  const handleIncrement = () => {
    if (totalGuest < 2) setGuestsNumber((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (guestsNumber > 1) setGuestsNumber((prev) => prev - 1);
  };

  return (
    <div className="w-full min-h-[315px] rounded-xl border border-[#dddddd] sticky top-32 dark:shadow-lg dark:shadow-blue-800 shadow-customShadow p-6">
      {/* Price Section */}
      <div className="flex justify-between">
        <div>
          <h3 className="text-[22px] text-start font-semibold">₹{reservationBasePrice}</h3>
          <p className="text-sm text-gray-500">Total before taxes</p>
        </div>
        <div className="text-sm flex gap-2 text-gray-500">
          <AiFillStar size={18} /> {listingData?.ratings || "New"}
        </div>
      </div>

      {/* Date Selection */}
      <div className="mt-6">
        <div
          onClick={() => setShowStartCalendar((prev) => !prev)}
          className="border p-2 rounded cursor-pointer bg-white text-black transition-colors"
        >
          <p>Check-in: {startDate.toLocaleDateString()}</p>
        </div>
        {showStartCalendar && (
          <input
            type="date"
            value={startDate.toISOString().split("T")[0]}
            onChange={(e) => setStartDate(new Date(e.target.value))}
            className="border p-2 m-2 rounded bg-gray-200 text-black"
          />
        )}
        <div
          onClick={() => setShowEndCalendar((prev) => !prev)}
          className="border p-2 rounded cursor-pointer mt-2 bg-white text-black transition-colors"
        >
          <p>Check-out: {endDate.toLocaleDateString()}</p>
        </div>
        {showEndCalendar && (
          <input
            type="date"
            value={endDate.toISOString().split("T")[0]}
            onChange={(e) => setEndDate(new Date(e.target.value))}
            className="border p-2 m-2 rounded bg-gray-200 text-black"
          />
        )}
      </div>

      {/* Guests Section */}
      <div className="mt-4 flex justify-center items-center">
        <p className="mr-4">{totalGuest} guests</p>
        <button
          onClick={handleDecrement}
          className="p-1 rounded-full bg-white text-gray-800"
        >
          <AiOutlineMinus />
        </button>
        <button
          onClick={handleIncrement}
          className="p-1 rounded-full bg-white text-gray-800 ml-2"
        >
          <AiOutlinePlus />
        </button>
      </div>

      {/* Reserve Button */}
      <button onClick={handleBooking} className="mt-4 w-full bg-[#243583] text-white p-2 rounded">
        Reserve
      </button>
    </div>
  );
};

export default ReservationCard;
