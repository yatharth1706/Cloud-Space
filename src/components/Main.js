import React from "react";
import ActiveComponent from "./ActiveComponent";
import FileUpload from "./FileUpload";
import PersonalSpace from "./PersonalSpace";
import Sidebar from "./Sidebar";

function Main() {
  return (
    <div className="w-full h-full mt-2 px-10 md:px-20 py-6 flex">
      <Sidebar />
      <ActiveComponent />
      {/* <FileUpload />
      <PersonalSpace /> */}
    </div>
  );
}

export default Main;
