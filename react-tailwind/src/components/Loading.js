import React, { useEffect, useRef } from "react";

export default function Loading({ isLoading }) {
  const data = useRef(null);
  const time = 0.15;
  const scale = 0.95;

  useEffect(() => {
    if (isLoading) {
      data.current.style.removeProperty("display");
      setTimeout(function () {
        data.current.style.opacity = "1";
        data.current.style.transform = "scale(1)";
      }, 0);
    } else {
      data.current.style.opacity = "0";
      data.current.style.transform = "scale(" + scale + ")";

      // data.current.style.transform= "scale(0.8)";
      setTimeout(function () {
        data.current.style.display = "none";
      }, time * 1000);
    }
  }, [isLoading]);

  return (
    <div
      ref={data}
      style={{
        display: "none",
        opacity: "0",
        transform: "scale(" + scale + ")",
        transformOrigin: "center center",
        transitionProperty: "opacity,transform",
        transitionDuration: time + "s",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      className={"flex absolute inset-0 blur items-center justify-center"}
    >
      <div className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-yellow-500 ">
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span>Processing</span>
      </div>
    </div>
  );
}
