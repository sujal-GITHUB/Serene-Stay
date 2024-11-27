import { Link, useSearchParams } from "react-router-dom";
import logo_light from "../assets/logo_light.png";
import logo_dark from "../assets/logo_dark.png";
import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";
import api from "../backend";
import { toast } from "react-hot-toast";

const PaymentConfirmed = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [paymentFailed, setPaymentFailed] = useState(false);

  // getting data from searchParams
  const [searchParams] = useSearchParams();

  //   making the search params in an obj and store in a vairable
  const searchParamsObj = Object.fromEntries([...searchParams]);

  // reservation data
  // const listingId = searchParamsObj?.listingId;
  // const authorId = searchParamsObj?.authorId;
  // const guestNumber = searchParamsObj?.guestNumber;
  // const checkIn = searchParamsObj?.checkIn;
  // const checkOut = searchParamsObj?.checkOut;
  // const nightStaying = searchParamsObj?.nightStaying;
  // const orderId = searchParamsObj?.orderId;

  let reservationData = {
    listingId: searchParamsObj?.listingId,
    authorId: searchParamsObj?.authorId,
    guestNumber: searchParamsObj?.guestNumber,
    checkIn: searchParamsObj?.checkIn,
    checkOut: searchParamsObj?.checkOut,
    nightStaying: searchParamsObj?.nightStaying,
    orderId: searchParamsObj?.orderId,
  };

  useEffect(() => {
    try {
      (async () => {
        const res = await api
          .post("/reservations/booking", reservationData)
          .catch(function (error) {
            if (error.response.status === 404) {
              setPaymentFailed(true);
              setIsLoading(false);
              toast.error(error.response.data);
            }
          });
        // // console.log(res, "response");

        if (res.status === 200) {
          setIsLoading(false);
        }
      })();
    } catch (error) {
      // // console.log(error, "from error");
      setIsLoading(false);
    }
  }, []);

  // // console.log(reservationData, "reservation");

  if (isLoading) {
    return (
      <div className=" flex justify-center items-center w-full h-[60dvh]">
        <FadeLoader color="#000" />
      </div>
    );
  }
  return (
    <div className=" min-w-md mx-auto text-center min-h-screen">
      <div className="flex flex-col gap-4">
        <div className="px-8 pt-1 h-[60vh]">
          <div className=" flex flex-col gap-3 justify-center items-center max-w-[35vw] pt-6 text-[#222222] dark:text-gray-300 mx-auto">
          <img
            src={logo_light}
            alt="Serene Stay Logo"
            className="block dark:hidden mb-5"
          />
          <img
            src={logo_dark}
            alt="Serene Stay Logo"
            className="hidden dark:block mb-5"
          />
            <h4 className=" text-5xl font-semibold min-w-max">
              {paymentFailed
                ? "Your payment failed. Try again."
                : "Your payment is confirmed."}
            </h4>
            <p className=" text-center text-xl min-w-max dark:text-gray-500 mb-5">
            Explore unique stays and unforgettable experiences across the globe.  
            </p>
          </div>
          <div className=" px-5 mt-5 max-w-[180px] flex justify-center mx-auto">
            <Link
              to={"/"}
              className=" bg-[#172252] text-[#ffffff] text-center font-medium block w-full py-2 rounded-md hover:bg-[#283c92] transition-colors duration-300"
            >
              Continue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmed;
