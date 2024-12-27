import React, { useEffect, useState } from "react";
import TheatreCard from "../Components/theatreCardComp";
import { toast } from "react-toastify";
import axios from "axios";
import SidebarComponent from "../Components/SidebarComponent";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const TheatrePage = () => {
  const [theatres, setTheatres] = useState([]);
  const authToken = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchTheatre = async () => {
    try {
      await axios
        .get("http://localhost:7000/theatre/get", {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        .then((res) => {
          toast.error(res.data.Error);
          setTheatres(res.data.theatres);
        })
        .catch((err) => {
          if (err.response?.status === 401) {
            toast.error("Request to Login Again");
            navigate("/")
            return;
          }
          console.log(err.message);
        });
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Request to Login Again");
        navigate("/")
        return;
      }
      console.log(err.message);
    }
  };

  const handleDelete = async (_id) => {
    try {
      await axios
        .delete(`http://localhost:7000/theatre/delete/?_id=${_id}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        .then(async (res) => {
          toast.success(res.data.Message);
          toast.error(res.data.Error);
          await fetchTheatre();
        })
        .catch((err) => {
          toast.error(err.response.data.Message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchTheatre();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-900">
      <div className="w-56 fixed h-full bg-gray-800">
        <SidebarComponent />
      </div>
      <div className="flex-1 ml-56 max-md:ml-0 max-md:mt-16 overflow-y-auto">
        <div className="min-h-screen bg-gray-900 text-white px-4 py-6">
          <div className="flex w-full justify-between items-center mb-6">
            <h1 className="text-3xl font-bold pl-5">Theatre List</h1>


            <Link
              className="text-lg px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold rounded-md mr-10 flex items-center gap-2 hover:from-orange-700 hover:to-yellow-600 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
              to={"/addtheatre"}
            >
              <FaPlus className="text-xl" />
              <span>Add Theatre</span>
            </Link>


          </div>
          <TheatreCard theatres={theatres} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default TheatrePage;
