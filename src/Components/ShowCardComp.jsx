import React, { useState, useEffect } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const ShowTable = ({ shows, onDelete }) => {
  const [selectedShow, setSelectedShow] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedShow(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-8 flex flex-col items-center">
      <div className="w-full overflow-x-auto rounded-lg shadow-lg">
        {shows.length === 0 ? (
          <p className="text-center text-gray-400 py-6">No shows available</p>
        ) : (
          <div className="min-w-full">
            <table className="w-full min-w-[1000px] bg-gray-800 border border-gray-700 rounded-lg">
              <thead>
                <tr className="bg-gray-700 text-gray-100 text-sm">
                  <th className="px-6 py-4">Movie</th>
                  <th className="px-6 py-4">Show Date</th>
                  <th className="px-6 py-4">Show Times</th>
                  <th className="px-6 py-4">Last Date</th>
                  <th className="px-6 py-4">Screen</th>
                  <th className="px-6 py-4">First Class Price</th>
                  <th className="px-6 py-4">Second Class Price</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {shows.map((show, index) => (
                  <tr
                    key={show._id}
                    className={`border-b border-gray-700 transition duration-300 hover:bg-gray-600 ${
                      index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                    }`}
                  >
                    <td className="px-6 py-4 font-semibold">{show.movie || "Movie Name"}</td>
                    <td className="px-6 py-4">{show.showDate || "Not specified"}</td>
                    <td className="px-6 py-4">{show.showTime?.join(", ") || "Not specified"}</td>
                    <td className="px-6 py-4">{show.lastDate || "Not specified"}</td>
                    <td className="px-6 py-4">{show.screen || "Not specified"}</td>
                    <td className="px-6 py-4">${show.firstClassPrice || "Not specified"}</td>
                    <td className="px-6 py-4">${show.secondClassPrice || "Not specified"}</td>
                    <td className="px-6 py-4 flex gap-4 justify-center items-center">
                      <button
                        className="text-blue-400 hover:text-blue-500 transition-all duration-200"
                        onClick={() => setSelectedShow(show)}
                      >
                        <FaEye size={20} />
                      </button>
                      <Link to={`/editshow/${show._id}`}>
                        <button className="text-green-400 hover:text-green-500 transition-all duration-200">
                          <FaEdit size={18} />
                        </button>
                      </Link>
                      <button
                        className="text-red-400 hover:text-red-500 transition-all duration-200"
                        onClick={() => onDelete(show._id)}
                      >
                        <MdDelete size={22} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedShow && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 p-4 transition-opacity duration-300"
          onClick={() => setSelectedShow(null)}
        >
          <div
            className="bg-gray-800 text-white rounded-lg shadow-lg p-6 w-full max-w-lg border border-gray-700"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <h2 className="text-2xl font-bold mb-4 text-center">Show Details</h2>
            <div className="space-y-2 text-gray-300 text-lg">
              <p><strong>Movie:</strong> {selectedShow.movie}</p>
              <p><strong>Show Date:</strong> {selectedShow.showDate}</p>
              <p><strong>Show Times:</strong> {selectedShow.showTime?.join(", ")}</p>
              <p><strong>Last Date:</strong> {selectedShow.lastDate}</p>
              <p><strong>Screen:</strong> {selectedShow.screen}</p>
              <p><strong>First Class Price:</strong> ${selectedShow.firstClassPrice}</p>
              <p><strong>Second Class Price:</strong> ${selectedShow.secondClassPrice}</p>
            </div>
            <button
              className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-all duration-200"
              onClick={() => setSelectedShow(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowTable;
