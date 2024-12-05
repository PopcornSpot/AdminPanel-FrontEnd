//ForgotPassword
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



const initialState = {
  email: "",
  password: "",
  conformPassword:""
};


const ForgotPassword = () => {

  const [formData, setFormData] = useState(initialState);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios
        .put("http://localhost:7000/admin/resetpassword", formData,
        )
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          toast.success(res.data.Message);
          setFormData(initialState);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.Message);
        });
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className={`min-h-screen flex items-center justify-center bg-gray-100`}>
      <div className={`bg-white p-6 rounded-lg shadow-lg w-full max-w-md`}>
        <h1 className={`text-2xl font-bold text-center mb-4`}>Reset Password</h1>
        <form onSubmit={handleOnSubmit}>
       
          <div className={`mb-4`}>
            <label className={`block text-gray-700 mb-2`}>Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleOnChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400`}
              placeholder="Enter your registered email"
            />
          </div>
         
          <div className={`mb-4`}>
            <label className={`block text-gray-700 mb-2`}>New Password</label>
            
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleOnChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400`}
              placeholder=" New password"
            />
          </div>
         
          <div className="mb-4">
            <label className={`block text-gray-700 mb-2`}>Confirm Password</label>
            <input
              type="conformPassword"
              name="conformPassword"
              value={formData.conformPassword}
              onChange={handleOnChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400`}
              placeholder="Confirm password"
            />
          </div>
      
          <button
            type="submit"
            className={`w-full bg-orange-400 text-white py-2 `}
          >
            Submit
          </button>
        </form>
        <p className={`text-center text-gray-600 mt-4`}>
          <Link to={"/"} >
            Remember your password? <span className={`text-blue-500 underline`}>Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
