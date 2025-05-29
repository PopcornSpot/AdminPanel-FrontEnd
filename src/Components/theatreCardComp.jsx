import React from "react";
import { Link } from "react-router-dom";
import image from "../assets/fusion-01.jpg";
import { FaEdit, FaTrash } from 'react-icons/fa';

const TheatreCard = ({ theatres, onDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {theatres.map((theatre) => (
        <div
          key={theatre._id}
          className="bg-gray-700 border border-gray-300 rounded-lg shadow-md p-4 max-w-sm"
        >
          <img
            src={"https://popcornspotbackend-production.up.railway.app/upload/" + theatre.fileName || image}
            alt={theatre.theatreName}
            className="w-full h-40 object-cover rounded-t-lg mb-4"
          />
          <h2 className="text-lg font-semibold text-gray-200 mb-2">{theatre.theatreName}</h2>
          <p className="text-sm text-gray-300"><strong>Address:</strong> {theatre.address}</p>
          <p className="text-sm text-gray-300"><strong>City:</strong> {theatre.city}</p>
          <p className="text-sm text-gray-300"><strong>State:</strong> {theatre.state}</p>
          <p className="text-sm text-gray-300"><strong>Country:</strong> {theatre.country}</p>
          <p className="text-sm text-gray-300"><strong>Zip Code:</strong> {theatre.zipCode}</p>
          <p className="text-sm text-gray-300"><strong>Phone:</strong> {theatre.phone}</p>
          <p className="text-sm text-gray-300"><strong>Email:</strong> {theatre.email}</p>
          <p className="text-sm text-gray-300"><strong>No of Screens:</strong> {theatre.screens}</p>
          <p className="text-sm text-gray-300"><strong>Screen Type:</strong> {theatre.screenType}</p>
          <p className="text-sm text-gray-300"><strong>Facilities:</strong> {theatre.facilities.join(", ")}</p>
          <div className="flex justify-between mt-4">
            <Link to={`/edittheatre/${theatre._id}`} >
              <button
                className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 flex items-center gap-2"
              >
                <FaEdit />
                Edit
              </button>
            </Link>
            <button
              onClick={() => onDelete(theatre._id)}
              className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 flex items-center gap-2"
            >
              <FaTrash />
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};


export default TheatreCard;