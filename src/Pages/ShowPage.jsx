import React, { useEffect, useState } from "react";
import ShowCard from "../Components/ShowCardComp";
import SidebarComponent from "../Components/SidebarComponent";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import axios from "axios";

const ShowPage = () => {
  const [shows, setShows] = useState([]);
  const authToken = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchShow = async () => {
    if (!authToken) {
      toast.error("You must be logged in!");
      navigate("/");
      return;
    }

    try {
      const response = await axios.get(
        "https://popcornspotbackend-production.up.railway.app/show/getallshow",
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      
      if (response.data.Error) {
        toast.error(response.data.Error);
      } else {
        setShows(response.data.allShows);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Request to Login Again");
        navigate("/");
      } else {
        console.log(err.message);
      }
    }
  };

  const handleDelete = async (_id) => {
    if (!authToken) {
      toast.error("You must be logged in!");
      navigate("/");
      return;
    }

    try {
      const response = await axios.delete(
        `https://popcornspotbackend-production.up.railway.app/show/delete/?_id=${_id}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      
      if (response.data.Message) {
        toast.success(response.data.Message);
      }
      if (response.data.Error) {
        toast.error(response.data.Error);
      }

      await fetchShow();
    } catch (err) {
      toast.error(err.response?.data.Message || "An error occurred");
    }
  };

  useEffect(() => {
    fetchShow();
  }, []);

  return (
    <div className="flex min-h-screen overflow-hidden bg-gray-900">
      <div className="w-full md:w-56 fixed h-20 z-50">
        <SidebarComponent />
      </div>
      <div className="flex-1 ml-56 max-md:ml-0 max-md:mt-16 overflow-x-auto">
        <div className="min-h-screen bg-gray-900 p-6">
          <div className="flex w-full justify-between items-center mb-6">
            <h1 className="text-xl sm:text-3xl font-bold text-center text-gray-200">
              Shows List
            </h1>

            <Link
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-lg text-lg font-medium flex items-center gap-2 hover:scale-105 transform transition duration-300"
              to="/addshow"
            >
              <FaPlus className="text-white" />
              <span className="hidden sm:inline">Add Show</span>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-4 overflow-x-auto">
            <ShowCard shows={shows} onDelete={handleDelete} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowPage;
