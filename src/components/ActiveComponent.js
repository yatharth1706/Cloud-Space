import SpaceRepresentation from "../images/SpaceRepresentation.svg";
import { useRecoilValue } from "recoil";
import sidebarItemAtom from "../atoms/sidebarAtom";
import PersonalSpace from "./PersonalSpace";
import FileUpload from "./FileUpload";
import Builder from "./Builder";

function ActiveComponent() {
  const activeSidebarItem = useRecoilValue(sidebarItemAtom);

  console.log(activeSidebarItem);

  return (
    <div
      className="w-full bg-white shadow-sm md:ml-10 rounded"
      style={{ minHeight: "80vh", maxHeight: "auto" }}
    >
      {activeSidebarItem === "mySpaces" && <PersonalSpace />}
      {activeSidebarItem === "upload" && <FileUpload />}
      {activeSidebarItem === "builder" && <Builder />}
    </div>
  );
}

export default ActiveComponent;
