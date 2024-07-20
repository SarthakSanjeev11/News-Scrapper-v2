"use client";
import React from "react";
// import { logOutModel, setLogOutModel, setLogIn, setLoggedInUser } from "../redux/fetchSlice";

import { account } from "../appwrite/config";
// import toast from 'react-hot-toast';
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { setLoggedInUser, setLogIn, setLogOutModel } from "@/store/feature/SidebarSlice";


function LogOutModel() {
  const dispatch = useAppDispatch();

  const toggleModel = () => {
    dispatch(setLogOutModel(false));
  };
  const router = useRouter()

  const handleLogOut = async() => {

      await account.deleteSession('current');
    //   toast.success("logout successfull")
    dispatch(setLogIn(false));
    dispatch(setLoggedInUser(null))
    toggleModel()
    router.push("/");
  };


  return (
    <div
      id="popup-modal"
      className="fixed top-0 bottom-0 right-0 left-0 z-50 backdrop-blur-lg flex justify-center items-center w-full h-full"
    >
      <div className="p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center group dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={toggleModel}
          >
            <svg
              className="w-3 h-3 group-hover:text-orange-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-4 md:p-5 text-center">
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to Log Out ?
            </h3>
            <button
              data-modal-hide="popup-modal"
              type="button"
              onClick={handleLogOut}
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
            >
              Yes, I am sure
            </button>
            <button
              data-modal-hide="popup-modal"
              type="button"
              onClick={toggleModel}
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogOutModel;
