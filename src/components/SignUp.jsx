"use client"
import React, { useState } from "react";
import { account, ID  } from "../appwrite/config";
import { FaEye, FaEyeSlash  } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { setLoggedInUser, setLogIn } from "@/store/feature/SidebarSlice";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const logIn = useAppSelector((store) => store.sidebar.logIn);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [pass, setPass] = useState(false);
  const router = useRouter()

  const handleSignUp = async () => {
    await account.create(ID.unique(), email, password, name, phone);
    login(email, password);
  };

  async function login(email, password) {
    try {
      await account.createEmailPasswordSession(email, password);
      const data = await account.get();

      if (data.status) {
        dispatch(setLogIn(true));
        router.push("/");
        dispatch(setLoggedInUser(data));
      } else {
        setLoginError("Please fill all the credentials correctly.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("An error occurred while signUp in. Please try again.");
    }
  }
  return (
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-blue-900 text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className=" flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                Student Sign up
              </h1>
              <p className="text-[12px] text-gray-500">
                Hey enter your details to create your account
              </p>
            </div>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs flex flex-col gap-4">
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Enter your name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="tel"
                  placeholder="Enter your phone"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
                <div className="flex items-center  relative">
                  <input
                    className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border ${
                      loginError ? "border-red-400" : "border-gray-200"
                    } placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
                    type={pass ? "text" : "password"}
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  {pass ? (
                    <FaEyeSlash
                      onClick={() => setPass(!pass)}
                      className="absolute right-2"
                    />
                  ) : (
                    <FaEye
                      onClick={() => setPass(!pass)}
                      className="absolute right-2"
                    />
                  )}
                </div>
                <div
                  onClick={handleSignUp}
                  className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    strokeLinecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Sign Up</span>
                </div>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Already have an account?{" "}
                  <Link href="/signIn">
                    <span className="text-blue-900 font-semibold">Log in</span>
                  </Link>
                </p>
                <p>
        {loginError && loginError }
      </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
