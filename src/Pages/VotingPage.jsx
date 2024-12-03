import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

const VotingPage = () => {
  const [movies, setMovies] = useState([
    { movieName: "", votes: 0 },
    { movieName: "", votes: 0 },
  ]);

  const handleMovieChange = (index, value) => {
    const updatedMovies = [...movies];
    updatedMovies[index].movieName = value;
    setMovies(updatedMovies);
  };

  const handleAddMovie = () => {
    setMovies([...movies, { movieName: "", votes: 0 }]);
  };

  const handleRemoveMovie = (index) => {
    const updatedMovies = movies.filter((_, i) => i !== index);
    setMovies(updatedMovies);
  };

  return (
    <div className="p-6 bg-gradient-to-b from-gray-800 to-gray-900 min-h-screen flex flex-col items-center gap-8">
      <div className="w-full  mb-6">
        <h1 className="text-4xl font-extrabold text-gray-200">Create Movie Poll</h1>
      </div>

      <div className="bg-gray-800 w-full max-w-3xl p-8 rounded-2xl shadow-lg flex flex-col items-center">
        <div className="mb-6 w-full">
          <label className="block text-lg font-medium text-gray-200 mb-2">Poll Name</label>
          <input
            type="text"
            placeholder="Enter poll name"
            className="w-full p-4 bg-gray-700 text-white border-none rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div className="w-full mb-8">
          <h3 className="text-2xl font-semibold text-gray-200 mb-4">Add Movies to Poll</h3>
          {movies.map((movie, index) => (
            <div
              key={index}
              className="flex items-center mb-4 bg-gray-700 p-4 rounded-xl shadow-md"
            >
              <input
                type="text"
                value={movie.movieName}
                onChange={(e) => handleMovieChange(index, e.target.value)}
                placeholder="Movie Name"
                className="flex-1 p-4 bg-gray-600 text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                onClick={() => handleRemoveMovie(index)}
                className="ml-4 bg-red-500 text-white p-3 rounded-full shadow-md hover:bg-red-600 transition"
                title="Remove Movie"
              >
                <FaTrash />
              </button>
            </div>
          ))}
          <button
            onClick={handleAddMovie}
            className="flex items-center justify-center w-full px-6 py-3 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition duration-200"
          >
            <FaPlus className="mr-2" /> Add Movie
          </button>
        </div>

        <div>
          <button className="px-6 py-3 bg-gray-900 text-white font-semibold text-lg rounded-xl shadow-md hover:bg-gray-800 transition duration-200">
            Create Poll
          </button>
        </div>
      </div>
    </div>
  );
};

export default VotingPage;
