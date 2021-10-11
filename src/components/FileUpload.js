import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { UploadIcon } from "@heroicons/react/outline";

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
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone();

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <UploadIcon className="h-8 w-8 mb-2" />
        <p>Drag 'n' drop file here, or click to select file</p>
      </div>
    </div>
  );
}

export default FileUpload;
