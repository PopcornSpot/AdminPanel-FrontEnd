import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import SidebarComponent from '../Components/SidebarComponent';

const initialState = {
  totalSeats: '',
  firstClassSeats: '',
  secondClassSeats: '',
  screenNo: '',
};


const fetchScreenForUpdate = async (_id, setFormData) => {
  try {
    const authToken = localStorage.getItem("token");
    await axios
      .get(`http://localhost:7000/screen/getsinglescreen/?_id=${_id}`,
        {
          headers: { Authorization: `Bearer ${authToken}` }
        }
      )
      .then((res) => {
        toast.success(res.data.Message);
        toast.error(res.data.Error);
        setFormData(res.data.getsingleScreen);
        
      })
      .catch((err) => {
        toast.error(err.response.data.Message);
      });
  } catch (error) {
    console.log(error.message);
  }
};










const AddScreenForm = () => {
  const [formData, setFormData] = useState(initialState);
    const [editScreen, setEditScreen] = useState(false);
    const navigate = useNavigate();
    const { _id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    const authToken = localStorage.getItem("token");
    e.preventDefault();

    const updatedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, Number(value)])
    );

    // for (let key in formData) {
    //   formData[key] = Number(formData[key]);
    // }

    try {
      editScreen
        ? await axios.put(`http://localhost:7000/screen/update/?_id=${_id}`, formData,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
          .then((res) => {
            toast.success(res.data.Message);
            toast.error(res.data.Error);
            setFormData(initialState);
            navigate("/screen");
          })
          .catch((err) => {
            toast.error(err.response.data.Message);
          })
        : await axios
          .post("http://localhost:7000/screen/create", updatedData, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          })
          .then((res) => {
            toast.success(res.data.Message);
            toast.error(res.data.Error);
            setFormData(initialState);
            navigate("/screen");
          })
          .catch((err) => {
            toast.error(err.response.data.Message);
          });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (_id) {
      setEditScreen(true);
      fetchScreenForUpdate(_id, setFormData,formData);
    } else {
      setEditScreen(false);
      
    }
  }, [_id]);

  return (
    <div className="flex h-screen overflow-hidden">
    <div className="w-56 fixed h-full">
      <SidebarComponent/>
    </div>
    <div className="flex-1 ml-56 overflow-y-auto">
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">
      {editScreen? 'Update Screen':'Add Screen' }
      </h2>
      <form onSubmit={handleSubmit}>

      <div className="mb-4">
          <label
            htmlFor="screenNo"
            className="block text-sm font-medium text-gray-700"
          >
            Screen No
          </label>
          <input
            type="text"
            id="screenNo"
            name="screenNo"
            value={formData.screenNo}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="totalSeats"
            className="block text-sm font-medium text-gray-700"
          >
            Total Seats
          </label>
          <input
            type="number"
            id="totalSeats"
            name="totalSeats"
            value={formData.totalSeats}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="firstClassSeats"
            className="block text-sm font-medium text-gray-700"
          >
            1st Class Seats
          </label>
          <input
            type="number"
            id="firstClassSeats"
            name="firstClassSeats"
            value={formData.firstClassSeats}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="secondClassSeats"
            className="block text-sm font-medium text-gray-700"
          >
            2nd Class Seats
          </label>
          <input
            type="number"
            id="secondClassSeats"
            name="secondClassSeats"
            value={formData.secondClassSeats}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="w-1/2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
             {editScreen? 'Update' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
};

export default AddScreenForm;
