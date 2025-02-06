
import React, { useEffect, useState } from "react";
import SidebarComponent from "../Components/SidebarComponent";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initialState = [
  { movieName: "" },
  { movieName: "" },
];

const AddVotingPage = () => {
  const [pollName, setPollName] = useState("");
  const [movies, setMovies] = useState(initialState);
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const getAllMovies = async () => {
    try {
      await axios
        .get(`https://popcornspotbackend-production.up.railway.app/movie/user/getallmovie`)
        .then((res) => {
          toast.error(res.data.Error);
          const allMovies = res.data.findAllMovies;
          const filteredMovies = allMovies.filter(
            (movies) => movies.status === "Published"
          );
          const movies = filteredMovies.map((movieItem) => movieItem.title);
          setAllMovies(movies);
        })
        .catch((err) => {
          toast.error(err.response.data.Message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleMovieChange = (index, value) => {
    const updatedMovies = [...movies];
    updatedMovies[index].movieName = value;
    setMovies(updatedMovies);
  };

  const handleSubmit = async (e) => {
    const authToken = localStorage.getItem("token");
    e.preventDefault();
    const data = { pollName, movies };
    setLoading(true);

    try {
      await axios
        .post("https://popcornspotbackend-production.up.railway.app/poll/create", data, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((res) => {
          toast.success(res.data.Message);
          toast.error(res.data.Error);
          setMovies(initialState);
          navigate("/voting");
        })
        .catch((err) => {
          toast.error(err.response.data.Message);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-56 fixed h-full">
        <SidebarComponent />
      </div>

      <div className="flex-1 ml-56 max-md:ml-0 max-md:mt-16 overflow-y-auto">
        <div className="p-6 bg-gradient-to-b from-gray-800 to-gray-900 min-h-screen flex flex-col items-center gap-8">
          <div className="w-full mb-6">
            <h1 className="text-3xl font-extrabold text-gray-200">Create Movie Poll</h1>
          </div>

          <div className="bg-gray-800 w-full max-w-4xl p-8 rounded-2xl shadow-lg flex flex-col items-center">
            <form onSubmit={handleSubmit} className="w-full h-full">
              <div className="mb-6 w-full">
                <label className="block text-lg font-medium text-gray-200 mb-2">
                  Poll Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter poll name"
                  value={pollName}
                  onChange={(e) => setPollName(e.target.value)}
                  className="w-full p-4 bg-gray-700 text-white border-none rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="w-full mb-8">
                <h3 className="text-2xl font-semibold text-gray-200 mb-4">
                  Select Movies for Poll
                </h3>
                {movies.map((movie, index) => (
                  <div
                    key={index}
                    className="flex items-center mb-4 bg-gray-700 p-4 rounded-xl shadow-md"
                  >
                    <select
                      value={movie.movieName}
                      required
                      onChange={(e) => handleMovieChange(index, e.target.value)}
                      className="w-full h-full flex-1 p-4 bg-gray-600 text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      style={{
                        maxHeight: "240px",  // Limit the dropdown height to show only 6 options
                        overflowY: "auto",   // Enable scrolling for more options
                      }}
                    >
                      <option value="">Select a movie</option>
                      {allMovies.map((movieName, idx) => (
                        <option key={idx} value={movieName}>
                          {movieName}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              <div className="w-full flex items-center justify-center">
                <button
                  type="submit"
                  className="px-6 py-3 bg-orange-500 text-white font-semibold text-lg rounded-xl shadow-md hover:bg-orange-600 transition duration-200"
                  disabled={loading} 
                >
                  {loading ? "Creating Poll..." : "Create Poll"} 
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVotingPage;
