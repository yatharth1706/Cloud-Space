import React, { useMemo, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { UploadIcon, DocumentIcon, TrashIcon } from "@heroicons/react/outline";
import { Progress } from "theme-ui";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#C6C6C6",
  borderStyle: "dashed",
  backgroundColor: "#ffffff",
  color: "#3F3F3F",
  outline: "none",
  transition: "border .24s ease-in-out",
  cursor: "pointer",
  width: "100%",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function FileUpload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [percent, setPercent] = useState(30);
  const [userId, setUserId] = useState("");
  const {
    getRootProps,
    acceptedFiles,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/*",
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  useEffect(() => {
    setPercent(30);
    setSelectedFiles([]);
    for (var key in localStorage) {
      if (key.includes("userData")) {
        setUserId(JSON.parse(localStorage.getItem(key)).Username);
      }
    }
  }, []);

  useEffect(() => {
    console.log(userId);
  }, [userId]);

  useEffect(() => {
    setSelectedFiles([...acceptedFiles]);
  }, [acceptedFiles]);

  useEffect(() => {
    if (selectedFiles.length > 0) {
      uploadSelectedFileToS3(selectedFiles[0]);
    }
  }, [selectedFiles]);

  const uploadSelectedFileToS3 = async (file) => {
    try {
      // First get the presigned url for upload
      let response = await axios.get(
        "https://rvtwjaolf1.execute-api.ap-south-1.amazonaws.com/Prod/file",
        {
          params: {
            Action: "GetUploadURL",
            File: file.name,
          },
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log(response.data);
      setPercent(60);

      // Using presinged url upload the file
      await axios.put(response.data.URL, file);
      setPercent(80);

      // Get File URL
      let url = await axios.get(
        "https://rvtwjaolf1.execute-api.ap-south-1.amazonaws.com/Prod/file?Action=GetFileURL",
        {
          params: {
            File: file.name,
          },
        }
      );

      // Lastly create a record in dyanamo for uploaded urls of user
      await axios.post(
        "https://rvtwjaolf1.execute-api.ap-south-1.amazonaws.com/Prod/file?Action=SaveURL",
        {
          Id: userId,
          URL: url.data.URL,
        }
      );
      setPercent(100);
      toast.success("File uploaded successfully");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      alert("There is some error while uploading file. Try again later");
      setPercent(100);
    }
  };

  return (
    <div className=" flex flex-col">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <UploadIcon className="h-8 w-8 mb-2" />
        <p>Drag 'n' drop file here, or click to select file</p>
      </div>
      {selectedFiles.length > 0 && (
        <div className="flex w-full h-auto p-4 bg-white mt-4">
          {selectedFiles.map((selFile) => (
            <div className="flex space-x-2 w-full">
              <DocumentIcon className="w-10 h-10 text-gray-500" />
              <div className="flex flex-col w-full">
                <span className=" text-left">{selFile.name}</span>
                <div className="flex w-full">
                  <Progress max={100} value={percent} style={{ marginTop: "10px" }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <>
        <ToastContainer />
      </>
    </div>
  );
}

export default FileUpload;
