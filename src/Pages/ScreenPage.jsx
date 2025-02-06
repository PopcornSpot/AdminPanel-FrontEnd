import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import SidebarComponent from "../Components/SidebarComponent";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ScreensPage = () => {
  const [screens, setScreens] = useState([]);
  const navigate = useNavigate();
  const authToken = localStorage.getItem("token");

  const fetchScreen = async () => {
    try {
      await axios
        .get("http://localhost:7000/screen/getallscreen", {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        .then((res) => {
          toast.error(res.data.Error);
          setScreens(res.data.allScreens);
        })
        .catch((err) => {
          toast.error(err.response.data.Error);
        });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const handleDelete = async (_id) => {
    try {
      await axios
        .delete(`http://localhost:7000/screen/delete/?_id=${_id}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        .then(async (res) => {
          toast.success(res.data.Message);
          toast.error(res.data.Error);
          await fetchScreen();
        })
        .catch((err) => {
          toast.error(err.response.data.Message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchScreen();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-56 fixed h-full">
        <SidebarComponent />
      </div>

      <div className="flex-1 ml-56 max-md:ml-0 max-md:mt-16 overflow-y-auto">
        <div className="p-6 bg-gray-900 min-h-screen text-gray-200">
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-3xl font-extrabold text-gray-200 tracking-wide">
              Manage Screens
            </h1>
            <Link to={"/addscreen"}>
              <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-lg shadow-lg text-sm sm:text-base md:text-lg font-medium flex items-center gap-2 hover:scale-105 transform transition duration-300">
                <FaPlus className="text-sm sm:text-base md:text-lg" /> Add
                Screen
              </button>
            </Link>
          </div>

          {screens.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-gray-600 text-gray-200">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="border border-gray-600 px-4 py-2">
                      Screen No
                    </th>
                    <th className="border border-gray-600 px-4 py-2">
                      Total Capacity
                    </th>
                    <th className="border border-gray-600 px-4 py-2">
                      1st Class Seats
                    </th>
                    <th className="border border-gray-600 px-4 py-2">
                      2nd Class Seats
                    </th>
                    <th className="border border-gray-600 px-4 py-2">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {screens.map((screen) => (
                    <tr
                      key={screen._id}
                      className="hover:bg-gray-800 transition duration-200"
                    >
                      <td className="border border-gray-600 px-4 py-2">
                        {screen.screenNo}
                      </td>
                      <td className="border border-gray-600 px-4 py-2">
                        {screen.totalSeats}
                      </td>
                      <td className="border border-gray-600 px-4 py-2">
                        {screen.firstClassSeats}
                      </td>
                      <td className="border border-gray-600 px-4 py-2">
                        {screen.secondClassSeats}
                      </td>
                      <td className="border border-gray-600 px-4 py-2">
                        <div className="flex justify-center items-center gap-5">
                          <Link to={`/editscreen/${screen._id}`}>
                            <button className="p-3 bg-green-600 rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg transform transition-transform duration-300">
                              <FaEdit className="inline-block mr-2" />
                              Edit
                            </button>
                          </Link>
                          <button
                            className="p-3 bg-red-600 rounded-lg shadow-md hover:bg-red-700 hover:shadow-lg transform transition-transform duration-300"
                            onClick={() => handleDelete(screen._id)}
                          >
                            <FaTrash className="inline-block mr-2" />
                            Delete
                          </button>
                          <button
                            className="px-5 py-3 bg-orange-500 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg transform transition-transform duration-300"
                            onClick={() => navigate("/theaterlayout")}
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
