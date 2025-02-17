import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthenticationPopUp from "../popUp/authentication/AuthenticationPopUp";
import MiniNavbar from "./DashboardMenu";
import { getUser, userLogOut } from "../../redux/actions/userActions";
import hamburgerMenu from "../../assets/basicIcon/hamburgerMenu.svg";
import logo from "../../assets/logo_dark.png";
import userProfile from "../../assets/basicIcon/user-profile.png";
import house from "../../assets/basicIcon/house.png";
import toast from "react-hot-toast";
import toggle from './ToggleTheme/ToggleTheme'
import ToggleTheme from "./ToggleTheme/ToggleTheme";

const Navbar = () => {
  const user = useSelector((state) => state.user.userDetails);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const userMenuRef = useRef(null);
  const location = useLocation();
  const pathName = location.pathname;
  const inUserProfile = pathName?.includes("/users/show/");
  const inUserDashboard = pathName?.includes("/users/dashboard/");
  const inHostHomesLandingPage = pathName?.includes("/host/homes");
  const inListingDetailsPage = pathName?.includes("/listing");
  const inBookingPage = pathName?.includes("/book/stays");
  const isSmallDevice = window.innerWidth < 768;

  const [popup, setPopup] = useState(false);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userLogOut());
  };

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mouseup", handleOutsideClick);
    return () => {
      document.removeEventListener("mouseup", handleOutsideClick);
    };
  }, []);

  const isUserExist = () => {
    if (!user) {
      toast.error("You need to log in first!");

      setTimeout(() => {
        navigate("/");
      }, 500);
    } else {
      navigate("/become-a-host");
    }
  };

  return (
    <nav
      className={`border-b-[1.4px] rounded-br-3xl rounded-bl-3xl mx-5 border-[#f1f1f1] sticky top-0 z-[99] bg-lightDarkBlue ${
        inBookingPage && "hidden md:block"
      }`}
    >
      <div
        className={`xl:px-10 py-4 xl:mx-auto items-center px-5 relative ${
          inUserProfile ||
          inUserDashboard ||
          inHostHomesLandingPage ||
          inListingDetailsPage
            ? " max-w-screen-xl"
            : " max-w-screen-2xl"
        }
        ${
          inUserDashboard || inHostHomesLandingPage
            ? "flex flex-row justify-between"
            : "grid grid-cols-2 lg:grid-cols-3 gap-2"
        }
        ${inHostHomesLandingPage ? " xl:px-20" : ""}
        `}
      >
        {/* logo */}
        <div className=" md:w-[160px]">
          <span className="flex flex-row gap-2 items-center max-w-[120px]">
            <img
              src={logo}
              alt="Logo"
              className=" w-[70px] cursor-pointer"
              onClick={() => {
                // setting cat to house for listing data fetching
                JSON.stringify(localStorage.setItem("category", "House"));
                // manually navigating bcz of avoiding asyncrounous nature and on click show default listing data
                navigate("/");
              }}
            />
            {/* if user is in hosting homes page we want only logo */}
            {inHostHomesLandingPage || isSmallDevice ? null : (
              <p className="text-l text-[#ffffff] font-medium">Serene Stay</p>
            )}
          </span>
        </div>

        {/* if not in the booking page then show the options 👇 */}
        {inBookingPage ? (
          <div> </div>
        ) : (
          <>
            {/* searchbar */}
            {inUserProfile || inUserDashboard || inHostHomesLandingPage ? (
              // if user is in dahsboard
              <div>{inUserDashboard && <MiniNavbar />} </div>
            ) : (
              <div className="mx-auto lg:block hidden"></div>
            )}
          </>
        )}

        {/* if in the booking page don't show any option 👇  */}
        {inBookingPage ? (
          <div> </div>
        ) : (
          <>
            {/* if user is in the hosting house landing page we want to show different button */}
            {inHostHomesLandingPage ? (
              <div className=" flex flex-row items-center justify-between gap-4">
                {/* Toggle for dark mode */}
                <ToggleTheme/>
                <div
                  onClick={() => {
                    isUserExist();
                  }}
                  className=" flex cursor-pointer flex-row justify-between items-center gap-2 bg-white hover:bg-lightLightBlue transition-all duration-300 px-3 py-2 rounded-lg"
                >
                  <img src={house} alt="House setup" className=" w-4 md:w-5" />
                  <p className=" font-semibold text-sm md:text-base text-black">
                    Set up your Hotel
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* user bar */}
                <div className="flex justify-end items-center">
                  <div className="flex justify-end items-center gap-2">
                    <ToggleTheme/>
                  {!inUserDashboard && (
                    <Link
                      to="/host/homes"
                      className=" bg-[#ffffff] hover:bg-[#f0f0f0] transition-all rounded-xl p-3 px-5 cursor-pointer mr-3 md:block hidden"
                    >
                      <p className="text-sm font-medium text-[#222222]">
                        Host your Hotel
                      </p>
                    </Link>
                  )}

                  <div
                    className="border-[1px] border-[#dddddd] rounded-full py-1 px-2 flex flex-row gap-3 hover:shadow-md transition-all cursor-pointer relative"
                    onClick={() => {
                      setShowUserMenu((prevValue) => !prevValue);
                    }}
                  >
                    <img
                      src={hamburgerMenu}
                      alt="Motel user menu"
                      className="w-4"
                    />
                    {user ? (
                      <p className=" bg-[#222222] text-[#efefef] px-3 py-2 rounded-full text-xs">
                        {user.name?.firstName?.slice(0, 1)}
                      </p>
                    ) : (
                      <img
                        src={userProfile}
                        alt="user profile icon"
                        className="w-8"
                      />
                    )}
                  </div>

                  {/* menu items code  */}

                  {showUserMenu ? (
                    <>
                      {!user ? (
                        <div
                          ref={userMenuRef}
                          className="shadow-md absolute right-9 top-[74px] bg-[#ffffff] border-[1px] border-[#dddddd] rounded-lg flex flex-col py-2 w-[230px] transition-all user__menu"
                        >
                          <Link
                            className="font-medium"
                            onClick={() => {
                              setShowUserMenu(false);
                              setPopup(true);
                            }}
                          >
                            Sign up
                          </Link>
                          <Link
                            onClick={() => {
                              setShowUserMenu(false);
                              setPopup(true);
                            }}
                          >
                            Login
                          </Link>
                          <hr className="h-[1.5px] bg-[#dddddd] my-1" />
                          <Link to={"/host/homes"}>Host your Hotel</Link>
                          <Link>Help</Link>
                        </div>
                      ) : (
                        // logged in user menu
                        <div
                          ref={userMenuRef}
                          className="shadow-md absolute right-9 top-[70px] bg-[#ffffff] border-[1px] border-[#dddddd] rounded-lg flex flex-col py-2 w-[230px] transition-all user__menu"
                          onClick={() => {
                            setShowUserMenu((prev) => !prev);
                          }}
                        >
                          {user?.role === "host" || user?.role === "admin" ? (
                            <>
                              {!inUserDashboard ? (
                                <Link
                                  to={`/users/dashboard/${user._id}/overview=true`}
                                  onClick={() => {
                                    JSON.stringify(
                                      sessionStorage.setItem("activePage", 1)
                                    );
                                  }}
                                  className="font-medium"
                                >
                                  Dashboard
                                </Link>
                              ) : (
                                <Link className="font-medium" to={"/"}>
                                  Home
                                </Link>
                              )}
                            </>
                          ) : (
                            <Link className="font-medium">Notifications</Link>
                          )}
                          <Link className="font-medium">Trips</Link>
                          <Link className="font-medium">Wishlists</Link>
                          <hr className="h-[1.5px] bg-[#dddddd] my-1" />
                          <Link to={"/host/homes"}>Host your hotel</Link>
                          <Link to={`/users/show/${user._id}`}>Account</Link>
                          <hr className="h-[1.5px] bg-[#dddddd] my-1" />
                          <Link>Help</Link>
                          <Link
                            onClick={() => {
                              handleLogout();
                            }}
                          >
                            Log out
                          </Link>
                        </div>
                      )}
                    </>
                  ) : null}
                  </div>
                </div>
              </>
            )}

            
          </>
        )}
      </div>
      <AuthenticationPopUp popup={popup} setPopup={setPopup} />
    </nav>
  );
};

export default Navbar;
