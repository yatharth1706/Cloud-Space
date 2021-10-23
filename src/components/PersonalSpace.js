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
      let userData = await axios.get(
        "https://rvtwjaolf1.execute-api.ap-south-1.amazonaws.com/Prod/file?Action=GetUserFiles",
        {
          params: {
            Id: userId,
          },
        }
      );

      if (userData.data.Response && userData.data.Response.Item) {
        setUserUploads(userData.data.Response.Item["URLList"]);
      } else {
        setUserUploads([]);
      }
    } catch (err) {
      alert("There is some issue while fetching user uploads");
    }
  };

  useEffect(() => {
    console.log(userUploads);
  }, [userUploads]);

  return (
    <div className="bg-white border flex flex-col justify-center w-full px-20 py-6 mt-6">
      {userUploads && userUploads.length > 0 ? (
        <div className="flex flex-col">
          <span className="text-lg text-left">My Personal Space</span>
          <div className="w-full h-auto mt-0 flex flex-wrap">
            {userUploads.map((item) => (
              <img
                src={item}
                className="rounded shadow mr-4 mt-6 w-60 h-60 object-cover object-center"
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          <img src={PersonalSpaceImg} className="h-80 w-80 mx-auto" />
          <span className="text-lg">My Personal Space</span>
        </>
      )}
    </div>
  );
}

export default PersonalSpace;
