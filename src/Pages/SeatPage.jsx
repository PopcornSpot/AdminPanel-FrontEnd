import React, { useEffect, useState } from "react";
import SidebarComponent from "../Components/SidebarComponent";
import axios from "axios";
import { toast } from "react-toastify";

const SeatPage = () => {
  const [allScreens, setAllScreens] = useState([]);
  const authToken = localStorage.getItem("token");

  const fetchScreen = async () => {
    try {
      await axios
        .get("https://popcornspotbackend-production.up.railway.app/screen/getallscreen", {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        .then((res) => {
          toast.error(res.data.Error);
          setAllScreens(res.data.allScreens);
        })
        .catch((err) => {
          toast.error(err.response.data.Error);
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
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-gray-200 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Seat Availability</h1>
          </div>

          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-600">
              <thead>
                <tr className="bg-gray-800 text-gray-200">
                  <th className="border border-gray-600 px-4 py-2">Screen No</th>
                  <th className="border border-gray-600 px-4 py-2">Total Seats</th>
                  <th className="border border-gray-600 px-4 py-2">Available Seats</th>
                  <th className="border border-gray-600 px-4 py-2">Booked Seats</th>
                </tr>
              </thead>
              <tbody>
                {allScreens.map((screen) => (
                  <tr key={screen._id} className="text-gray-300">
                    <td className="border border-gray-600 px-4 py-2 text-center">
                      Screen {screen.screenNo}
                    </td>
                    <td className="border border-gray-600 px-4 py-2 text-center">
                      {screen.totalSeats}
                    </td>
                    <td className="border border-gray-600 px-4 py-2 text-center text-green-500">
                      {screen.firstClassSeats}
                    </td>
                    <td className="border border-gray-600 px-4 py-2 text-center text-red-500">
                      {screen.secondClassSeats}
                    </td>
                  </tr>
                ))}
                {allScreens.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center text-gray-400 py-4"
                    >
                      No data available.
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

export default SeatPage;
