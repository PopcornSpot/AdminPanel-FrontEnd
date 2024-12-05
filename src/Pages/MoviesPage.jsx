import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const MoviesPage = () => {
  const [movies, setMovies] = useState([
    {
      poster: "https://i0.wp.com/moviegalleri.net/wp-content/uploads/2024/07/Ajith-Kumar-Vidaamuyarchi-Movie-2nd-Look-Posters-HD.jpg?resize=696%2C1044&ssl=1",
      title: "Vidamuyarchi",
      genre: "Action",
      language: "Tamil",
      duration: "2h 15m",
      releaseDate: "2025-01-15",
      certificate: "U/A",
      synopsis: "A thrilling adventure of to finding wife",
      director: "Magizh Thirumeni",
      hero: "Ajith Kumar",
      heroine: "Thrisha",
      musicDirector: "Aniruth Ravichandher",
      trailerURL: "https://youtu.be/Wtq3RRORVx4?si=BO300FJEu0cSxp5f",
      screenNumber: "Screen 1",
      ticketPrices: {
        firstClass: "RS 200",
        secondClass: "RS 150",
      },
      screen: "IMAX",
      formatType: "3D",
    },

  ]);

  const handleEdit = (index) => {
    alert(`Edit Movie at Index: ${index}`);
  };

  const handleDelete = (index) => {
    setMovies(movies.filter((_, i) => i !== index));
    alert(`Deleted Movie at Index: ${index}`);
  };


  return (
    <div className="p-8 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-4xl font-bold text-gray-100 mb-10 flex justify-between items-center">
          <span>Movies List</span>
          <Link to={"/addmovie"}>
          <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-medium flex items-center gap-2 hover:scale-105 transform transition duration-300">
            Add Movie
            <FaPlus className="text-white" />
          </button>
          </Link>
        </div>

        <div className="space-y-8">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="flex flex-row bg-gray-700 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 gap-8"
            >

              <img
                src={movie.poster}
                alt={`${movie.title} Poster`}
                className="w-48 h-72 object-cover rounded-xl border-4 border-gray-200"
              />


              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-200 mb-4">{movie.title}</h2>
                  <p className="text-base text-gray-200 mb-6 italic">{movie.synopsis}</p>
                  <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-200">
                    <p>
                      <span className="font-semibold">Genre:</span> {movie.genre}
                    </p>
                    <p>
                      <span className="font-semibold">Language:</span> {movie.language}
                    </p>
                    <p>
                      <span className="font-semibold">Duration:</span> {movie.duration}
                    </p>
                    <p>
                      <span className="font-semibold">Release Date:</span> {movie.releaseDate}
                    </p>
                    <p>
                      <span className="font-semibold">Certificate:</span> {movie.certificate}
                    </p>
                    <p>
                      <span className="font-semibold">Director:</span> {movie.director}
                    </p>
                    <p>
                      <span className="font-semibold">Hero:</span> {movie.hero}
                    </p>
                    <p>
                      <span className="font-semibold">Heroine:</span> {movie.heroine}
                    </p>
                  </div>
                </div>


                <div className="flex items-center justify-between mt-6">
                  <div className="flex gap-6">
                    <button
                      className="bg-blue-500 text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-blue-400 transition duration-300 flex items-center gap-2"
                      onClick={() => handleEdit(movie._id)}
                    >
                      <FaEdit className="text-gray-900" />
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-400 transition duration-300 flex items-center gap-2"
                      onClick={() => handleDelete(movie._id)}
                    >
                      <FaTrashAlt />
                      Delete
                    </button>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-400 transition duration-300 flex items-center gap-2"
                      onClick={() => handleDelete(movie._id)}
                    >
                      <FaTrashAlt />
                      Publish
                    </button>
                  </div>
                  {movie.trailerURL && (
                    <Link to={movie.trailerURL} target="_blank">
                      <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg shadow-md font-medium hover:scale-105 transform transition duration-300">
                        Watch Trailer
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};

export default MoviesPage;
