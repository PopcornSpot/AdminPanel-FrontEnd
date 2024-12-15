
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import logo from "../assets/logo.png";

const SidebarComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const SidebarDetail = [
    { value: "Overview", path: "/home" },
    { value: "Movies", path: "/movies" },
    { value: "Screens", path: "/screen" },
    { value: "Seats", path: "/seat" },
    { value: "Theatre", path: "/theatre" },
    { value: "Show", path: "/show" },
    { value: "Voting", path: "/voting" },
    { value: "Profile", path: "/profile" },
    { value: "Report", path: "/report" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <div className="fixed top-0 left-0 w-full md:hidden bg-gradient-to-r from-gray-900 to-gray-800 text-white flex items-center justify-between px-4 py-3 z-50">
        <img src={logo} alt="logo" className="w-32 h-12" />
        <button
          onClick={toggleSidebar}
          className="text-white text-2xl focus:outline-none md:hidden"
        >
          <FaBars />
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 z-40 w-56 h-screen bg-gradient-to-r from-gray-900 to-gray-800 shadow-xl transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static`}
      >
        <div className="flex items-center max-md:hidden justify-center h-[15%] mt-16 md:mt-0">
          <img src={logo} alt="logo" className="w-40 h-16" />
        </div>

        <ul className="mt-1 space-y-4 max-md:mt-28">
          {SidebarDetail.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center p-3 text-sm font-medium rounded-md ${
                  location.pathname === item.path
                    ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white"
                    : "hover:bg-gradient-to-r from-orange-500 to-orange-400 hover:text-white text-gray-200"
                }`}
                onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click
              >
                {item.value}
              </Link>
            </li>
          ))}
          <li
            onClick={() => {
              handleLogout();
              setIsSidebarOpen(false);
            }}
            className="flex items-center cursor-pointer p-3 text-sm font-medium transition-colors rounded-md hover:bg-gradient-to-r from-orange-500 to-orange-400 hover:text-white text-gray-200"
          >
            Logout
          </li>
        </ul>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default SidebarComponent;
