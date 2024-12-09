import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import SidebarComponent from "../Components/SidebarComponent";

const ScreensPage = () => {
  const [screens, setScreens] = useState([
    { id: 1, name: "Screen 1", type: "2D", capacity: 150, availableSeats: 50, soldSeats: 100 },
    { id: 2, name: "Screen 2", type: "IMAX 3D", capacity: 250, availableSeats: 150, soldSeats: 100 },
    { id: 3, name: "Screen 3", type: "4DX", capacity: 120, availableSeats: 20, soldSeats: 100 }
  ]);

  const handleDelete = (id) => {
    setScreens((prevScreens) => prevScreens.filter((screen) => screen.id !== id));
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-56 fixed h-full">
        <SidebarComponent/>
      </div>

      <div className="flex-1 ml-56 overflow-y-auto">
    <div className="p-6 bg-gray-900 min-h-screen text-gray-200">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-extrabold text-gray-200">Manage Screens</h1>
        <button className="flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-200">
          <FaPlus className="mr-2" /> Add Screen
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg overflow-x-auto">
        <table className="w-full text-left table-auto border-collapse">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-300">#</th>
              <th className="p-4 text-sm font-semibold text-gray-300">Screen Name</th>
              <th className="p-4 text-sm font-semibold text-gray-300">Type</th>
              <th className="p-4 text-sm font-semibold text-gray-300">Capacity</th>
              <th className="p-4 text-sm font-semibold text-gray-300">Available Seats</th>
              <th className="p-4 text-sm font-semibold text-gray-300">Sold Seats</th>
              <th className="p-4 text-sm font-semibold text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {screens.length > 0 ? (
              screens.map((screen, index) => (
                <tr
                  key={screen.id}
                  className="hover:bg-gray-700 transition-colors duration-200"
                >
                  <td className="p-4 border-b border-gray-600">{index + 1}</td>
                  <td className="p-4 border-b border-gray-600">{screen.name}</td>
                  <td className="p-4 border-b border-gray-600">{screen.type}</td>
                  <td className="p-4 border-b border-gray-600">{screen.capacity}</td>
                  <td className="p-4 border-b border-gray-600">{screen.availableSeats}</td>
                  <td className="p-4 border-b border-gray-600">{screen.soldSeats}</td>
                  <td className="p-4 border-b border-gray-600 flex space-x-3">
                    <button className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 flex items-center transition duration-200">
                      <FaEdit className="mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(screen.id)}
                      className="px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 flex items-center transition duration-200"
                    >
                      <FaTrash className="mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500 border-b border-gray-600">
                  No screens available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </div>
  );
};

export default ScreensPage;
