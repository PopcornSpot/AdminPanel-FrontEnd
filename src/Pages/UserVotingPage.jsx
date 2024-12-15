import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UserVotingPage = ({ pollId }) => {
  const authToken = localStorage.getItem("token");
  const [pollData, setPollData] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState("");
  const _id="b7c675c2-02ac-4b88-b84a-0256f3033ad4"

  useEffect(async () => {
    try {
        await axios
          .get(`http://localhost:7000/poll/getpoll/?_id=${_id}`,
             {
                headers: { Authorization: `Bearer ${authToken}` }
              }
          )
          .then((res) => {
            toast.error(res.data.Error)
            toast.success(res.data.Message) 
            setPollData(res.data.getpoll);
          })
          .catch((err) =>{
            toast.error(err.response.data.Error)
          });
      } catch (error) {
        console.log(error.message);
        
        toast.error(error.message)
      }
  }, [pollId]);

  const handleVote =async () => {
    if (!selectedMovie) {
      alert("Please select a movie to vote for!");
      return;
    }


    const updatedMovies = pollData.movies.map((movie) =>
        movie._id === selectedMovie
          ? { ...movie, votes: movie.votes + 1 } // Increment vote count immutably
          : movie
      );


    // const movie = pollData.movies.find((movie) => movie._id === selectedMovie);
    // if (movie) {
    //   movie.votes += 1;

      try {
        await axios
          .put(`http://localhost:7000/poll/update/?_id=${_id}`,{ movies:updatedMovies },     
          )
          .then((res) => {
            toast.error(res.data.Error)
            toast.success(res.data.Message) 
            alert("Your vote has been counted!");
            setPollData((prevData) => ({
                ...prevData,
                movies: updatedMovies, // Update state with new data
              })); 
          })
          .catch((err) =>{
            toast.error(err.response.data.Error)
          });
      } catch (error) {
        console.log(error.message);
        toast.error(error.message)
      }
 }


  if (!pollData) {
    return <div>Loading poll...</div>;
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1>{pollData.pollName}</h1>
      <h3>Vote for your favorite movie:</h3>
      {pollData.movies.map((movie) => (
        <div key={movie._id}>
          <input
            type="radio"
            name="movieVote"
            value={movie._id}
            checked={selectedMovie === movie._id}
            onChange={() => setSelectedMovie(movie._id)}
          />
          <label>{movie.movieName} - Votes: {movie.votes}</label>
        </div>
      ))}
      <button
      className="px-4 py-1 bg-gray-500 rounded text-white "
      onClick={handleVote}>Vote</button>
    </div>
  );
};

export default UserVotingPage;
