import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import SidebarComponent from "../Components/SidebarComponent";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ScreensPage = () => {
  const [screens, setScreens] = useState([]);
  const navigate = useNavigate("/theaterlayout");
  const authToken = localStorage.getItem("token");

  const fetchScreen = async () => {
    try {
      await axios
        .get("http://localhost:7000/screen/getallscreen",
           {
              headers: { Authorization: `Bearer ${authToken}` }
            }
        )
        .then((res) => {
          toast.error(res.data.Error)
          toast.success(res.data.Message) 
          setScreens(res.data.allScreens);

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
          .delete(`http://localhost:7000/screen/delete/?_id=${_id}`,
            {
                headers: { Authorization: `Bearer ${authToken}` }
              }
          )
          .then( async (res) => {
            toast.success(res.data.Message);
            toast.error(res.data.Error);
            await fetchScreen();
          })
          .catch((err) => {
            toast.error(err.response.data.Message)
          });
      } catch (error) {
        console.log(error.message);
      }


  };



  useEffect(() => {
    fetchScreen();
  }, []);


  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-56 fixed h-full">
        <SidebarComponent />
      </div>

      <div className="flex-1 ml-56 max-md:ml-0 max-md:mt-16 overflow-y-auto">
        <div className="p-6 bg-gray-900 min-h-screen text-gray-200">
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-4xl font-extrabold text-gray-200 tracking-wide">
              Manage Screens
            </h1>
            <Link to={"/addscreen"}>
            <button 
               
              className="flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-md transform hover:scale-105"
            >
              <FaPlus className="mr-2" /> Add Screen
            </button>
            </Link>
          </div>

          {screens.length > 0 ? (
            <div className="flex flex-wrap gap-6">
              {screens.map((screen) => (
                <div 
                  key={screen._id} 
                  className="flex flex-col bg-gray-800 p-6 rounded-lg shadow-lg w-full sm:w-[48%] lg:w-[30%] transition-transform transform hover:scale-105"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-orange-500">Screen: {screen.screenNo}</h2>
                    <div className="flex space-x-2">
                       <Link to={`/editscreen/${screen._id}`} >
                      <button 
                        className="p-2 bg-green-500 rounded-full hover:bg-green-600 transition duration-200"
                      >
                        <FaEdit className="text-white" />
                      </button>
                      </Link>
                      <button 
                        className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition duration-200"
                        onClick={() => handleDelete(screen._id)}
                      >
                        <FaTrash className="text-white" />
                      </button>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-400">
                    <strong>Total Capacity:</strong> {screen.totalSeats}
                  </p>

                  <p className="mt-4 text-gray-400">
                    <strong>1st Class Seats:</strong> {screen.firstClassSeats}
                  </p>

                  <p className="mt-4 text-gray-400">
                    <strong>2nd Class Seats:</strong> {screen.secondClassSeats}
                  </p>


                  <div className="mt-6">
                    <button 
                      className="w-full py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition duration-200"
                      onClick={() => navigate("/theaterlayout")}
                    >
                      View Screen
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              No screens available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScreensPage;
