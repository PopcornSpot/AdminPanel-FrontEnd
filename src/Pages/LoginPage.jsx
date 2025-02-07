import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  email: "",
  password: "",
};

const LoginPage = () => {
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
        .post("https://popcornspotbackend-production.up.railway.app/admin/login", formData)
        .then((res) => {
          localStorage.clear();
          localStorage.setItem("token", res.data.token);
          setFormData(initialState);
          navigate("/home");
        })
        .catch((err) => {
          console.error(err);
          toast.error(err.response.data.Message);
        });
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleReset = () => {
    setFormData(initialState);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-orange-400">
          Admin Login
        </h1>
        <form onSubmit={handleOnSubmit} onReset={handleReset}>
          <div className="mb-5">
            <label className="block text-gray-300 font-medium mb-2">Email</label>
            <input
              required
              name="email"
              type="email"
              value={formData.email}
              onChange={handleOnChange}
              className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-5">
            <label className="block text-gray-300 font-medium mb-2">Password</label>
            <input
              required
              type="password"
              name="password"
              value={formData.password}
              onChange={handleOnChange}
              className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 focus:ring-2 focus:ring-orange-400 focus:outline-none transition-all duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-300 mt-6">
          <Link to={"/Resetpassword"}>
            Forgot Password? <span className="text-orange-400 font-medium underline hover:text-orange-500">Click Here</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
