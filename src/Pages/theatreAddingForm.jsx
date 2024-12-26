import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import SidebarComponent from '../Components/SidebarComponent';

const initialState = {
  theatreName: '',
  address: '',
  city: '',
  state: '',
  country: '',
  zipCode: '',
  phone: '',
  screenType: '',
  email: '',
  screens: '',
  facilities: [],
  image: null,
};

const fetchTheatreForUpdate = async (_id, setMovie) => {
  try {
    const authToken = localStorage.getItem("token");
    await axios
      .get(`http://localhost:7000/theatre/getone/?_id=${_id}`,
        {
          headers: { Authorization: `Bearer ${authToken}` }
        }
      )
      .then((res) => {
        toast.success(res.data.Message);
        toast.error(res.data.Error);
        setMovie(res.data.theatres);
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

const AddTheatreForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [theatreEdit, setTheatreEdit] = useState(false);
  const navigate = useNavigate();
  const { _id } = useParams();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        facilities: checked
          ? [...prev.facilities, value]
          : prev.facilities.filter((facility) => facility !== value)
      }));
    } else if (type === 'file') {
      setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };


  const handleSubmit = async (e) => {
    const authToken = localStorage.getItem("token");
    e.preventDefault();
    const finalData = { ...formData };
    console.log(finalData);

    let uploadData = new FormData();
    Object.keys(finalData).forEach((key) => {
      uploadData.append(key, finalData[key]);
    });




    try {
      theatreEdit
        ? await axios.put(`http://localhost:7000/theatre/update/?_id=${_id}`, uploadData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
          .then((res) => {
            toast.success(res.data.Message);
            toast.error(res.data.Error);
            setFormData(initialState);
            navigate("/theatre");
          })
          .catch((err) => {
            toast.error(err.response.data.Message);
          })
        : await axios
          .post("http://localhost:7000/theatre/create", uploadData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${authToken}`,
            },
          })
          .then((res) => {
            toast.success(res.data.Message);
            toast.error(res.data.Error);
            setFormData(initialState);
            navigate("/theatre");
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
      setTheatreEdit(true);
      fetchTheatreForUpdate(_id, setFormData);
    } else {
      setTheatreEdit(false);
    }
  }, [_id]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-800">
      <div className="w-56 fixed h-full">
        <SidebarComponent />
      </div>
      <div className="flex-1 ml-56 max-md:ml-0 max-md:mt-16 overflow-y-auto mt-10">
        <div className="min-h-screen bg-gray-800 flex items-center justify-center">
          <form
            className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-5xl space-y-6"
            onSubmit={handleSubmit}
          >
            <h1 className="text-3xl font-bold mb-6 text-orange-400">Add Theatre</h1>

            <div className="space-y-4">
              <div>
                <label className="block text-lg font-semibold text-gray-300 mb-2" htmlFor="theatreName">
                  Theatre Name
                </label>
                <input
                  type="text"
                  id="theatreName"
                  name="theatreName"
                  value={formData.theatreName}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  placeholder="Enter theatre name"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-300 mb-2" htmlFor="address">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  placeholder="Enter address"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-lg font-semibold text-gray-300 mb-2" htmlFor="city">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    placeholder="Enter city"
                    required
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-300 mb-2" htmlFor="state">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    placeholder="Enter state"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-lg font-semibold text-gray-300 mb-2" htmlFor="country">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    placeholder="Enter country"
                    required
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-300 mb-2" htmlFor="zipCode">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    placeholder="Enter zip code"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-300 mb-2" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  placeholder="Enter phone number"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-300 mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  placeholder="Enter email address"
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-lg font-semibold text-gray-300 mb-2" htmlFor="screenType">
                    Screen Type
                  </label>
                  <select
                    id="screenType"
                    name="screenType"
                    value={formData.screenType}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    required
                  >
                    <option value="">Select Screen Type</option>
                    <option value="3D">3D</option>
                    <option value="2D">2D</option>
                    <option value="IMAX">IMAX</option>
                  </select>
                </div>

                <div className="flex-1">
                  <label className="block text-lg font-semibold text-gray-300 mb-2" htmlFor="screens">
                    Number of Screens
                  </label>
                  <input
                    type="number"
                    id="screens"
                    name="screens"
                    value={formData.screens}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    placeholder="Enter number of screens"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-lg font-semibold text-gray-300">Facilities</label>
                <div className="flex gap-4 flex-wrap">
                  {["Parking", "Food and Beverages", "Wheelchair Accessibility"].map((facility) => (
                    <label
                      key={facility}
                      className="flex items-center space-x-2 text-gray-300"
                    >
                      <input
                        type="checkbox"
                        name="facilities"
                        value={facility}
                        checked={formData.facilities.includes(facility)}
                        onChange={handleChange}
                        className="form-checkbox h-5 w-5 text-orange-400 rounded-md"
                      />
                      <span>{facility}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-300 mb-2" htmlFor="image">
                  Upload Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                />
                {theatreEdit && formData.fileOriginalName && (
                  <p className="text-sm text-gray-400 mt-2">{formData.fileOriginalName}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition duration-300"
            >
              Submit
            </button>
          </form>

        </div>
      </div>
    </div>

  );
};

export default AddTheatreForm;
