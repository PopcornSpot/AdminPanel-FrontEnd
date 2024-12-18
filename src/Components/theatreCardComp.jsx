import React from 'react';
import { Link } from 'react-router-dom';

const ShowCard = ({ shows, onDelete }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {shows.map((show) => (
        <div
          key={show._id}
          className="max-w-md bg-gray-700 shadow-lg rounded-lg overflow-hidden border border-gray-200 transition-transform transform hover:scale-105"
        >
          <div className="px-6 py-4">
            <h2 className="text-xl font-bold text-gray-200 mb-2">
              {show.movie || 'Movie Name'}
            </h2>
            <p className="text-gray-400 mb-1">
              <strong>Show Date:</strong> {show.showDate || 'Not specified'}
            </p>
            <p className="text-gray-400 mb-1">
              <strong>Show Times:</strong>{' '}
              {show.showTime.length > 0 ? show.showTime.join(', ') : 'Not specified'}
            </p>
            <p className="text-gray-400 mb-1">
              <strong>Last Date:</strong> {show.lastDate || 'Not specified'}
            </p>
            <p className="text-gray-400 mb-1">
              <strong>Screen:</strong> {show.screen || 'Not specified'}
            </p>
            <p className="text-gray-400 mb-1">
              <strong>First Class Price:</strong> {show.firstClassPrice || 'Not specified'}
            </p>
            <p className="text-gray-400 mb-4">
              <strong>Second Class Price:</strong> {show.secondClassPrice || 'Not specified'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between px-6 py-4 bg-gray-800 rounded-b-lg">
            <Link to={`/editshow/${show._id}`}>
              <button
                className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              >
                Edit
              </button>
            </Link>
            <button
              className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
              onClick={() => onDelete(show._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowCard;
