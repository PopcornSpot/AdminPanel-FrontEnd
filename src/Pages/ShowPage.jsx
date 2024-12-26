import React, { useEffect, useState } from 'react';
import ShowCard from '../Components/ShowCardComp';
import SidebarComponent from '../Components/SidebarComponent';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const ShowPage = () => {
  const [shows, setShows] = useState([]);
  const authToken = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchShow = async () => {
    try {
      await axios
        .get("http://localhost:7000/show/getallshow", {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        .then((res) => {
          toast.error(res.data.Error);
          setShows(res.data.allShows);
        })
        .catch((err) =>{
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
        return;
      }
      console.log(err.message); 
    }
  };

  const handleDelete = async (_id) => {
    try {
      await axios
        .delete(`http://localhost:7000/show/delete/?_id=${_id}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        .then(async (res) => {
          toast.success(res.data.Message);
          toast.error(res.data.Error);
          await fetchShow();
        })
        .catch((err) => {
          toast.error(err.response.data.Message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchShow();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-900">
      <div className="w-56 fixed h-full bg-gray-800 shadow-md">
        <SidebarComponent />
      </div>
      <div className="flex-1 ml-56 max-md:ml-0 max-md:mt-16 overflow-y-auto">
        <div className="min-h-screen bg-gray-900 p-6">
          <div className="flex w-full justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-center text-gray-200">
              Shows List
            </h1>
            <Link
              className="text-2xl h-[50px] bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300 ease-in-out shadow-md"
              to="/addshow"
            >
              Add Show
            </Link>
          </div>
          <ShowCard shows={shows} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default ShowPage;
