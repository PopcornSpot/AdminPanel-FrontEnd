import React, { useState } from 'react';
import SidebarComponent from '../Components/SidebarComponent';
import { FiMenu, FiX } from 'react-icons/fi';

const AddScreenForm = () => {
  const [formData, setFormData] = useState({
    totalSeats: '',
    firstClassPrice: '',
    secondClassPrice: '',
    layout: '',
    screenType: '',
    movieTimings: [],
    lastDate: '',
    city: '',
    contactNumber: '',
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prevData) => {
        const newTimings = checked
          ? [...prevData.movieTimings, value]
          : prevData.movieTimings.filter((timing) => timing !== value);

        return { ...prevData, movieTimings: newTimings };
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
    alert('Form submitted successfully!');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-800">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-56 h-full bg-gradient-to-b from-blue-700 to-blue-900 shadow-xl z-50 transform transition-transform duration-300 \
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <SidebarComponent />
      </div>

      {/* Burger Menu Button for Mobile/Tablet */}
      <div className="absolute top-4 left-4 md:hidden z-50">
        {sidebarOpen ? (
          <FiX
            className="text-white text-3xl cursor-pointer"
            onClick={() => setSidebarOpen(false)}
          />
        ) : (
          <FiMenu
            className="text-white text-3xl cursor-pointer"
            onClick={() => setSidebarOpen(true)}
          />
        )}
      </div>

      {/* Main Content */}
      <div className="flex-grow p-8 md:ml-56 overflow-auto">
        <h2 className="text-4xl font-extrabold text-center text-white mb-8 drop-shadow-lg">
          Add Screen Form
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700"
        >
          {/* Total Seats */}
          <div>
            <label
              htmlFor="totalSeats"
              className="block text-sm font-medium text-gray-300"
            >
              Total Seats
            </label>
            <input
              type="number"
              id="totalSeats"
              name="totalSeats"
              value={formData.totalSeats}
              onChange={handleChange}
              className="w-full mt-2 p-3 bg-gray-900 text-white border border-gray-700 rounded-xl focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter total seats"
              required
            />
          </div>

          {/* First Class Price */}
          <div>
            <label
              htmlFor="firstClassPrice"
              className="block text-sm font-medium text-gray-300"
            >
              First Class Price
            </label>
            <input
              type="number"
              id="firstClassPrice"
              name="firstClassPrice"
              value={formData.firstClassPrice}
              onChange={handleChange}
              className="w-full mt-2 p-3 bg-gray-900 text-white border border-gray-700 rounded-xl focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter price for first class"
              required
            />
          </div>

          {/* Second Class Price */}
          <div>
            <label
              htmlFor="secondClassPrice"
              className="block text-sm font-medium text-gray-300"
            >
              Second Class Price
            </label>
            <input
              type="number"
              id="secondClassPrice"
              name="secondClassPrice"
              value={formData.secondClassPrice}
              onChange={handleChange}
              className="w-full mt-2 p-3 bg-gray-900 text-white border border-gray-700 rounded-xl focus:ring-orange-500 focus:border-blue-500"
              placeholder="Enter price for second class"
              required
            />
          </div>

          {/* Layout Selection */}
          <div>
            <label
              htmlFor="layout"
              className="block text-sm font-medium text-gray-300"
            >
              Layout Selection
            </label>
            <select
              id="layout"
              name="layout"
              value={formData.layout}
              onChange={handleChange}
              className="w-full mt-2 p-3 bg-gray-900 text-white border border-gray-700 rounded-xl focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="" disabled>
                Select layout
              </option>
              <option value="Theater">Theater</option>
              <option value="Classroom">Classroom</option>
              <option value="U-Shape">U-Shape</option>
            </select>
          </div>

          {/* Screen Type */}
          <div>
            <label
              htmlFor="screenType"
              className="block text-sm font-medium text-gray-300"
            >
              Screen Type
            </label>
            <select
              id="screenType"
              name="screenType"
              value={formData.screenType}
              onChange={handleChange}
              className="w-full mt-2 p-3 bg-gray-900 text-white border border-gray-700 rounded-xl focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="" disabled>
                Select screen type
              </option>
              <option value="2D">2D</option>
              <option value="3D">3D</option>
              <option value="IMAX">IMAX</option>
            </select>
          </div>

          {/* Movie Timings */}
          <div>
            <p className="block text-sm font-medium text-gray-300 mb-2">Movie Timings</p>
            <div className="grid grid-cols-2 gap-4">
              {['07:00 AM', '10:30 AM', '02:20 PM', '06:30 PM', '10:25 PM'].map((time) => (
                <div key={time} className="flex items-center">
                  <input
                    type="checkbox"
                    id={time}
                    name="movieTimings"
                    value={time}
                    checked={formData.movieTimings.includes(time)}
                    onChange={handleChange}
                    className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-700 rounded"
                  />
                  <label htmlFor={time} className="text-sm text-gray-300">
                    {time}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Last Date */}
          <div>
            <label
              htmlFor="lastDate"
              className="block text-sm font-medium text-gray-300"
            >
              Last Date
            </label>
            <input
              type="date"
              id="lastDate"
              name="lastDate"
              value={formData.lastDate}
              onChange={handleChange}
              className="w-full mt-2 p-3 bg-gray-900 text-white border border-gray-700 rounded-xl focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* City */}
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-300"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full mt-2 p-3 bg-gray-900 text-white border border-gray-700 rounded-xl focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter city"
              required
            />
          </div>

          {/* Contact Number */}
          <div>
            <label
              htmlFor="contactNumber"
              className="block text-sm font-medium text-gray-300"
            >
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full mt-2 p-3 bg-gray-900 text-white border border-gray-700 rounded-xl focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter contact number"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white py-3 px-4 rounded-xl hover:from-orange-600 hover:to-orange-500 focus:outline-none focus:ring-4 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>

        {/* Submitted Data Display */}
        {submittedData && (
          <div className="mt-8 p-6 bg-gray-900 text-white border border-gray-700 rounded-xl shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Submitted Data:</h2>
            <p><strong>Total Seats:</strong> {submittedData.totalSeats}</p>
            <p><strong>First Class Price:</strong> ₹{submittedData.firstClassPrice}</p>
            <p><strong>Second Class Price:</strong> ₹{submittedData.secondClassPrice}</p>
            <p><strong>Layout:</strong> {submittedData.layout}</p>
            <p><strong>Screen Type:</strong> {submittedData.screenType}</p>
            <p><strong>Movie Timings:</strong> {submittedData.movieTimings.join(', ')}</p>
            <p><strong>Last Date:</strong> {submittedData.lastDate}</p>
            <p><strong>City:</strong> {submittedData.city}</p>
            <p><strong>Contact Number:</strong> {submittedData.contactNumber}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddScreenForm;
