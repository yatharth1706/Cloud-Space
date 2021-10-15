import React from "react";
import PersonalSpaceImg from "../images/PersonalSpace.svg";

function PersonalSpace() {
  return (
    <div className="bg-white border flex flex-col justify-center w-full px-20 py-6 mt-6">
      <img src={PersonalSpaceImg} className="h-80 w-80 mx-auto" />
      <span className="text-lg">My Personal Space</span>
    </div>
  );
}

export default PersonalSpace;
