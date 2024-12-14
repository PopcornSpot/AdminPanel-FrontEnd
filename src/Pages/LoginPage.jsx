//Login
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";

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
        .post("http://localhost:7000/admin/login", formData)
        .then((res) => {
          toast.success(res.data.Message);
          localStorage.setItem("token", res.data.token);
          setFormData(initialState);
          navigate("/home");
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.Message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleReset = () => {
    setFormData(initialState);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gray-100`}
    >
      <div className={`bg-white p-6 rounded-lg shadow-lg w-full max-w-md`}>
        <h1 className={`text-2xl font-bold text-center mb-4`}>Admin Login</h1>
        <form onSubmit={handleOnSubmit} onReset={handleReset}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              required
              name="email"
              type="email"
              value={formData.email}
              onChange={handleOnChange}
              className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-orange-400`}
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <div>
              <label className={`block text-gray-700 mb-2`}>Password</label>
            </div>

            <input
            required
              type="password"
              name="password"
              value={formData.password}
              onChange={handleOnChange}
              className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-orange-400`}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-orange-400 text-white py-2 rounded-lg hover:bg-orange-600`}
          >
            Login
          </button>
        </form>
        <p className={`text-center text-gray-600 mt-4`}>
          <Link to={"/Resetpassword"}>
            Forgot Password?
            <span className={`text-blue-500 underline`}>Click Here</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
