import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import profileImage from "../assets/AdminImage.jpg"

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
        console.log("Fetched",res.data);
        
        toast.success(res.data.Message);
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
    <div
      className={`bg-slate-100 min-h-screen flex flex-col justify-center items-center`}
    >
      <div className={`bg-white shadow-lg rounded-lg p-6 w-full max-w-md`}>
        <h2 className={`text-xl font-bold text-center text-gray-700 mb-4`}>
          Profile Page
        </h2>
      </div>
      <div className="lg:w-1/3 flex items-center justify-center bg-gray-700 p-8 hover:scale-105 transition duration-300 transform">
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
      className={`space-y-4`}>
      <div className={`flex flex-col items-center mb-6`}>
          <div>
            <label className="block font-medium text-gray-700">Profile Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full mt-1"
              accept="image/*"
              required
            />
            {formData.fileOriginalName && (
              <p className="text-lg mt-4 ">{formData.fileOriginalName}</p>
            )}
          </div>
        </div>
        <div className={`flex flex-col`}>

          <label htmlFor="Name" className={`text-gray-600 mb-1`}>
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
            className={`border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300`}
          />
        </div>

        <div className={`flex flex-col`}>
          <label htmlFor="email" className={`text-gray-600 mb-1`}>
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
            className={`border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300`}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="mobileNumber" className="text-gray-600 mb-1">
            Mobile Number
          </label>
          <input
            id="mobileNumber"
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            required
            className={`border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400`}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="theatreName" className="text-gray-600 mb-1">
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
            className={`border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400`}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="location" className="text-gray-600 mb-1">
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
            className={`border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400`}
          />
        </div>


        <button
          type="submit"
          className={`w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-500 transition-colors`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProfileEditPage;
