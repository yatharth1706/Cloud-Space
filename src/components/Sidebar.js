import { CloudIcon } from "@heroicons/react/solid";
import { CloudUploadIcon, PencilAltIcon } from "@heroicons/react/outline";

function Sidebar() {
  return (
    <div className="flex flex-col">
      <div
        style={{ background: "#FF9900" }}
        className="rounded h-14 w-14 flex justify-center items-center"
      >
        <CloudIcon className="h-8 w-8 text-white" />
      </div>
      <span>
        My <br />
        Spaces
      </span>
      <div className="bg-white rounded h-14 w-14 flex justify-center items-center mt-4">
        <CloudUploadIcon className="h-8 w-8 text-gray-900" />
      </div>
      <span>Upload</span>
      <div className="bg-white rounded h-14 w-14 flex justify-center items-center mt-4">
        <PencilAltIcon className="h-8 w-8 text-gray-900 stroke-1" />
      </div>
      <span>Builder</span>
    </div>
  );
}

export default Sidebar;
