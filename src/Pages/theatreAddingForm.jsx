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
      .catch((err) => {
        toast.error(err.response.data.Message);
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
          .catch((err) => {
            toast.error(err.response.data.Message);
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
          className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-5xl"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-bold mb-4 text-gray-100">Add Theatre</h1>

          <div className="mb-4">
            <label className="block font-bold mb-2 text-gray-200" htmlFor="theatreName">
              Theatre Name
            </label>
            <input
              type="text"
              id="theatreName"
              name="theatreName"
              value={formData.theatreName}
              onChange={handleChange}
              className="w-full border border-orange-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-bold mb-2 text-gray-200" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-orange-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 text-gray-200">
            <div>
              <label className="block font-bold mb-2" htmlFor="city">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border border-orange-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
                required
              />
            </div>
            <div>
              <label className="block font-bold mb-2 text-gray-200" htmlFor="state">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full border border-orange-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 text-gray-200">
            <div>
              <label className="block font-bold mb-2" htmlFor="country">
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full border border-orange-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
                required
              />
            </div>
            <div>
              <label className="block font-bold mb-2 text-gray-200" htmlFor="zipCode">
                Zip Code
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="w-full border border-orange-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-bold mb-2 text-gray-200" htmlFor="phone">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-orange-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-bold mb-2 text-gray-200" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-orange-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
            />
          </div>

          <div className="flex gap-4 mb-4">

            <div className="flex-1">
              <label className="block font-bold mb-2 text-gray-200" htmlFor="screenType">
                Screen Type
              </label>
              <select
                id="screenType"
                name="screenType"
                value={formData.screenType}
                onChange={handleChange}
                className="w-full border border-orange-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
                required
              >
                <option value="">Select Screen Type</option>
                <option value="3D">3D</option>
                <option value="2D">2D</option>
                <option value="IMAX">IMAX</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block font-bold mb-2 text-gray-200" htmlFor="screens">
                Number of Screens
              </label>
              <input
                type="number"
                id="screens"
                name="screens"
                value={formData.screens}
                onChange={handleChange}
                className="w-full border border-orange-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
                required
              />
            </div>
          </div>


          <div className="mb-4">
            <label className="block font-bold mb-2 text-gray-200">Facilities</label>
            <div>
              <label className="inline-flex items-center text-gray-200">
                <input
                  type="checkbox"
                  name="facilities"
                  value="Parking"
                  checked={formData.facilities.includes('Parking')}
                  onChange={handleChange}
                  className="mr-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
                />
                Parking
              </label>
            </div>
            <div>
              <label className="inline-flex items-center text-gray-200">
                <input
                  type="checkbox"
                  name="facilities"
                  value="Food and Beverages"
                  checked={formData.facilities.includes('Food and Beverages')}
                  onChange={handleChange}
                  className="mr-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
                />
                Food and Beverages
              </label>
            </div>
            <div>
              <label className="inline-flex items-center text-gray-200">
                <input
                  type="checkbox"
                  name="facilities"
                  value="Wheelchair Accessibility"
                  checked={formData.facilities.includes('Wheelchair Accessibility')}
                  onChange={handleChange}
                  className="mr-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
                />
                Wheelchair Accessibility
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-bold mb-2 text-gray-200" htmlFor="images">
              Upload Image
            </label>
            <input
              type="file"
              id="images"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full border border-orange-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
              />
              {
                theatreEdit ?
                  formData.fileOriginalName && <p className="text-lg mt-4 ">
                    {formData.fileOriginalName}</p> :
                  <></>
              }
            </div>

            <button
              type="submit"
              className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500 w-full"
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
