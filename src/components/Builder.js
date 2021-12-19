import { useState, useEffect, useRef } from "react";
import svgConfig from "./svgConfig.js";
import { exportComponentAsPNG } from "react-component-export-image";

function Builder() {
  const componentRef = useRef();
  const [currentTheme, setCurrentTheme] = useState(svgConfig[0].image);
  const [headerInfo, setHeaderInfo] = useState(
    "Placeholder for your blog title or any header title"
  );
  const [currFontSize, setCurrFontSize] = useState("36");
  const [currentColor, setCurrentColor] = useState("#FFFFFF");

  return (
    <div className="w-full h-full px-4 py-8 flex flex-col md:flex-row justify-center">
      <div className="flex flex-col w-full md:w-2/6 h-full px-6">
        <div className="flex flex-col">
          <label className="flex justify-start">Title</label>
          <input
            type="text"
            className="border border-gray-100 outline-none rounded mt-2 h-8 px-2 text-gray-700"
            value={headerInfo}
            onChange={(e) => setHeaderInfo(e.target.value)}
          />
        </div>
        <div className="flex flex-col mt-3">
          <label className="flex justify-start">Font Size</label>
          <input
            type="text"
            className="border border-gray-100 outline-none rounded mt-2 h-8 px-2 text-gray-700"
            value={currFontSize}
            onChange={(e) => setCurrFontSize(e.target.value)}
          />
        </div>
        <div className="flex flex-col mt-3">
          <label className="flex justify-start">Color</label>
          <input
            type="color"
            className="border border-gray-100 w-full outline-none rounded mt-2 h-8 p-2 text-gray-700"
            value={currentColor}
            onChange={(e) => setCurrentColor(e.target.value)}
          />
        </div>
        <div className="flex flex-col mt-3">
          <label className="flex justify-start">Theme</label>
          <select
            className="border border-gray-100 w-full outline-none rounded mt-2 h-8 p-1 text-gray-700"
            value={currentTheme}
            onChange={(e) => setCurrentTheme(e.target.value)}
          >
            {svgConfig.map((item) => (
              <option value={item.image} key={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className=" w-full md:w-4/6 h-full px-6 mt-6 md:mt-0">
        <span className="flex justify-start mb-2">
          Preview{" "}
          <i
            class="fas fa-download mt-1 ml-2 cursor-pointer"
            onClick={() => exportComponentAsPNG(componentRef)}
          ></i>
        </span>
        <div
          className="h-80 flex items-center justify-center bannerDiv"
          style={{
            background: `url(/images/${currentTheme})`,
          }}
          ref={componentRef}
        >
          <span
            style={{
              fontSize: currFontSize + "px",
              maxWidth: "90%",
              fontWeight: "600",
              color: currentColor,
            }}
          >
            {headerInfo}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Builder;
