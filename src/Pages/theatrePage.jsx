import React, { useEffect, useState } from "react";
import TheatreCard from "../Components/theatreCardComp";
import { toast } from "react-toastify";
import axios from "axios";
import SidebarComponent from "../Components/SidebarComponent";
import { Link } from "react-router-dom";


const TheatrePage = () => {
  const [theatres, setTheatres] = useState([]);
  const authToken = localStorage.getItem("token");

  const fetchTheatre = async () => {
    try {
      await axios
        .get("http://localhost:7000/theatre/get",
           {
              headers: { Authorization: `Bearer ${authToken}` }
            }
        )
        .then((res) => {
          toast.error(res.data.Error)
          toast.success(res.data.Message) 
          setTheatres(res.data.theatres);

        })
        .catch((err) =>{
          if (err.status === 401) {
              return toast.error("Request to Login Again")
                }
          toast.error(err.response.data.Error)
        });
    } catch (error) {
      toast.error(error.message)
    }
  };

 
  const handleDelete = async (_id) => {
  
    try {
        await axios
          .delete(`http://localhost:7000/theatre/delete/?_id=${_id}`,
            {
                headers: { Authorization: `Bearer ${authToken}` }
              }
          )
          .then( async (res) => {
            toast.success(res.data.Message);
            toast.error(res.data.Error);
            await fetchTheatre();
          })
          .catch((err) => {
            toast.error(err.response.data.Message)
          });
      } catch (error) {
        console.log(error.message);
      }


  };



  useEffect(() => {
    fetchTheatre();
  }, []);


  return (
    <div className="flex h-screen overflow-hidden">
    <div className="w-56 fixed h-full">
      <SidebarComponent />
    </div>
    <div className="flex-1 ml-56 max-md:ml-0 max-md:mt-16 overflow-y-auto">
    <div className="min-h-screen bg-gray-100">
      
      <div className='flex w-full justify-between pt-6 px-5'>
            <h1 className="text-3xl font-bold text-center mb-6">Theatre List</h1>
            <Link
            className='text-2xl'
            to={"/addtheatre"}>
            Add Theatre
            </Link>
            </div>
      <TheatreCard theatres={theatres} onDelete={handleDelete} />
    </div>
    </div>
    </div>
  );
};

export default TheatrePage;
