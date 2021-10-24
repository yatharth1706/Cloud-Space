import React from "react";
import FileUpload from "./FileUpload";
import PersonalSpace from "./PersonalSpace";

function Main() {
  return (
    <div className="mt-2 px-10 md:px-20 py-6">
      <FileUpload />
      <PersonalSpace />
    </div>
  );
}

export default Main;
