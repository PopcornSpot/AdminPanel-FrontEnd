import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import profileImage from "../assets/AdminImage.jpg"
import SidebarComponent from "../Components/SidebarComponent";


const ProfilePage = () => {
   const backendURL= "http://localhost:7000"
  const [admin, setAdmin] = useState({});
  const [theatre, setTheatre] = useState({});
  const [totalScreens, setTotalScreens] = useState(0);
  const [totalShows, setTotalShows] = useState(0);
  const role ="Admin"
  const authToken = localStorage.getItem("token");
  const lengthOfTheatre = Object.keys(theatre).length;
  const navigate = useNavigate();


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
          const fetchedTheatres = res.data.theatres;
          setTheatre(fetchedTheatres);
          const screensCount = fetchedTheatres.reduce((total, theatre) => {
            const screens = parseInt(theatre.screens || "0", 10);
            return total + screens;
          }, 0);
          setTotalScreens(screensCount);
        })
        .catch ((err)=>{
          if (err.response?.status === 401) {
            toast.error("Request to Login Again");
            navigate("/")
            return;
          }
          console.log(err.message); 
        });
    } catch (error) {
      console.log(error.message);
      
    }
  };

  
const fetchAllReports = async (setReports) => {
  try {
    const authToken = localStorage.getItem("token");
    await axios
      .get(`http://localhost:7000/show/getallshow`,
        {
          headers: { Authorization: `Bearer ${authToken}` }
        }
      )
      .then((res) => {
        toast.error(res.data.Error);
        const allShow =res.data.allShows
        const lengthOfShows = Object.keys(allShow).length;
        setTotalShows(lengthOfShows);
      })
      .catch ((err) =>{
        if (err.response?.status === 401) {
          navigate("/")
          return;
        }
        console.log(err.message); 
      });
  } catch (error) {
    console.log(error.message);
  }
};


  const getAdminDetails = async () => {
    try {
       await axios
        .get(`http://localhost:7000/admin/getprofiledetails`,
          {
            headers: { Authorization: `Bearer ${authToken}`}
          }
        )
        .then((res) => {
          toast.error(res.data.Error);
          setAdmin(res.data.singleAdmin)
        })
        .catch ((err) =>{
          if (err.response?.status === 401) {
            navigate("/")
            return;
          }
          console.log(err.message); 
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAdminDetails();
    fetchTheatre();
    fetchAllReports()
  }, []);






  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-56 fixed h-full">
        <SidebarComponent/>
      </div>

      <div className="flex-1 ml-56 max-md:ml-0 max-md:mt-16 overflow-y-auto">
    <div className="p-8 bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-3xl font-extrabold text-gray-200 mb-8 flex justify-between items-center">
          Admin Profile
          <Link 
          to={`/editprofile/${admin._id}`}
            className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-400 transition duration-300"
          >
          <FaEdit className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row bg-gray-700 shadow-xl rounded-xl overflow-hidden">
          <div className="lg:w-1/3 flex items-center justify-center bg-gray-700 p-8 hover:scale-105 transition duration-300 transform">
            <img
             src={
              admin.fileName
                ? `${backendURL}/upload/${admin.fileName}`
                : profileImage
            }
              alt={`${admin.adminName}'s profile`}
              className="w-48 h-48 object-cover rounded-full border-4 border-gray-100 shadow-lg"
            />
          </div>

          <div className="lg:w-2/3 p-8 bg-gray-700 rounded-r-xl">
            <h2 className="text-3xl font-bold text-gray-200 mb-4">{admin.adminName}</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                <span className="font-semibold text-gray-100">Role:</span> {role}
              </p>
              <p>
                <span className="font-semibold text-gray-100">Email:</span> {admin.email}
              </p>
              <p>
                <span className="font-semibold text-gray-100">Contact:</span> {admin.mobileNumber}
              </p>
              <p>
                <span className="font-semibold text-gray-100">Theater Name:</span> {admin.theatreName}
              </p>
              <p>
                <span className="font-semibold text-gray-100">Theater ID:</span> {admin.theatreID}
              </p>
              <p>
                <span className="font-semibold text-gray-100">Location:</span> {admin.location}
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 border border-blue-300 rounded-lg p-5 text-center shadow-md hover:scale-105 transition duration-300 transform">
                <h3 className="text-blue-600 text-lg font-semibold">Total Theatres</h3>
                <p className="text-3xl font-bold text-blue-800">{lengthOfTheatre || 0}</p>
              </div>
              <div className="bg-green-50 border border-green-300 rounded-lg p-5 text-center shadow-md hover:scale-105 transition duration-300 transform">
                <h3 className="text-green-600 text-lg font-semibold">Total Screens</h3>
                <p className="text-3xl font-bold text-green-800">{totalScreens||0}</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-5 text-center shadow-md hover:scale-105 transition duration-300 transform">
                <h3 className="text-yellow-600 text-lg font-semibold">Shows</h3>
                <p className="text-3xl font-bold text-yellow-800">{totalShows || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default ProfilePage;
