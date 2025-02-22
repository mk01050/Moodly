import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col flex-1 gap-4 justify-center items-center">
      <i className="fa-solid text-slate-800 fa-spinner animate-spin text-5xl sm:text-6xl md:7xl"></i>
    </div>
  );
}
