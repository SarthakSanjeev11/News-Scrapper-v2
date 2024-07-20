"use client"
import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { account } from "../appwrite/config";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setLogIn } from "@/store/feature/SidebarSlice";
import toast, { Toaster } from "react-hot-toast";
// import toast, { Toaster } from "react-hot-toast";
const SignIn = () => {
  const dispatch = useAppDispatch();
  const handleLogin = () => {
    login(email, password);
  };

  const [email, setEmail] = useState("ss@gmail.com");
  const [password, setPassword] = useState("test@123");
  const [loginError, setLoginError] = useState(null);
  const [pass, setPass] = useState(false);
  const router = useRouter();

  async function login(email, password) {
    try {
      await account.createEmailPasswordSession(email, password);
      const data = await account.get();

      if (data.status) {
        toast.success("signin successful");
        dispatch(setLogIn(true));
        router.push("/")
        setLoggedInUser(data);
      } else {
        toast.error("signin fail");
        setLoginError("LogIn Credentials are Incorrect. Please Verify.");
      }
    } catch (error) {
      toast.error("signin fail");
      console.error("Login error:", error);
      setLoginError("An error occurred while logging in. Please try again.");
    }
  }

  return (
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <Toaster />
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
                Student Log In
              </h1>
              <p className="text-[12px] text-gray-500 pt-3">
                Welcome Back! Hey enter your details to Log In.
              </p>
            </div>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs flex flex-col gap-4">
                <input
                  className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border ${
                    loginError ? "border-red-400" : "border-gray-200"
                  } placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
                  type="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <div className="flex items-center  relative">
                  <input
                    className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border ${
                      loginError ? "border-red-400" : "border-gray-200"
                    } placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
                    type={pass ? "text" : "password"}
                    placeholder="Password"
                    value={password}
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
                  onClick={handleLogin}
                  className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <FaRegUser />
                  <div className="ml-3">Sign In</div>
                </div>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Dont have an account?{" "}
                  <Link href="/signup">
                    <span className="text-blue-900 font-semibold">Sign up</span>
                  </Link>
                </p>
                <p>{loginError && loginError}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
