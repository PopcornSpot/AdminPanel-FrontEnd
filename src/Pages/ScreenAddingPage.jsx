import React, { useState } from 'react';

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
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-10">
        
      <h1 className="text-2xl font-bold text-center mb-6">Seat Selection Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/ Total Seats /}
        <div>
          <label htmlFor="totalSeats" className="block text-sm font-medium text-gray-700">
            Total Seats
          </label>
          <input
            type="number"
            id="totalSeats"
            name="totalSeats"
            value={formData.totalSeats}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter total seats"
            required
          />
        </div>

        <div>
          <label htmlFor="firstClassPrice" className="block text-sm font-medium text-gray-700">
            First Class Price
          </label>
          <input
            type="number"
            id="firstClassPrice"
            name="firstClassPrice"
            value={formData.firstClassPrice}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter price for first class"
            required
          />
        </div>

      
        <div>
          <label htmlFor="secondClassPrice" className="block text-sm font-medium text-gray-700">
            Second Class Price
          </label>
          <input
            type="number"
            id="secondClassPrice"
            name="secondClassPrice"
            value={formData.secondClassPrice}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter price for second class"
            required
          />
        </div>

      
        <div>
          <label htmlFor="layout" className="block text-sm font-medium text-gray-700">
            Layout Selection
          </label>
          <select
            id="layout"
            name="layout"
            value={formData.layout}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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

     
        <div>
          <label htmlFor="screenType" className="block text-sm font-medium text-gray-700">
            Screen Type
          </label>
          <select
            id="screenType"
            name="screenType"
            value={formData.screenType}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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

      
        <div>
          <p className="block text-sm font-medium text-gray-700">Movie Timings</p>
          <div className="space-y-2">
            {['07:00 AM', '10:30 AM', '02:20 PM', '06:30 PM', '10:25 PM'].map((time) => (
              <div key={time} className="flex items-center">
                <input
                  type="checkbox"
                  id={time}
                  name="movieTimings"
                  value={time}
                  checked={formData.movieTimings.includes(time)}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor={time} className="text-sm text-gray-700">
                  {time}
                </label>
              </div>
            ))}
          </div>
        </div>

    
        <div>
          <label htmlFor="lastDate" className="block text-sm font-medium text-gray-700">
            Last Date
          </label>
          <input
            type="date"
            id="lastDate"
            name="lastDate"
            value={formData.lastDate}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/ City /}
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter city"
            required
          />
        </div>

        <div>
          <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
            Contact Number
          </label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter contact number"
            required
          />
        </div>

     
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>


      {submittedData && (
        <div className="mt-6 p-4 bg-white border border-gray-300 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Submitted Data:</h2>
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
  );
};

export default AddScreenForm;
