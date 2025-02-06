import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SidebarComponent from "../Components/SidebarComponent";
import Loader from "../Components/ReusableComponents/LoaderComponent";


const MoviesPage = () => {
  const authToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const fetchMovie = async () => {
    try {
      await axios
        .get("http://popcornspotbackend-production.up.railway.app/movie/getallmovie", {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        .then((res) => {
          toast.error(res.data.Error);
          setMovies(res.data.findAllMovies);
        })
        .catch ((err) =>{
          if (err.response?.status === 401) {
            toast.error("Request to Login Again");
            navigate("/")
            return;
          }
          console.log(err.message); 
        })
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Request to Login Again");
        navigate("/")
        return;
      }
      console.log(err.message); 
    }
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  const handleDelete = async (_id, title) => {
    setMovies(movies.filter((_, i) => i !== _id));
    alert(`Delete : ${title}`);
    try {
      await axios
        .delete(`http://popcornspotbackend-production.up.railway.app/movie/delete/?_id=${_id}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        .then((res) => {
          toast.success(res.data.Message);
          setMovies((prevState) =>
            prevState.filter((value) => value._id !== _id)
          );
        })
        .catch((err) => {
          toast.error(err.response.data.Message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-full md:w-56 fixed h-full">
        <SidebarComponent />
      </div>
      {movies.length!==0 ?
      <div className="flex-1 ml-56 max-md:ml-0 max-md:mt-16 overflow-y-auto">
        <div className="p-8 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 min-h-screen">
          <div className="max-w-6xl mx-auto">
            <div className="text-3xl font-bold text-gray-100 mb-10 flex justify-between items-center">
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
                  className="flex flex-col sm:flex-row bg-gray-700 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 gap-8"
                >
                  <img
                    src={"http://popcornspotbackend-production.up.railway.app/upload/" + movie.fileName}
                    alt={`${movie.title} Poster`}
                    className="w-full sm:w-48 sm:h-72 object-cover rounded-xl border-4 border-gray-200 mb-4 sm:mb-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-200 mb-4">
                        {movie.title}
                      </h2>
                      <p className="text-base text-gray-200 mb-6 italic">
                        {movie.synopsis}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-4 text-sm text-gray-200">
                        <p>
                          <span className="font-semibold">Genre:</span>{" "}
                          {movie.genre}
                        </p>
                        <p>
                          <span className="font-semibold">Language:</span>{" "}
                          {movie.language}
                        </p>
                        <p>
                          <span className="font-semibold">Duration:</span>{" "}
                          {movie.duration}
                        </p>
                        <p>
                          <span className="font-semibold">Release Date:</span>{" "}
                          {movie.releaseDate}
                        </p>
                        <p>
                          <span className="font-semibold">Certificate:</span>{" "}
                          {movie.certificate}
                        </p>
                        <p>
                          <span className="font-semibold">Director:</span>{" "}
                          {movie.director}
                        </p>
                        <p>
                          <span className="font-semibold">Hero:</span>{" "}
                          {movie.hero}
                        </p>
                        <p>
                          <span className="font-semibold">Heroine:</span>{" "}
                          {movie.heroine}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between mt-6">
                      <div className="flex gap-6 flex-wrap">
                        <Link to={`/updatemovie/${movie._id}`}>
                          <button className="bg-blue-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-400 transition duration-300 flex items-center gap-2">
                            <FaEdit  />
                            Edit
                          </button>
                        </Link>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-400 transition duration-300 flex items-center gap-2"
                          onClick={() => handleDelete(movie._id, movie.title)}
                        >
                          <FaTrashAlt />
                          Delete
                        </button>
                        <span
                          className={`flex items-center px-4 py-2 text-base text-white font-medium transition-colors rounded-md ${
                            movie.status === "pending"
                              ? "bg-orange-400"
                              : "bg-green-500"
                          }`}
                        >
                          {movie.status}
                        </span>
                        {movie.trailerUrl && (
                        <Link to={movie.trailerUrl} target="_blank">
                          <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg shadow-md font-medium hover:scale-105 transform transition duration-300">
                            Watch Trailer
                          </button>
                        </Link>
                      )}
                      </div>
                      
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      :<Loader/>
            }
    </div>
  );
};

export default MoviesPage;
