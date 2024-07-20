"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaLanguage, FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { languages } from "@/Data/language";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setLoggedInUser, setLogOutModel, setNavbar } from "@/store/feature/SidebarSlice";
import LogOutModel from "./LogOutModel";
import { account } from "@/appwrite/config";

const Navbar = () => {
  const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const dropdownTimer = useRef(null);
  const languageDropdownTimer = useRef(null);
  const {sideBarTagColor,whichLanguage, loggedInUser, logOutModel} = useAppSelector((store) => store.sidebar);
  const [loading, setLoading] = useState(true);


  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useAppDispatch();


  // console.log("sideColor", sideColor);
  const handleMouseEnter = (setter, ref) => {
    clearTimeout(ref.current);
    setter(true);
  };
  const handleMouseLeave = (setter, ref) => {
    ref.current = setTimeout(() => {
      setter(false);
    }, 300);
  };

  const toggleModal = () => {
    dispatch(setLogOutModel(true));
  };

  const [hoverLogIn, setHoverLogIn] = useState("hover:text-red-400");

  useEffect(() => {
    return () => {
      clearTimeout(dropdownTimer.current);
      clearTimeout(languageDropdownTimer.current);
    };
  }, []);

  const dropdownRef = useRef(null);

  const handleProfileDropDown = () => {
    setIsHovered(!isHovered);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsHovered(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const [hovered, setHovered] = useState(null);

  const MouseEnter = (id) => {
    setHovered(id);
  };

  const MouseLeave = () => {
    setHovered(null);
  };

  useEffect(() => {
    // Check if user is logged in on component mount
    account.get()
        .then(currentUser => {
            dispatch(setLoggedInUser(currentUser));
        })
        .catch(error => {
            console.error('Error fetching user:', error);
        })
        .finally(() => {
            setLoading(false);
        });
}, []);
// console.log("loggedInUser", loggedInUser)


  return (
    <>
      <div className="fixed w-full bg-gray-100 shadow-md z-50">
        <div className="w-[90%]  mx-auto  pl-6 lg:px-8">
          <div className="flex justify-between items-center py-1">
            <div className="lg:block hidden" onClick={() => router.push("/")}>
              <Image
                src="/assets/TGN.png"
                width={208}
                height={50}
                alt="logo"
                className="object-cover cursor-pointer"
              />
            </div>
            <div className="flex gap-2 items-center justify-between lg:w-fit w-full">
              <div
                className="relative"
                onMouseEnter={() =>
                  handleMouseEnter(
                    setLanguageDropdownOpen,
                    languageDropdownTimer
                  )
                }
                onMouseLeave={() =>
                  handleMouseLeave(
                    setLanguageDropdownOpen,
                    languageDropdownTimer
                  )
                }
              >
                <FaLanguage
                  size={40}
                  className={`cursor-pointer hover:text-slate-700 text-${sideBarTagColor.split("-")[1]}-${sideBarTagColor.split("-")[2]}`}

                  />
                <div
                  className={`absolute -right-16 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-transform transform ${
                    isLanguageDropdownOpen
                      ? "opacity-100 scale-100 pointer-events-auto"
                      : "opacity-0 scale-95 pointer-events-none"
                  } duration-200 ease-out md:m-4 md:w-80 m-2`}
                >
                  <div className="m-2">
                    <p className="text-center">Select Preferred Language</p>
                    <div className="grid grid-cols-2">
                      {languages.map((language, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            router.push("/");
                            setHoverLogIn(language.profile);
                            dispatch(setNavbar({colorName:language.color2,languageTitle:language.sideBar,url:language.url,whichLanguage:language.FilterLanguage}));
                          }}
                          onMouseEnter={() => MouseEnter(index)}
                          onMouseLeave={MouseLeave}
                          style={{
                            borderColor: language.color,
                            backgroundColor:
                              hovered === index ? language.color : language.FilterLanguage === whichLanguage ? language.color: "#fff",
                          }}
                          className="px-4 py-2 text-gray-700 grid grid-cols-2  items-center justify-start gap-5 rounded-full border md:text-lg text-sm m-2 group"
                        >
                          <p
                            style={{
                              borderColor: language.color,
                              backgroundColor:
                                hovered === index ? "#fff" : language.color,
                              color:
                                hovered === index ? language.color : "#fff",
                            }}
                            className="rounded-full w-8 h-8 flex justify-center items-center  "
                          >
                            {language.Title}
                          </p>
                          <p className="group-hover:text-white text-sm">
                            {language.Lang}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {loggedInUser && loggedInUser.status ? (
                  <div ref={dropdownRef} className="relative">
                    <Link
                      href="#"
                      className={`flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center uppercase align-middle transition-all select-none ${hoverLogIn}`}
                      onClick={handleProfileDropDown}
                    >
                      <FaUserCircle className="relative w-8 h-8" />
                    </Link>
                    {isHovered && (
                      <div className="absolute w-40 bg-white rounded-lg shadow-lg ring-1 ring-gray-300 divide-y divide-gray-200">
                        <Link
                          href="/my-profile"
                          className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                        >
                          View Profile
                        </Link>

                        <div
                          className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer"
                          onClick={toggleModal}
                        >
                          Logout
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href="/signIn"
                    className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20"
                  >
                    Log In
                    <FaRegUserCircle className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {logOutModel && <LogOutModel />}
    </>
  );
};

export default Navbar;
