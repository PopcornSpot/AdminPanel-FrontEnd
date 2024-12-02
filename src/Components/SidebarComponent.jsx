import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt } from "react-icons/fa";
import { RiMovie2Fill } from "react-icons/ri";
import { PiScreencastFill } from "react-icons/pi";
import { MdEventSeat } from "react-icons/md";
import { FaVoteYea } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdReportProblem } from "react-icons/md";

const SidebarComponent = () => {
  const location = useLocation();

  const SidebarDetail = [
    { value: "Overview", icon: <FaTachometerAlt />, path: "/" },
    { value: "Movies", icon: <RiMovie2Fill />, path: "/movies" },
    { value: "Screens", icon: <PiScreencastFill />, path: "/screen" },
    { value: "Seats", icon: <MdEventSeat />, path: "/seat" },
    { value: "Voting", icon: <FaVoteYea />, path: "/voting" },
    { value: "Profile", icon: <CgProfile />, path: "/profile" },
    { value: "Report", icon: <MdReportProblem />, path: "/report" },
  ];

  return (
    <div className="w-64 h-screen bg-white text-white">
      {/* Branding */}
      <div className="p-4 text-2xl font-bold flex items-center space-x-2 h-[10%]">
        <span className="bg-white text-black p-2 rounded">PopcornSpot</span>
      </div>

      {/* Sidebar Menu */}
      <ul className="mt-4 space-y-2">
        {SidebarDetail.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className={`flex items-center p-3 text-sm font-medium transition-colors rounded-md ${
                location.pathname === item.path
                  ? "bg-yellow-400 text-black"
                  : "hover:bg-black hover:text-yellow-400 text-black"
              }`}
              style={{
                transition: "transform 0.2s ease, background-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (location.pathname !== item.path) {
                  e.target.style.transform = "scale(1.05)";
                }
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== item.path) {
                  e.target.style.transform = "scale(1)";
                }
              }}
            >
              <span
                className={`mr-3 text-lg ${
                  location.pathname === item.path
                    ? "text-black"
                    : "hover:text-yellow-400"
                }`}
              >
                {item.icon}
              </span>
              {item.value}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarComponent;
