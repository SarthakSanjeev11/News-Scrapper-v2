"use client";
import React from "react";
import { TbShare3 } from "react-icons/tb";
import { getImageUrl } from "@/utils/shuffelArray";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useSearchParams } from "next/navigation";
import { setModel } from "@/store/feature/SidebarSlice";
import ModelComp from "./ModelComp";
const ViewMorePage = () => {
  const searchParams = useSearchParams();
  const Id = searchParams.get("id");
  const data = useAppSelector((store) => store.sidebar.feed[Id]);
  const model = useAppSelector((store) => store.sidebar.model);
  const Content = data ? data?.description : "";
  const dispatch = useAppDispatch();
  const cleanHTMLContent = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const pureData = cleanHTMLContent(Content);

  function getMainDomain(url) {
    try {
      const parsedUrl = new URL(url);
      const hostnameParts = parsedUrl.hostname.split(".");
      if (hostnameParts.length > 2) {
        return hostnameParts[hostnameParts.length - 2];
      }
      return hostnameParts[0];
    } catch (error) {
      console.error("Invalid URL", error);
      return null;
    }
  }

  const extractedContent = getMainDomain(data?.link);

  const toggleModal = () => {
    dispatch(setModel(true));
  };
  // console.log("model",model)

  return (
    <div className="flex min-h-screen flex-col items-center justify-between pt-24 lg:ml-56 mr-56 mb-10 ">
      <div className="">
          <div className="relative bg-clip-border rounded-xl p-4 bg-white text-gray-700 w-[100%] mx-auto flex-row">
            <div className="relative w-full h-full m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
              <Image
                width={200}
                height={200}
                src={getImageUrl(data)}
                alt="card-image"
                className="object-cover w-full h-full"
              />
              <h4 className="flex justify-center mt-4 mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {data?.title}
              </h4>
            </div>
            <div className="p-6">
              <h6 className="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase">
                Author: {extractedContent}
              </h6>
              <h6 className="block mb-4 font-sans antialiased text-xs leading-relaxed tracking-normal text-gray-700 uppercase">
                Date of Publish:
                {data?.pubDate}
              </h6>
              <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                {pureData}
              </p>

              <div
                className=" w-fit flex gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
                onClick={toggleModal}
              >
                Share
                <TbShare3 className="text-xl" />
              </div>
              {model && <ModelComp />}
              <Link
            href={data?.link[0]}
            target="_blank"
            data-ripple-light="true"
            type="button"
            className="w-fit flex gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
          >
            Go to Website
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              ></path>
            </svg>
          </Link>
            </div>
          </div>
        </div>
    </div>
  );
};

export default ViewMorePage;
