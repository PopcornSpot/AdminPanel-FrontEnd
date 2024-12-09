import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt } from "react-icons/fa";
import { RiMovie2Fill } from "react-icons/ri";
import { PiScreencastFill } from "react-icons/pi";
import { MdEventSeat } from "react-icons/md";
import { FaVoteYea } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdReportProblem } from "react-icons/md";
import logo from "../assets/logo.png";

const SidebarComponent = () => {
  const location = useLocation();

  const SidebarDetail = [
    { value: "Overview", icon: <FaTachometerAlt />, path: "/home" },
    { value: "Movies", icon: <RiMovie2Fill />, path: "/movies" },
    { value: "Screens", icon: <PiScreencastFill />, path: "/screen" },
    { value: "Seats", icon: <MdEventSeat />, path: "/seat" },
    { value: "Voting", icon: <FaVoteYea />, path: "/voting" },
    { value: "Profile", icon: <CgProfile />, path: "/profile" },
    { value: "Report", icon: <MdReportProblem />, path: "/report" },
  ];

  return (
    <div className="w-56 h-screen bg-gradient-to-r from-gray-900 to-gray-800 shadow-xl">

      <div className=" flex items-center justify-center h-[15%]">
        <img src={logo} alt="logo" className="w-40 h-16" />
      </div>


      <ul className="mt-1 space-y-4">
        {SidebarDetail.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className={`flex items-center p-3 text-sm font-medium rounded-md ${location.pathname === item.path
                  ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white"
                  : "hover:bg-gradient-to-r from-orange-500 to-orange-400 hover:text-white text-gray-200"
                }`}
            >
              <span
                className={`mr-3 text-xl ${location.pathname === item.path ? "text-white" : "text-gray-200"
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
