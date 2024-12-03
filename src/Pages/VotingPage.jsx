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
<div className="p-6 bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen flex flex-col items-center">
  <div className="mb-0 content-start"> 
    <h1 className="text-3xl font-bold text-gray-800 mb-2 mt-0"> 
      Create Movie Poll
    </h1>
  </div>

  <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg flex flex-col items-center">
    <div className="mb-6 w-full">
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Poll Name
      </label>
      <input
        type="text"
        placeholder="Enter poll name"
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
      />
    </div>

    <div className="w-full mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Add Movies to Poll
      </h3>
      {movies.map((movie, index) => (
        <div
          key={index}
          className="flex items-center mb-4 bg-gray-50 p-3 rounded-lg shadow-sm"
        >
          <input
            type="text"
            value={movie.movieName}
            onChange={(e) => handleMovieChange(index, e.target.value)}
            placeholder="Movie Name"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
          <button
            onClick={() => handleRemoveMovie(index)}
            className="ml-4 bg-red-300 text-white p-3 rounded-full shadow-md hover:bg-red-400 transition"
            title="Remove Movie"
          >
            <FaTrash />
          </button>
        </div>
      ))}
      <button
        onClick={handleAddMovie}
        className="flex items-center justify-center w-full px-4 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
      >
        <FaPlus className="mr-2" /> Add Movie
      </button>
    </div>

    <div>
      <button className="px-6 py-3 bg-blue-500 text-white font-semibold text-lg rounded-lg shadow hover:bg-blue-600 transition">
        Create Poll
      </button>
    </div>
  </div>
</div>
  );
};

export default VotingPage;
