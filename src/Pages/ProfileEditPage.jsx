import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import profileImage from "../assets/AdminImage.jpg"
import SidebarComponent from "../Components/SidebarComponent";

const initialState = {
    adminName: "",
    email: "",
    mobileNumber: "",
    noOfTheatres: "",
    theatreName: "",
    location: "",
    image: null,
};

const fetchAdminForUpdate = async (_id, setAdmin) => {
  try {
    const authToken = localStorage.getItem("token");
    await axios
      .get(`http://localhost:7000/admin/getprofiledetails/?_id=${_id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        toast.error(res.data.Error);
        setAdmin(res.data.singleAdmin);
      })
      .catch((err) => {
        toast.error(err.response.data.Message);
      });
  } catch (error) {
    console.log(error.message);
  }
};

const ProfileEditPage = () => {
  const authToken = localStorage.getItem("token");
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const { _id } = useParams();
   const backendURL= "http://localhost:7000"

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
      ...(type === "file" && { fileOriginalName: files[0]?.name || "" }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let uploadData = new FormData();
    Object.keys(formData).forEach((key) => {
      uploadData.append(key, formData[key]);
    });

    try {
      await axios
        .put(
          `http://localhost:7000/admin/editprofile/?_id=${_id}`,
          uploadData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data); 
          toast.success(res.data.Message);
          setFormData(initialState);
          navigate("/profile");
        })
        .catch((err) => {
          toast.error(err.response.data.Message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAdminForUpdate(_id, setFormData);
  }, [_id]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-900">
      <div className="w-56 fixed h-full">
        <SidebarComponent />
      </div>

      <div className="flex-1 ml-56 max-md:ml-0 max-md:mt-16 overflow-y-auto ">
    <div
      className={`bg-gray-950 py-10 px-2 min-h-screen flex flex-col justify-center items-center`}
    >
       <div className={` rounded-lg p-6 w-full max-w-md`}>
        <h2 className={`text-2xl font-bold text-center text-gray-200 mb-4`}>
          Profile Page
        </h2>
      </div>
     <div className="bg-gray-800 rounded-lg w-[70%] max-sm:w-full px-10 py-10 h-full flex flex-col items-center">
    
      <div className="lg:w-1/3 flex items-center justify-center bg-gray-800 p-8 hover:scale-105 transition duration-300 transform">
            <img
             src={
              formData.fileName
                ? `${backendURL}/upload/${formData.fileName}`
                : profileImage
            }
              alt={`${formData.adminName}'s profile`}
              className="w-48 h-48 object-cover rounded-full border-4 border-gray-100 shadow-lg"
            />
          </div>

      <form
      onSubmit={handleSubmit}
      className={`space-y-4 w-full`}>
      <div className={`w-full ml-10 flex flex-col items-center justify-center mb-6`}>
          <div>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full mt-1 text-gray-200"
              accept="image/*"
            />
            {formData.fileOriginalName && (
              <p className="text-lg mt-4 text-gray-100 ">{formData.fileOriginalName}</p>
            )}
          </div>
        </div>
        <div className={`flex flex-col`}>

          <label htmlFor="Name" className={`text-gray-200 mb-1`}>
            Full Name
          </label>
          <input
            id="Name"
            type="text"
            name="adminName"
            value={formData.adminName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            className={`border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-orange-300`}
          />
        </div>

        <div className={`flex flex-col`}>
          <label htmlFor="email" className={`text-gray-200 mb-1`}>
            Email ID
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email ID"
            required
            className={`border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-orange-300`}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="mobileNumber" className="text-gray-200 mb-1">
            Mobile Number
          </label>
          <input
            id="mobileNumber"
            type="number"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            required
            className={`border no-spinner border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-orange-400`}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="theatreName" className="text-gray-200 mb-1">
            Theatre Name
          </label>
          <input
            id="theatreName"
            type="text"
            name="theatreName"
            value={formData.theatreName}
            onChange={handleChange}
            placeholder="Enter your theatre number"
            required
            className={`border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-orange-400`}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="location" className="text-gray-200 mb-1">
            Location
          </label>
          <input
            id="location"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter your location"
            required
            className={`border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-orange-400`}
          />
        </div>


        <button
          type="submit"
          className={`w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors`}
        >
          Submit
        </button>
      </form>
     </div>
    </div>
    </div>
    </div>
  );
};

export default ProfileEditPage;
