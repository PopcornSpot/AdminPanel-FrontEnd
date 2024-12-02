import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const SeatsPage = () => {
  const [seats, setSeats] = useState([
    { id: 1, screen: "Screen 1", seatNumber: "A1", status: "Available" },
    { id: 2, screen: "Screen 1", seatNumber: "A2", status: "Reserved" },
    { id: 3, screen: "Screen 2", seatNumber: "B1", status: "Available" },
    { id: 4, screen: "Screen 2", seatNumber: "B2", status: "Reserved" },
  ]);

  const handleDelete = (id) => {
    setSeats((prevSeats) => prevSeats.filter((seat) => seat.id !== id));
  };

  const handleStatusChange = (id) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        seat.id === id
          ? {
              ...seat,
              status: seat.status === "Available" ? "Reserved" : "Available",
            }
          : seat
      )
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Manage Seats</h1>
        <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          <FaPlus className="mr-2" /> Add Seat
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4 border-b">#</th>
              <th className="p-4 border-b">Screen</th>
              <th className="p-4 border-b">Seat Number</th>
              <th className="p-4 border-b">Status</th>
              <th className="p-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {seats.length > 0 ? (
              seats.map((seat, index) => (
                <tr
                  key={seat.id}
                  className="hover:bg-gray-100 transition-colors"
                >
                  <td className="p-4 border-b">{index + 1}</td>
                  <td className="p-4 border-b">{seat.screen}</td>
                  <td className="p-4 border-b">{seat.seatNumber}</td>
                  <td className="p-4 border-b">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        seat.status === "Available"
                          ? "bg-green-300 text-green-800"
                          : "bg-red-300 text-red-800"
                      }`}
                    >
                      {seat.status}
                    </span>
                  </td>
                  <td className="p-4 border-b flex space-x-2">
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
                      onClick={() => handleStatusChange(seat.id)}
                    >
                      <FaEdit className="mr-1" /> Toggle Status
                    </button>
                    <button
                      onClick={() => handleDelete(seat.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center"
                    >
                      <FaTrash className="mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="p-4 text-center text-gray-500 border-b"
                >
                  No seats available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SeatsPage;
