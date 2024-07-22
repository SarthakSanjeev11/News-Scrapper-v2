"use client";
import React, { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { RiMenuUnfold3Fill, RiMenuUnfold4Fill } from "react-icons/ri";
import clsx from "clsx";
import { category } from "@/Data/Category";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSidebarUrl } from "@/store/feature/SidebarSlice";
function SideBar({ filterLanguage, }) {
  const dispatch = useAppDispatch();
  const { sideBarName, sideBarTagColor } = useAppSelector(
    (store) => store.sidebar
  );
  const {whichLanguage,sideLang} = useAppSelector((store) => store.sidebar);

  const [open, setOpen] = useState(false);
  const handleSidebar = (cate) => {
    // console.log('data',cate,whichLanguage, cate[whichLanguage])
    dispatch(setSidebarUrl({ url: cate[whichLanguage], title: cate.titleEng, }));
    setOpen(!open);
  };
  return (
    <div>
      <div
        className={`lg:block fixed flex h-full w-full max-w-[15rem] flex-col bg-white bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5   ${
          open ? `translate-x-0  z-10` : `translate-x-0 md-hidden hidden`
        }`}
      >
        <div className="flex   flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
          <div className="relative block w-full">
            <Image
              src="/assets/TGN.png"
              width={208}
              height={50}
              alt="logo"
              className="object-cover mb-3 mt-14 lg:hidden"
            />
            <div className="overflow-hidden">
              <div className="block w-full py-1 font-sans text-sm antialiased font-light leading-normal text-gray-700">
                <nav className="flex  flex-col gap-1 p-0 font-sans text-base font-normal text-gray-700">
                  {category.map((cate, j) => (
                    <div
                      
                      key={j}
                      role="button"
                      className={clsx(
                        `capitalize flex items-center w-full p-3 leading-tight transition-all rounded-full outline-none text-start hover:bg-slate-200 hover:bg-opacity-80 hover:text-black focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 ${sideBarName === cate.titleEng ? "text-white" : "text-black"}`,
                        {
                          [sideBarTagColor]: sideBarName === cate.titleEng,
                        }
                      )}
                      onClick={() => handleSidebar(cate)}
                    >
                      <div className="grid mr-4 place-items-center">
                        <MdKeyboardArrowRight />
                      </div>
                      {cate[sideLang] ? cate[sideLang] : cate["titleEng"]}
                    </div>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          className={`lg:hidden top-5 left-1 duration-300 rounded-r-full z-50 fixed`}
          onClick={() => setOpen(!open)}
        >
          {!open ? (
            <RiMenuUnfold3Fill className="text-black" fontSize={30} />
          ) : (
            <RiMenuUnfold4Fill className="text-black" fontSize={30} />
          )}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
