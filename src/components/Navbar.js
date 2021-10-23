import React from "react";
import { Auth } from "aws-amplify";

function Navbar() {
  const handleLogout = async () => {
    await Auth.signOut();
    window.location.reload();
  };

  return (
    <div className="flex justify-between w-full h-16 items-center shadow py-2 px-4 md:px-20">
      <span className="text-xl font-semibold">Cloud Space</span>
      <button className="bg-gray-800 w-28 text-white py-1 px-2 rounded" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;
