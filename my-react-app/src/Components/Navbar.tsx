import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaTachometerAlt,
  FaUser,
  FaListAlt,
  FaCarAlt,
  FaSignInAlt,
} from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const linkTextColor = "text-gray-300";
  const linkHoverBg = "hover:bg-gray-700";
  const linkHoverText = "hover:text-white";
  const iconColor = "text-red-600";
  const transitionClasses = "transition-all duration-300 ease-in-out";
  const groupHoverScale = "group-hover:scale-110";

  const baseLinkClasses = `${transitionClasses} flex items-center group relative`;

  return (
    <nav className="bg-gray-900 shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3 font-bold text-2xl text-white">
          <div className={`${iconColor} ${transitionClasses} ${groupHoverScale}`}>
            <FaCarAlt size={28} />
          </div>
          <span>EcoDrive Rentals</span>
        </div>

        {/* Mobile menu toggle button */}
        <div>
          <button
            onClick={toggleNavbar}
            // Removed the inline comment here
            className={`focus:outline-none ${linkTextColor} ${transitionClasses} ${linkHoverText} focus:ring-2 focus:ring-red-600 rounded-md p-2`}
          >
            {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-4/5 sm:w-2/5 md:w-1/4 shadow-2xl transform ${transitionClasses} overflow-y-auto z-50 bg-gray-800 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={toggleNavbar}
            // Removed the inline comment here as well
            className={`focus:outline-none ${linkTextColor} ${transitionClasses} ${linkHoverText} focus:ring-2 focus:ring-red-600 rounded-md p-2`}
          >
            <FaTimes size={28} />
          </button>
        </div>
        <div className="flex flex-col p-4 space-y-4">
          <Link
            to="/"
            onClick={toggleNavbar}
            className={`${baseLinkClasses} space-x-3 py-3 px-4 rounded-lg ${linkTextColor} ${linkHoverBg} ${linkHoverText}`}
          >
            <div className={`${iconColor} ${groupHoverScale} ${transitionClasses}`}>
              <FaHome />
            </div>
            <span className="font-medium text-lg">Home</span>
          </Link>
          <Link
            to="/about"
            onClick={toggleNavbar}
            className={`${baseLinkClasses} space-x-3 py-3 px-4 rounded-lg ${linkTextColor} ${linkHoverBg} ${linkHoverText}`}
          >
            <div className={`${iconColor} ${groupHoverScale} ${transitionClasses}`}>
              <FaInfoCircle />
            </div>
            <span className="font-medium text-lg">About</span>
          </Link>
          <Link
            to="/contactUs"
            onClick={toggleNavbar}
            className={`${baseLinkClasses} space-x-3 py-3 px-4 rounded-lg ${linkTextColor} ${linkHoverBg} ${linkHoverText}`}
          >
            <div className={`${iconColor} ${groupHoverScale} ${transitionClasses}`}>
              <FaEnvelope />
            </div>
            <span className="font-medium text-lg">Contact Us</span>
          </Link>
          <Link
            to="/dashboard"
            onClick={toggleNavbar}
            className={`${baseLinkClasses} space-x-3 py-3 px-4 rounded-lg ${linkTextColor} ${linkHoverBg} ${linkHoverText}`}
          >
            <div className={`${iconColor} ${groupHoverScale} ${transitionClasses}`}>
              <FaTachometerAlt />
            </div>
            <span className="font-medium text-lg">Dashboard</span>
          </Link>
          <Link
            to="/profile"
            onClick={toggleNavbar}
            className={`${baseLinkClasses} space-x-3 py-3 px-4 rounded-lg ${linkTextColor} ${linkHoverBg} ${linkHoverText}`}
          >
            <div className={`${iconColor} ${groupHoverScale} ${transitionClasses}`}>
              <FaUser />
            </div>
            <span className="font-medium text-lg">Profile</span>
          </Link>
          <Link
            to="/categories"
            onClick={toggleNavbar}
            className={`${baseLinkClasses} space-x-3 py-3 px-4 rounded-lg ${linkTextColor} ${linkHoverBg} ${linkHoverText}`}
          >
            <div className={`${iconColor} ${groupHoverScale} ${transitionClasses}`}>
              <FaListAlt />
            </div>
            <span className="font-medium text-lg">Categories</span>
          </Link>
             <Link
            to="/register"
            onClick={toggleNavbar}
            className={`${baseLinkClasses} space-x-3 py-3 px-4 rounded-lg ${linkTextColor} ${linkHoverBg} ${linkHoverText}`}
          >
            <div className={`${iconColor} ${groupHoverScale} ${transitionClasses}`}>
              <FaSignInAlt  />
            </div>
            <span className="font-medium text-lg">Register</span>
          </Link>
        </div>
      </div>

      {/* Overlay when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-black/30 z-40"
          onClick={toggleNavbar}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;