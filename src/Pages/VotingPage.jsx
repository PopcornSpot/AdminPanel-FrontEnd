import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import SidebarComponent from "../Components/SidebarComponent";
import { Link, useNavigate } from "react-router-dom";

const VotingResultsCard = () => {
  const authToken = localStorage.getItem("token");
  const [pollData, setPollData] = useState([]);
  const navigate = useNavigate();

  const fetchPolls = async () => {
    try {
      const res = await axios.get("http://localhost:7000/poll/getallpoll", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setPollData(res.data.allPolls);
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Request to Login Again");
        navigate("/");
        return;
      }
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="w-56 fixed h-full bg-gray-800 hidden md:block">
        <SidebarComponent />
      </div>

      <div className="flex-1 md:ml-56 overflow-y-auto p-6">
        <div className="w-full mx-auto px-6">
          <div className="flex w-full md:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl font-bold mb-4 md:mb-0 text-gray-100">
              Voting Results
            </h1>
            <Link
              to="/addvoting"
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg text-lg font-semibold transition-transform transform hover:scale-105"
            >
              Create Poll
            </Link>
          </div>

          {!pollData.length ? (
            <div className="text-center text-gray-300 text-xl">
              No polls created yet.
            </div>
          ) : (
            <div className="space-y-8">
              {pollData.map((poll) => (
                <div
                  key={poll._id}
                  className="bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6"
                >
                  <h2 className="text-2xl font-bold text-gray-100 mb-4 border-b pb-2">
                    {poll.pollName}
                  </h2>
                  <div className="space-y-4">
                    {poll.movies.map((movie) => (
                      <div
                        key={movie._id}
                        className="flex justify-between items-center bg-gray-700 p-4 rounded-md hover:bg-gray-600 transition-colors duration-200"
                      >
                        <span className="font-semibold text-gray-200">
                          {movie.movieName}
                        </span>
                        <span className="text-orange-400 font-bold text-lg">
                          {movie.votes} Votes
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VotingResultsCard;
