import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  email: "",
  password: "",
  conformPassword: "",
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
        .put("http://localhost:7000/admin/resetpassword", formData)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          toast.success(res.data.Message);
          setFormData(initialState);
          navigate("/");
        })
        .catch((err) => {
          console.error(err);
          toast.error(err.response.data.Message);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-orange-400">
          Reset Password
        </h1>
        <form onSubmit={handleOnSubmit}>
          <div className="mb-5">
            <label className="block text-gray-300 font-medium mb-2">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleOnChange}
              className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-500"
              placeholder="Enter your registered email"
            />
          </div>

          <div className="mb-5">
            <label className="block text-gray-300 font-medium mb-2">New Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleOnChange}
              className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-500"
              placeholder="Enter new password"
            />
          </div>

          <div className="mb-5">
            <label className="block text-gray-300 font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="conformPassword"
              value={formData.conformPassword}
              onChange={handleOnChange}
              className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-500"
              placeholder="Confirm password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 focus:ring-2 focus:ring-orange-400 focus:outline-none transition-all duration-300"
          >
            Submit
          </button>
        </form>

        <p className="text-center text-gray-300 mt-6">
          <Link to={"/"}>
            Remember your password? <span className="text-orange-400 font-medium underline hover:text-orange-500">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
