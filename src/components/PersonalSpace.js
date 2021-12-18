import axios from "axios";
import React, { useState, useEffect } from "react";
import SpaceRepresentation from "../images/SpaceRepresentation.svg";
import URLModal from "./URLModal";
import ReactLoading from "react-loading";
import { Auth } from "aws-amplify";

function PersonalSpace() {
  const [userUploads, setUserUploads] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedURL, setSelectedURL] = useState("");
  const [isFetchingRecords, setIsFetchingRecords] = useState(false);

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
      setIsFetchingRecords(true);
      let userId = "";
      for (var key in localStorage) {
        if (key.includes("userData")) {
          userId = JSON.parse(localStorage.getItem(key)).Username;
          break;
        }
      }

      const session = await Auth.currentSession();
      const token = session.getIdToken().getJwtToken();

      let userData = await axios.get(
        "https://rvtwjaolf1.execute-api.ap-south-1.amazonaws.com/Prod/file?Action=GetUserFiles",
        {
          params: {
            Id: userId,
          },
          headers: {
            Authorization: token,
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
    } finally {
      setIsFetchingRecords(false);
    }
  };

  useEffect(() => {
    console.log(userUploads);
  }, [userUploads]);

  return (
    <div className="bg-white flex flex-col justify-center w-full h-full px-4 sm:px-6 md:px-20 py-0 mt-6">
      {isFetchingRecords && (
        <ReactLoading
          className="text-center mx-auto"
          type={"spinningBubbles"}
          color={"#FF9900"}
          height={"10%"}
          width={"10%"}
        />
      )}
      {!isFetchingRecords && userUploads && userUploads.length > 0 ? (
        <div className="flex flex-col">
          <div
            class="md:grid md:gap-8 lg:gap-8 md:grid-cols-2 lg:grid-cols-3"
            style={{ gridGap: "16px" }}
          >
            {userUploads.map((item) => (
              <img
                src={item}
                className="shadow w-full w-full h-60 rounded hover:shadow-2xl object-cover object-center"
                onClick={() => handleShow(item)}
              />
            ))}
          </div>
        </div>
      ) : (
        !isFetchingRecords && (
          <div className="space-image-container p-30 w-full h-full flex justify-center items-center">
            <img src={SpaceRepresentation} alt="Space" className="w-full h-full" />
          </div>
        )
      )}
      <URLModal url={selectedURL} show={show} handleShow={handleShow} handleClose={handleClose} />
    </div>
  );
}

export default PersonalSpace;
