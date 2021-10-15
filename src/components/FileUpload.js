import React, { useMemo, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { UploadIcon, DocumentIcon } from "@heroicons/react/outline";
import { Progress } from "theme-ui";

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
  const {
    getRootProps,
    acceptedFiles,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone();

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
    setSelectedFiles([...acceptedFiles]);
  }, [acceptedFiles]);

  return (
    <div className="container flex flex-col">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <UploadIcon className="h-8 w-8 mb-2" />
        <p>Drag 'n' drop file here, or click to select file</p>
      </div>
      {selectedFiles.length > 0 && (
        <div className="flex w-full h-auto p-4 bg-white mt-4">
          {selectedFiles.map((selFile) => (
            <div className="flex space-x-2">
              <DocumentIcon className="w-10 h-10 text-gray-400" />
              <div className="flex flex-col w-full">
                <span className="mb-2">{selFile.name}</span>
                <Progress max={1} value={1 / 2} style={{ width: "100%" }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FileUpload;
