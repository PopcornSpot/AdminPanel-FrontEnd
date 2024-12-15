import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import SidebarComponent from "../Components/SidebarComponent";
import { Link } from "react-router-dom";

const VotingResultsCard = () => {
  const authToken = localStorage.getItem("token");
  const [pollData, setPollData] = useState([]);

  const fetchPolls = async () => {
    try {
      await axios
        .get("http://localhost:7000/poll/getallpoll", {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        .then((res) => {
          console.log(res.data.allPolls);
          toast.success(res.data.Message);
          setPollData(res.data.allPolls);
        })
        .catch((err) => {
          if (err.response?.status === 401) {
            toast.error("Request to Login Again");
            return;
          }
          toast.error(err.response?.data?.Error || "Error fetching polls");
        });
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  if (!pollData.length) {
    return <div>Loading results...</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
    <div className="w-56 fixed h-full">
      <SidebarComponent />
    </div>
    <div className="flex-1 ml-56 max-md:ml-0 max-md:mt-16 overflow-y-auto">
    <div className="w-full max-w-4xl mx-auto mt-10">
    <div className='flex w-full justify-between pt-6 px-5'>
            <h1 className="text-3xl font-bold text-center mb-6">Voting Results</h1>
            <Link
            className='text-2xl'
            to={"/addvoting"}>
            Create poll
            </Link>
            </div>
      <div className="space-y-8">
        {pollData.map((poll) => (
          <div
            key={poll._id}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">{poll.pollName}</h2>
            <div className="space-y-4">
              {poll.movies.map((movie) => (
                <div
                  key={movie._id}
                  className="flex justify-between items-center p-4 bg-gray-100 rounded-md shadow-sm"
                >
                  <span className="font-semibold">{movie.movieName}</span>
                  <span className="text-orange-600 font-bold">{movie.votes} Votes</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    </div>
  );
};

export default VotingResultsCard;
