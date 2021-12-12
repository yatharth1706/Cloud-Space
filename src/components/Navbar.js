import React from "react";
import { Auth } from "aws-amplify";

function Navbar() {
  const handleLogout = async () => {
    await Auth.signOut();
    window.location.reload();
  };

  return (
    <div className="flex px-10 md:px-20 justify-between pt-3 pb-3 sticky top-0  bg-white z-20">
      <span className="text-xl font-semibold">CloudSpace</span>
      <button
        style={{ background: "#FF9900" }}
        className="w-28 text-white py-1 px-2 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
