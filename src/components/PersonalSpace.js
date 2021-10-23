import axios from "axios";
import React, { useState, useEffect } from "react";
import PersonalSpaceImg from "../images/PersonalSpace.svg";

function PersonalSpace() {
  const [userUploads, setUserUploads] = useState([]);

  useEffect(() => {
    getUploads();
  }, []);

  const getUploads = async () => {
    try {
      let userId = "";
      for (var key in localStorage) {
        if (key.includes("userData")) {
          userId = JSON.parse(localStorage.getItem(key)).Username;
          break;
        }
      }
      let data = await axios.get(
        "https://rvtwjaolf1.execute-api.ap-south-1.amazonaws.com/Prod/file?Action=GetUserFiles",
        {
          params: {
            Id: userId,
          },
        }
      );
    } catch (err) {
      alert("There is some issue while fetching user uploads");
    }
  };

  return (
    <div className="bg-white border flex flex-col justify-center w-full px-20 py-6 mt-6">
      <img src={PersonalSpaceImg} className="h-80 w-80 mx-auto" />
      <span className="text-lg">My Personal Space</span>
    </div>
  );
}

export default PersonalSpace;
