import axios from "axios";
import React, { useState, useEffect } from "react";
import PersonalSpaceImg from "../images/PersonalSpace.svg";
import URLModal from "./URLModal";

function PersonalSpace() {
  const [userUploads, setUserUploads] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedURL, setSelectedURL] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (url = "") => {
    setShow(true);
    setSelectedURL(url);
  };

  useEffect(() => {
    getUploads();
    setSelectedURL("");
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
          <div class="my-4 space-y-2 lg:space-y-0 md:space-y-0 md:gap-2 lg:gap-2 md:grid md:grid-cols-2 lg:grid-cols-3">
            {userUploads.map((item) => (
              <img
                src={item}
                className="shadow w-full h-60 rounded hover:shadow-2xl object-cover object-center"
                onClick={() => handleShow(item)}
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
      <URLModal url={selectedURL} show={show} handleShow={handleShow} handleClose={handleClose} />
    </div>
  );
}

export default PersonalSpace;
