import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import profileImage from "../assets/AdminImage.jpg";
import SidebarComponent from "../Components/SidebarComponent";

const ProfilePage = () => {
  const backendURL = "https://popcornspotbackend-production.up.railway.app";
  const [admin, setAdmin] = useState({});
  const [theatre, setTheatre] = useState({});
  const [totalScreens, setTotalScreens] = useState(0);
  const [totalShows, setTotalShows] = useState(0);
  const role = "Admin";
  const authToken = localStorage.getItem("token");
  const lengthOfTheatre = Object.keys(theatre).length;
  const navigate = useNavigate();

  useEffect(() => {
    const getAdminDetails = async () => {
      try {
        const res = await axios.get(`${backendURL}/admin/getprofiledetails`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setAdmin(res.data.singleAdmin);
      } catch (err) {
        if (err.response?.status === 401) navigate("/");
      }
    };

    const fetchTheatre = async () => {
      try {
        const res = await axios.get(`${backendURL}/theatre/get`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        const fetchedTheatres = res.data.theatres;
        setTheatre(fetchedTheatres);
        setTotalScreens(fetchedTheatres.reduce((total, t) => total + (parseInt(t.screens) || 0), 0));
      } catch (err) {
        if (err.response?.status === 401) navigate("/");
      }
    };

    const fetchAllReports = async () => {
      try {
        const res = await axios.get(`${backendURL}/show/getallshow`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setTotalShows(Object.keys(res.data.allShows).length);
      } catch (err) {
        if (err.response?.status === 401) navigate("/");
      }
    };

    getAdminDetails();
    fetchTheatre();
    fetchAllReports();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen overflow-hidden">
      <div className="w-full md:w-56 fixed h-full">
        <SidebarComponent />
      </div>

      <div className="flex-1 ml-0 md:ml-56 overflow-y-auto p-6 bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center text-gray-200 text-xl md:text-3xl font-extrabold mb-8">
            Admin Profile
            <Link to={`/editprofile/${admin._id}`} className="flex items-center bg-orange-500 text-white p-2 md:px-4 md:py-2 rounded-lg shadow-md hover:bg-orange-400 transition">
              <FaEdit className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row bg-gray-700 shadow-xl rounded-xl overflow-hidden">
            <div className="flex justify-center items-center p-6 lg:p-8 hover:scale-105 transition">
              <img src={admin.fileName ? `${backendURL}/upload/${admin.fileName}` : profileImage} alt="Profile" className="w-32 md:w-48 h-32 md:h-48 object-cover rounded-full border-4 border-gray-100 shadow-lg" />
            </div>

            <div className="flex-1 p-6 lg:p-8 text-gray-300">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-200 mb-4">{admin.adminName}</h2>
              <div className="space-y-3 md:space-y-4">
                <p><span className="font-semibold text-gray-100">Role:</span> {role}</p>
                <p><span className="font-semibold text-gray-100">Email:</span> {admin.email}</p>
                <p><span className="font-semibold text-gray-100">Contact:</span> {admin.mobileNumber}</p>
                <p><span className="font-semibold text-gray-100">Theater Name:</span> {admin.theatreName}</p>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 text-center shadow-md hover:scale-105 transition">
                  <h3 className="text-blue-600 text-lg font-semibold">Total Theatres</h3>
                  <p className="text-3xl font-bold text-blue-800">{lengthOfTheatre || 0}</p>
                </div>
                <div className="bg-green-50 border border-green-300 rounded-lg p-4 text-center shadow-md hover:scale-105 transition">
                  <h3 className="text-green-600 text-lg font-semibold">Total Screens</h3>
                  <p className="text-3xl font-bold text-green-800">{totalScreens || 0}</p>
                </div>
                <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 text-center shadow-md hover:scale-105 transition">
                  <h3 className="text-yellow-600 text-lg font-semibold">Total Shows</h3>
                  <p className="text-3xl font-bold text-yellow-800">{totalShows || 0}</p>
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
