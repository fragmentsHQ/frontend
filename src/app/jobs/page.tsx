"use client";
import Tabs from "@/components/tabs";
import { useRouter } from "next/navigation";
import React from "react";

const Jobs = () => {
  // Add a back here to go back to the home page

  return (
    <div className="max-w-5xl  mx-auto">
      <div className="h-[50px]" />
      <GoBackLink />
      <h3 className="text-[1.45rem] my-10 font-bold tracking-[0.5px]">
        All Jobs
      </h3>
      <Tabs />
      <div className="h-[50px]" />
    </div>
  );
};

export default Jobs;

const GoBackLink = () => {
  const router = useRouter();

  return (
    <button
      aria-label="Go back to the previous page"
      className="flex items-center gap-2 text-sm text-white cursor-pointer"
      is="link"
      onClick={() => {
        router.back();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
        />
      </svg>
      Go back
    </button>
  );
};
