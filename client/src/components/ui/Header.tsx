import React from "react";
import IconMenu from "./Navbar";

const Header: React.FC = () => {
  return (
    <div>
      <header className="w-full bg-gray-900 text-white px-6 py-4 flex items-center justify-between fixed top-0 left-0 z-50">
        <div className="text-2xl font-bold">
          {/* Logo (left) */}
          MyLogo

          {/* Hamburger (right) */}
          <IconMenu />
        </div>
      </header>
    </div>
  );
};

export default Header;
