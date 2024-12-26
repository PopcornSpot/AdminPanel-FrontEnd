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

    try {
      editScreen
        ? await axios.put(`http://localhost:7000/screen/update/?_id=${_id}`, formData,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        )
          .then((res) => {
            toast.success(res.data.Message);
            toast.error(res.data.Error);
            setFormData(initialState);
            navigate("/screen");
          })
          .catch ((err) =>{
            if (err.response?.status === 401) {
              navigate("/")
              return;
            }
            console.log(err.message); 
          })
        : await axios
          .post("http://localhost:7000/screen/create", updatedData, {
            headers: { Authorization: `Bearer ${authToken}` },
          })
          .then((res) => {
            toast.success(res.data.Message);
            toast.error(res.data.Error);
            setFormData(initialState);
            navigate("/screen");
          })
          .catch ((err) =>{
            if (err.response?.status === 401) {
              navigate("/")
              return;
            }
            console.log(err.message); 
          });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (_id) {
      setEditScreen(true);
      fetchScreenForUpdate(_id, setFormData);
    } else {
      setEditScreen(false);
    }
  }, [_id]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-900">
      <div className="w-56 fixed h-full">
        <SidebarComponent />
      </div>
      <div className="flex-1 ml-56 max-md:ml-0 max-md:mt-16 overflow-y-auto mt-16">
        <div className="max-w-2xl mx-auto p-6 bg-gray-800 shadow-md rounded-lg mt-16 md:mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-100 text-center">
            {editScreen ? 'Update Screen' : 'Add Screen'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {['screenNo', 'totalSeats', 'firstClassSeats', 'secondClassSeats'].map((field) => (
              <div key={field} className="mb-4">
                <label htmlFor={field} className="block text-sm font-medium text-gray-200">
                  {field === 'screenNo' ? 'Screen No' : field.split(/(?=[A-Z])/).join(' ')}
                </label>
                <input
                  type={field === 'screenNo' ? 'text' : 'number'}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  required
                />
              </div>
            ))}
            <div className="flex justify-between mt-6">
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-700 focus:ring-offset-2 transition-all ease-in-out duration-300"
              >
                {editScreen ? 'Update' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddScreenForm;
