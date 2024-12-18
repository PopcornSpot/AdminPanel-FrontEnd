import React from 'react';
import { Link } from 'react-router-dom';

const ShowCard = ({ shows, onDelete }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {shows.map((show, index) => (
        <div
          key={show._id}
          className="max-w-md bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-200"
        >
          <div className="px-6 py-4">
            <h2 className="text-xl font-bold text-gray-100 mb-2">
              {show.movie || 'Movie Name'}
            </h2>
            <p className="text-gray-300">
              <strong>Show Date:</strong> {show.showDate || 'Not specified'}
            </p>
            <p className="text-gray-300">
              <strong>Show Times:</strong>{' '}
              {show.showTime.length > 0 ? show.showTime.join(', ') : 'Not specified'}
            </p>
            <p className="text-gray-300">
              <strong>Last Date:</strong> {show.lastDate || 'Not specified'}
            </p>
            <p className="text-gray-300">
              <strong>Screen:</strong> {show.screen || 'Not specified'}
            </p>
            <p className="text-gray-300">
              <strong>First Class Price:</strong> {show.firstClassPrice || 'Not specified'}
            </p>
            <p className="text-gray-300">
              <strong>Second Class Price:</strong> {show.secondClassPrice || 'Not specified'}
            </p>
          </div>
          <div className="flex justify-between px-6 py-4">
             <Link to={`/editshow/${show._id}`} >
            <button
              className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Edit
            </button>
            </Link>
            <button
              className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
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
