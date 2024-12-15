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
    // setFormData({...formData,role:'admin'})
    if (!formData.name || !formData.email || !formData.subject || !formData.message || !formData.mobileNumber) {
      setErrorMessage('All fields are required.');
      return;
    }
    try {
        await axios
          .post(
            `http://localhost:7000/report/admin/create`,
            formData,
            {
                headers: { Authorization: `Bearer ${authToken}` }
            }
          )
          .then((res) => {
            console.log(res.data); 
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
    <div className="flex h-screen overflow-hidden">
      <div className="w-56 fixed h-full">
        <SidebarComponent />
      </div>

      <div className="flex-1 ml-56 max-md:ml-0 max-md:mt-16 overflow-y-auto">
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Submit a Report</h2>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>


        <div className="mb-4">
          <label htmlFor="mobileNumber" className="block text-gray-700 font-medium mb-2">
            Mobile Number
          </label>
          <input
            type="number"
            id="mobileNumber"
            name="mobileNumber"
            required
            value={formData.mobileNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your mobile number"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a subject</option>
            <option value="Payment Issue">Payment Issue</option>
            <option value="Booking Error">Booking Error</option>
            <option value="Screening Schedule">Screening Schedule</option>
            <option value="Technical Issue">Technical Issue</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your message here..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit Report
        </button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default ReportForm;
