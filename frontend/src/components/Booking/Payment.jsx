/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDateFormatting } from "../../hooks/useDateFormatting";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { PulseLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Payment = ({ searchParamsObj }) => {
  const user = useSelector((state) => state.user.userDetails);
  const newReservationData = useSelector(
    (state) => state.reservations?.newReservationsData
  );
  const listingData = useSelector(
    (state) => state.house.listingDetails.listing
  );
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");
  //   geting the checkin and checkout dates
  const dateObj = {
    checkin: searchParamsObj?.checkin,
    checkout: searchParamsObj?.checkout,
  };

  //   dates
  const formattedDates = useDateFormatting(dateObj);
  //   reservation data
  const guestNumber = newReservationData
    ? newReservationData.guestNumber
    : searchParamsObj?.numberOfGuests;
  const checkin = newReservationData
    ? newReservationData?.checkIn
    : searchParamsObj.checkin;
  const checkout = newReservationData
    ? newReservationData?.checkOut
    : searchParamsObj?.checkout;
  const nightStaying = newReservationData
    ? newReservationData?.nightStaying
    : searchParamsObj?.nightStaying;
  const orderId = Math.round(Math.random() * 10000000000);

  // reservation form handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You need to log in first!");

      setTimeout(() => {
        navigate("/");
      }, 500);
    } else {
      if (!stripe || !elements) {
        return;
      }

      setIsProcessing(true);

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-confirmed?guestNumber=${guestNumber}&checkIn=${checkin}&checkOut=${checkout}&listingId=${listingData?._id}&authorId=${listingData?.author}&nightStaying=${nightStaying}&orderId=${orderId}`,
        },
      });

      if (error) {
        setMessage(error.message);
        toast.error("Payment failed. Try again!");
      }

      setIsProcessing(false);
    }
  };
  return (
    <div>
      {/* trips section */}
      <div className=" flex flex-col gap-6">
        <h5 className="text-xl md:text-[22px] text-[#222222] dark:text-gray-300 font-medium">
          Your trip
        </h5>
        {/* dates */}
        <div className=" flex flex-row justify-between">
          <span className="text-sm md:text-base text-[#222222] dark:text-gray-300">
            <p className="font-medium">Dates</p>
            <p>{formattedDates}</p>
          </span>
          {/* guests */}
          <span className="text-sm md:text-base text-[#222222] dark:text-gray-300">
            <p className="font-medium">Guests</p>
            <p>
              {guestNumber} {guestNumber === "1" ? "guest" : "guests"}
            </p>
          </span>
        </div>
        <hr className="w-full h-[1.3px] bg-[#dddddd] my-4" />
        {/* payment element */}
        <form onSubmit={handleSubmit}>
          <h5 className="text-xl md:text-[22px] text-[#222222] dark:text-gray-300 font-medium pb-4">
            Pay with
          </h5>
          <PaymentElement />
          <hr className="w-full h-[1.3px] bg-[#dddddd] my-10" />
          
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full md:max-w-[180px] mt-7 px-5 py-3 rounded-md bg-[#172252] hover:bg-[#2c43aa] transition duration-200 ease-in text-white font-medium cursor-pointer disabled:cursor-not-allowed disabled:opacity-30 disabled:bg-gray-400 min-w-[180px]"
          >
            {isProcessing ? (
              <>
                <PulseLoader size={8} color="#000000" speedMultiplier={0.5} />
              </>
            ) : (
              "Confirm and pay"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
