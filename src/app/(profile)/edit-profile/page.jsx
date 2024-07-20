"use client"
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setLoggedInUser } from "@/store/feature/SidebarSlice";
import { account } from "@/appwrite/config";
import { useRouter } from "next/navigation";

function Profile() {
  const [pfp, setPfp] = useState("");
  const [pfpUrl, setPfpUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
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
  }, [dispatch]);

  const loggedInUser = useAppSelector((store) => store.sidebar.loggedInUser);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPfp(file);
    const fileUrl = URL.createObjectURL(file);
    setPfpUrl(fileUrl);
  };
  const router = useRouter()
  const [dataObject, setDataObject] = useState({
    imgSrc: "",
    dob: "",
    email: "",
    phoneNo: "",
    name: "",
    password: "",
    Currentpassword : ""
  });

  const handleData = (e) => {
    const { name, value } = e.target;
    setDataObject((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (loggedInUser) {
      setDataObject((prevData) => ({
        ...prevData,
        name: loggedInUser.name,
        email: loggedInUser.email,
      }));
    }
  }, [loggedInUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (dataObject.email !== loggedInUser.email) {
        await account.updateEmail(dataObject.email, dataObject.Currentpassword);
      }
      if (dataObject.name !== loggedInUser.name) {
        await account.updateName(dataObject.name, dataObject.Currentpassword);
      }
      if (dataObject.password) {
        await account.updatePassword(dataObject.password, dataObject.Currentpassword);
      }
      const updatedUser = await account.get();
      dispatch(setLoggedInUser(updatedUser));
      // console.log('User updated successfully:', updatedUser);
      router.push("/my-profile")
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-full lg:w-2/3">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
          Edit Profile
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center gap-10 items-center">
            <img
              src={
                pfpUrl ||
                "https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png"
              }
              className="relative h-44 w-44 rounded-full"
              alt="Profile"
            />
            <label
              htmlFor="uploadFile1"
              className="flex bg-gray-800 hover:bg-gray-700 text-white text-base px-5 py-3 outline-none rounded w-max cursor-pointer mx-auto font-[sans-serif]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 mr-2 fill-white inline"
                viewBox="0 0 32 32"
              >
                <path
                  d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                  data-original="#000000"
                />
                <path
                  d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                  data-original="#000000"
                />
              </svg>
              Upload
              <input
                type="file"
                id="uploadFile1"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={dataObject.name}
              className="mt-1 block w-60 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              onChange={handleData}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={dataObject.email}
              onChange={handleData}
              className="mt-1 block w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-700"
            >
              Date Of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              onChange={handleData}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows="3"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={handleData}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="Currentpassword"
              className="block text-sm font-medium text-gray-700"
            >
              Current Password
            </label>
            <input
              type="password"
              id="Currentpassword"
              name="Currentpassword"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={handleData}
               
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Change Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={handleData}
               
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="inline-block w-full px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-white uppercase tracking-widest hover:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 disabled:opacity-50"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
