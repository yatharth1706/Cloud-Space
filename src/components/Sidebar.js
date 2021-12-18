import { CloudIcon } from "@heroicons/react/solid";
import { CloudUploadIcon, PencilAltIcon } from "@heroicons/react/outline";
import { useRecoilState } from "recoil";
import sidebarItemAtom from "../atoms/sidebarAtom";
import "./Sidebar.css";

function Sidebar() {
  const [sidebarActiveItem, setSidebarActiveItem] = useRecoilState(sidebarItemAtom);

  return (
    <div className="sidebarDiv">
      <div className="w-14 h-auto flex flex-col mb-3">
        <div
          className="rounded p-2"
          style={{ backgroundColor: sidebarActiveItem === "mySpaces" ? "#ff9900" : "white" }}
          onClick={() => setSidebarActiveItem("mySpaces")}
        >
          <CloudIcon
            className="h-6 w-6"
            style={{ color: sidebarActiveItem === "mySpaces" ? "white" : "black" }}
          />
        </div>
        <span className="mt-1">My Spaces</span>
      </div>
      <div className="w-14 h-auto flex flex-col mb-3">
        <div
          className="rounded p-2"
          style={{ backgroundColor: sidebarActiveItem === "upload" ? "#ff9900" : "white" }}
          onClick={() => setSidebarActiveItem("upload")}
        >
          <CloudUploadIcon
            className="h-6 w-6"
            style={{ color: sidebarActiveItem === "upload" ? "white" : "black" }}
          />
        </div>
        <span className="mt-1">Upload</span>
      </div>
      <div className="w-14 h-auto flex flex-col">
        <div
          className="rounded p-2"
          style={{ backgroundColor: sidebarActiveItem === "builder" ? "#ff9900" : "white" }}
          onClick={() => setSidebarActiveItem("builder")}
        >
          <PencilAltIcon
            className="h-6 w-6"
            style={{ color: sidebarActiveItem === "builder" ? "white" : "black" }}
          />
        </div>
        <span className="mt-2">Builder</span>
      </div>
    </div>
  );
}

export default Sidebar;
