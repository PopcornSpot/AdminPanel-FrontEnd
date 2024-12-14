import React, { useEffect, useState } from 'react';
import ShowCard from '../Components/ShowCardComp';
import SidebarComponent from '../Components/SidebarComponent';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const ShowPage = () => {
  const [shows, setShows] = useState([]);
  const authToken = localStorage.getItem("token");

  const fetchShow = async () => {
    try {
      await axios
        .get("http://localhost:7000/show/getallshow",
           {
              headers: { Authorization: `Bearer ${authToken}` }
            }
        )
        .then((res) => {
          toast.error(res.data.Error)
          toast.success(res.data.Message) 
          setShows(res.data.allShows);
        })
        .catch((err) =>{
          toast.error(err.response.data.Error)
        });
    } catch (error) {
      console.log(error.message);
      
      toast.error(error.message)
    }
  };


  const handleDelete = async (_id) => {
  
    try {
        await axios
          .delete(`http://localhost:7000/show/delete/?_id=${_id}`,
            {
                headers: { Authorization: `Bearer ${authToken}` }
              }
          )
          .then( async (res) => {
            toast.success(res.data.Message);
            toast.error(res.data.Error);
            await fetchShow();
          })
          .catch((err) => {
            toast.error(err.response.data.Message)
          });
      } catch (error) {
        console.log(error.message);
      }
  };

  useEffect(() => {
    fetchShow();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
    <div className="w-56 fixed h-full">
      <SidebarComponent/>
    </div>
    <div className="flex-1 ml-56 overflow-y-auto">
    <div className="min-h-screen bg-gray-100 p-6">
      <div className='flex w-full justify-between'>
      <h1 className="text-3xl font-bold text-center mb-6">Shows List</h1>
      <Link
      className='text-2xl'
      to={"/addshow"}>
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
