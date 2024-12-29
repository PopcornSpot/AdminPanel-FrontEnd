import React from "react";
import { Link } from "react-router-dom";

const ShowTable = ({ shows, onDelete }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-6">
      <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg">
        <thead>
          <tr className="bg-gray-700 text-gray-100">
            <th className="px-6 py-3 text-left text-lg">Movie</th>
            <th className="px-6 py-3 text-left text-lg">Show Date</th>
            <th className="px-6 py-3 text-left text-lg">Show Times</th>
            <th className="px-6 py-3 text-left text-lg">Last Date</th>
            <th className="px-6 py-3 text-left text-lg">Screen</th>
            <th className="px-6 py-3 text-left text-lg">First Class Price</th>
            <th className="px-6 py-3 text-left text-lg">Second Class Price</th>
            <th className="px-6 py-3 text-left text-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shows.map((show, index) => (
            <tr
              key={show._id}
              className={`border-b border-gray-700 ${index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"} hover:bg-gray-600`}
            >
              <td className="px-6 py-4">{show.movie || "Movie Name"}</td>
              <td className="px-6 py-4">{show.showDate || "Not specified"}</td>
              <td className="px-6 py-4">
                {show.showTime.length > 0 ? show.showTime.join(", ") : "Not specified"}
              </td>
              <td className="px-6 py-4">{show.lastDate || "Not specified"}</td>
              <td className="px-6 py-4">{show.screen || "Not specified"}</td>
              <td className="px-6 py-4">{show.firstClassPrice || "Not specified"}</td>
              <td className="px-6 py-4">{show.secondClassPrice || "Not specified"}</td>
              <td className="px-6 py-4 flex gap-2 justify-start">
                <Link to={`/editshow/${show._id}`}>
                  <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200">
                    Edit
                  </button>
                </Link>
                <button
                  className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
                  onClick={() => onDelete(show._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowTable;
