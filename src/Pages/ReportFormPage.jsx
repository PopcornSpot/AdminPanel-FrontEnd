import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SidebarComponent from '../Components/SidebarComponent';

const initialState = {
    name: '',
    email: '',
    mobileNumber: '',
    subject: '',
    message: '',
    role:''
}

const ReportForm = () => {
  let [formData, setFormData] = useState(initialState); 
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    const authToken = localStorage.getItem("token");
    e.preventDefault();
    formData ={
        ...formData,
        role:'admin' 
    }
    setFormData({...formData,role:'admin'})
    if (!formData.name || !formData.email || !formData.subject || !formData.message || !formData.mobileNumber) {
      setErrorMessage('All fields are required.');
      return;
    }
    try {
        await axios
          .post(
            `https://popcornspotbackend-production.up.railway.app/report/admin/create`,
            formData,
            {
                headers: { Authorization: `Bearer ${authToken}` }
            }
          )
          .then((res) => {
            toast.success(res.data.Message);
            toast.error(res.data.Error);
            setSuccessMessage('Your report has been submitted successfully.');
            setErrorMessage('');
            setFormData(initialState);
            navigate("/report");
          })
          .catch((err) => {
            toast.error(err.response.data.Message);
          });
      } catch (error) {
        console.log(error);
      }
};

  return (
    <div className="flex h-screen overflow-hidden bg-gray-900 text-white">
      <div className="w-56 fixed h-20 z-50">
        <SidebarComponent />
      </div>

      <div className="flex-1 ml-56 max-sm:mt-24 max-md:ml-0 max-md:mt-16 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto p-8 bg-gray-800 shadow-lg rounded-lg border border-gray-700">
          <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">Submit a Report</h2>

          {successMessage && (
            <div className="bg-green-500 text-white px-4 py-3 rounded-md mb-4 shadow-md">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="bg-red-500 text-white px-4 py-3 rounded-md mb-4 shadow-md">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 font-medium mb-1">Your Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-1">Mobile Number</label>
              <input
                type="number"
                name="mobileNumber"
                required
                value={formData.mobileNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                placeholder="Enter your mobile number"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-1">Subject</label>
              <select
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
              >
                <option value="">Select a subject</option>
                <option value="Booking Error">Movie Creating</option>
                <option value="Screening Schedule">Screening Schedule</option>
                <option value="Technical Issue">Technical Issue</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-1">Message</label>
              <textarea
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                placeholder="Write your message here..."
              ></textarea>
            </div>

            <div className='w-full flex justify-center'>
              <button
                type="submit"
                className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-md"
              >
                Submit Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportForm;
