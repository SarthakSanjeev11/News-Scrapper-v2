import React from 'react';
import { FaSquareWhatsapp } from "react-icons/fa6";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { useAppDispatch } from '@/store/hooks';
import { setModel } from '@/store/feature/SidebarSlice';

function ModelComp() {
  const dispatch = useAppDispatch()
  return (
    <div
      id="login-popup"
      tabIndex="-1"
      className="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full flex items-center justify-center"
    >
      <div className="relative p-4 w-full max-w-md">
        <div onClick = { ()=>  dispatch(setModel())} className="relative bg-white rounded-lg shadow">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="#c6c7c7"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close popup</span>
          </button>

          <div className="p-5">
            <h3 className="flex justify-center text-2xl pb-1 font-medium">Share this with your friends.</h3>
            <div className="mt-7 flex flex-col gap-2">
              <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-black focus:ring-offset-1">
              <FaSquareWhatsapp className="text-2xl text-green-500 hover:animate-bounce"/>
              Share on WhatsApp
              </button>

              <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-black focus:ring-offset-1">
              <FaInstagramSquare className="text-2xl text-pink-500 hover:animate-bounce" />
              Share on Instagram
              </button>
    
              <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-black focus:ring-offset-1">
              <FaFacebookSquare className="text-2xl text-blue-500 hover:animate-bounce" />
              Share on Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModelComp;
