import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import SidebarComponent from "../Components/SidebarComponent";
import { Link, useNavigate } from "react-router-dom";

const ScreensPage = () => {
  const [screens, setScreens] = useState([
    { 
      id: 1, 
      movieName: "Kanguva",
      type: "2D", 
      capacity: 150, 
      firstClassPrice: 50, 
      secondClassPrice: 100, 
      showTimings: ["11:00AM to 1:00PM", "2:00PM to 5:00PM", "6:00PM to 9:00PM", "10:00PM to 1:00AM"], 
      showLastDate: "25-01-2025" 
    },
    { 
      id: 2,
      movieName: "Sorgavaasal",
      type: "IMAX 3D", 
      capacity: 250, 
      firstClassPrice: 70, 
      secondClassPrice: 120, 
      showTimings: ["11:00AM to 1:00PM", "2:00PM to 5:00PM", "6:00PM to 9:00PM", "10:00PM to 1:00AM"], 
      showLastDate: "25-01-2025" 
    },
    { 
      id: 3, 
      movieName: "Lucky Bhasker", 
      type: "4DX", 
      capacity: 120, 
      firstClassPrice: 100, 
      secondClassPrice: 150, 
      showTimings: ["11:00AM to 1:00PM", "2:00PM to 5:00PM", "6:00PM to 9:00PM", "10:00PM to 1:00AM"], 
      showLastDate: "25-01-2025" 
    }

  ]);

    const navigate = useNavigate("/theaterlayout");

  const handleDelete = (id) => {
    setScreens((prevScreens) => prevScreens.filter((screen) => screen.id !== id));
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-56 fixed h-full">
        <SidebarComponent />
      </div>

      <div className="flex-1 ml-56 overflow-y-auto">
        <div className="p-6 bg-gray-900 min-h-screen text-gray-200">
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-4xl font-extrabold text-gray-200 tracking-wide">
              Manage Screens
            </h1>
            <Link to={"/addscreen"}>
            <button 
               
              className="flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-md transform hover:scale-105"
            >
              <FaPlus className="mr-2" /> Add Screen
            </button>
            </Link>
          </div>

          {screens.length > 0 ? (
            <div className="flex flex-wrap gap-6">
              {screens.map((screen) => (
                <div 
                  key={screen.id} 
                  className="flex flex-col bg-gray-800 p-6 rounded-lg shadow-lg w-full sm:w-[48%] lg:w-[30%] transition-transform transform hover:scale-105"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-orange-500">Screen: {screen.id}</h2>
                    <div className="flex space-x-2">
                      <button 
                        className="p-2 bg-green-500 rounded-full hover:bg-green-600 transition duration-200"
                      >
                        <FaEdit className="text-white" />
                      </button>
                      <button 
                        className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition duration-200"
                        onClick={() => handleDelete(screen.id)}
                      >
                        <FaTrash className="text-white" />
                      </button>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-400">
                    <strong>Movie:</strong> {screen.movieName}
                  </p>

                  <p className="mt-2 text-gray-400">
                    <strong>Capacity:</strong> {screen.capacity}
                  </p>

                  <p className="mt-2 text-gray-400">
                    <strong>1st Class Price:</strong> ₹{screen.firstClassPrice}
                  </p>

                  <p className="mt-2 text-gray-400">
                    <strong>2nd Class Price:</strong> ₹{screen.secondClassPrice}
                  </p>

                  <p className="mt-2 text-gray-400">
                    <strong>Show End Date:</strong> {screen.showLastDate}
                  </p>

                  <div className="mt-4">
                    <p className="text-gray-400 font-semibold">Show Timings:</p>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      {screen.showTimings.map((time, i) => (
                        <li key={i} className="text-sm text-gray-300 list-none">
                          {time}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <button 
                      className="w-full py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition duration-200"
                      onClick={() => navigate("/theaterlayout")}
                    >
                      View Screen
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              No screens available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScreensPage;
